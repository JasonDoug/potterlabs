# Potter Labs – AI Story API (ai-story group)

This project is a **modular, monolithic API** that powers AI-generated storytelling videos. It replaces a previously microservice-based architecture with a unified, endpoint-based system built on Node.js + Express (with optional Python FastAPI services).

---

## 📦 Features

- Generate narrated AI videos from text, voice, or prompt
- Supports dual video modes: `slideshow` (image + audio) and `ai_generated` (Runway/Pika/etc)
- RESTful API designed via OpenAPI 3.0 spec (see `/shared/openapi-ai-video-spec.yaml`)
- CLI wizard to generate video configuration files
- Plug-and-play config routing (style → provider → rendering engine)
- Docker support for local development and Swagger UI

---

## 🚀 Quickstart

### 1. Install dependencies (Node.js 18+)

```bash
cd api
npm install
```

### 2. Start the API server

```bash
npm run dev    # or node server.js
```

### 3. Try an endpoint

```bash
curl -X POST http://localhost:3000/video/generate \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: testkey" \
  -d '{ "topic": "Custom", "prompt": "A robot teaches history", "style": "cinematic" }'
```

---

## 🧠 Project Structure

```
PotterLabs/
├── api/                     # Node.js Express API
│   ├── routes/              # One file per route group
│   ├── services/            # LLM, TTS, video orchestration logic
│   ├── config/              # Loads and routes video settings
│   ├── utils/               # Helpers (auth, logging, validators)
│   ├── app.js               # Express config and router binding
│   └── server.js            # Entry point
├── ai-logic/                # Python FastAPI worker for AI tasks
│   └── main.py
├── cli/                     # CLI for creating config files
├── shared/
│   ├── video_pipeline_config.json
│   ├── openapi-ai-video-spec.yaml
│   └── openapi-ai-video-spec.json
├── docker-compose.yml       # Starts API + Swagger UI
└── README.md
```

---

## 📌 Available Endpoints

| Method | Path                       | Purpose |
|--------|----------------------------|---------|
| POST   | `/video/generate`          | Create a video from inputs |
| GET    | `/video/topics`            | Get content topic presets |
| GET    | `/video/themes`            | Get caption theme presets |
| GET    | `/video/voices`            | Get available TTS voices |
| GET    | `/video/styles`            | Get supported image/video styles |
| GET    | `/video/background-music`  | Get list of background music tracks |
| GET    | `/video/url?id=`           | Poll video status and output URL |

---

## 🔄 Generation Modes

| Mode         | Description |
|--------------|-------------|
| `ai_generated` | Fully AI-generated visuals (Runway, Pika, etc.) |
| `slideshow`    | Still images + voice + captions stitched via ffmpeg |

These are routed based on the `style` selected by the user, as mapped in `shared/video_pipeline_config.json`.

---

## 🔐 API Authentication

All endpoints require:

```
X-API-KEY: your-api-key
```

Currently mocked for local testing. Update `api/utils/auth.js` to enforce real keys.

---

## 🐳 Docker Setup

Start the full stack:

```bash
docker-compose up
```

Swagger UI available at: [http://localhost:8080](http://localhost:8080)

---

## 🧪 CLI Wizard

Create video config interactively:

```bash
cd cli
node create-ai-video.mjs
```

Generates a `video-config.json` file in your working directory.

---

## 🤝 Contributing

To add a new service:

- Add a handler in `api/services/`
- Update `routes/video.js` to use it
- If needed, update `video_pipeline_config.json` with new mapping

---

## 🧠 About

This system powers the **AI Story group** inside **Potter Labs**, built for generating short, narrated AI videos across different styles and modalities. It abstracts and routes to upstream services (OpenAI, ElevenLabs, RunwayML, etc.) and supports both fast slideshow rendering and cinematic video generation.

Created by Jason Potter. Maintained by the Potter Labs team.
