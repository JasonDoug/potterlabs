import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function UserAnalysisPage() {
  return (
    <DocsLayout>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/"><HomeIcon className="h-4 w-4" /></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/">Guide</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/guide/trendit">Trendit</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>User Analysis</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">User Analysis</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Perform deep analysis of Reddit user behavior, posting patterns, engagement metrics, and community participation to understand user demographics and activity trends.
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          The User Analysis API provides comprehensive insights into Reddit user behavior, including posting frequency,
          comment patterns, subreddit preferences, karma trends, and engagement metrics. This endpoint is ideal for
          market research, influencer identification, and community behavior analysis.
        </p>

        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>POST https://api.potterlabs.xyz/v1/trendit/users/analyze</code>
        </pre>

        <h2>Request Parameters</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 dark:border-slate-600">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800">
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Parameter</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Type</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Required</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">username</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Reddit username to analyze</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">time_range</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Analysis period: "24h", "7d", "30d", "90d", "1y", "all" (default: "30d")</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">include_deleted</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">boolean</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Include deleted posts in analysis (default: false)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">analyze_sentiment</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">boolean</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Perform sentiment analysis on posts and comments (default: true)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">subreddit_filter</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Limit analysis to specific subreddits</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">include_metrics</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Specific metrics to include: ["engagement", "activity", "sentiment", "demographics"]</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example Request</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>{`curl -X POST "https://api.potterlabs.xyz/v1/trendit/users/analyze" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "example_user",
    "time_range": "30d",
    "analyze_sentiment": true,
    "include_metrics": ["engagement", "activity", "sentiment"],
    "subreddit_filter": ["technology", "programming", "datascience"]
  }'`}</code>
        </pre>

        <h2>Response Format</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>{`{
  "status": "success",
  "data": {
    "user_profile": {
      "username": "example_user",
      "account_age_days": 1247,
      "total_karma": 15420,
      "post_karma": 8732,
      "comment_karma": 6688,
      "verified_email": true,
      "premium": false
    },
    "activity_metrics": {
      "total_posts": 156,
      "total_comments": 892,
      "avg_posts_per_day": 0.42,
      "avg_comments_per_day": 2.38,
      "most_active_hour": 15,
      "most_active_day": "Tuesday",
      "activity_consistency": 0.73
    },
    "engagement_metrics": {
      "avg_post_score": 87.3,
      "avg_comment_score": 12.4,
      "top_post_score": 2834,
      "engagement_rate": 0.68,
      "controversial_ratio": 0.12,
      "gilded_posts": 3,
      "gilded_comments": 7
    },
    "subreddit_distribution": [
      {
        "subreddit": "technology",
        "posts": 34,
        "comments": 187,
        "avg_score": 45.2,
        "participation_percentage": 28.5
      },
      {
        "subreddit": "programming",
        "posts": 28,
        "comments": 156,
        "avg_score": 52.1,
        "participation_percentage": 22.3
      }
    ],
    "sentiment_analysis": {
      "overall_sentiment": "positive",
      "sentiment_score": 0.67,
      "positive_percentage": 64.2,
      "neutral_percentage": 27.8,
      "negative_percentage": 8.0,
      "sentiment_trend": "stable",
      "emotional_keywords": ["excited", "helpful", "interesting", "great"]
    },
    "content_analysis": {
      "avg_post_length": 287,
      "avg_comment_length": 94,
      "readability_score": 8.2,
      "technical_vocabulary": 0.34,
      "question_ratio": 0.18,
      "link_sharing_frequency": 0.23
    },
    "temporal_patterns": {
      "posting_frequency_trend": "increasing",
      "seasonal_activity": {
        "spring": 0.32,
        "summer": 0.19,
        "fall": 0.28,
        "winter": 0.21
      },
      "weekend_vs_weekday": {
        "weekend_activity": 0.35,
        "weekday_activity": 0.65
      }
    },
    "influence_metrics": {
      "follower_estimate": 127,
      "influence_score": 6.8,
      "expertise_areas": ["technology", "programming", "data analysis"],
      "thought_leadership_score": 0.42,
      "community_standing": "established"
    }
  },
  "metadata": {
    "analysis_date": "2024-01-15T10:30:00Z",
    "time_range_analyzed": "30d",
    "total_items_analyzed": 1048,
    "analysis_duration_ms": 3247,
    "data_freshness": "real-time"
  }
}`}</code>
        </pre>

        <h2>Use Cases</h2>
        <ul>
          <li><strong>Influencer Identification:</strong> Find users with high engagement and influence in specific communities</li>
          <li><strong>Market Research:</strong> Understand target audience behavior and preferences</li>
          <li><strong>Content Strategy:</strong> Analyze successful content patterns and optimal posting times</li>
          <li><strong>Community Management:</strong> Identify active and valuable community members</li>
          <li><strong>Brand Monitoring:</strong> Track user sentiment and brand mentions</li>
          <li><strong>Academic Research:</strong> Study online behavior patterns and digital sociology</li>
        </ul>

        <h2>Rate Limits</h2>
        <ul>
          <li>100 requests per hour for standard plans</li>
          <li>500 requests per hour for premium plans</li>
          <li>Analysis of users with 10,000+ posts may take longer to process</li>
        </ul>

        <h2>Error Handling</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>{`{
  "status": "error",
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "The specified username does not exist or is private",
    "details": {
      "username": "nonexistent_user",
      "suggestion": "Verify the username spelling and privacy settings"
    }
  }
}`}</code>
        </pre>

        <h2>Data Privacy & Ethics</h2>
        <p>
          This API only analyzes publicly available Reddit data. All analysis respects Reddit's API terms of service
          and user privacy. No personally identifiable information is stored or shared beyond what is publicly visible
          on Reddit.
        </p>
      </div>

      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/trendit/monitor-subreddit" className="text-green-600 hover:text-green-700 font-medium">← Monitor Subreddit</Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/trendit/trend-analysis" className="text-green-600 hover:text-green-700 font-medium">Trend Analysis →</Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
