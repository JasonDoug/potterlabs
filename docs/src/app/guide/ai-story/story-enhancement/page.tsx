import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function StoryEnhancementPage() {
  return (
    <DocsLayout>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/"><HomeIcon className="h-4 w-4" /></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/">Guide</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/guide/ai-story">AI Story</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Story Enhancement</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Story Enhancement</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">Improve existing stories with better prose, pacing, and narrative structure.</p>
      </header>
      <div className="prose dark:prose-invert max-w-none">
        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg"><code>POST https://api.potterlabs.xyz/v1/story/enhance</code></pre>
        <p>Enhance and improve existing story content with AI-powered editing and refinement.</p>
        <p className="text-slate-600 dark:text-slate-400 italic">Full documentation coming soon.</p>
      </div>
      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/ai-story/story-dialogue" className="text-green-600 hover:text-green-700 font-medium">← Story Dialogue</Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <span className="text-slate-400">End of Guide</span>
        </div>
      </nav>
    </DocsLayout>
  );
}
