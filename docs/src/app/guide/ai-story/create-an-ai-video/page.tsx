import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function CreateAIVideoPage() {
  return (
    <DocsLayout>
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <HomeIcon className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Guide</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/guide/ai-story">AI Story</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create an AI Video</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Create an AI Video</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Generate complete video stories with AI-created scripts, visual scenes, and professional narration.
        </p>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          The AI Video creation endpoint generates comprehensive video content including storylines,
          scene descriptions, dialogue, visual direction, and audio narration. Perfect for creating
          marketing videos, educational content, social media stories, and entertainment.
        </p>

        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>POST https://api.potterlabs.xyz/v1/story/video</code>
        </pre>

        <h2>Parameters</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-slate-300 dark:border-slate-600">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700">
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Parameter</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Type</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Required</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>topic</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Main topic or theme for the video story</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>duration</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">integer</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Target video length in seconds (30-600)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>style</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Video style: documentary, narrative, explainer, commercial</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>tone</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Tone: professional, casual, dramatic, humorous, inspiring</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>target_audience</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Intended audience: general, children, teens, adults, professionals</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>include_narration</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">boolean</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Generate audio narration (default: true)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>visual_style</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Visual approach: realistic, animated, minimalist, cinematic</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example Request</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`curl -X POST https://api.potterlabs.xyz/v1/story/video \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "topic": "The Journey of Sustainable Fashion",
    "duration": 180,
    "style": "documentary",
    "tone": "inspiring",
    "target_audience": "adults",
    "include_narration": true,
    "visual_style": "cinematic"
  }'`}</code>
        </pre>

        <h2>Response</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "id": "video_789abc123def",
  "status": "processing",
  "topic": "The Journey of Sustainable Fashion",
  "video_outline": {
    "title": "From Thread to Change: The Sustainable Fashion Revolution",
    "total_duration": 180,
    "scene_count": 8,
    "structure": {
      "opening": "Hook viewers with fast fashion statistics",
      "body": "Journey from problem to solutions",
      "closing": "Call to action for sustainable choices"
    }
  },
  "scenes": [
    {
      "scene_number": 1,
      "title": "The Hidden Cost",
      "duration": 25,
      "script": "Every year, the fashion industry produces 92 million tons of waste...",
      "visual_description": "Time-lapse of clothing production, statistics overlay",
      "audio_notes": "Dramatic music building tension",
      "camera_directions": "Wide shots of factories, close-ups of waste"
    }
  ],
  "narration": {
    "voice_style": "authoritative-warm",
    "pace": "moderate",
    "total_word_count": 450,
    "estimated_audio_length": 165
  },
  "production_assets": {
    "script_url": null,
    "storyboard_url": null,
    "narration_url": null,
    "music_suggestions": ["cinematic-inspiration", "documentary-underscore"]
  },
  "estimated_completion": "2024-01-01T00:12:00Z",
  "created_at": "2024-01-01T00:00:00Z"
}`}</code>
        </pre>

        <h2>Video Styles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Documentary</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Factual, informative style with expert interviews and research</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Narrative</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Story-driven content with characters and plot development</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Explainer</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Educational content breaking down complex topics</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Commercial</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Marketing-focused content highlighting products or services</p>
          </div>
        </div>

        <h2>Completed Response</h2>
        <p>Once processing is complete, you'll receive the full video package:</p>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "id": "video_789abc123def",
  "status": "completed",
  "video_package": {
    "script": {
      "url": "https://cdn.potterlabs.xyz/scripts/video_789abc123def.pdf",
      "word_count": 450,
      "scene_count": 8
    },
    "storyboard": {
      "url": "https://cdn.potterlabs.xyz/storyboards/video_789abc123def.pdf",
      "total_frames": 32
    },
    "narration": {
      "url": "https://cdn.potterlabs.xyz/audio/video_789abc123def.mp3",
      "duration": 165,
      "voice_style": "authoritative-warm"
    },
    "production_notes": {
      "url": "https://cdn.potterlabs.xyz/notes/video_789abc123def.json",
      "includes": ["shot_list", "music_cues", "editing_notes"]
    }
  },
  "metadata": {
    "genre": "documentary",
    "complexity_score": 0.7,
    "production_difficulty": "intermediate"
  }
}`}</code>
        </pre>

        <h2>Production Assets</h2>
        <p>The API generates comprehensive production materials:</p>
        <ul>
          <li>**Script**: Complete screenplay with dialogue and scene directions</li>
          <li>**Storyboard**: Visual sequence planning with shot compositions</li>
          <li>**Narration**: Professional voice-over audio files</li>
          <li>**Production Notes**: Detailed filming and editing instructions</li>
          <li>**Music Suggestions**: Curated soundtrack recommendations</li>
        </ul>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/ai-story" className="text-green-600 hover:text-green-700 font-medium">
            ← AI Story
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/ai-story/generate-story" className="text-green-600 hover:text-green-700 font-medium">
            Generate Story →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
