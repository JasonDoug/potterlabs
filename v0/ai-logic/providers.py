"""
Provider health checking and management
"""

import asyncio
import httpx
import logging
import os
from typing import Dict, List
from schemas import VideoProvider, ProviderStatus

logger = logging.getLogger(__name__)


class ProviderHealthChecker:
    """Manages provider health checking and status monitoring"""
    
    def __init__(self):
        self.node_api_url = os.getenv("NODE_API_URL", "http://localhost:3000")
        self.api_key = os.getenv("API_KEY", "testkey")
        self.timeout = 10.0
    
    async def check_provider(self, provider: VideoProvider) -> ProviderStatus:
        """Check health of a specific provider"""
        try:
            start_time = asyncio.get_event_loop().time()
            
            # Check provider-specific health endpoint or capability
            is_healthy = await self._check_provider_health(provider)
            
            end_time = asyncio.get_event_loop().time()
            response_time = (end_time - start_time) * 1000  # Convert to ms
            
            capabilities = self._get_provider_capabilities(provider)
            
            return ProviderStatus(
                provider=provider,
                is_healthy=is_healthy,
                response_time_ms=response_time,
                capabilities=capabilities
            )
            
        except Exception as e:
            logger.error(f"Health check failed for {provider}: {str(e)}")
            return ProviderStatus(
                provider=provider,
                is_healthy=False,
                error=str(e)
            )
    
    async def check_all_providers(self) -> Dict[str, ProviderStatus]:
        """Check health of all providers concurrently"""
        tasks = []
        for provider in VideoProvider:
            task = self.check_provider(provider)
            tasks.append(task)
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        status_map = {}
        for i, result in enumerate(results):
            provider = list(VideoProvider)[i]
            if isinstance(result, Exception):
                status_map[provider.value] = ProviderStatus(
                    provider=provider,
                    is_healthy=False,
                    error=str(result)
                )
            else:
                status_map[provider.value] = result
        
        return status_map
    
    async def _check_provider_health(self, provider: VideoProvider) -> bool:
        """Provider-specific health checking logic"""
        
        if provider == VideoProvider.SLIDESHOW:
            # Slideshow is always available (local generation)
            return True
        
        try:
            # For AI providers, check if we can reach the Node API
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.node_api_url}/video/providers/health",
                    headers={"X-API-KEY": self.api_key},
                    timeout=self.timeout
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return data.get("providers", {}).get(provider.value, {}).get("healthy", False)
                
                return False
                
        except Exception as e:
            logger.warning(f"Node API health check failed for {provider}: {str(e)}")
            
            # Fallback: Check environment variables for API keys
            return self._check_provider_env_keys(provider)
    
    def _check_provider_env_keys(self, provider: VideoProvider) -> bool:
        """Check if required environment variables are set for provider"""
        env_key_map = {
            VideoProvider.RUNWAY: "RUNWAY_API_KEY",
            VideoProvider.PIKA: "PIKA_API_KEY", 
            VideoProvider.GEMINI_VEO: "GEMINI_API_KEY",
            VideoProvider.SLIDESHOW: None  # No key required
        }
        
        required_key = env_key_map.get(provider)
        if not required_key:
            return True  # No key required
        
        return bool(os.getenv(required_key))
    
    def _get_provider_capabilities(self, provider: VideoProvider) -> Dict[str, any]:
        """Get static capabilities for a provider"""
        capabilities = {
            VideoProvider.RUNWAY: {
                "max_duration": 300,
                "resolutions": ["1920x1080", "1080x1920", "1080x1080"],
                "features": ["cinematic_quality", "camera_movements", "photorealism"],
                "cost_tier": "high",
                "quality": "high"
            },
            VideoProvider.PIKA: {
                "max_duration": 120,
                "resolutions": ["1280x720", "720x1280", "1080x1080"],
                "features": ["artistic_styles", "fast_generation", "experimental"],
                "cost_tier": "medium", 
                "quality": "creative"
            },
            VideoProvider.GEMINI_VEO: {
                "max_duration": 180,
                "resolutions": ["1280x720", "720x1280", "1080x1080"],
                "features": ["fast_generation", "creative_effects", "animation"],
                "cost_tier": "low",
                "quality": "creative"
            },
            VideoProvider.SLIDESHOW: {
                "max_duration": 600,
                "resolutions": ["1920x1080", "1080x1920", "1080x1080"],
                "features": ["cost_effective", "voice_sync", "fast_generation", "image_generation"],
                "cost_tier": "very_low",
                "quality": "standard"
            }
        }
        
        return capabilities.get(provider, {})
    
    async def get_healthy_providers(self) -> List[VideoProvider]:
        """Get list of currently healthy providers"""
        all_status = await self.check_all_providers()
        healthy_providers = []
        
        for provider_name, status in all_status.items():
            if status.is_healthy:
                healthy_providers.append(VideoProvider(provider_name))
        
        return healthy_providers
    
    async def wait_for_provider_recovery(self, provider: VideoProvider, max_wait_time: int = 300) -> bool:
        """Wait for a provider to recover, with exponential backoff"""
        wait_times = [5, 10, 20, 30, 60]  # seconds
        total_waited = 0
        
        for wait_time in wait_times:
            if total_waited >= max_wait_time:
                break
                
            logger.info(f"Waiting {wait_time}s for {provider} to recover...")
            await asyncio.sleep(wait_time)
            total_waited += wait_time
            
            status = await self.check_provider(provider)
            if status.is_healthy:
                logger.info(f"{provider} has recovered!")
                return True
        
        logger.warning(f"{provider} did not recover within {max_wait_time}s")
        return False