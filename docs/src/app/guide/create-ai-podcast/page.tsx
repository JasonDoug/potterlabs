import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function CreateAIPodcastPage() {
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
            <BreadcrumbPage>Create an AI Podcast</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Create an AI Podcast</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Generate professional AI-powered podcasts with natural-sounding voices and engaging content using Potter Labs AI.
        </p>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          Potter Labs AI Podcast API creates high-quality podcast episodes with AI-generated content and realistic voice synthesis.
          Perfect for content creators, marketers, and businesses looking to scale their audio content production.
        </p>

        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>POST https://api.potterlabs.xyz/v1/podcast</code>
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
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Main topic or theme for the podcast episode</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>duration</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">integer</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Target duration in minutes (default: 10, max: 60)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>voice_style</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Voice style: casual, professional, energetic, calm</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>speakers</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">integer</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Number of AI speakers (1-3, default: 1)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>background_music</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">boolean</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Include background music (default: false)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example Request</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`curl -X POST https://api.potterlabs.xyz/v1/podcast \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "topic": "The Future of Artificial Intelligence",
    "duration": 15,
    "voice_style": "professional",
    "speakers": 2,
    "background_music": true
  }'`}</code>
        </pre>

        <h2>Response</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "id": "pod_123456789",
  "status": "processing",
  "topic": "The Future of Artificial Intelligence",
  "duration": 15,
  "audio_url": null,
  "transcript_url": null,
  "created_at": "2024-01-01T00:00:00Z",
  "estimated_completion": "2024-01-01T00:10:00Z"
}`}</code>
        </pre>

        <h2>Voice Styles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Professional</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Clear, authoritative tone suitable for business content</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Casual</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Relaxed, conversational style for lifestyle content</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Energetic</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Upbeat, dynamic delivery for motivational content</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Calm</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Soothing, meditative tone for wellness content</p>
          </div>
        </div>

        <h2>Use Cases</h2>
        <ul>
          <li>**Content Marketing**: Generate regular podcast episodes for brand awareness</li>
          <li>**Education**: Create educational audio content and tutorials</li>
          <li>**News Updates**: Automated daily news briefings</li>
          <li>**Product Reviews**: AI-generated product comparison podcasts</li>
          <li>**Storytelling**: Narrative content and audio books</li>
        </ul>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/create-ai-captions" className="text-green-600 hover:text-green-700 font-medium">
            ← Create AI Captions
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/create-ai-clips" className="text-green-600 hover:text-green-700 font-medium">
            Create AI Clips →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
