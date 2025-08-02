import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function CreateDataStorePage() {
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
            <BreadcrumbPage>Create Data Store</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Create Data Store</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Create persistent data stores for ongoing Reddit content collection, analysis, and historical tracking.
        </p>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          Data stores provide persistent storage for Reddit content, enabling long-term analysis, trend tracking,
          and historical comparisons. Create stores to continuously collect data from specific subreddits,
          monitor keywords, or track user activity over time.
        </p>

        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>POST https://api.potterlabs.xyz/v1/trendit/stores</code>
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
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>name</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Unique name for the data store</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>collection_type</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">subreddit, keyword, user, or custom</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>collection_config</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">object</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Configuration based on collection type</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>content_types</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">posts, comments, or both (default: both)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>auto_sentiment</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">boolean</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Automatically run sentiment analysis (default: true)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>retention_days</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">integer</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Data retention period (default: 90, max: 365)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>update_frequency</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">realtime, hourly, daily, weekly (default: hourly)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example Request - Subreddit Monitoring</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`curl -X POST https://api.potterlabs.xyz/v1/trendit/stores \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "name": "tech-trends-2024",
    "collection_type": "subreddit",
    "collection_config": {
      "subreddits": ["technology", "programming", "MachineLearning"],
      "sort_by": "hot",
      "min_score": 10,
      "exclude_nsfw": true
    },
    "content_types": ["posts", "comments"],
    "auto_sentiment": true,
    "retention_days": 180,
    "update_frequency": "hourly"
  }'`}</code>
        </pre>

        <h2>Response</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "store_id": "store_abc123def456",
  "name": "tech-trends-2024",
  "status": "active",
  "collection_type": "subreddit",
  "created_at": "2024-01-01T00:00:00Z",
  "last_updated": "2024-01-01T00:00:00Z",
  "statistics": {
    "total_items": 0,
    "posts_collected": 0,
    "comments_collected": 0,
    "storage_used_mb": 0,
    "avg_sentiment": null
  },
  "collection_status": {
    "last_collection": null,
    "next_collection": "2024-01-01T01:00:00Z",
    "collection_errors": 0,
    "success_rate": 100
  },
  "configuration": {
    "subreddits": ["technology", "programming", "MachineLearning"],
    "content_types": ["posts", "comments"],
    "auto_sentiment": true,
    "retention_days": 180,
    "update_frequency": "hourly"
  },
  "api_endpoints": {
    "query_data": "https://api.potterlabs.xyz/v1/trendit/stores/store_abc123def456/query",
    "analytics": "https://api.potterlabs.xyz/v1/trendit/stores/store_abc123def456/analytics",
    "export": "https://api.potterlabs.xyz/v1/trendit/stores/store_abc123def456/export"
  }
}`}</code>
        </pre>

        <h2>Collection Types</h2>

        <h3>Subreddit Collection</h3>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "collection_type": "subreddit",
  "collection_config": {
    "subreddits": ["webdev", "javascript", "reactjs"],
    "sort_by": "hot",
    "min_score": 5,
    "max_posts_per_hour": 100,
    "exclude_nsfw": true,
    "include_stickied": false
  }
}`}</code>
        </pre>

        <h3>Keyword Monitoring</h3>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "collection_type": "keyword",
  "collection_config": {
    "keywords": ["new iPhone", "iPhone 15", "Apple release"],
    "subreddits": ["apple", "iphone", "technology", "gadgets"],
    "match_type": "any", // "any" or "all"
    "case_sensitive": false,
    "min_score": 1
  }
}`}</code>
        </pre>

        <h3>User Activity Tracking</h3>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "collection_type": "user",
  "collection_config": {
    "usernames": ["specific_user", "another_user"],
    "track_posts": true,
    "track_comments": true,
    "subreddit_filter": ["programming", "webdev"]
  }
}`}</code>
        </pre>

        <h2>Data Store Analytics</h2>
        <p>Once your store is collecting data, access built-in analytics:</p>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>GET https://api.potterlabs.xyz/v1/trendit/stores/{"{store_id}"}/analytics</code>
        </pre>

        <h2>Querying Stored Data</h2>
        <p>Query your collected data with advanced filtering:</p>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`POST https://api.potterlabs.xyz/v1/trendit/stores/{store_id}/query

{
  "date_range": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-07T23:59:59Z"
  },
  "filters": {
    "sentiment": "positive",
    "min_score": 50,
    "subreddit": "technology"
  },
  "aggregations": ["sentiment_by_day", "top_keywords", "user_engagement"]
}`}</code>
        </pre>

        <h2>Store Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Update Store</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Modify collection parameters, add/remove subreddits, adjust frequency</p>
            <code className="text-xs">PATCH /stores/{"{store_id}"}</code>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Pause/Resume</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Temporarily stop or restart data collection without losing existing data</p>
            <code className="text-xs">POST /stores/{"{store_id}"}/pause</code>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Export Data</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Export collected data in CSV, JSON, or other formats</p>
            <code className="text-xs">GET /stores/{"{store_id}"}/export</code>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Delete Store</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Permanently delete the store and all collected data</p>
            <code className="text-xs">DELETE /stores/{"{store_id}"}</code>
          </div>
        </div>

        <h2>Use Cases</h2>
        <ul>
          <li>**Brand Monitoring**: Continuously track mentions of your brand across relevant subreddits</li>
          <li>**Competitive Analysis**: Monitor competitor discussions and sentiment over time</li>
          <li>**Market Research**: Collect data on industry trends and consumer preferences</li>
          <li>**Product Development**: Track user feedback and feature requests for your products</li>
          <li>**Academic Research**: Build datasets for social media and community behavior studies</li>
          <li>**Trend Analysis**: Identify emerging topics and viral content patterns</li>
        </ul>

        <h2>Storage Limits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-green-600">Standard Plan</h3>
            <ul className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              <li>• 3 active stores</li>
              <li>• 1GB storage per store</li>
              <li>• 90 day retention</li>
              <li>• Daily updates</li>
            </ul>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600">Premium Plan</h3>
            <ul className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              <li>• 10 active stores</li>
              <li>• 10GB storage per store</li>
              <li>• 180 day retention</li>
              <li>• Hourly updates</li>
            </ul>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-600">Enterprise Plan</h3>
            <ul className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              <li>• Unlimited stores</li>
              <li>• Custom storage limits</li>
              <li>• 365+ day retention</li>
              <li>• Real-time updates</li>
            </ul>
          </div>
        </div>

        <h2>Error Handling</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "error": {
    "code": "store_limit_exceeded",
    "message": "Maximum number of data stores reached for your plan",
    "details": {
      "current_stores": 3,
      "plan_limit": 3,
      "upgrade_required": "premium"
    }
  }
}`}</code>
        </pre>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/trendit/analyze-sentiment" className="text-green-600 hover:text-green-700 font-medium">
            ← Analyze Sentiment
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/trendit/monitor-subreddit" className="text-green-600 hover:text-green-700 font-medium">
            Monitor Subreddit →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
