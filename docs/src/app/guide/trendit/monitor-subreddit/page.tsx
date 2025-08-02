import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function MonitorSubredditPage() {
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
          <BreadcrumbItem><BreadcrumbPage>Monitor Subreddit</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Monitor Subreddit</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">Set up real-time monitoring of subreddits with custom alerts, notifications, and automated responses.</p>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          The Monitor Subreddit endpoint enables real-time surveillance of Reddit communities with customizable triggers
          and instant notifications. Perfect for crisis management, brand monitoring, competitor tracking, and
          time-sensitive content discovery.
        </p>

        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>POST https://api.potterlabs.xyz/v1/trendit/monitor</code>
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
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>monitor_name</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Unique name for the monitor instance</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>subreddits</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">List of subreddits to monitor (max: 10)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>triggers</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">List of trigger conditions that activate alerts</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>notification_channels</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">How to deliver alerts (email, webhook, slack, discord)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>monitoring_scope</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">new_posts, hot_posts, rising_posts, all (default: new_posts)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>check_frequency</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">realtime, 1min, 5min, 15min, 30min, 1hour (default: 5min)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2"><code>include_comments</code></td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">boolean</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Monitor comments in addition to posts (default: false)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Trigger Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600">Keyword Triggers</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Alert when specific keywords or phrases appear</p>
            <code className="text-xs">keywords: ["brand name", "product launch"]</code>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-green-600">Score Thresholds</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Trigger on posts reaching certain upvote levels</p>
            <code className="text-xs">min_score: 100, max_score: 10000</code>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-600">Sentiment Alerts</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Alert on sentiment changes or negative spikes</p>
            <code className="text-xs">sentiment: "negative", threshold: 0.8</code>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-600">User Activity</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Monitor specific users or unusual activity patterns</p>
            <code className="text-xs">users: ["competitor_account"]</code>
          </div>
        </div>

        <h2>Example Request - Brand Crisis Monitoring</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`curl -X POST https://api.potterlabs.xyz/v1/trendit/monitor \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "monitor_name": "brand-crisis-monitor",
    "subreddits": ["technology", "apple", "iphone", "gadgets"],
    "triggers": [
      {
        "type": "keyword",
        "keywords": ["iPhone battery", "battery drain", "overheating"],
        "match_type": "any",
        "case_sensitive": false
      },
      {
        "type": "sentiment",
        "sentiment": "negative",
        "threshold": 0.7,
        "min_mentions": 5
      },
      {
        "type": "score",
        "min_score": 500,
        "time_window": "1hour"
      }
    ],
    "notification_channels": [
      {
        "type": "email",
        "recipients": ["alerts@company.com"],
        "priority": "high"
      },
      {
        "type": "slack",
        "webhook_url": "https://hooks.slack.com/...",
        "channel": "#crisis-management"
      }
    ],
    "monitoring_scope": "all",
    "check_frequency": "realtime",
    "include_comments": true
  }'`}</code>
        </pre>

        <h2>Response</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "monitor_id": "mon_abc123def456",
  "monitor_name": "brand-crisis-monitor",
  "status": "active",
  "subreddits": ["technology", "apple", "iphone", "gadgets"],
  "triggers": [
    {
      "id": "trigger_001",
      "type": "keyword",
      "status": "active",
      "keywords": ["iPhone battery", "battery drain", "overheating"]
    },
    {
      "id": "trigger_002",
      "type": "sentiment",
      "status": "active",
      "threshold": 0.7
    },
    {
      "id": "trigger_003",
      "type": "score",
      "status": "active",
      "min_score": 500
    }
  ],
  "monitoring_config": {
    "scope": "all",
    "frequency": "realtime",
    "include_comments": true,
    "created_at": "2024-01-01T00:00:00Z"
  },
  "statistics": {
    "total_checks": 0,
    "triggers_fired": 0,
    "last_check": null,
    "uptime": "100%"
  },
  "next_check": "2024-01-01T00:00:30Z"
}`}</code>
        </pre>

        <h2>Notification Channels</h2>

        <h3>Email Notifications</h3>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "type": "email",
  "recipients": ["team@company.com", "alerts@company.com"],
  "priority": "high",
  "template": "detailed",
  "include_context": true
}`}</code>
        </pre>

        <h3>Webhook Integration</h3>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "type": "webhook",
  "url": "https://your-app.com/reddit-webhook",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer your-token",
    "Content-Type": "application/json"
  },
  "retry_attempts": 3
}`}</code>
        </pre>

        <h3>Slack Integration</h3>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "type": "slack",
  "webhook_url": "https://hooks.slack.com/services/...",
  "channel": "#alerts",
  "username": "Reddit Monitor",
  "icon_emoji": ":warning:",
  "mention_users": ["@channel"]
}`}</code>
        </pre>

        <h2>Alert Payload Example</h2>
        <p>When a trigger fires, you'll receive detailed alert information:</p>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>{`{
  "alert_id": "alert_xyz789",
  "monitor_id": "mon_abc123def456",
  "trigger_id": "trigger_001",
  "triggered_at": "2024-01-01T10:30:00Z",
  "severity": "high",
  "content": {
    "post_id": "t3_example123",
    "subreddit": "r/technology",
    "title": "iPhone battery drain issue getting worse",
    "author": "concerned_user",
    "score": 1247,
    "num_comments": 189,
    "created_utc": "2024-01-01T10:25:00Z",
    "url": "https://reddit.com/r/technology/comments/...",
    "text_preview": "Anyone else experiencing severe battery drain..."
  },
  "analysis": {
    "sentiment_score": -0.73,
    "keywords_matched": ["iPhone battery", "battery drain"],
    "estimated_reach": 15000,
    "trending_velocity": "high"
  },
  "context": {
    "similar_posts_today": 12,
    "sentiment_trend": "declining",
    "subreddit_activity": "above_average"
  }
}`}</code>
        </pre>

        <h2>Monitor Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Pause Monitor</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Temporarily stop monitoring without losing configuration</p>
            <code className="text-xs">POST /monitor/{"{monitor_id}"}/pause</code>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Update Triggers</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Modify keywords, thresholds, or add new trigger conditions</p>
            <code className="text-xs">PATCH /monitor/{"{monitor_id}"}/triggers</code>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Alert History</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">View all past alerts and trigger events</p>
            <code className="text-xs">GET /monitor/{"{monitor_id}"}/alerts</code>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold">Performance Stats</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Monitor uptime, response times, and trigger accuracy</p>
            <code className="text-xs">GET /monitor/{"{monitor_id}"}/stats</code>
          </div>
        </div>

        <h2>Use Cases</h2>
        <ul>
          <li>**Crisis Management**: Immediate alerts for negative brand mentions or product issues</li>
          <li>**Competitive Intelligence**: Monitor competitor discussions and market sentiment</li>
          <li>**Product Launch**: Track reception and early feedback for new releases</li>
          <li>**Community Management**: Stay informed about important discussions in your communities</li>
          <li>**News Monitoring**: Get alerts for breaking news or trending topics in your industry</li>
          <li>**Influencer Tracking**: Monitor when key users post about relevant topics</li>
        </ul>

        <h2>Pricing & Limits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-green-600">Standard Plan</h3>
            <ul className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              <li>• 3 active monitors</li>
              <li>• 5min check frequency</li>
              <li>• 1000 alerts/month</li>
              <li>• Email notifications</li>
            </ul>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600">Premium Plan</h3>
            <ul className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              <li>• 15 active monitors</li>
              <li>• 1min check frequency</li>
              <li>• 10,000 alerts/month</li>
              <li>• All notification types</li>
            </ul>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-600">Enterprise Plan</h3>
            <ul className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              <li>• Unlimited monitors</li>
              <li>• Real-time monitoring</li>
              <li>• Unlimited alerts</li>
              <li>• Custom integrations</li>
            </ul>
          </div>
        </div>
      </div>

      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/trendit/create-data-store" className="text-green-600 hover:text-green-700 font-medium">← Create Data Store</Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/trendit/user-analysis" className="text-green-600 hover:text-green-700 font-medium">User Analysis →</Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
