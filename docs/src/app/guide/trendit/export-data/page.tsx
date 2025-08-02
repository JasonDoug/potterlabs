import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function ExportDataPage() {
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
          <BreadcrumbItem><BreadcrumbPage>Export Data</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Export Data</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Export collected Reddit data and analysis results in multiple formats for external analysis, reporting, and integration with business intelligence tools.
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>
          The Export Data API provides flexible options for exporting Reddit data collected through Trendit's
          various endpoints. Whether you need raw data for analysis, formatted reports for stakeholders, or
          structured data for machine learning pipelines, this endpoint supports multiple formats and
          customizable export configurations.
        </p>

        <h2>Export Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>GET https://api.potterlabs.xyz/v1/trendit/export</code>
        </pre>

        <h2>Export Parameters</h2>
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
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">format</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">"json", "csv", "xlsx", "parquet", "pdf", "xml"</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">data_type</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Yes</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">"posts", "comments", "users", "trends", "sentiment", "all"</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">date_range</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">object</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Date range filter with start_date and end_date</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">subreddits</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">array</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Filter by specific subreddits</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">max_records</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">integer</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Maximum records to export (default: 10000)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">compression</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">string</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">No</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">"none", "gzip", "zip" (default: "none")</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example Request</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>{`curl -X GET "https://api.potterlabs.xyz/v1/trendit/export" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "format": "csv",
    "data_type": "posts",
    "date_range": {
      "start_date": "2024-01-01T00:00:00Z",
      "end_date": "2024-01-31T23:59:59Z"
    },
    "subreddits": ["technology", "artificial_intelligence"],
    "max_records": 5000,
    "compression": "gzip"
  }'`}</code>
        </pre>

        <h2>Response Format</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
          <code>{`{
  "status": "success",
  "data": {
    "export_id": "export_posts_csv_20240115",
    "download_url": "https://exports.potterlabs.xyz/downloads/export_posts_csv_20240115.csv.gz",
    "expires_at": "2024-01-22T10:30:00Z",
    "file_info": {
      "format": "csv",
      "compression": "gzip",
      "file_size_bytes": 2847392,
      "estimated_download_time": "15-30 seconds"
    },
    "export_metadata": {
      "total_records": 4823,
      "exported_records": 4823,
      "processing_time_ms": 3247
    }
  }
}`}</code>
        </pre>

        <h2>Supported Export Formats</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 dark:border-slate-600">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800">
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Format</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Best For</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">Max Records</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">CSV</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Excel, data analysis</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1,000,000</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">JSON</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">API integration</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">100,000</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">XLSX</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Business reports</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">50,000</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-mono">Parquet</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">Big data analytics</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">10,000,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Use Cases</h2>
        <ul>
          <li><strong>Business Intelligence:</strong> Export data for dashboards and KPI tracking</li>
          <li><strong>Academic Research:</strong> Large-scale data analysis and publication</li>
          <li><strong>Machine Learning:</strong> Training data preparation and feature engineering</li>
          <li><strong>External Analytics:</strong> Integration with Snowflake, BigQuery, or Databricks</li>
          <li><strong>Client Reporting:</strong> Custom reports for stakeholders and clients</li>
          <li><strong>Data Migration:</strong> Moving data between platforms or vendors</li>
        </ul>

        <h2>Rate Limits</h2>
        <ul>
          <li>10 exports per hour for standard plans</li>
          <li>50 exports per hour for premium plans</li>
          <li>Cost: $0.01 per 1,000 records exported</li>
          <li>Large exports may take 10-30 minutes to process</li>
        </ul>
      </div>

      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/trendit/agent-management" className="text-green-600 hover:text-green-700 font-medium">← Agent Management</Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <span className="text-slate-400">End of Trendit</span>
        </div>
      </nav>
    </DocsLayout>
  );
}
