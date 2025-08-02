import Link from "next/link";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function InteractiveStoryPage() {
  return (
    <DocsLayout>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/"><HomeIcon className="h-4 w-4" /></BreadcrumbLink>
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
            <BreadcrumbPage>Interactive Story</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Interactive Story</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Build choose-your-own-adventure stories with branching narratives and user choices.
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Endpoint</h2>
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <code>POST https://api.potterlabs.xyz/v1/story/interactive</code>
        </pre>
        <p>Create interactive fiction with branching storylines and user decision points.</p>
        <p className="text-slate-600 dark:text-slate-400 italic">Full documentation coming soon.</p>
      </div>

      <nav className="flex justify-between items-center pt-8 mt-12 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/ai-story/create-story-outline" className="text-green-600 hover:text-green-700 font-medium">← Create Story Outline</Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/ai-story/story-characters" className="text-green-600 hover:text-green-700 font-medium">Story Characters →</Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
