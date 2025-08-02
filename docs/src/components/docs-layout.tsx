"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Menu, Sun, Moon } from "lucide-react";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [guideExpanded, setGuideExpanded] = useState(true);
  const [aiCharacterExpanded, setAiCharacterExpanded] = useState(false);
  const [aiStoryExpanded, setAiStoryExpanded] = useState(false);
  const [trenditExpanded, setTrenditExpanded] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      {/* Navigation Bar */}
      <nav className="border-b bg-white dark:bg-slate-900 dark:border-slate-800 fixed top-0 w-full z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="font-semibold text-lg">Potter Labs</span>
            </div>
            <Link href="/" className="text-green-600 hover:text-green-700 font-medium">
              Tutorial
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`w-64 bg-white dark:bg-slate-900 border-r dark:border-slate-800 fixed left-0 h-full transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-40 sidebar-scroll overflow-y-auto`}>
          <div className="p-4 h-full">
            <nav className="space-y-2">
              <Link href="/" className="block text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-2">
                Potter Labs API
              </Link>

              <Collapsible open={guideExpanded} onOpenChange={setGuideExpanded}>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-sm font-medium text-green-600 hover:text-green-700 py-2">
                  Guide
                  {guideExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 space-y-1">
                  <Link href="/guide/create-ai-captions" className="block text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-2">
                    Create AI Captions
                  </Link>
                  <Link href="/guide/create-ai-podcast" className="block text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-2">
                    Create an AI Podcast
                  </Link>
                  <Link href="/guide/create-ai-clips" className="block text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-2">
                    Create AI Clips
                  </Link>

                  <Collapsible open={aiCharacterExpanded} onOpenChange={setAiCharacterExpanded}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-2">
                      ai-character
                      {aiCharacterExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-4 space-y-1">
                      <Link href="/guide/ai-character" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Overview
                      </Link>
                      <Link href="/guide/ai-character/get-list-characters" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Get List of Characters
                      </Link>
                      <Link href="/guide/ai-character/create-character" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Create Character
                      </Link>
                      <Link href="/guide/ai-character/chat-with-character" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Chat with Character
                      </Link>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible open={aiStoryExpanded} onOpenChange={setAiStoryExpanded}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-2">
                      ai-story
                      {aiStoryExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-4 space-y-1">
                      <Link href="/guide/ai-story" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Overview
                      </Link>
                      <Link href="/guide/ai-story/create-an-ai-video" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Create an AI Video
                      </Link>
                      <Link href="/guide/ai-story/generate-story" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Generate Story
                      </Link>
                      <Link href="/guide/ai-story/create-story-outline" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Create Story Outline
                      </Link>
                      <Link href="/guide/ai-story/interactive-story" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Interactive Story
                      </Link>
                      <Link href="/guide/ai-story/story-characters" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Story Characters
                      </Link>
                      <Link href="/guide/ai-story/story-scenes" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Story Scenes
                      </Link>
                      <Link href="/guide/ai-story/story-dialogue" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Story Dialogue
                      </Link>
                      <Link href="/guide/ai-story/story-enhancement" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Story Enhancement
                      </Link>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible open={trenditExpanded} onOpenChange={setTrenditExpanded}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-2">
                      trendit
                      {trenditExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-4 space-y-1">
                      <Link href="/guide/trendit" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Overview
                      </Link>
                      <Link href="/guide/trendit/search-reddit" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Search Reddit
                      </Link>
                      <Link href="/guide/trendit/analyze-sentiment" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Analyze Sentiment
                      </Link>
                      <Link href="/guide/trendit/create-data-store" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Create Data Store
                      </Link>
                      <Link href="/guide/trendit/monitor-subreddit" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Monitor Subreddit
                      </Link>
                      <Link href="/guide/trendit/user-analysis" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        User Analysis
                      </Link>
                      <Link href="/guide/trendit/trend-analysis" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Trend Analysis
                      </Link>
                      <Link href="/guide/trendit/agent-management" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Agent Management
                      </Link>
                      <Link href="/guide/trendit/export-data" className="block text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1">
                        Export Data
                      </Link>
                    </CollapsibleContent>
                  </Collapsible>
                </CollapsibleContent>
              </Collapsible>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="p-6 max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white lg:ml-64">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Docs</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-slate-300 hover:text-white">
                    Tutorial
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">More</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://potterlabs.xyz" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white">
                    Website
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
