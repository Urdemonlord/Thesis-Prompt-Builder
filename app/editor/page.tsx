"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import { PromptEditor } from "@/components/editor/prompt-editor";
import { PromptPreview } from "@/components/editor/prompt-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Save, FileUp, Loader2, Send, AlertCircle, CheckCircle } from "lucide-react";
import { PromptConfigPanel } from "@/components/editor/prompt-config-panel";
import { EditorToolbar } from "@/components/editor/editor-toolbar";
import { Input } from "@/components/ui/input";
import { ExportDialog } from "@/components/editor/export-dialog";
import { debounce } from "lodash";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PromptData {
  id?: string;
  title: string;
  prompt: string;
  category: string;
  major: string;
  createdAt?: string;
  updatedAt?: string;
  lastEdited?: string;
}

interface StorageData {
  [key: string]: {
    id: string;
    title: string;
    prompt: string;
    category: string;
    major: string;
    createdAt: string;
    updatedAt: string;
    lastEdited?: string;
  };
}

interface AIResponse {
  suggestion: string;
  explanation: string;
}

const majors = [
  { value: "computer-science", label: "Computer Science" },
  { value: "law", label: "Law" },
  { value: "economics", label: "Economics" },
  { value: "psychology", label: "Psychology" },
  { value: "literature", label: "Literature" },
  { value: "geography", label: "Geography" },
];

