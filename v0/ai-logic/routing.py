"""
Provider routing logic - moved from Node.js API
Contains all the intelligent routing heuristics and provider selection logic.
"""

import json
import logging
from pathlib import Path
from typing import Dict, Any, List, Optional
from schemas import VideoRequest, RoutingDecision, VideoProvider, VideoMode, RoutingAnalysis

logger = logging.getLogger(__name__)


class ProviderRouter:
    """Intelligent provider routing with comprehensive heuristics"""
    
    def __init__(self):
        self.config = self._load_config()
        self.provider_capabilities = self._load_provider_capabilities()
    
    def _load_config(self) -> Dict[str, Any]:
        """Load routing configuration from shared config"""
        try:
            config_path = Path("../shared/video_pipeline_config.json")
            with open(config_path, 'r') as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Failed to load config: {e}")
            return self._get_default_config()
    
    def _get_default_config(self) -> Dict[str, Any]:
        """Default configuration if file loading fails"""
        return {
            "providers": {
                "runway": {"strengths": ["cinematic", "photorealistic", "documentary"]},
                "pika": {"strengths": ["animation", "artistic", "abstract"]},
                "gemini_veo": {"strengths": ["animation", "creative", "artistic"]},
                "slideshow": {"strengths": ["educational", "presentation", "cost_effective"]}
            },
            "style_routing": {
                "cinematic": {"provider": "runway"},
                "photorealistic": {"provider": "runway"},
                "animation": {"provider": "pika"},
                "artistic": {"provider": "pika"},
                "abstract": {"provider": "pika"},
                "documentary": {"provider": "runway"},
                "slideshow_modern": {"provider": "slideshow"},
                "slideshow_classic": {"provider": "slideshow"}
            }
        }
    
    def _load_provider_capabilities(self) -> Dict[str, Dict[str, Any]]:
        """Load detailed provider capabilities"""
        return {
            "runway": {
                "max_duration": 300,
                "estimated_time_per_second": 2.0,
                "quality": "high",
                "strengths": ["cinematic", "photorealistic", "documentary", "corporate"],
                "resolutions": ["1920x1080", "1080x1920", "1080x1080"],
                "features": ["camera_movements", "photorealism", "narrative_flow"],
                "cost_tier": "high",
                "fallbacks": ["gemini_veo", "slideshow"]
            },
            "pika": {
                "max_duration": 120,
                "estimated_time_per_second": 1.5,
                "quality": "creative",
                "strengths": ["animation", "artistic", "abstract", "creative"],
                "resolutions": ["1280x720", "720x1280", "1080x1080"],
                "features": ["artistic_styles", "fast_generation", "experimental"],
                "cost_tier": "medium",
                "fallbacks": ["gemini_veo", "runway", "slideshow"]
            },
            "gemini_veo": {
                "max_duration": 180,
                "estimated_time_per_second": 1.0,
                "quality": "creative",
                "strengths": ["animation", "creative", "artistic", "abstract"],
                "resolutions": ["1280x720", "720x1280", "1080x1080"],
                "features": ["fast_generation", "creative_effects", "animation"],
                "cost_tier": "low",
                "fallbacks": ["pika", "runway", "slideshow"]
            },
            "slideshow": {
                "max_duration": 600,
                "estimated_time_per_second": 0.1,
                "quality": "standard",
                "strengths": ["educational", "presentation", "cost_effective", "long_form"],
                "resolutions": ["1920x1080", "1080x1920", "1080x1080"],
                "features": ["cost_effective", "voice_sync", "fast_generation", "image_generation"],
                "cost_tier": "very_low",
                "fallbacks": []
            }
        }
    
    async def route_provider(self, request: VideoRequest) -> RoutingDecision:
        """Main routing logic - determines optimal provider"""
        
        # If user explicitly requested a provider
        if request.preferred_provider:
            return RoutingDecision(
                provider=request.preferred_provider,
                mode=VideoMode.SLIDESHOW if request.preferred_provider == VideoProvider.SLIDESHOW else VideoMode.AI_GENERATED,
                reason=f"User explicitly requested {request.preferred_provider}",
                confidence=1.0
            )
        
        # Multi-factor routing analysis
        routing_scores = {}
        
        for provider in VideoProvider:
            score = await self._calculate_provider_score(provider, request)
            routing_scores[provider] = score
        
        # Select highest scoring provider
        best_provider = max(routing_scores.keys(), key=lambda p: routing_scores[p]["total_score"])
        best_score = routing_scores[best_provider]
        
        # Determine fallback
        sorted_providers = sorted(routing_scores.items(), key=lambda x: x[1]["total_score"], reverse=True)
        fallback_provider = sorted_providers[1][0] if len(sorted_providers) > 1 else None
        
        # Get adaptations if needed
        adaptations = self._get_style_adaptations(request.style.value, best_provider.value)
        
        return RoutingDecision(
            provider=best_provider,
            mode=VideoMode.SLIDESHOW if best_provider == VideoProvider.SLIDESHOW else VideoMode.AI_GENERATED,
            reason=best_score["reason"],
            confidence=best_score["total_score"],
            fallback_provider=fallback_provider,
            adaptations=adaptations if adaptations else None
        )
    
    async def _calculate_provider_score(self, provider: VideoProvider, request: VideoRequest) -> Dict[str, Any]:
        """Calculate comprehensive scoring for provider selection"""
        
        capabilities = self.provider_capabilities.get(provider.value, {})
        
        # Base scores (0-1 scale)
        style_score = self._score_style_match(provider, request.style.value)
        content_score = self._score_content_match(provider, request.content_type)
        duration_score = self._score_duration_optimization(provider, request.duration)
        quality_score = self._score_quality_requirements(provider, request)
        cost_score = self._score_cost_efficiency(provider, request)
        
        # Weighted total score
        weights = {
            "style": 0.3,
            "content": 0.25,
            "duration": 0.2,
            "quality": 0.15,
            "cost": 0.1
        }
        
        total_score = (
            style_score * weights["style"] +
            content_score * weights["content"] +
            duration_score * weights["duration"] +
            quality_score * weights["quality"] +
            cost_score * weights["cost"]
        )
        
        # Generate human-readable reason
        primary_factor = max([
            ("style", style_score),
            ("content", content_score),
            ("duration", duration_score),
            ("quality", quality_score),
            ("cost", cost_score)
        ], key=lambda x: x[1])
        
        reason = self._generate_routing_reason(provider, primary_factor, request)
        
        return {
            "total_score": total_score,
            "style_score": style_score,
            "content_score": content_score,
            "duration_score": duration_score,
            "quality_score": quality_score,
            "cost_score": cost_score,
            "reason": reason,
            "primary_factor": primary_factor[0]
        }
    
    def _score_style_match(self, provider: VideoProvider, style: str) -> float:
        """Score how well provider matches the requested style"""
        capabilities = self.provider_capabilities.get(provider.value, {})
        strengths = capabilities.get("strengths", [])
        
        # Direct match
        if style in strengths:
            return 1.0
        
        # Style compatibility matrix
        style_compatibility = {
            "cinematic": {
                "runway": 1.0,
                "gemini_veo": 0.7,
                "pika": 0.6,
                "slideshow": 0.3
            },
            "photorealistic": {
                "runway": 1.0,
                "gemini_veo": 0.6,
                "pika": 0.5,
                "slideshow": 0.4
            },
            "animation": {
                "pika": 1.0,
                "gemini_veo": 0.9,
                "runway": 0.6,
                "slideshow": 0.7
            },
            "artistic": {
                "pika": 1.0,
                "gemini_veo": 0.9,
                "runway": 0.5,
                "slideshow": 0.6
            },
            "abstract": {
                "pika": 1.0,
                "gemini_veo": 0.9,
                "runway": 0.4,
                "slideshow": 0.5
            },
            "documentary": {
                "runway": 1.0,
                "slideshow": 0.8,
                "gemini_veo": 0.6,
                "pika": 0.4
            }
        }
        
        return style_compatibility.get(style, {}).get(provider.value, 0.5)
    
    def _score_content_match(self, provider: VideoProvider, content_type: Optional[str]) -> float:
        """Score based on content type optimization"""
        if not content_type:
            return 0.7  # neutral score
        
        content_preferences = {
            "educational": {
                "slideshow": 1.0,
                "runway": 0.7,
                "gemini_veo": 0.6,
                "pika": 0.5
            },
            "entertainment": {
                "pika": 1.0,
                "gemini_veo": 0.9,
                "runway": 0.8,
                "slideshow": 0.4
            },
            "corporate": {
                "runway": 1.0,
                "slideshow": 0.8,
                "gemini_veo": 0.6,
                "pika": 0.4
            },
            "creative": {
                "pika": 1.0,
                "gemini_veo": 0.9,
                "runway": 0.6,
                "slideshow": 0.5
            }
        }
        
        return content_preferences.get(content_type, {}).get(provider.value, 0.6)
    
    def _score_duration_optimization(self, provider: VideoProvider, duration: Optional[int]) -> float:
        """Score based on duration optimization"""
        if not duration:
            return 0.7  # neutral score
        
        capabilities = self.provider_capabilities.get(provider.value, {})
        max_duration = capabilities.get("max_duration", 300)
        
        # Can't handle the duration
        if duration > max_duration:
            return 0.0
        
        # Duration-based optimization
        if duration <= 30:
            # Short videos - favor fast generators
            speed_preference = {
                "gemini_veo": 1.0,
                "pika": 0.9,
                "slideshow": 0.8,
                "runway": 0.7
            }
        elif duration <= 120:
            # Medium videos - balanced approach
            speed_preference = {
                "runway": 1.0,
                "gemini_veo": 0.9,
                "pika": 0.9,
                "slideshow": 0.8
            }
        else:
            # Long videos - favor cost-effective options
            speed_preference = {
                "slideshow": 1.0,
                "gemini_veo": 0.7,
                "pika": 0.6,
                "runway": 0.5
            }
        
        return speed_preference.get(provider.value, 0.6)
    
    def _score_quality_requirements(self, provider: VideoProvider, request: VideoRequest) -> float:
        """Score based on quality requirements"""
        capabilities = self.provider_capabilities.get(provider.value, {})
        quality = capabilities.get("quality", "standard")
        
        # Infer quality requirements from style and content
        quality_requirements = {
            "cinematic": "high",
            "photorealistic": "high", 
            "documentary": "high",
            "artistic": "creative",
            "animation": "creative",
            "abstract": "creative"
        }
        
        required_quality = quality_requirements.get(request.style.value, "standard")
        
        quality_scores = {
            ("high", "high"): 1.0,
            ("high", "creative"): 0.8,
            ("high", "standard"): 0.6,
            ("creative", "creative"): 1.0,
            ("creative", "high"): 0.9,
            ("creative", "standard"): 0.7,
            ("standard", "standard"): 1.0,
            ("standard", "creative"): 0.9,
            ("standard", "high"): 0.8
        }
        
        return quality_scores.get((required_quality, quality), 0.7)
    
    def _score_cost_efficiency(self, provider: VideoProvider, request: VideoRequest) -> float:
        """Score based on cost efficiency"""
        capabilities = self.provider_capabilities.get(provider.value, {})
        cost_tier = capabilities.get("cost_tier", "medium")
        
        # Cost efficiency scores (higher is more cost-efficient)
        cost_scores = {
            "very_low": 1.0,
            "low": 0.8,
            "medium": 0.6,
            "high": 0.4
        }
        
        # Adjust based on priority
        base_score = cost_scores.get(cost_tier, 0.6)
        
        if request.priority == "low":
            return base_score  # Cost matters more
        elif request.priority == "high":
            return min(base_score * 0.7, 1.0)  # Cost matters less
        
        return base_score
    
    def _generate_routing_reason(self, provider: VideoProvider, primary_factor: tuple, request: VideoRequest) -> str:
        """Generate human-readable routing reason"""
        factor_name, score = primary_factor
        
        reasons = {
            "style": f"{provider.value} excels at {request.style.value} style content",
            "content": f"{provider.value} is optimized for {request.content_type} content",
            "duration": f"{provider.value} is optimal for {request.duration}s duration videos",
            "quality": f"{provider.value} provides the quality level needed for {request.style.value}",
            "cost": f"{provider.value} offers the most cost-effective solution"
        }
        
        return reasons.get(factor_name, f"{provider.value} selected based on comprehensive analysis")
    
    def _get_style_adaptations(self, style: str, provider: str) -> Optional[Dict[str, str]]:
        """Get style adaptations when routing to non-optimal provider"""
        adaptations = {
            "cinematic": {
                "gemini_veo": {
                    "prompt_enhancement": "cinematic style with dramatic camera angles and professional lighting",
                    "duration_adjustment": "Consider shorter duration for optimal quality"
                },
                "pika": {
                    "prompt_enhancement": "cinematic style with dramatic lighting and camera movements",
                    "quality_note": "May have more artistic interpretation than pure cinematic"
                },
                "slideshow": {
                    "image_style": "cinematic photography style with dramatic lighting",
                    "transition_effects": "Use cross-fades and professional transitions"
                }
            },
            "animation": {
                "runway": {
                    "prompt_enhancement": "animated style with smooth motion and cartoon-like elements",
                    "style_note": "May be more realistic than pure animation"
                },
                "slideshow": {
                    "image_style": "cartoon and animated illustration style",
                    "sequence_timing": "Use quick transitions to simulate animation"
                }
            }
        }
        
        return adaptations.get(style, {}).get(provider)
    
    async def get_provider_capabilities(self) -> Dict[str, Any]:
        """Return all provider capabilities"""
        return self.provider_capabilities
    
    def get_routing_analysis(self, request: VideoRequest) -> RoutingAnalysis:
        """Get detailed routing analysis without executing"""
        # This would be implemented to provide detailed analysis
        return RoutingAnalysis(
            primary_factors=["style", "content_type", "duration"],
            style_match_score=0.9,
            content_type_match_score=0.8,
            duration_optimization_score=0.7,
            provider_availability_score=1.0,
            alternatives=[],
            recommendations=[]
        )