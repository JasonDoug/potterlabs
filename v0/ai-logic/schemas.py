"""
Pydantic schemas for AI Logic Service
"""

from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from enum import Enum


class VideoStyle(str, Enum):
    CINEMATIC = "cinematic"
    PHOTOREALISTIC = "photorealistic" 
    ANIMATION = "animation"
    ARTISTIC = "artistic"
    ABSTRACT = "abstract"
    DOCUMENTARY = "documentary"
    SLIDESHOW_MODERN = "slideshow_modern"
    SLIDESHOW_CLASSIC = "slideshow_classic"


class VideoProvider(str, Enum):
    RUNWAY = "runway"
    PIKA = "pika"
    GEMINI_VEO = "gemini_veo"
    SLIDESHOW = "slideshow"


class VideoMode(str, Enum):
    AI_GENERATED = "ai_generated"
    SLIDESHOW = "slideshow"


class VideoRequest(BaseModel):
    """Input request for video generation"""
    request_id: Optional[str] = None
    topic: str
    prompt: Optional[str] = None
    style: VideoStyle
    theme: Optional[str] = None
    duration: Optional[int] = None
    aspect_ratio: Optional[str] = "16:9"
    voice_style: Optional[str] = None
    background_music: Optional[str] = None
    content_type: Optional[str] = None  # educational, entertainment, corporate, creative
    priority: Optional[str] = "standard"  # standard, high, low
    
    # Provider override (optional)
    preferred_provider: Optional[VideoProvider] = None
    
    class Config:
        use_enum_values = True


class RoutingDecision(BaseModel):
    """Provider routing decision"""
    provider: VideoProvider
    mode: VideoMode
    reason: str
    confidence: float = 1.0
    fallback_provider: Optional[VideoProvider] = None
    adaptations: Optional[Dict[str, Any]] = None
    
    class Config:
        use_enum_values = True


class ProviderStatus(BaseModel):
    """Provider health status"""
    provider: VideoProvider
    is_healthy: bool
    response_time_ms: Optional[float] = None
    capabilities: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    
    class Config:
        use_enum_values = True


class OrchestrationResponse(BaseModel):
    """Response from orchestration service"""
    job_id: str
    provider: VideoProvider
    mode: VideoMode
    routing_reason: str
    estimated_duration: Optional[str] = None
    node_api_response: Dict[str, Any]
    
    class Config:
        use_enum_values = True


class VideoResponse(BaseModel):
    """Final video generation response"""
    job_id: str
    status: str
    video_url: Optional[str] = None
    error: Optional[str] = None
    provider_used: VideoProvider
    generation_time: Optional[float] = None
    metadata: Optional[Dict[str, Any]] = None
    
    class Config:
        use_enum_values = True


class BatchRequest(BaseModel):
    """Batch processing request"""
    requests: List[VideoRequest]
    batch_id: Optional[str] = None
    priority: Optional[str] = "standard"


class RoutingAnalysis(BaseModel):
    """Detailed analysis of routing decision"""
    primary_factors: List[str]
    style_match_score: float
    content_type_match_score: float
    duration_optimization_score: float
    provider_availability_score: float
    alternatives: List[Dict[str, Any]]
    recommendations: List[str]