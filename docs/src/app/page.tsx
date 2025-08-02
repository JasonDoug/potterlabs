import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon, FileText, Folder, TrendingUp } from "lucide-react";

export default function HomePage() {
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
            <BreadcrumbPage>Guide</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Guide</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">API concepts of Potter Labs AI.</p>
      </header>

      {/* Guide Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link href="/guide/create-ai-captions">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Create AI Captions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                The API allows you to add AI captions to a Video by making a POST request to the https
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/create-ai-podcast">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Create an AI Podcast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                The API allows you to create a new AI Podcast by making a POST request to the https
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/create-ai-clips">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Create AI Clips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                The API allows you to get AI clips from a long-form video by making a POST request to the https
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              ai-character
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              3 items
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              ai-story
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              8 items
            </CardDescription>
          </CardContent>
        </Card>

        <Link href="/guide/trendit">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                trendit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                8 items
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/" className="text-green-600 hover:text-green-700 font-medium">
            ← Potter Labs API
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/create-ai-captions" className="text-green-600 hover:text-green-700 font-medium">
            Create AI Captions →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
