import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DocsLayout } from "@/components/docs-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home as HomeIcon, FileText, Video, BookOpen, Wand2, Users, Play, Sparkles, Film } from "lucide-react";

export default function AIStoryPage() {
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
            <BreadcrumbPage>AI Story</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">AI Story</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">Create compelling narratives, videos, and interactive content with AI-powered storytelling.</p>
      </header>

      {/* Story API Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link href="/guide/ai-story/create-an-ai-video">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Create an AI Video
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate complete video stories with AI-created scripts, visuals, and narration.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-story/generate-story">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Generate Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create original written stories with customizable genres, themes, and characters.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-story/create-story-outline">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Create Story Outline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Develop structured story outlines with plot points, character arcs, and narrative flow.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-story/interactive-story">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Interactive Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Build choose-your-own-adventure stories with branching narratives and user choices.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-story/story-characters">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Story Characters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create detailed character profiles with personalities, backstories, and relationships.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-story/story-scenes">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Film className="h-5 w-5" />
                Story Scenes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate vivid scene descriptions with settings, atmosphere, and visual details.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-story/story-dialogue">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Story Dialogue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create authentic dialogue between characters with distinct voices and personalities.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-story/story-enhancement">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Story Enhancement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Improve existing stories with better prose, pacing, and narrative structure.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Overview Section */}
      <div className="prose dark:prose-invert max-w-none mb-12">
        <h2>Overview</h2>
        <p>
          Potter Labs AI Story API empowers creators to generate rich, engaging narratives across multiple formats.
          Whether you're creating short stories, full-length novels, interactive fiction, or video content,
          our AI understands narrative structure, character development, and storytelling techniques.
        </p>

        <h2>Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Genre Flexibility</h3>
            <p className="text-slate-600 dark:text-slate-400">Support for fantasy, sci-fi, romance, mystery, horror, and more</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Character Development</h3>
            <p className="text-slate-600 dark:text-slate-400">Create complex characters with motivations, flaws, and growth arcs</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Narrative Structure</h3>
            <p className="text-slate-600 dark:text-slate-400">AI understands story beats, plot devices, and narrative pacing</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Multi-Format Output</h3>
            <p className="text-slate-600 dark:text-slate-400">Generate text, video scripts, interactive content, and more</p>
          </div>
        </div>

        <h2>Story Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-green-600">Short Stories</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Complete narratives in 1,000-5,000 words</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600">Interactive Fiction</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Branching narratives with user choices</p>
          </div>
          <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-600">Video Stories</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Scripts with visual and audio direction</p>
          </div>
        </div>

        <h2>Use Cases</h2>
        <ul>
          <li>**Content Creation**: Generate stories for blogs, social media, and publications</li>
          <li>**Game Development**: Create narratives for video games and interactive experiences</li>
          <li>**Education**: Develop engaging educational stories and scenarios</li>
          <li>**Marketing**: Craft brand stories and narrative marketing content</li>
          <li>**Entertainment**: Build content for podcasts, videos, and multimedia projects</li>
        </ul>

        <h2>Genres Supported</h2>
        <div className="flex flex-wrap gap-2 my-4">
          {[
            "Fantasy", "Science Fiction", "Romance", "Mystery", "Horror", "Thriller",
            "Adventure", "Comedy", "Drama", "Historical Fiction", "Children's",
            "Young Adult", "Literary Fiction", "Crime", "Supernatural", "Western"
          ].map((genre) => (
            <span key={genre} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm">
              {genre}
            </span>
          ))}
        </div>

        <h2>Getting Started</h2>
        <p>
          Begin with the story generation endpoints to understand the basic workflow.
          Then explore character and scene creation for more detailed narratives.
          For interactive content, check out the interactive story and video creation tools.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 border-t">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 dark:text-slate-400">Previous</span>
          <Link href="/guide/ai-character/chat-with-character" className="text-green-600 hover:text-green-700 font-medium">
            ← Chat with Character
          </Link>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm text-slate-500 dark:text-slate-400">Next</span>
          <Link href="/guide/ai-story/create-an-ai-video" className="text-green-600 hover:text-green-700 font-medium">
            Create an AI Video →
          </Link>
        </div>
      </nav>
    </DocsLayout>
  );
}
