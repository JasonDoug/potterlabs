import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function GetListCharactersPage() {
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
            <BreadcrumbPage>Get List of Characters</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Get List of Characters</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Retrieve all AI characters in your account with their configurations and status information.
        </p>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          This endpoint returns a paginated list of all AI characters associated with your account,
          including their personality settings, capabilities, and current status.
        </p>

        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>GET https://api.potterlabs.xyz/v1/characters</code>
        </pre>

        <h2>Query Parameters</h2>
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
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>page</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">integer</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Page number for pagination (default: 1)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>limit</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">integer</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Number of characters per page (max: 100, default: 20)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>status</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Filter by status: active, training, inactive</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>search</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Search characters by name or description</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example Request</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`curl -X GET "https://api.potterlabs.xyz/v1/characters?page=1&limit=10&status=active" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</code>
        </pre>

        <h2>Response</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "characters": [
    {
      "id": "char_123456789",
      "name": "Sarah - Customer Support",
      "description": "Friendly customer support agent with retail expertise",
      "status": "active",
      "personality": {
        "traits": ["helpful", "patient", "knowledgeable"],
        "tone": "professional-friendly",
        "formality": "moderate"
      },
      "voice": {
        "gender": "female",
        "accent": "american",
        "speed": "normal",
        "pitch": "medium"
      },
      "capabilities": [
        "text_chat",
        "voice_synthesis",
        "emotion_detection"
      ],
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-15T10:30:00Z",
      "usage_stats": {
        "total_conversations": 1250,
        "avg_conversation_length": 8.5,
        "satisfaction_rating": 4.7
      }
    },
    {
      "id": "char_987654321",
      "name": "Alex - Tech Tutor",
      "description": "Programming instructor specializing in web development",
      "status": "active",
      "personality": {
        "traits": ["encouraging", "detail-oriented", "adaptive"],
        "tone": "casual-educational",
        "formality": "low"
      },
      "voice": {
        "gender": "male",
        "accent": "british",
        "speed": "slightly_slow",
        "pitch": "low"
      },
      "capabilities": [
        "text_chat",
        "code_review",
        "voice_synthesis"
      ],
      "created_at": "2024-01-05T14:20:00Z",
      "updated_at": "2024-01-20T09:15:00Z",
      "usage_stats": {
        "total_conversations": 850,
        "avg_conversation_length": 12.3,
        "satisfaction_rating": 4.9
      }
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_characters": 87,
    "per_page": 20,
    "has_next": true,
    "has_previous": false
  }
}`}</code>
        </pre>

        <h2>Character Status Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-green-600">Active</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Character is ready for conversations</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-600">Training</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Character is being fine-tuned with new data</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-slate-600">Inactive</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Character is disabled or archived</p>
          </div>
        </div>

        <h2>Error Responses</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "error": {
    "code": "invalid_parameter",
    "message": "Invalid page number. Must be a positive integer.",
    "details": {
      "parameter": "page",
      "provided_value": "-1"
    }
  }
}`}</code>
        </pre>

        <h2>Rate Limits</h2>
        <p>This endpoint has the following rate limits:</p>
        <ul>
          <li>**100 requests per minute** for standard plans</li>
          <li>**500 requests per minute** for premium plans</li>
          <li>Rate limit headers are included in each response</li>
        </ul>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/ai-character" className="text-green-600 hover:text-green-700 font-medium">
            ← AI Character
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/ai-character/create-character" className="text-green-600 hover:text-green-700 font-medium">
            Create Character →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
