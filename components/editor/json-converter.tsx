import { Button } from "@/components/ui/button";
import { FileJson } from "lucide-react";

interface JSONConverterProps {
  title: string;
  content: string;
  category: string;
}

export function JSONConverter({ title, content, category }: JSONConverterProps) {
  const handleExportJSON = () => {
    const data = {
      title,
      content,
      category,
      metadata: {
        createdAt: new Date().toISOString(),
        version: "1.0",
        format: "thesis-prompt"
      }
    };

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" onClick={handleExportJSON}>
      <FileJson className="mr-2 h-4 w-4" />
      JSON
    </Button>
  );
} 