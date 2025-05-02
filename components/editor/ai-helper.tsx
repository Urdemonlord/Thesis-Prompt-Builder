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

    setIsLoading(true)
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          query
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Gagal mendapatkan saran")
      }

      const data = await response.json()
      
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Format response tidak valid")
      }

      const suggestionText = data.candidates[0].content.parts[0].text
      setSuggestion(suggestionText)
    } catch (error) {
      console.error("Error details:", error)
      toast.error(
        error instanceof Error 
          ? `Gagal mendapatkan saran: ${error.message}`
          : "Terjadi kesalahan saat memproses request"
      )
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