import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function SearchRedditPage() {
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
            <BreadcrumbLink href="/guide/trendit">Trendit</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Search Reddit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Search Reddit</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Search Reddit posts and comments across multiple subreddits with advanced filtering and sorting options.
        </p>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          The Search Reddit endpoint provides powerful search capabilities across Reddit's vast content ecosystem.
          Search for posts, comments, or both with sophisticated filtering by keywords, subreddits, date ranges,
          user activity, and more.
        </p>

        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>POST https://api.potterlabs.xyz/v1/trendit/search</code>
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
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>query</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Search keywords or phrases</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>subreddits</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">List of subreddits to search (default: all)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>content_type</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">posts, comments, or both (default: both)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>sort_by</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">relevance, hot, top, new, controversial, rising</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>time_filter</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">hour, day, week, month, year, all</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>date_range</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">object</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Custom date range with start and end dates</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>limit</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">integer</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Number of results to return (max: 1000, default: 100)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>include_metadata</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">boolean</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Include detailed metadata and statistics (default: true)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example Request</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`curl -X POST https://api.potterlabs.xyz/v1/trendit/search \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "query": "new AI framework",
    "subreddits": ["MachineLearning", "artificial", "programming"],
    "content_type": "posts",
    "sort_by": "hot",
    "time_filter": "week",
    "limit": 50,
    "include_metadata": true
  }'`}</code>
        </pre>

        <h2>Response</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "search_id": "search_abc123def456",
  "query": "new AI framework",
  "results": [
    {
      "id": "t3_xyz789",
      "type": "post",
      "subreddit": "MachineLearning",
      "title": "New Open Source AI Framework Released",
      "content": "Excited to share our new framework for...",
      "author": "ai_researcher",
      "score": 847,
      "upvote_ratio": 0.94,
      "num_comments": 156,
      "created_utc": "2024-01-01T10:30:00Z",
      "url": "https://reddit.com/r/MachineLearning/comments/xyz789/",
      "flair": "Research",
      "gilded": 2,
      "stickied": false,
      "over_18": false,
      "spoiler": false,
      "locked": false,
      "archived": false,
      "metadata": {
        "keywords_found": ["AI", "framework"],
        "relevance_score": 0.95,
        "engagement_rate": 0.18,
        "comment_sentiment": "positive"
      }
    }
  ],
  "statistics": {
    "total_results": 47,
    "posts_found": 28,
    "comments_found": 19,
    "subreddits_searched": 3,
    "avg_score": 234,
    "total_comments": 1891,
    "search_time_ms": 1250
  },
  "pagination": {
    "page": 1,
    "per_page": 50,
    "total_pages": 1,
    "has_next": false
  }
}`}</code>
        </pre>

        <h2>Advanced Search Options</h2>

        <h3>Date Range Search</h3>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "query": "python tutorial",
  "subreddits": ["learnpython", "Python"],
  "date_range": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-07T23:59:59Z"
  },
  "sort_by": "top"
}`}</code>
        </pre>

        <h3>User-Specific Search</h3>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "query": "*",
  "author": "specific_username",
  "subreddits": ["webdev"],
  "content_type": "both",
  "limit": 100
}`}</code>
        </pre>

        <h2>Search Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Content Filters</h3>
            <ul className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              <li>• Minimum/maximum score</li>
              <li>• Minimum comment count</li>
              <li>• Gilded content only</li>
              <li>• OC (Original Content) only</li>
            </ul>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Post Attributes</h3>
            <ul className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              <li>• NSFW/SFW filtering</li>
              <li>• Spoiler content</li>
              <li>• Locked/Unlocked posts</li>
              <li>• Stickied posts</li>
            </ul>
          </div>
        </div>

        <h2>Sort Options</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-6">
          {[
            { name: "Relevance", desc: "Most relevant to search query" },
            { name: "Hot", desc: "Currently trending and active" },
            { name: "Top", desc: "Highest scored content" },
            { name: "New", desc: "Most recently posted" },
            { name: "Controversial", desc: "High engagement, mixed votes" },
            { name: "Rising", desc: "Rapidly gaining popularity" }
          ].map((sort) => (
            <div key={sort.name} className="border border-slate-300 dark:border-slate-600 p-3 rounded-lg">
              <h4 className="font-semibold text-sm">{sort.name}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{sort.desc}</p>
            </div>
          ))}
        </div>

        <h2>Rate Limits</h2>
        <p>Search requests are subject to the following limits:</p>
        <ul>
          <li>**Standard Plan**: 100 searches per hour, 1000 results per search</li>
          <li>**Premium Plan**: 500 searches per hour, 5000 results per search</li>
          <li>**Enterprise Plan**: Custom limits based on your needs</li>
        </ul>

        <h2>Error Responses</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "error": {
    "code": "invalid_subreddit",
    "message": "One or more subreddits do not exist or are private",
    "details": {
      "invalid_subreddits": ["nonexistent_sub"],
      "valid_subreddits": ["MachineLearning", "programming"]
    }
  }
}`}</code>
        </pre>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/trendit" className="text-green-600 hover:text-green-700 font-medium">
            ← Trendit
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/trendit/analyze-sentiment" className="text-green-600 hover:text-green-700 font-medium">
            Analyze Sentiment →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
