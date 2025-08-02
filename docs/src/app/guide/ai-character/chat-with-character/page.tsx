import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function ChatWithCharacterPage() {
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
            <BreadcrumbPage>Chat with Character</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Chat with Character</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Engage in natural conversations with your AI characters through text or voice interactions.
        </p>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          This endpoint enables real-time conversations with your AI characters. Characters maintain
          conversation context, remember previous interactions, and respond according to their configured personality traits.
        </p>

        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>POST https://api.potterlabs.xyz/v1/characters/{"{character_id}"}/chat</code>
        </pre>

        <h2>Path Parameters</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-slate-300 dark:border-slate-600">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700">
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Parameter</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Type</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>character_id</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Unique identifier of the character to chat with</td>
              </tr>
            </tbody>
          </table>
        </div>

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
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>message</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">User's message to the character</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>session_id</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Session ID for conversation continuity</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>response_format</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">text, audio, or both (default: text)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>context</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">object</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Additional context for the conversation</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>max_length</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">integer</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Maximum response length in characters (default: 500)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example Request</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`curl -X POST https://api.potterlabs.xyz/v1/characters/char_123456789/chat \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "message": "Hi there! I'm looking for a gift for my tech-savvy friend. Any recommendations?",
    "session_id": "sess_abc123",
    "response_format": "both",
    "context": {
      "user_preferences": {
        "budget": "50-100",
        "interests": ["technology", "gadgets"]
      },
      "previous_purchases": ["smartphone_case", "wireless_earbuds"]
    },
    "max_length": 300
  }'`}</code>
        </pre>

        <h2>Response</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "message_id": "msg_xyz789abc",
  "character_id": "char_123456789",
  "session_id": "sess_abc123",
  "response": {
    "text": "Hi! I'd love to help you find the perfect gift! Since your friend is tech-savvy and you mentioned a $50-100 budget, I have some great ideas. How about a smart home device like a voice assistant or smart lights? Or perhaps a portable power bank with wireless charging? What kind of tech does your friend already have?",
    "audio_url": "https://cdn.potterlabs.xyz/audio/msg_xyz789abc.mp3",
    "emotion": "enthusiastic",
    "confidence": 0.95
  },
  "conversation_context": {
    "turn_count": 1,
    "topics_discussed": ["gift_recommendations", "tech_products"],
    "user_sentiment": "positive",
    "character_mood": "helpful"
  },
  "suggestions": [
    {
      "type": "product_recommendation",
      "items": ["smart_speaker", "wireless_charger", "bluetooth_tracker"]
    }
  ],
  "metadata": {
    "processing_time_ms": 850,
    "tokens_used": 127,
    "response_generated_at": "2024-01-01T00:00:15Z"
  }
}`}</code>
        </pre>

        <h2>Session Management</h2>
        <p>
          Sessions allow characters to maintain conversation context across multiple interactions:
        </p>
        <ul>
          <li>**New Session**: Omit `session_id` or provide a new unique ID</li>
          <li>**Continue Session**: Use the same `session_id` for related conversations</li>
          <li>**Session Expiry**: Sessions automatically expire after 24 hours of inactivity</li>
          <li>**Memory Limit**: Characters remember the last 50 messages per session</li>
        </ul>

        <h2>Response Formats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Text Only</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Fast text responses for chat interfaces</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Audio Only</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Voice responses for audio applications</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Both</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Text and audio for rich interactive experiences</p>
          </div>
        </div>

        <h2>Streaming Responses</h2>
        <p>For real-time chat experiences, you can stream responses by adding the `stream=true` parameter:</p>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`curl -X POST https://api.potterlabs.xyz/v1/characters/char_123456789/chat?stream=true \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{"message": "Hello!", "session_id": "sess_abc123"}'`}</code>
        </pre>

        <h2>Error Handling</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "error": {
    "code": "character_not_found",
    "message": "Character with ID 'char_invalid' does not exist or is not accessible.",
    "details": {
      "character_id": "char_invalid",
      "suggestions": ["Check character ID", "Verify character is active"]
    }
  }
}`}</code>
        </pre>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/ai-character/create-character" className="text-green-600 hover:text-green-700 font-medium">
            ← Create Character
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/ai-story" className="text-green-600 hover:text-green-700 font-medium">
            AI Story →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
