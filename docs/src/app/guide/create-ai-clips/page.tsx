import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function CreateAIClipsPage() {
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
            <BreadcrumbPage>Create AI Clips</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Create AI Clips</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Extract engaging short clips from long-form videos using AI to identify the most compelling moments automatically.
        </p>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          Potter Labs AI Clips API analyzes your long-form videos and automatically extracts the most engaging segments,
          perfect for creating social media content, highlights, and promotional clips.
        </p>

        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>POST https://api.potterlabs.xyz/v1/clips</code>
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
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>video_url</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">URL of the source video to extract clips from</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>clip_duration</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">integer</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Target clip length in seconds (15, 30, 60, 90)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>num_clips</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">integer</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Number of clips to generate (1-10, default: 3)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>platform</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Target platform: tiktok, instagram, youtube, twitter</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>content_type</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Content focus: highlights, funny, educational, emotional</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>add_captions</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">boolean</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Auto-add captions to clips (default: true)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example Request</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`curl -X POST https://api.potterlabs.xyz/v1/clips \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "video_url": "https://example.com/podcast-episode.mp4",
    "clip_duration": 30,
    "num_clips": 5,
    "platform": "tiktok",
    "content_type": "highlights",
    "add_captions": true
  }'`}</code>
        </pre>

        <h2>Response</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "id": "clip_123456789",
  "status": "processing",
  "video_url": "https://example.com/podcast-episode.mp4",
  "clips": [],
  "estimated_completion": "2024-01-01T00:15:00Z",
  "created_at": "2024-01-01T00:00:00Z"
}`}</code>
        </pre>

        <h2>Platform Optimizations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">TikTok</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Vertical 9:16, hook within 3 seconds, trending audio</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Instagram Reels</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Vertical format, strong visual elements, 15-30s optimal</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">YouTube Shorts</h3>
            <p className="text-sm text-slate-600 dark:border-slate-600 p-4 rounded-lg">Vertical, up to 60s, clear thumbnails</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Twitter</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Square or horizontal, subtitle-friendly, quick pace</p>
          </div>
        </div>

        <h2>AI Selection Criteria</h2>
        <p>Our AI analyzes multiple factors to identify the best clips:</p>
        <ul>
          <li>**Engagement Peaks**: Moments with highest emotional intensity</li>
          <li>**Audio Quality**: Clear speech without background noise</li>
          <li>**Visual Interest**: Dynamic scenes with good composition</li>
          <li>**Content Density**: Information-rich segments</li>
          <li>**Completion Rates**: Segments likely to be watched fully</li>
        </ul>

        <h2>Completed Response</h2>
        <p>Once processing is complete, you'll receive clips with detailed metadata:</p>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "id": "clip_123456789",
  "status": "completed",
  "clips": [
    {
      "clip_id": "clip_001",
      "url": "https://cdn.potterlabs.xyz/clips/clip_001.mp4",
      "start_time": 120.5,
      "end_time": 150.5,
      "duration": 30,
      "engagement_score": 0.92,
      "title": "Key Insight About AI Future",
      "thumbnail": "https://cdn.potterlabs.xyz/thumbnails/clip_001.jpg"
    }
  ]
}`}</code>
        </pre>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/create-ai-podcast" className="text-green-600 hover:text-green-700 font-medium">
            ← Create an AI Podcast
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/ai-character" className="text-green-600 hover:text-green-700 font-medium">
            AI Character →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
