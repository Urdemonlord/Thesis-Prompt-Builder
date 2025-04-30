"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "sonner"

interface Template {
  id: string
  title: string
  description: string
  prompt: string
  category: string
}

interface TemplateCardProps {
  template: Template
  onUseTemplate: (template: string) => void
}

export function TemplateCard({ template, onUseTemplate }: TemplateCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(template.prompt)
    toast.success("Template disalin ke clipboard")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{template.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{template.description}</p>
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            onClick={() => onUseTemplate(template.prompt)}
          >
            Gunakan Template
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}