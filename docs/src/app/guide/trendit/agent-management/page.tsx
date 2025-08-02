import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function AgentManagementPage() {
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
          <BreadcrumbItem><BreadcrumbPage>Agent Management</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Agent Management</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Create, deploy, and manage intelligent AI agents for automated Reddit monitoring, data collection, and real-time analysis with custom triggers and actions.
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          The Agent Management API allows you to create autonomous AI agents that continuously monitor Reddit
          for specific patterns, keywords, trends, or events. These agents can perform automated actions like
          data collection, sentiment analysis, alerting, and integration with external systems in real-time.
        </p>

        <h2>Create Agent Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>POST https://api.potterlabs.xyz/v1/trendit/agents</code>
        </pre>

        <h2>Agent Configuration Parameters</h2>
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
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">name</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Agent name for identification</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">agent_type</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">"monitor", "analyzer", "collector", "alerter", "responder"</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">subreddits</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Subreddits to monitor (max 20)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">triggers</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">object</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Conditions that activate the agent</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">actions</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Actions to execute when triggered</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">schedule</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">object</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Execution schedule settings</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">filters</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">object</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Content filtering criteria</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">notifications</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">object</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Notification settings and webhooks</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example: Create Trend Monitoring Agent</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>{`curl -X POST "https://api.potterlabs.xyz/v1/trendit/agents" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "AI News Monitor",
    "agent_type": "monitor",
    "subreddits": ["technology", "artificial_intelligence", "MachineLearning"],
    "triggers": {
      "keywords": ["ChatGPT", "OpenAI", "AI breakthrough", "artificial intelligence"],
      "sentiment_threshold": -0.5,
      "engagement_spike": {
        "threshold": 200,
        "time_window": "1h"
      },
      "trend_velocity": 500
    },
    "actions": [
      {
        "type": "collect_data",
        "params": {
          "include_comments": true,
          "max_depth": 3,
          "store_duration": "7d"
        }
      },
      {
        "type": "analyze_sentiment",
        "params": {
          "detailed_analysis": true,
          "emotional_breakdown": true
        }
      },
      {
        "type": "send_webhook",
        "params": {
          "url": "https://your-app.com/webhooks/trendit-alert",
          "method": "POST",
          "headers": {
            "Authorization": "Bearer your-webhook-token"
          }
        }
      },
      {
        "type": "create_report",
        "params": {
          "format": "json",
          "include_visualizations": true,
          "auto_export": true
        }
      }
    ],
    "schedule": {
      "type": "real_time",
      "check_interval": "30s",
      "active_hours": {
        "start": "06:00",
        "end": "23:00",
        "timezone": "UTC"
      }
    },
    "filters": {
      "min_score": 10,
      "min_comments": 5,
      "exclude_nsfw": true,
      "language": "en",
      "user_karma_threshold": 100
    },
    "notifications": {
      "email": {
        "enabled": true,
        "addresses": ["alerts@yourcompany.com"],
        "frequency": "immediate"
      },
      "slack": {
        "enabled": true,
        "webhook_url": "https://hooks.slack.com/your-slack-webhook",
        "channel": "#ai-monitoring"
      }
    }
  }'`}</code>
        </pre>

        <h2>Agent Response</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>{`{
  "status": "success",
  "data": {
    "agent_id": "agent_ai_news_monitor_2024",
    "name": "AI News Monitor",
    "status": "active",
    "created_at": "2024-01-15T10:30:00Z",
    "last_execution": "2024-01-15T10:30:15Z",
    "next_execution": "2024-01-15T10:30:45Z",
    "performance_metrics": {
      "triggers_fired": 0,
      "actions_executed": 0,
      "success_rate": 1.0,
      "avg_response_time_ms": 245
    },
    "configuration": {
      "agent_type": "monitor",
      "subreddits_count": 3,
      "active_triggers": 4,
      "configured_actions": 4,
      "monitoring_mode": "real_time"
    },
    "estimated_costs": {
      "monthly_estimate": "$24.50",
      "per_trigger_cost": "$0.002",
      "storage_cost": "$0.05/GB"
    }
  }
}`}</code>
        </pre>

        <h2>Agent Management Operations</h2>

        <h3>Get Agent Status</h3>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>GET https://api.potterlabs.xyz/v1/trendit/agents/{`{agent_id}`}</code>
        </pre>

        <h3>Update Agent</h3>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>PUT https://api.potterlabs.xyz/v1/trendit/agents/{`{agent_id}`}</code>
        </pre>

        <h3>Pause/Resume Agent</h3>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>POST https://api.potterlabs.xyz/v1/trendit/agents/{`{agent_id}`}/pause</code>
        </pre>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>POST https://api.potterlabs.xyz/v1/trendit/agents/{`{agent_id}`}/resume</code>
        </pre>

        <h3>Delete Agent</h3>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>DELETE https://api.potterlabs.xyz/v1/trendit/agents/{`{agent_id}`}</code>
        </pre>

        <h3>List All Agents</h3>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>GET https://api.potterlabs.xyz/v1/trendit/agents</code>
        </pre>

        <h2>Agent Types & Capabilities</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 dark:border-slate-600">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800">
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Agent Type</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Primary Function</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Key Features</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">monitor</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Real-time monitoring</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Continuous scanning, instant alerts, trend detection</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">analyzer</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Deep content analysis</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Sentiment analysis, topic modeling, influence scoring</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">collector</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Data aggregation</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Bulk data collection, archiving, structured storage</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">alerter</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Notification system</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Multi-channel alerts, escalation, custom webhooks</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">responder</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Automated responses</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Auto-comments, API calls, external integrations</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Available Triggers</h2>
        <ul>
          <li><strong>Keyword Detection:</strong> Monitor for specific words or phrases</li>
          <li><strong>Sentiment Thresholds:</strong> Trigger on positive/negative sentiment spikes</li>
          <li><strong>Engagement Spikes:</strong> Detect unusual activity patterns</li>
          <li><strong>Trend Velocity:</strong> Monitor rapid growth in mentions</li>
          <li><strong>User Mentions:</strong> Track specific users or account types</li>
          <li><strong>Score Thresholds:</strong> Trigger on highly upvoted/downvoted content</li>
          <li><strong>Time-based:</strong> Schedule regular checks or time-specific monitoring</li>
          <li><strong>Geographic:</strong> Location-based triggers (when available)</li>
        </ul>

        <h2>Available Actions</h2>
        <ul>
          <li><strong>Data Collection:</strong> Store posts, comments, and metadata</li>
          <li><strong>Sentiment Analysis:</strong> Perform detailed emotional analysis</li>
          <li><strong>Webhook Notifications:</strong> Send real-time data to external systems</li>
          <li><strong>Email/Slack Alerts:</strong> Human-readable notifications</li>
          <li><strong>Report Generation:</strong> Create detailed analysis reports</li>
          <li><strong>API Integrations:</strong> Connect with CRM, analytics, or other tools</li>
          <li><strong>Data Export:</strong> Automated export to various formats</li>
          <li><strong>Content Moderation:</strong> Flag or categorize content automatically</li>
        </ul>

        <h2>Use Cases</h2>
        <ul>
          <li><strong>Brand Monitoring:</strong> Track mentions and sentiment about your brand 24/7</li>
          <li><strong>Crisis Detection:</strong> Early warning system for PR issues or controversies</li>
          <li><strong>Market Research:</strong> Automated consumer sentiment and trend tracking</li>
          <li><strong>Content Opportunities:</strong> Identify trending topics for content creation</li>
          <li><strong>Competitor Analysis:</strong> Monitor competitor mentions and market reactions</li>
          <li><strong>Customer Support:</strong> Automatically detect and respond to support requests</li>
          <li><strong>Investment Research:</strong> Track sentiment around stocks, crypto, and market events</li>
          <li><strong>Academic Research:</strong> Long-term data collection for social studies</li>
        </ul>

        <h2>Agent Performance Metrics</h2>
        <p>Track your agents' effectiveness with comprehensive metrics:</p>
        <ul>
          <li>Trigger accuracy and false positive rates</li>
          <li>Response time and execution performance</li>
          <li>Data collection volume and quality scores</li>
          <li>Cost tracking and optimization recommendations</li>
          <li>Success rates for automated actions</li>
        </ul>

        <h2>Rate Limits & Pricing</h2>
        <ul>
          <li>Up to 5 active agents on standard plans</li>
          <li>Up to 25 active agents on premium plans</li>
          <li>Real-time agents: $0.002 per trigger activation</li>
          <li>Scheduled agents: $0.001 per execution</li>
          <li>Data storage: $0.05 per GB per month</li>
        </ul>

        <h2>Security & Compliance</h2>
        <p>
          All agents operate within Reddit's API terms of service and respect rate limits.
          Data collection and processing comply with GDPR and CCPA requirements.
          Webhook endpoints should use HTTPS and proper authentication.
        </p>
      </div>

      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/trendit/trend-analysis" className="text-green-600 hover:text-green-700 font-medium">← Trend Analysis</Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/trendit/export-data" className="text-green-600 hover:text-green-700 font-medium">Export Data →</Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
