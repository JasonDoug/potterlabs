import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function CreateStoryOutlinePage() {
  return (
    <DocsLayout>
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
            <BreadcrumbLink href="/guide/ai-story">AI Story</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Story Outline</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Create Story Outline</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Develop structured story outlines with plot points, character arcs, and narrative flow.
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>POST https://api.potterlabs.xyz/v1/story/outline</code>
        </pre>

        <p>Create comprehensive story outlines with structured plot development, character arcs, and pacing guidance.</p>

        <p className="text-slate-600 dark:text-slate-400 italic">
          Full documentation for this endpoint is coming soon. Contact Potter Labs support for early access.
        </p>
      </div>

      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/ai-story/generate-story" className="text-green-600 hover:text-green-700 font-medium">
            ← Generate Story
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/ai-story/interactive-story" className="text-green-600 hover:text-green-700 font-medium">
            Interactive Story →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
