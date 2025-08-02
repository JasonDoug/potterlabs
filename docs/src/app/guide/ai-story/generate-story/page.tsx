import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function GenerateStoryPage() {
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
            <BreadcrumbPage>Generate Story</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Generate Story</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Create original written stories with customizable genres, themes, characters, and narrative styles.
        </p>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          The Story Generation API creates complete written narratives from simple prompts.
          Our AI understands story structure, character development, and genre conventions to
          produce engaging, coherent stories suitable for various purposes.
        </p>

        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>POST https://api.potterlabs.xyz/v1/story/generate</code>
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
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>prompt</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Story concept, theme, or starting premise</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>genre</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Story genre (fantasy, sci-fi, romance, mystery, etc.)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>length</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">short (500-1500 words), medium (1500-5000), long (5000+)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>tone</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">light, dark, humorous, serious, mysterious, uplifting</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>perspective</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">first_person, third_person_limited, third_person_omniscient</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>characters</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Array of character descriptions or names</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>setting</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">object</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Time period, location, and world-building details</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example Request</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`curl -X POST https://api.potterlabs.xyz/v1/story/generate \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "prompt": "A librarian discovers that books in their library are portals to other worlds",
    "genre": "fantasy",
    "length": "medium",
    "tone": "mysterious",
    "perspective": "third_person_limited",
    "characters": [
      "Maya - a curious librarian in her 30s",
      "The Guardian - mysterious keeper of the portals"
    ],
    "setting": {
      "time_period": "modern",
      "location": "old university library",
      "world_type": "contemporary fantasy"
    }
  }'`}</code>
        </pre>

        <h2>Response</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "id": "story_456def789abc",
  "status": "processing",
  "story_outline": {
    "title": "The Portal Keeper",
    "estimated_word_count": 3500,
    "structure": {
      "opening": "Maya notices strange phenomena in the library",
      "inciting_incident": "Discovery of the first portal",
      "rising_action": "Exploration and meeting the Guardian",
      "climax": "Choice between worlds",
      "resolution": "Maya's decision and its consequences"
    },
    "themes": ["discovery", "choice", "responsibility", "knowledge"]
  },
  "characters": [
    {
      "name": "Maya",
      "role": "protagonist",
      "description": "Curious librarian who becomes the portal keeper",
      "arc": "from skeptic to guardian"
    },
    {
      "name": "The Guardian",
      "role": "mentor",
      "description": "Ancient keeper of inter-dimensional passages",
      "arc": "passing on responsibility"
    }
  ],
  "estimated_completion": "2024-01-01T00:08:00Z",
  "created_at": "2024-01-01T00:00:00Z"
}`}</code>
        </pre>

        <h2>Story Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
          {[
            "Fantasy", "Science Fiction", "Romance", "Mystery",
            "Horror", "Thriller", "Adventure", "Comedy",
            "Drama", "Historical", "Crime", "Supernatural",
            "Western", "Dystopian", "Urban Fantasy", "Literary"
          ].map((genre) => (
            <div key={genre} className="border border-slate-300 dark:border-slate-600 p-2 rounded text-center text-sm">
              {genre}
            </div>
          ))}
        </div>

        <h2>Completed Response</h2>
        <p>Once processing is complete, you'll receive the full story:</p>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "id": "story_456def789abc",
  "status": "completed",
  "story": {
    "title": "The Portal Keeper",
    "content": "Maya had always thought the old university library...",
    "word_count": 3547,
    "reading_time": "14 minutes",
    "format": "markdown"
  },
  "story_analysis": {
    "structure_score": 0.94,
    "character_development": 0.89,
    "narrative_flow": 0.91,
    "genre_adherence": 0.96,
    "themes_explored": ["discovery", "responsibility", "choice", "knowledge"]
  },
  "export_formats": {
    "markdown": "https://cdn.potterlabs.xyz/stories/story_456def789abc.md",
    "pdf": "https://cdn.potterlabs.xyz/stories/story_456def789abc.pdf",
    "epub": "https://cdn.potterlabs.xyz/stories/story_456def789abc.epub",
    "plain_text": "https://cdn.potterlabs.xyz/stories/story_456def789abc.txt"
  },
  "metadata": {
    "reading_level": "adult",
    "content_warnings": [],
    "generated_at": "2024-01-01T00:08:00Z"
  }
}`}</code>
        </pre>

        <h2>Setting Configuration</h2>
        <p>The setting object allows detailed world-building:</p>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "setting": {
    "time_period": "1920s",
    "location": "New York City",
    "world_type": "historical",
    "atmosphere": "noir",
    "cultural_context": "prohibition era",
    "technological_level": "early industrial",
    "social_dynamics": "class tensions",
    "environmental_factors": "urban decay"
  }
}`}</code>
        </pre>

        <h2>Story Quality Features</h2>
        <ul>
          <li>**Narrative Structure**: Follows proven storytelling frameworks</li>
          <li>**Character Development**: Characters with clear motivations and growth</li>
          <li>**Genre Conventions**: Adheres to genre expectations while adding originality</li>
          <li>**Pacing Control**: Balanced rhythm between action and reflection</li>
          <li>**Thematic Depth**: Explores meaningful themes and messages</li>
          <li>**Language Style**: Appropriate vocabulary and tone for target audience</li>
        </ul>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/ai-story/create-an-ai-video" className="text-green-600 hover:text-green-700 font-medium">
            ← Create an AI Video
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/ai-story/create-story-outline" className="text-green-600 hover:text-green-700 font-medium">
            Create Story Outline →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
