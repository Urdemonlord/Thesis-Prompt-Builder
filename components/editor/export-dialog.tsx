import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { useState } from "react";
import { PDFConverter } from "./pdf-converter";
import { WordConverter } from "./word-converter";
import { TextConverter } from "./text-converter";
import { JSONConverter } from "./json-converter";

interface ExportDialogProps {
  title: string;
  content: string;
  category: string;
}

export function ExportDialog({ title, content, category }: ExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Dokumen</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <PDFConverter title={title} content={content} category={category} />
          <WordConverter title={title} content={content} category={category} />
          <TextConverter title={title} content={content} category={category} />
          <JSONConverter title={title} content={content} category={category} />
        </div>
      </DialogContent>
    </Dialog>
  );
} 