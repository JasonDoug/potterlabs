import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon, Search, TrendingUp, Database, Monitor, User, BarChart3, Bot, Download } from "lucide-react";

export default function TrenditPage() {
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
            <BreadcrumbPage>Trendit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Trendit</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">Advanced Reddit data analysis and monitoring API built on PRAW.</p>
      </header>

      {/* Trendit API Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link href="/guide/trendit/search-reddit">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Reddit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Search posts and comments across multiple subreddits with advanced filtering and sorting options.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/trendit/analyze-sentiment">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Analyze Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Perform sentiment analysis on Reddit posts and comments to gauge public opinion and trends.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/trendit/create-data-store">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Create Data Store
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create persistent data stores for ongoing collection and analysis of Reddit content.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/trendit/monitor-subreddit">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Monitor Subreddit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Set up continuous monitoring of subreddits for real-time data collection and alerts.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/trendit/user-analysis">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Analyze Reddit user behavior, posting patterns, and engagement metrics.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/trendit/trend-analysis">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Trend Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track and analyze trending topics, keywords, and discussions across Reddit over time.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/trendit/agent-management">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Agent Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create and manage automated agents for continuous Reddit monitoring and data collection.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/trendit/export-data">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Export collected Reddit data in various formats for analysis and integration.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Overview Section */}
      <div className="prose dark:prose-invert max-w-none mb-12">
        <h2>Overview</h2>
        <p>
          Trendit API provides powerful Reddit data analysis capabilities built on top of the latest PRAW (Python Reddit API Wrapper).
          Our API abstracts the complexity of Reddit's data structure while adding advanced analytics, sentiment analysis,
          and automated monitoring features.
        </p>

        <h2>Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Advanced Search</h3>
            <p className="text-slate-600 dark:text-slate-400">Search across multiple subreddits with complex filters and sorting options</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Sentiment Analysis</h3>
            <p className="text-slate-600 dark:text-slate-400">Real-time sentiment analysis of posts and comments using advanced NLP</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Data Persistence</h3>
            <p className="text-slate-600 dark:text-slate-400">Create and manage data stores for long-term analysis and insights</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Automated Monitoring</h3>
            <p className="text-slate-600 dark:text-slate-400">Set up agents for continuous monitoring and real-time alerts</p>
          </div>
        </div>

        <h2>Use Cases</h2>
        <ul>
          <li>**Market Research**: Monitor brand mentions and customer sentiment across relevant subreddits</li>
          <li>**Trend Analysis**: Track emerging topics and discussions in your industry</li>
          <li>**Content Strategy**: Identify popular content types and optimal posting times</li>
          <li>**Competitive Intelligence**: Monitor competitor mentions and market positioning</li>
          <li>**Academic Research**: Collect data for social media and community behavior studies</li>
          <li>**Product Development**: Gather user feedback and feature requests from Reddit communities</li>
        </ul>

        <h2>Data Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600">Posts</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Original submissions with titles, content, and metadata</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-green-600">Comments</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">User responses and threaded discussions</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-600">User Profiles</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">User activity patterns and engagement metrics</p>
          </div>
        </div>

        <h2>Search Capabilities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
          {[
            "By Keywords", "By Subreddit", "By Date Range", "By Score",
            "By User", "By Flair", "By Domain", "By Content Type",
            "Hot Posts", "Top Posts", "New Posts", "Controversial",
            "Rising Posts", "Gilded Content", "Trending Comments", "Popular Users"
          ].map((capability) => (
            <div key={capability} className="border border-slate-300 dark:border-slate-600 p-2 rounded text-center text-sm">
              {capability}
            </div>
          ))}
        </div>

        <h2>Getting Started</h2>
        <p>
          Begin with the Search Reddit endpoint to understand basic functionality. Then explore sentiment analysis
          and data store creation for more advanced use cases. For ongoing monitoring, set up agents to
          automatically collect and analyze data over time.
        </p>

        <h2>Authentication</h2>
        <p>
          All Trendit API endpoints require authentication using your Potter Labs API key.
          Reddit data access is subject to Reddit's API terms and rate limits, which are handled automatically by our service.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/ai-story/story-enhancement" className="text-green-600 hover:text-green-700 font-medium">
            ← Story Enhancement
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/trendit/search-reddit" className="text-green-600 hover:text-green-700 font-medium">
            Search Reddit →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
