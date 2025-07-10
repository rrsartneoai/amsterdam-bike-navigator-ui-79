
import React, { useState, useEffect, useRef } from 'react';
import { X, Bot, Download, FileText, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRAGService } from '@/hooks/useRAGService';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';
import ChatInput from './ChatInput';
import FloatingChatButton from './FloatingChatButton';
import LoadingIndicator from './LoadingIndicator';
import { exportToPDF, exportToTXT } from '@/utils/chatExport';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sources?: Array<{ title: string; snippet: string; confidence: number }>;
}

const AIAssistantChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Witaj! Jestem Twoim AI asystentem prawnym obsługiwanym przez Google Gemini Flash 2.5. Mogę pomóc Ci w:\n\n• Analizie umów i dokumentów prawnych\n• Wyjaśnieniu przepisów prawa polskiego\n• Przygotowaniu wzorców dokumentów\n• Odpowiedziach na pytania prawne\n\nJak mogę Ci dzisiaj pomóc?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { queryRAG, isLoading } = useRAGService();
  const { toast } = useToast();

  const suggestedQuestions = [
    "Jakie są kluczowe elementy umowy o pracę?",
    "Jak rozwiązać umowę o pracę za wypowiedzeniem?",
    "Czym różni się umowa zlecenia od umowy o dzieło?",
    "Jakie obowiązki wynikają z RODO?"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlinking(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsBlinking(false);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');

    try {
      console.log('Wysyłanie zapytania do RAG:', currentInput);
      const response = await queryRAG(currentInput);
      console.log('Otrzymana odpowiedź RAG:', response);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.answer,
        role: 'assistant',
        timestamp: new Date(),
        sources: response.sources
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Błąd podczas wysyłania wiadomości:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Przepraszam, wystąpił błąd podczas przetwarzania Twojego pytania. Spróbuj ponownie lub sformułuj pytanie inaczej.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleExportPDF = () => {
    try {
      exportToPDF(messages);
      toast({
        title: "Eksport zakończony",
        description: "Rozmowa została zapisana jako PDF",
      });
    } catch (error) {
      toast({
        title: "Błąd eksportu",
        description: "Nie udało się wyeksportować rozmowy",
        variant: "destructive",
      });
    }
  };

  const handleExportTXT = () => {
    try {
      exportToTXT(messages);
      toast({
        title: "Eksport zakończony",
        description: "Rozmowa została zapisana jako TXT",
      });
    } catch (error) {
      toast({
        title: "Błąd eksportu",
        description: "Nie udało się wyeksportować rozmowy",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) {
    return (
      <FloatingChatButton 
        isBlinking={isBlinking} 
        onClick={() => setIsOpen(true)} 
      />
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px]">
      <Card className="h-full flex flex-col shadow-2xl border-2 border-blue-200">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Asystent Prawny
            </CardTitle>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-blue-700 hover:bg-opacity-50"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleExportPDF}>
                    <FileImage className="mr-2 h-4 w-4" />
                    Eksportuj jako PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportTXT}>
                    <FileText className="mr-2 h-4 w-4" />
                    Eksportuj jako TXT
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 hover:bg-opacity-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-xs text-blue-100 flex items-center gap-1">
            <span>Powered by</span>
            <span className="font-semibold">Gemini Flash 2.5</span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-3 p-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                role={message.role}
                sources={message.sources}
              />
            ))}
            
            {messages.length <= 2 && (
              <SuggestedQuestions
                questions={suggestedQuestions}
                onQuestionClick={handleSuggestedQuestion}
                isLoading={isLoading}
              />
            )}
            
            {isLoading && <LoadingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            value={inputMessage}
            onChange={setInputMessage}
            onSend={handleSendMessage}
            onKeyPress={handleKeyPress}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistantChatbot;
