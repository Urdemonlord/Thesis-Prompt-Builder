import { MainLayout } from "@/components/layouts/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I save my prompts?",
      answer: "You can save your prompts by clicking the 'Save' button in the editor. Your prompts are stored locally in your browser's localStorage. You can view and manage all your saved prompts in the History section."
    },
    {
      question: "Can I use this without a Gemini API key?",
      answer: "Yes! The core functionality for creating and managing prompts works without an API key. The AI assistance features require a Gemini API key, which you can add in the Settings page."
    },
    {
      question: "How do I use templates?",
      answer: "Browse the templates in the Templates section, organized by academic discipline. When you find a template you like, click 'Use Template' to open it in the editor, or 'Copy' to copy it to your clipboard."
    },
    {
      question: "How do I format my prompts?",
      answer: "The editor supports Markdown-like formatting. You can use the toolbar above the editor to add formatting like bold, italic, headings, and lists. You can also preview how your formatted prompt will look by clicking the 'Preview' tab."
    },
    {
      question: "How do I back up my data?",
      answer: "In the Settings page, you can export all your data as a JSON file by clicking 'Export All Data'. You can later restore this data by clicking 'Import Data' and selecting your backup file."
    },
    {
      question: "How do I clear all my data?",
      answer: "In the Settings page, you can clear all your data by clicking 'Clear All Data' in the Danger Zone section. This will remove all your saved prompts, drafts, and settings, except for your theme preference."
    },
    {
      question: "Can I use this offline?",
      answer: "The basic prompt editing and management functionality works offline. However, AI assistance features require an internet connection to access the Gemini API."
    }
  ];

  return (
    <MainLayout>
      <div className="container max-w-3xl mx-auto p-4 md:p-8">
        <Card className="border-0 shadow-none mb-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl md:text-3xl">Help & FAQ</CardTitle>
            <CardDescription>
              Find answers to common questions and learn how to use the Thesis Prompt Builder
            </CardDescription>
          </CardHeader>
        </Card>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Getting Started Guide</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <h3>1. Create Your First Prompt</h3>
              <p>
                Start by clicking on "Create New Prompt" on the home page or navigating to the Editor section. 
                You can write your prompt from scratch or use one of our templates as a starting point.
              </p>
              
              <h3>2. Use Templates</h3>
              <p>
                Browse our collection of discipline-specific templates to quickly create effective thesis prompts. 
                Templates can be found in the Templates section, organized by academic discipline.
              </p>
              
              <h3>3. Save and Manage Prompts</h3>
              <p>
                Your work is automatically saved as you type. You can also explicitly save prompts by clicking 
                the "Save" button. All your saved prompts can be found in the History section.
              </p>
              
              <h3>4. Format Your Prompts</h3>
              <p>
                Use the formatting toolbar to add structure to your prompts. You can add headings, lists, 
                and emphasis to make your prompts more effective.
              </p>
              
              <h3>5. Export and Share</h3>
              <p>
                Export your prompts as JSON files to share them or to back them up. You can also import 
                prompts that others have shared with you.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}