export default function EditorPage() {
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("Untitled Prompt");
  const [category, setCategory] = useState("pendahuluan");
  const [major, setMajor] = useState("computer-science");
  const [activeTab, setActiveTab] = useState("edit");
  const [storage, setStorage] = useLocalStorage<StorageData>("thesis-prompts", {});
  const [aiResponse, setAIResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(null);

  // Load template from localStorage if exists
  useEffect(() => {
    const templateData = localStorage.getItem("thesis-prompt-template");
    if (templateData) {
      const { title, prompt, category, major } = JSON.parse(templateData);
      setTitle(title);
      setPrompt(prompt);
      setCategory(category);
      setMajor(major);
      localStorage.removeItem("thesis-prompt-template");
    }
  }, []);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("gemini_api_key");
    setApiKey(savedApiKey);
  }, []);

  // Save draft with both category and major
  const saveDraft = useCallback((newPrompt: string, newTitle: string, newCategory: string, newMajor: string) => {
    const draftId = "draft";
    const now = new Date().toISOString();
    setStorage((prevStorage) => {
      const newStorage: StorageData = {
        ...(prevStorage || {}),
        [draftId]: {
          id: draftId,
          title: newTitle,
          prompt: newPrompt,
          category: newCategory,
          major: newMajor,
          createdAt: prevStorage?.[draftId]?.createdAt || now,
          updatedAt: now,
          lastEdited: now
        }
      };
      return newStorage;
    });
  }, [setStorage]);

  // Debounce saveDraft
  const debouncedSaveDraft = useRef(
    debounce((newPrompt: string, newTitle: string, newCategory: string, newMajor: string) => {
      saveDraft(newPrompt, newTitle, newCategory, newMajor);
    }, 1000)
  ).current;

  // Auto-save draft when prompt, title, category, or major changes
  useEffect(() => {
    debouncedSaveDraft(prompt, title, category, major);
    return () => {
      debouncedSaveDraft.cancel();
    };
  }, [prompt, title, category, major, debouncedSaveDraft]);

  const handleInsertTemplate = (template: string) => {
    setPrompt(template);
    toast.success("Template berhasil dimasukkan");
  };

  const handleSave = useCallback(() => {
    const timestamp = new Date().toISOString();
    const promptId = `prompt_${timestamp}`;
    setStorage((prevStorage) => {
      const newStorage: StorageData = {
        ...(prevStorage || {}),
        [promptId]: {
          id: promptId,
          title,
          prompt,
          category,
          major,
          createdAt: timestamp,
          updatedAt: timestamp
        }
      };
      return newStorage;
    });
    toast.success("Prompt berhasil disimpan!");
  }, [title, prompt, category, major, setStorage]);

  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        if (importedData.prompt && importedData.title) {
          setTitle(importedData.title);
          setPrompt(importedData.prompt);
          setCategory(importedData.category || "computer-science");
          setMajor(importedData.major || "computer-science");
          toast.success("Prompt imported successfully!");
        } else {
          toast.error("Invalid prompt format");
        }
      } catch (error) {
        toast.error("Error importing prompt file");
        console.error(error);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }, []);

  const handleGetAiSuggestion = async () => {
    if (!aiQuery.trim()) {
      toast.error("Masukkan pertanyaan terlebih dahulu");
      return;
    }

    if (!apiKey) {
      toast.error("API Key Gemini belum dikonfigurasi. Silakan tambahkan API Key di halaman Settings untuk menggunakan fitur AI Helper.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Anda adalah asisten AI yang membantu memperbaiki prompt. Prompt yang ada: "${prompt.replace(/"/g, '\\"')}"\n\nPertanyaan: ${aiQuery.replace(/"/g, '\\"')}\n\nBeri saran untuk memperbaiki prompt tersebut dengan format yang jelas dan terstruktur.`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Gagal mendapatkan saran");
      }

      const data = await response.json();
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Format response tidak valid");
      }

      const suggestionText = data.candidates[0].content.parts[0].text;
      setAiSuggestion(suggestionText);
    } catch (error) {
      console.error("Error details:", error);
      toast.error(
        error instanceof Error 
          ? `Gagal mendapatkan saran: ${error.message}`
          : "Terjadi kesalahan saat memproses request"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto p-4 md:p-8">
        <Card className="border-0 shadow-none mb-6">
          <CardHeader className="px-0 pt-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl md:text-3xl">Prompt Editor</CardTitle>
                <CardDescription>
                  Buat dan edit prompt tesis Anda
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex gap-2">
                  <Select value={major} onValueChange={setMajor}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Pilih jurusan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {majors.map((major) => (
                          <SelectItem key={major.value} value={major.value}>
                            {major.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <ExportDialog title={title} content={prompt} category={category} />
                <div className="relative">
                  <input
                    type="file"
                    id="import-prompt"
                    accept=".json"
                    onChange={handleImport}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="outline">
                    <FileUp className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                </div>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Simpan
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PromptEditor
              prompt={prompt}
              onPromptChange={setPrompt}
              title={title}
              onTitleChange={setTitle}
              category={category}
              onCategoryChange={setCategory}
            />
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit">
                <PromptPreview content={prompt} />
              </TabsContent>
              <TabsContent value="preview">
                <PromptPreview content={prompt} />
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <PromptConfigPanel onInsertTemplate={handleInsertTemplate} />
            <EditorToolbar onSave={handleSave} onImport={handleImport} />
            <Card>
              <CardHeader>
                <CardTitle>AI Helper</CardTitle>
                <CardDescription>
                  Dapatkan saran dari AI untuk meningkatkan prompt Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">AI Helper</h3>
                  {!apiKey && (
                    <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">
                        ⚠️ API Key Gemini belum dikonfigurasi. Silakan tambahkan API Key di halaman Settings untuk menggunakan fitur AI Helper.
                      </span>
                    </div>
                  )}
                  {apiKey && (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">
                        ✅ API Key Gemini sudah dikonfigurasi. Anda dapat menggunakan fitur AI Helper.
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <Input
                    placeholder="Tanyakan AI untuk saran perbaikan prompt..."
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleGetAiSuggestion();
                      }
                    }}
                    disabled={!apiKey}
                  />
                  <Button
                    onClick={handleGetAiSuggestion}
                    disabled={isLoading || !aiQuery.trim() || !apiKey}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Dapatkan Saran
                      </>
                    )}
                  </Button>
                  {aiSuggestion && (
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Saran AI:</h4>
                      <p className="text-sm whitespace-pre-wrap">{aiSuggestion}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}