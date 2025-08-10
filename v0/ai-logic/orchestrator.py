"""
Video orchestration logic - prepares provider-specific configurations
"""

import logging
from typing import Dict, Any
from schemas import VideoRequest, RoutingDecision, VideoProvider

logger = logging.getLogger(__name__)


class VideoOrchestrator:
    """Orchestrates video generation by preparing provider-specific configurations"""
    
    def __init__(self):
        self.provider_config_templates = self._load_provider_templates()
    
    def _load_provider_templates(self) -> Dict[str, Dict[str, Any]]:
        """Load provider-specific configuration templates"""
        return {
            "runway": {
                "provider": "runway",
                "mode": "ai_generated",
                "default_params": {
                    "resolution": "1920x1080",
                    "fps": 24,
                    "quality": "high",
                    "style_strength": 0.8
                }
            },
            "pika": {
                "provider": "pika", 
                "mode": "ai_generated",
                "default_params": {
                    "resolution": "1280x720",
                    "fps": 24,
                    "quality": "creative",
                    "style_strength": 0.9
                }
            },
            "gemini_veo": {
                "provider": "gemini_veo",
                "mode": "ai_generated", 
                "default_params": {
                    "resolution": "1280x720",
                    "fps": 24,
                    "quality": "creative",
                    "style_strength": 0.7
                }
            },
            "slideshow": {
                "provider": "slideshow",
                "mode": "slideshow",
                "default_params": {
                    "resolution": "1920x1080",
                    "transition_duration": 0.5,
                    "image_display_time": 3.0,
                    "include_captions": True
                }
            }
        }
    
    def prepare_provider_config(self, request: VideoRequest, routing: RoutingDecision) -> Dict[str, Any]:
        """
        Prepare provider-specific configuration for the Node API
        This is where we transform the high-level request into provider-specific parameters
        """
        provider = routing.provider.value
        template = self.provider_config_templates.get(provider, {})
        
        # Start with base request data
        config = {
            "topic": request.topic,
            "prompt": request.prompt,
            "style": request.style.value,
            "theme": request.theme,
            "duration": request.duration,
            "aspect_ratio": request.aspect_ratio,
            "voice_style": request.voice_style,
            "background_music": request.background_music,
            
            # Provider routing information (explicit)
            "provider": provider,
            "mode": routing.mode.value,
            "routing_reason": routing.reason,
            
            # Request metadata
            "request_id": request.request_id,
            "priority": request.priority
        }
        
        # Apply provider-specific defaults
        if template:
            config.update(template.get("default_params", {}))
        
        # Apply routing adaptations if any
        if routing.adaptations:
            config["adaptations"] = routing.adaptations
            
            # Apply specific adaptations
            if "prompt_enhancement" in routing.adaptations:
                original_prompt = config.get("prompt", "")
                enhanced_prompt = f"{original_prompt}. Style note: {routing.adaptations['prompt_enhancement']}"
                config["prompt"] = enhanced_prompt
                
            if "image_style" in routing.adaptations:
                config["image_style_override"] = routing.adaptations["image_style"]
        
        # Provider-specific optimizations
        config = self._apply_provider_optimizations(config, provider, request, routing)
        
        logger.info(f"Prepared config for {provider}: {config}")
        return config
    
    def _apply_provider_optimizations(self, config: Dict[str, Any], provider: str, 
                                    request: VideoRequest, routing: RoutingDecision) -> Dict[str, Any]:
        """Apply provider-specific optimizations"""
        
        if provider == "runway":
            config = self._optimize_for_runway(config, request)
        elif provider == "pika":
            config = self._optimize_for_pika(config, request)
        elif provider == "gemini_veo":
            config = self._optimize_for_gemini_veo(config, request)
        elif provider == "slideshow":
            config = self._optimize_for_slideshow(config, request)
        
        return config
    
    def _optimize_for_runway(self, config: Dict[str, Any], request: VideoRequest) -> Dict[str, Any]:
        """Runway-specific optimizations"""
        
        # Optimize for cinematic content
        if request.style.value in ["cinematic", "photorealistic", "documentary"]:
            config["quality"] = "high"
            config["style_strength"] = 0.9
            config["enable_camera_movements"] = True
        
        # Duration-based optimizations
        if request.duration and request.duration > 60:
            config["segment_generation"] = True
            config["max_segment_length"] = 30
        
        # Resolution optimization based on aspect ratio
        if request.aspect_ratio == "9:16":
            config["resolution"] = "1080x1920"
        elif request.aspect_ratio == "1:1":
            config["resolution"] = "1080x1080"
        
        return config
    
    def _optimize_for_pika(self, config: Dict[str, Any], request: VideoRequest) -> Dict[str, Any]:
        """Pika-specific optimizations"""
        
        # Optimize for creative/artistic content
        if request.style.value in ["animation", "artistic", "abstract"]:
            config["creativity_boost"] = True
            config["style_strength"] = 1.0
        
        # Faster generation for shorter content
        if request.duration and request.duration <= 30:
            config["generation_mode"] = "fast"
            config["quality"] = "balanced"
        
        return config
    
    def _optimize_for_gemini_veo(self, config: Dict[str, Any], request: VideoRequest) -> Dict[str, Any]:
        """Gemini Veo-specific optimizations"""
        
        # Optimize for animation and creative content
        if request.style.value in ["animation", "artistic"]:
            config["animation_strength"] = 0.9
            config["creative_freedom"] = 0.8
        
        # Cost optimization
        config["cost_optimization"] = True
        
        return config
    
    def _optimize_for_slideshow(self, config: Dict[str, Any], request: VideoRequest) -> Dict[str, Any]:
        """Slideshow-specific optimizations"""
        
        # Educational content optimizations
        if request.content_type == "educational":
            config["image_display_time"] = 4.0  # Longer display for reading
            config["include_captions"] = True
            config["caption_position"] = "bottom"
            config["transition_style"] = "fade"
        
        # Corporate content optimizations
        elif request.content_type == "corporate":
            config["transition_style"] = "professional"
            config["image_style"] = "clean"
            config["include_logo_space"] = True
        
        # Duration-based image count calculation
        if request.duration:
            display_time = config.get("image_display_time", 3.0)
            transition_time = config.get("transition_duration", 0.5)
            images_needed = max(3, int(request.duration / (display_time + transition_time)))
            config["target_image_count"] = images_needed
        
        # Voice synchronization
        if request.voice_style:
            config["sync_to_voice"] = True
            config["voice_pause_detection"] = True
        
        return config
    
    def prepare_batch_config(self, requests: list[VideoRequest], routing_decisions: list[RoutingDecision]) -> list[Dict[str, Any]]:
        """Prepare configurations for batch processing"""
        configs = []
        
        for request, routing in zip(requests, routing_decisions):
            config = self.prepare_provider_config(request, routing)
            config["batch_processing"] = True
            configs.append(config)
        
        # Add batch-level optimizations
        self._apply_batch_optimizations(configs)
        
        return configs
    
    def _apply_batch_optimizations(self, configs: list[Dict[str, Any]]) -> None:
        """Apply optimizations for batch processing"""
        
        # Group by provider for efficient processing
        provider_groups = {}
        for i, config in enumerate(configs):
            provider = config["provider"]
            if provider not in provider_groups:
                provider_groups[provider] = []
            provider_groups[provider].append((i, config))
        
        # Apply provider-specific batch optimizations
        for provider, group in provider_groups.items():
            if provider == "slideshow":
                # Slideshow can process multiple videos efficiently
                for i, config in group:
                    config["batch_priority"] = "high"
            elif len(group) > 1:
                # For AI providers, space out requests to avoid rate limits
                for idx, (i, config) in enumerate(group):
                    config["batch_delay"] = idx * 10  # 10 second delays