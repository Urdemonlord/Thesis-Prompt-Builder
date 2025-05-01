import { Button } from "@/components/ui/button";
import { FileCode } from "lucide-react";

interface WordConverterProps {
  title: string;
  content: string;
  category: string;
}

export function WordConverter({ title, content, category }: WordConverterProps) {
  const handleExportWord = () => {
    // Convert markdown to DOCX using a more structured approach
    const docxContent = `
      <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
        <w:body>
          <w:p>
            <w:pPr>
              <w:pStyle w:val="Title"/>
            </w:pPr>
            <w:r>
              <w:t>${title}</w:t>
            </w:r>
          </w:p>
          
          <w:p>
            <w:pPr>
              <w:pStyle w:val="Subtitle"/>
            </w:pPr>
            <w:r>
              <w:t>Kategori: ${category}</w:t>
            </w:r>
          </w:p>
          
          <w:p>
            <w:pPr>
              <w:pStyle w:val="Normal"/>
            </w:pPr>
            <w:r>
              <w:t>${content}</w:t>
            </w:r>
          </w:p>
        </w:body>
      </w:document>
    `;

    const blob = new Blob([docxContent], { 
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" onClick={handleExportWord}>
      <FileCode className="mr-2 h-4 w-4" />
      Word
    </Button>
  );
} 