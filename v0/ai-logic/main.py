"""
Potter Labs AI Logic Service
Main orchestrator for AI video generation with intelligent provider routing.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, List, Any
import httpx
import json
import logging
from pathlib import Path

from orchestrator import VideoOrchestrator
from routing import ProviderRouter, RoutingDecision
from providers import ProviderHealthChecker
from schemas import VideoRequest, VideoResponse, OrchestrationResponse

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Potter Labs AI Logic Service",
    description="Intelligent orchestrator for AI video generation",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
orchestrator = VideoOrchestrator()
router = ProviderRouter()
health_checker = ProviderHealthChecker()

# Node API base URL (configurable via environment)
import os
NODE_API_URL = os.getenv("NODE_API_URL", "http://localhost:3000")


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "ai-logic"}


@app.post("/orchestrate/video", response_model=OrchestrationResponse)
async def orchestrate_video(request: VideoRequest):
    """
    Main orchestration endpoint - determines provider and initiates video generation
    """
    try:
        logger.info(f"Orchestrating video generation: {request.dict()}")
        
        # 1. Analyze request and determine optimal provider routing
        routing_decision = await router.route_provider(request)
        logger.info(f"Routing decision: {routing_decision.dict()}")
        
        # 2. Check provider health and availability
        provider_status = await health_checker.check_provider(routing_decision.provider)
        if not provider_status.is_healthy:
            # Try fallback provider
            if routing_decision.fallback_provider:
                routing_decision.provider = routing_decision.fallback_provider
                routing_decision.reason = f"Primary provider unavailable, using fallback: {routing_decision.fallback_provider}"
            else:
                raise HTTPException(status_code=503, detail="No healthy providers available")
        
        # 3. Prepare provider-specific configuration
        provider_config = orchestrator.prepare_provider_config(request, routing_decision)
        
        # 4. Call Node API with explicit provider
        node_response = await call_node_api(provider_config)
        
        # 5. Return orchestration response
        return OrchestrationResponse(
            job_id=node_response["jobId"],
            provider=routing_decision.provider,
            mode=routing_decision.mode,
            routing_reason=routing_decision.reason,
            estimated_duration=node_response.get("estimatedDuration"),
            node_api_response=node_response
        )
        
    except Exception as e:
        logger.error(f"Orchestration failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Orchestration failed: {str(e)}")


@app.post("/analyze/request")
async def analyze_request(request: VideoRequest):
    """
    Analyze a request and return routing recommendations without executing
    """
    routing_decision = await router.route_provider(request)
    provider_capabilities = await router.get_provider_capabilities()
    
    return {
        "routing_decision": routing_decision.dict(),
        "provider_capabilities": provider_capabilities,
        "analysis": router.get_routing_analysis(request)
    }


@app.get("/providers/status")
async def get_provider_status():
    """Get status of all providers"""
    return await health_checker.check_all_providers()


@app.get("/providers/capabilities")
async def get_provider_capabilities():
    """Get capabilities of all providers"""
    return await router.get_provider_capabilities()


@app.post("/batch/orchestrate")
async def batch_orchestrate(requests: List[VideoRequest]):
    """
    Batch orchestration for multiple video requests
    """
    results = []
    for request in requests:
        try:
            result = await orchestrate_video(request)
            results.append({"status": "success", "request_id": request.request_id, "result": result})
        except Exception as e:
            results.append({"status": "error", "request_id": request.request_id, "error": str(e)})
    
    return {"batch_results": results}


async def call_node_api(provider_config: Dict[str, Any]) -> Dict[str, Any]:
    """
    Call the Node.js API with provider-specific configuration
    """
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{NODE_API_URL}/video/generate",
            json=provider_config,
            headers={
                "X-API-KEY": os.getenv("API_KEY", "testkey"),
                "Content-Type": "application/json"
            },
            timeout=30.0
        )
        
        if response.status_code != 202:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Node API error: {response.text}"
            )
        
        return response.json()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )