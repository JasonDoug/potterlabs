import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function AnalyzeSentimentPage() {
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
            <BreadcrumbPage>Analyze Sentiment</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Analyze Sentiment</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Perform advanced sentiment analysis on Reddit posts and comments to gauge public opinion and market trends.
        </p>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          The Sentiment Analysis endpoint uses advanced natural language processing to analyze the emotional tone and sentiment
          of Reddit content. This is invaluable for brand monitoring, market research, product feedback analysis, and
          understanding public opinion on various topics.
        </p>

        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>POST https://api.potterlabs.xyz/v1/trendit/sentiment</code>
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
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>content_source</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">search_query, content_ids, or direct_text</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>search_params</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">object</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Conditional</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Search parameters (required if content_source is search_query)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>content_ids</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Conditional</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Reddit post/comment IDs to analyze</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>text_content</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Conditional</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Direct text content to analyze</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>analysis_type</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">basic, detailed, or comprehensive (default: detailed)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>include_emotions</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">boolean</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Include detailed emotion analysis (default: true)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>group_by</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">subreddit, author, time_period, or none</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example Request - Search-Based Analysis</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`curl -X POST https://api.potterlabs.xyz/v1/trendit/sentiment \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "content_source": "search_query",
    "search_params": {
      "query": "iPhone 15 review",
      "subreddits": ["apple", "iphone", "technology"],
      "time_filter": "week",
      "limit": 200
    },
    "analysis_type": "comprehensive",
    "include_emotions": true,
    "group_by": "subreddit"
  }'`}</code>
        </pre>

        <h2>Response</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "analysis_id": "sent_xyz789abc123",
  "content_analyzed": 187,
  "processing_time_ms": 3420,
  "overall_sentiment": {
    "label": "positive",
    "score": 0.72,
    "confidence": 0.89,
    "distribution": {
      "positive": 0.68,
      "neutral": 0.19,
      "negative": 0.13
    }
  },
  "emotion_analysis": {
    "primary_emotions": ["excitement", "satisfaction", "curiosity"],
    "emotion_scores": {
      "joy": 0.45,
      "excitement": 0.38,
      "satisfaction": 0.35,
      "curiosity": 0.28,
      "frustration": 0.15,
      "disappointment": 0.08
    }
  },
  "grouped_results": [
    {
      "group": "r/apple",
      "content_count": 89,
      "sentiment": {
        "label": "positive",
        "score": 0.78,
        "distribution": {
          "positive": 0.74,
          "neutral": 0.18,
          "negative": 0.08
        }
      },
      "key_themes": ["camera quality", "battery life", "design", "price"],
      "sample_content": [
        {
          "id": "t1_abc123",
          "text": "The camera improvements are incredible...",
          "sentiment_score": 0.85,
          "emotions": ["excitement", "satisfaction"]
        }
      ]
    },
    {
      "group": "r/technology",
      "content_count": 62,
      "sentiment": {
        "label": "neutral",
        "score": 0.58,
        "distribution": {
          "positive": 0.48,
          "neutral": 0.35,
          "negative": 0.17
        }
      },
      "key_themes": ["specs", "competition", "innovation", "value"],
      "sample_content": [
        {
          "id": "t1_def456",
          "text": "Decent upgrade but not revolutionary...",
          "sentiment_score": 0.42,
          "emotions": ["neutral", "mild_disappointment"]
        }
      ]
    }
  ],
  "insights": {
    "trending_topics": [
      {"topic": "camera", "mentions": 156, "avg_sentiment": 0.81},
      {"topic": "battery", "mentions": 134, "avg_sentiment": 0.73},
      {"topic": "price", "mentions": 89, "avg_sentiment": 0.34}
    ],
    "sentiment_drivers": {
      "positive": ["camera quality", "design", "performance"],
      "negative": ["price", "limited innovation", "accessories"]
    },
    "recommendations": [
      "Focus marketing on camera improvements",
      "Address pricing concerns in communications",
      "Highlight battery life improvements"
    ]
  },
  "metadata": {
    "date_range": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-07T23:59:59Z"
    },
    "subreddits_analyzed": ["apple", "iphone", "technology"],
    "model_version": "sentiment-v2.1",
    "confidence_threshold": 0.7
  }
}`}</code>
        </pre>

        <h2>Analysis Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-green-600">Basic</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Simple positive/negative/neutral classification with confidence scores</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600">Detailed</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Includes emotion detection, key themes, and sentiment drivers</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-600">Comprehensive</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Full analysis with insights, recommendations, and trend identification</p>
          </div>
        </div>

        <h2>Emotion Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
          {[
            "Joy", "Excitement", "Satisfaction", "Curiosity",
            "Frustration", "Disappointment", "Anger", "Fear",
            "Surprise", "Trust", "Anticipation", "Sadness"
          ].map((emotion) => (
            <div key={emotion} className="border border-slate-300 dark:border-slate-600 p-2 rounded text-center text-sm">
              {emotion}
            </div>
          ))}
        </div>

        <h2>Brand Monitoring Example</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "content_source": "search_query",
  "search_params": {
    "query": "Nike OR Adidas OR 'brand name'",
    "subreddits": ["sneakers", "running", "fitness"],
    "time_filter": "month"
  },
  "analysis_type": "comprehensive",
  "group_by": "time_period"
}`}</code>
        </pre>

        <h2>Competitive Analysis</h2>
        <p>Compare sentiment across different brands, products, or topics:</p>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "content_source": "search_query",
  "search_params": {
    "query": "Tesla vs Ford electric vehicles",
    "time_filter": "quarter"
  },
  "analysis_type": "detailed",
  "include_comparative_metrics": true
}`}</code>
        </pre>

        <h2>Use Cases</h2>
        <ul>
          <li>**Brand Monitoring**: Track public sentiment about your brand, products, or services</li>
          <li>**Product Launch**: Monitor reception and feedback for new product releases</li>
          <li>**Crisis Management**: Detect negative sentiment spikes and respond quickly</li>
          <li>**Market Research**: Understand consumer opinions and preferences</li>
          <li>**Competitive Analysis**: Compare sentiment across different brands or products</li>
          <li>**Content Strategy**: Identify topics that resonate positively with your audience</li>
        </ul>

        <h2>Rate Limits</h2>
        <p>Sentiment analysis requests have the following limits:</p>
        <ul>
          <li>**Standard Plan**: 50 analyses per hour, 500 content items per analysis</li>
          <li>**Premium Plan**: 200 analyses per hour, 2000 content items per analysis</li>
          <li>**Enterprise Plan**: Custom limits with real-time processing</li>
        </ul>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/trendit/search-reddit" className="text-green-600 hover:text-green-700 font-medium">
            ← Search Reddit
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/trendit/create-data-store" className="text-green-600 hover:text-green-700 font-medium">
            Create Data Store →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
