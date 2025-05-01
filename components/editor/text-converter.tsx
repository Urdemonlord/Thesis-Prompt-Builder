import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface TextConverterProps {
  title: string;
  content: string;
  category: string;
}

export function TextConverter({ title, content, category }: TextConverterProps) {
  const handleExportText = () => {
    // Format the content with proper spacing and structure
    const formattedContent = `
${title}
${"=".repeat(title.length)}

Kategori: ${category}
Tanggal: ${new Date().toLocaleDateString('id-ID')}

${content}
    `.trim();

    const blob = new Blob([formattedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" onClick={handleExportText}>
      <FileText className="mr-2 h-4 w-4" />
      Text
    </Button>
  );
} 