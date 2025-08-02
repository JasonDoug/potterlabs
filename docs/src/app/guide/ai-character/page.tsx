import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon, FileText, Users, Bot } from "lucide-react";

export default function AICharacterPage() {
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
            <BreadcrumbPage>AI Character</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">AI Character</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">Create, manage, and interact with AI-powered characters for your applications.</p>
      </header>

      {/* Character API Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link href="/guide/ai-character/get-list-characters">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Get List of Characters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Retrieve all available AI characters in your account with their details and capabilities.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-character/create-character">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Create Character
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create a new AI character with custom personality, voice, and behavioral traits.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-character/chat-with-character">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Chat with Character
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Interact with AI characters through natural conversation and receive contextual responses.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Overview Section */}
      <div className="prose dark:prose-invert max-w-none mb-12">
        <h2>Overview</h2>
        <p>
          Potter Labs AI Character API enables you to create and interact with sophisticated AI personas.
          Each character can have unique personalities, knowledge bases, speaking styles, and behavioral patterns,
          making them perfect for customer service, entertainment, education, and interactive applications.
        </p>

        <h2>Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Personality Customization</h3>
            <p className="text-slate-600 dark:text-slate-400">Define unique personality traits, communication styles, and behavioral patterns</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Voice Synthesis</h3>
            <p className="text-slate-600 dark:text-slate-400">Generate natural-sounding speech with customizable voice characteristics</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Context Memory</h3>
            <p className="text-slate-600 dark:text-slate-400">Characters remember previous conversations and maintain contextual awareness</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Multi-modal Interaction</h3>
            <p className="text-slate-600 dark:text-slate-400">Support for text, voice, and visual interactions with your AI characters</p>
          </div>
        </div>

        <h2>Use Cases</h2>
        <ul>
          <li>**Customer Support**: Create helpful support agents with brand-specific personalities</li>
          <li>**Educational Tutors**: Build teaching assistants for specific subjects or skills</li>
          <li>**Entertainment**: Develop characters for games, interactive stories, or virtual companions</li>
          <li>**Brand Ambassadors**: Create AI representatives that embody your brand values</li>
          <li>**Therapy & Wellness**: Design supportive characters for mental health applications</li>
        </ul>

        <h2>Getting Started</h2>
        <p>
          Start by exploring the character management endpoints to understand how to create and configure your AI characters.
          Then learn how to enable conversations and customize their responses to match your specific use case.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/create-ai-clips" className="text-green-600 hover:text-green-700 font-medium">
            ← Create AI Clips
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/ai-character/get-list-characters" className="text-green-600 hover:text-green-700 font-medium">
            Get List of Characters →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
