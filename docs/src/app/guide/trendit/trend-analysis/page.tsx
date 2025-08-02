import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function TrendAnalysisPage() {
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
          <BreadcrumbItem><BreadcrumbPage>Trend Analysis</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Trend Analysis</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Identify, track, and analyze trending topics, keywords, and discussions across Reddit communities with advanced pattern recognition and forecasting capabilities.
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          The Trend Analysis API provides powerful insights into emerging and declining trends across Reddit.
          It analyzes posting patterns, keyword frequency, engagement metrics, and temporal dynamics to identify
          trending topics, predict viral content, and track conversation evolution over time.
        </p>

        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>POST https://api.potterlabs.xyz/v1/trendit/trends</code>
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
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">subreddits</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">List of subreddits to analyze (max 50)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">time_window</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Analysis window: "1h", "6h", "24h", "3d", "7d", "30d" (default: "24h")</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">trend_type</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">"emerging", "declining", "viral", "persistent", "all" (default: "emerging")</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">keywords</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Specific keywords to track (max 20)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">min_engagement</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">integer</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Minimum engagement threshold (default: 10)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">include_forecast</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">boolean</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Include trend forecasting (default: true)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">sentiment_analysis</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">boolean</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Include sentiment analysis of trends (default: true)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example Request</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>{`curl -X POST "https://api.potterlabs.xyz/v1/trendit/trends" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "subreddits": ["technology", "artificial_intelligence", "MachineLearning"],
    "time_window": "24h",
    "trend_type": "emerging",
    "keywords": ["AI", "ChatGPT", "machine learning", "artificial intelligence"],
    "min_engagement": 50,
    "include_forecast": true,
    "sentiment_analysis": true
  }'`}</code>
        </pre>

        <h2>Response Format</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>{`{
  "status": "success",
  "data": {
    "trends": [
      {
        "id": "trend_ai_regulation_2024",
        "topic": "AI Regulation Framework",
        "keywords": ["AI regulation", "artificial intelligence law", "tech policy"],
        "trend_score": 0.89,
        "growth_rate": 847.3,
        "peak_time": "2024-01-15T14:30:00Z",
        "status": "emerging",
        "category": "technology",
        "subreddit_distribution": [
          {
            "subreddit": "technology",
            "mentions": 234,
            "engagement": 15420,
            "growth_rate": 925.4
          },
          {
            "subreddit": "artificial_intelligence",
            "mentions": 187,
            "engagement": 12850,
            "growth_rate": 756.2
          }
        ],
        "temporal_data": [
          {
            "timestamp": "2024-01-15T00:00:00Z",
            "mentions": 12,
            "engagement": 340
          },
          {
            "timestamp": "2024-01-15T06:00:00Z",
            "mentions": 89,
            "engagement": 4520
          },
          {
            "timestamp": "2024-01-15T12:00:00Z",
            "mentions": 187,
            "engagement": 12850
          }
        ],
        "sentiment_analysis": {
          "overall_sentiment": "concerned",
          "sentiment_score": -0.23,
          "positive_percentage": 32.4,
          "neutral_percentage": 41.2,
          "negative_percentage": 26.4,
          "dominant_emotions": ["concern", "curiosity", "skepticism"]
        },
        "key_posts": [
          {
            "post_id": "abc123",
            "title": "New AI regulation bill introduced in Congress",
            "score": 2847,
            "comments": 542,
            "subreddit": "technology",
            "influence_score": 0.94
          }
        ],
        "related_topics": [
          "tech legislation",
          "AI ethics",
          "privacy rights",
          "innovation policy"
        ]
      }
    ],
    "trend_forecast": {
      "predictions": [
        {
          "topic": "AI Regulation Framework",
          "forecast_24h": {
            "predicted_mentions": 420,
            "confidence": 0.87,
            "trend_direction": "increasing",
            "peak_probability": 0.73
          },
          "forecast_7d": {
            "sustainability_score": 0.65,
            "lifecycle_stage": "growth",
            "estimated_duration": "5-8 days"
          }
        }
      ]
    },
    "cross_platform_signals": {
      "twitter_correlation": 0.78,
      "google_trends_correlation": 0.82,
      "news_mention_correlation": 0.91
    },
    "topic_clusters": [
      {
        "cluster_name": "AI Governance",
        "topics": ["AI regulation", "AI ethics", "AI policy"],
        "cluster_strength": 0.84,
        "trend_velocity": "high"
      }
    ],
    "anomaly_detection": {
      "anomalies_found": 2,
      "significant_spikes": [
        {
          "timestamp": "2024-01-15T14:30:00Z",
          "magnitude": 12.4,
          "potential_cause": "breaking_news_event"
        }
      ]
    }
  },
  "metadata": {
    "analysis_timestamp": "2024-01-15T16:45:00Z",
    "time_window_analyzed": "24h",
    "total_posts_analyzed": 15420,
    "total_comments_analyzed": 47830,
    "subreddits_covered": 3,
    "processing_time_ms": 2847,
    "data_freshness": "5_minutes"
  }
}`}</code>
        </pre>

        <h2>Trend Types</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 dark:border-slate-600">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800">
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Type</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Description</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Detection Criteria</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">emerging</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">New topics gaining traction</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Growth rate {`>`} 200% in time window</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">viral</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Rapidly spreading content</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Exponential growth + cross-subreddit spread</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">declining</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Topics losing interest</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Negative growth rate {`>`} -50%</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">persistent</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Steady, ongoing discussions</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Consistent engagement over time</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Use Cases</h2>
        <ul>
          <li><strong>Content Strategy:</strong> Identify trending topics for timely content creation</li>
          <li><strong>Brand Monitoring:</strong> Track emerging conversations about your brand or industry</li>
          <li><strong>Market Research:</strong> Understand consumer interest and sentiment shifts</li>
          <li><strong>News Detection:</strong> Identify breaking news and viral events early</li>
          <li><strong>Investment Research:</strong> Track sentiment around stocks, crypto, and market trends</li>
          <li><strong>Academic Research:</strong> Study information propagation and social dynamics</li>
          <li><strong>Crisis Management:</strong> Early detection of potential PR issues or controversies</li>
        </ul>

        <h2>Rate Limits</h2>
        <ul>
          <li>50 requests per hour for standard plans</li>
          <li>200 requests per hour for premium plans</li>
          <li>Large subreddit analyses may have longer processing times</li>
        </ul>

        <h2>Advanced Features</h2>
        <h3>Trend Forecasting</h3>
        <p>
          Our AI-powered forecasting model predicts trend sustainability, peak timing, and lifecycle duration
          with up to 87% accuracy for 24-48 hour predictions.
        </p>

        <h3>Cross-Platform Correlation</h3>
        <p>
          Correlate Reddit trends with Twitter, Google Trends, and news mentions for comprehensive
          social media intelligence.
        </p>

        <h3>Anomaly Detection</h3>
        <p>
          Automatically identify unusual spikes or patterns that may indicate coordinated campaigns,
          breaking news, or algorithmic manipulation.
        </p>
      </div>

      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/trendit/user-analysis" className="text-green-600 hover:text-green-700 font-medium">← User Analysis</Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/trendit/agent-management" className="text-green-600 hover:text-green-700 font-medium">Agent Management →</Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
