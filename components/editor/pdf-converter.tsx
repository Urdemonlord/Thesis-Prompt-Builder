import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PDFConverterProps {
  title: string;
  content: string;
  category: string;
}

export function PDFConverter({ title, content, category }: PDFConverterProps) {
  const handleExportPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            @page {
              size: A4;
              margin: 2cm;
            }
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            h1 {
              color: #1a1a1a;
              font-size: 24px;
              margin-bottom: 20px;
              border-bottom: 2px solid #eee;
              padding-bottom: 10px;
            }
            .metadata {
              margin-bottom: 30px;
              color: #666;
            }
            .content {
              white-space: pre-wrap;
            }
            pre {
              background: #f5f5f5;
              padding: 15px;
              border-radius: 4px;
              overflow-x: auto;
            }
            code {
              font-family: 'Courier New', Courier, monospace;
            }
            blockquote {
              border-left: 4px solid #ddd;
              margin: 0;
              padding-left: 15px;
              color: #666;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f5f5f5;
            }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <div class="metadata">
            <p><strong>Kategori:</strong> ${category}</p>
            <p><strong>Tanggal:</strong> ${new Date().toLocaleDateString('id-ID')}</p>
          </div>
          <div class="content">
            ${content}
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Button variant="outline" onClick={handleExportPDF}>
      <Download className="mr-2 h-4 w-4" />
      PDF
    </Button>
  );
} 