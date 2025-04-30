"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Send } from "lucide-react"
import { toast } from "sonner"

interface AIHelperProps {
  content: string
}

export function AIHelper({ content }: AIHelperProps) {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestion, setSuggestion] = useState("")
  const [apiKey, setApiKey] = useState<string | null>(null)

  useEffect(() => {
    // Akses localStorage hanya di sisi client
    const savedApiKey = localStorage.getItem("gemini_api_key")
    setApiKey(savedApiKey)
  }, [])

  const handleGetSuggestion = async () => {
    if (!query.trim()) {
      toast.error("Masukkan pertanyaan terlebih dahulu")
      return
    }

    if (!apiKey) {
      toast.error("API Key Gemini belum dikonfigurasi. Silakan atur di halaman Settings")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Prompt yang ada: "${content.replace(/"/g, '\\"')}"\n\nPertanyaan: ${query.replace(/"/g, '\\"')}\n\nBeri saran untuk memperbaiki prompt tersebut.`
            }]
          }]
        })
      })

      if (!response.ok) {
        throw new Error("Gagal mendapatkan saran")
      }

      const data = await response.json()
      const suggestionText = data.candidates[0].content.parts[0].text
      setSuggestion(suggestionText)
    } catch (error) {
      console.error(error)
      toast.error("Gagal mendapatkan saran dari AI")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>AI Helper</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Tanyakan AI untuk saran perbaikan prompt..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleGetSuggestion()
              }
            }}
            disabled={!apiKey}
          />
          <Button 
            onClick={handleGetSuggestion}
            disabled={isLoading || !apiKey}
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
        </div>
        
        {suggestion && (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Saran AI:</h4>
            <p className="text-sm whitespace-pre-wrap">{suggestion}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 