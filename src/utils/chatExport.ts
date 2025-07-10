import jsPDF from 'jspdf';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sources?: Array<{ title: string; snippet: string; confidence: number }>;
}

export const exportToPDF = (messages: Message[], filename = 'rozmowa-prawnik-pl') => {
  const doc = new jsPDF({
    putOnlyUsedFonts: true,
    compress: true
  });
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  
  // Header
  doc.setFontSize(20);
  doc.text('Prawnik.PL - Zapis Rozmowy', margin, 30);
  
  doc.setFontSize(12);
  doc.text(`Data eksportu: ${new Date().toLocaleDateString('pl-PL')}`, margin, 45);
  
  let yPosition = 60;
  
  messages.forEach((message, index) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }
    
    // Message header
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    const role = message.role === 'user' ? 'Użytkownik' : 'AI Asystent';
    const time = message.timestamp.toLocaleTimeString('pl-PL');
    doc.text(`${role} (${time}):`, margin, yPosition);
    
    yPosition += 10;
    
    // Message content with proper Polish character encoding
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    // Ensure proper encoding for Polish characters
    const encodedContent = decodeURIComponent(encodeURIComponent(message.content));
    const lines = doc.splitTextToSize(encodedContent, maxWidth);
    doc.text(lines, margin, yPosition);
    yPosition += lines.length * 5 + 10;
    
    // Sources if available
    if (message.sources && message.sources.length > 0) {
      doc.setFontSize(8);
      doc.setFont(undefined, 'italic');
      doc.text('Źródła:', margin, yPosition);
      yPosition += 5;
      
      message.sources.forEach((source) => {
        const sourceText = `• ${source.title} (pewność: ${Math.round(source.confidence * 100)}%)`;
        doc.text(sourceText, margin + 10, yPosition);
        yPosition += 4;
      });
      yPosition += 5;
    }
    
    yPosition += 5; // Extra space between messages
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Strona ${i} z ${pageCount}`, pageWidth - 30, doc.internal.pageSize.getHeight() - 10);
  }
  
  doc.save(`${filename}.pdf`);
};

export const exportToTXT = (messages: Message[], filename = 'rozmowa-prawnik-pl') => {
  let content = 'PRAWNIK.PL - ZAPIS ROZMOWY\n';
  content += '='.repeat(50) + '\n';
  content += `Data eksportu: ${new Date().toLocaleDateString('pl-PL')} ${new Date().toLocaleTimeString('pl-PL')}\n\n`;
  
  messages.forEach((message, index) => {
    const role = message.role === 'user' ? 'UŻYTKOWNIK' : 'AI ASYSTENT';
    const time = message.timestamp.toLocaleTimeString('pl-PL');
    
    content += `${role} (${time}):\n`;
    content += '-'.repeat(30) + '\n';
    content += `${message.content}\n`;
    
    if (message.sources && message.sources.length > 0) {
      content += '\nŹRÓDŁA:\n';
      message.sources.forEach((source) => {
        content += `• ${source.title} (pewność: ${Math.round(source.confidence * 100)}%)\n`;
      });
    }
    
    content += '\n' + '='.repeat(50) + '\n\n';
  });
  
  // Add BOM for proper UTF-8 encoding
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};