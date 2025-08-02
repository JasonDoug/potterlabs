from pathlib import Path

openapi_spec = {
    "openapi": "3.0.3",
    "info": {
        "title": "AI Video Generation API",
        "description": "Unified API for generating AI videos and retrieving supported metadata options.",
        "version": "1.0.0"
    },
    "servers": [
        {
            "url": "https://api.example.com",
            "description": "Production Server"
        }
    ],
    "paths": {
        "/video/generate": {
            "post": {
                "summary": "Generate an AI video",
                "description": "Creates an AI-generated video using a topic or custom script, selected voice, style, and other parameters.",
                "operationId": "generateVideo",
                "requestBody": {
                    "required": True,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/VideoGenerationRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Video generated successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "vid": {
                                            "type": "integer",
                                            "example": 375930711093
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {"description": "Invalid input"},
                    "401": {"description": "Unauthorized – missing or invalid API key"}
                },
                "security": [{"ApiKeyAuth": []}]
            }
        },
        "/video/topics": {
            "get": {
                "summary": "Get available video topics",
                "description": "Returns a list of predefined topics for AI video generation.",
                "operationId": "getTopics",
                "responses": {
                    "200": {
                        "description": "List of available topics",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {"type": "string", "example": "Random AI Story"}
                                }
                            }
                        }
                    },
                    "401": {"description": "Unauthorized – missing or invalid API key"}
                },
                "security": [{"ApiKeyAuth": []}]
            }
        },
        "/video/themes": {
            "get": {
                "summary": "Get available caption themes",
                "description": "Returns a list of available caption styles (themes) for use in AI video generation.",
                "operationId": "getThemes",
                "responses": {
                    "200": {
                        "description": "List of available themes",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {"type": "string", "example": "Hormozi_1"}
                                }
                            }
                        }
                    },
                    "401": {"description": "Unauthorized – missing or invalid API key"}
                },
                "security": [{"ApiKeyAuth": []}]
            }
        },
        "/video/voices": {
            "get": {
                "summary": "Get available AI voices",
                "description": "Returns a list of AI voice options available for video narration.",
                "operationId": "getVoices",
                "responses": {
                    "200": {
                        "description": "List of available voices",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {"type": "string", "example": "Charlie"}
                                }
                            }
                        }
                    },
                    "401": {"description": "Unauthorized – missing or invalid API key"}
                },
                "security": [{"ApiKeyAuth": []}]
            }
        },
        "/video/styles": {
            "get": {
                "summary": "Get available image styles",
                "description": "Returns a list of available visual styles for AI-generated imagery in video creation.",
                "operationId": "getStyles",
                "responses": {
                    "200": {
                        "description": "List of available image styles",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {"type": "string", "example": "3d model"}
                                }
                            }
                        }
                    },
                    "401": {"description": "Unauthorized – missing or invalid API key"}
                },
                "security": [{"ApiKeyAuth": []}]
            }
        },
        "/video/background-music": {
            "get": {
                "summary": "Get available background music tracks",
                "description": "Returns a list of background music tracks available for use in AI-generated videos.",
                "operationId": "getBackgroundMusic",
                "responses": {
                    "200": {
                        "description": "List of available background music tracks",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {"type": "string", "example": "Another-love"}
                                }
                            }
                        }
                    },
                    "401": {"description": "Unauthorized – missing or invalid API key"}
                },
                "security": [{"ApiKeyAuth": []}]
            }
        },
        "/video/url": {
            "get": {
                "summary": "Get video URL and generation status",
                "description": "Returns the final video URL and its current status based on the video ID.",
                "operationId": "getVideoUrl",
                "parameters": [
                    {
                        "name": "id",
                        "in": "query",
                        "required": True,
                        "description": "The unique ID of the generated video.",
                        "schema": {"type": "string"}
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Video URL and generation status",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "url": {"type": "string", "example": "https://cdn.example.com/video/abc123.mp4"},
                                        "status": {"type": "string", "enum": ["pending", "processing", "complete", "failed"], "example": "complete"}
                                    }
                                }
                            }
                        }
                    },
                    "400": {"description": "Missing or invalid video ID"},
                    "401": {"description": "Unauthorized – missing or invalid API key"}
                },
                "security": [{"ApiKeyAuth": []}]
            }
        }
    },
    "components": {
        "securitySchemes": {
            "ApiKeyAuth": {
                "type": "apiKey",
                "in": "header",
                "name": "X-API-KEY"
            }
        },
        "schemas": {
            "VideoGenerationRequest": {
                "type": "object",
                "properties": {
                    "topic": {"type": "string", "default": "Random AI Story"},
                    "voice": {"type": "string", "default": "Charlie voice"},
                    "theme": {"type": "string", "default": "Hormozi_1"},
                    "style": {"type": "string", "default": "None"},
                    "language": {"type": "string", "default": "English"},
                    "duration": {"type": "string", "enum": ["30-60", "60-90", "90-120", "5 min", "10 min"], "default": "30-60"},
                    "aspect_ratio": {"type": "string", "enum": ["9:16", "1:1", "16:9"], "default": "9:16"},
                    "prompt": {"type": "string"},
                    "custom_instruction": {"type": "string"},
                    "use_ai": {"type": "string", "enum": ["1", "0"], "default": "1"},
                    "include_voiceover": {"type": "string", "enum": ["1", "0"], "default": "1"},
                    "size": {"type": "string"},
                    "ypos": {"type": "string"},
                    "url": {"type": "string", "format": "uri"},
                    "bg_music": {"type": "string"},
                    "bg_music_volume": {"type": "string"}
                },
                "required": []
            }
        }
    }
}

import yaml
yaml_path = Path("/mnt/data/openapi-ai-video-spec.yaml")
json_path = Path("/mnt/data/openapi-ai-video-spec.json")

yaml_path.write_text(yaml.dump(openapi_spec, sort_keys=False))
json_path.write_text(Path(yaml_path).read_text())

yaml_path.name, json_path.name
pyth
