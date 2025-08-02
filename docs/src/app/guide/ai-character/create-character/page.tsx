import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function CreateCharacterPage() {
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
            <BreadcrumbLink href="/guide/ai-character">AI Character</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Character</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Create Character</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Create a new AI character with custom personality, voice characteristics, and behavioral traits.
        </p>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          This endpoint creates a new AI character with your specified configuration. Characters can be customized
          with unique personalities, voice settings, knowledge domains, and interaction styles.
        </p>

        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>POST https://api.potterlabs.xyz/v1/characters</code>
        </pre>

        <h2>Request Parameters</h2>
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
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>name</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Character name (3-50 characters)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>description</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Brief description of the character's purpose</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>personality</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">object</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Personality configuration object</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>voice</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">object</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Voice synthesis settings</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>knowledge_base</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">object</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Specialized knowledge and training data</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Personality Object</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-slate-300 dark:border-slate-600">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700">
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Field</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Type</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>traits</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">helpful, friendly, professional, creative, analytical</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>tone</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">casual, professional, friendly, authoritative</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>formality</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">low, moderate, high</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>empathy_level</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">integer</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1-10 (1=low empathy, 10=high empathy)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example Request</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`curl -X POST https://api.potterlabs.xyz/v1/characters \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "name": "Emma - Sales Assistant",
    "description": "Helpful sales assistant for e-commerce customers",
    "personality": {
      "traits": ["helpful", "enthusiastic", "knowledgeable"],
      "tone": "friendly",
      "formality": "moderate",
      "empathy_level": 8
    },
    "voice": {
      "gender": "female",
      "accent": "american",
      "speed": "normal",
      "pitch": "medium",
      "warmth": "high"
    },
    "knowledge_base": {
      "domains": ["retail", "customer_service", "product_knowledge"],
      "training_data_urls": [
        "https://example.com/product-catalog.json",
        "https://example.com/faq.json"
      ],
      "custom_instructions": "Always ask clarifying questions to better understand customer needs."
    },
    "capabilities": [
      "text_chat",
      "voice_synthesis",
      "emotion_detection",
      "product_recommendations"
    ]
  }'`}</code>
        </pre>

        <h2>Response</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "id": "char_abc123def456",
  "name": "Emma - Sales Assistant",
  "description": "Helpful sales assistant for e-commerce customers",
  "status": "training",
  "personality": {
    "traits": ["helpful", "enthusiastic", "knowledgeable"],
    "tone": "friendly",
    "formality": "moderate",
    "empathy_level": 8
  },
  "voice": {
    "gender": "female",
    "accent": "american",
    "speed": "normal",
    "pitch": "medium",
    "warmth": "high"
  },
  "capabilities": [
    "text_chat",
    "voice_synthesis",
    "emotion_detection",
    "product_recommendations"
  ],
  "training_progress": {
    "status": "in_progress",
    "completion_percentage": 0,
    "estimated_completion": "2024-01-01T01:30:00Z"
  },
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}`}</code>
        </pre>

        <h2>Voice Configuration Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Gender</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">male, female, neutral</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Accent</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">american, british, australian, canadian</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Speed</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">slow, normal, fast</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Pitch</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">low, medium, high</p>
          </div>
        </div>

        <h2>Training Process</h2>
        <p>After creation, characters undergo a training process:</p>
        <ol>
          <li>**Knowledge Integration** - Processing provided training data</li>
          <li>**Personality Calibration** - Fine-tuning response patterns</li>
          <li>**Voice Training** - Optimizing speech synthesis</li>
          <li>**Quality Assurance** - Testing conversation quality</li>
        </ol>
        <p>Training typically takes 15-45 minutes depending on the complexity and amount of training data.</p>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/ai-character/get-list-characters" className="text-green-600 hover:text-green-700 font-medium">
            ← Get List of Characters
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/ai-character/chat-with-character" className="text-green-600 hover:text-green-700 font-medium">
            Chat with Character →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
