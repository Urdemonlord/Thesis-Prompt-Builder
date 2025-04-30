import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GraduationCap, BookOpen, Edit3 } from "lucide-react";

export function WelcomeHero() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <GraduationCap size={40} className="text-primary" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Thesis Prompt Builder
          </h1>
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          Create, manage, and optimize thesis prompts for any academic discipline using AI-powered assistance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button asChild size="lg">
            <Link href="/editor">
              <Edit3 className="mr-2 h-5 w-5" />
              Create New Prompt
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/templates">
              <BookOpen className="mr-2 h-5 w-5" />
              Browse Templates
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}