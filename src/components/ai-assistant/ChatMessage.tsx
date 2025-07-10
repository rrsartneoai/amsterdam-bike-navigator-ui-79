import React from 'react';
import { Bot, User, Volume2, VolumeX } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useToast } from '@/hooks/use-toast';

interface Source {
  title: string;
  snippet: string;
  confidence: number;
}

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  sources?: Source[];
}

const ChatMessage = ({ content, role, sources }: ChatMessageProps) => {
  const isUser = role === 'user';
  const { isPlaying, speak, stop, error } = useTextToSpeech();
  const { toast } = useToast();

  const handleSpeak = async () => {
    if (isPlaying) {
      stop();
    } else {
      try {
        await speak(content);
      } catch (err) {
        toast({
          title: "Błąd odtwarzania",
          description: "Nie udało się odtworzyć wiadomości",
          variant: "destructive"
        });
      }
    }
  };

  React.useEffect(() => {
    if (error) {
      toast({
        title: "Błąd audio",
        description: error,
        variant: "destructive"
      });
    }
  }, [error, toast]);

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 ${isUser ? 'order-2' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
            : 'bg-gradient-to-r from-green-500 to-teal-600'
        }`}>
          {isUser ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
        </div>
      </div>
      
      <div className={`flex-1 ${isUser ? 'order-1' : ''}`}>
        <Card className={`p-3 max-w-[85%] ${
          isUser 
            ? 'ml-auto bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-400/30' 
            : 'bg-white/10 border-white/20'
        } backdrop-blur-sm`}>
          <div className="flex items-start justify-between gap-2">
            <div className="text-sm text-white leading-relaxed whitespace-pre-wrap flex-1">
              {content}
            </div>
            
            {!isUser && (
              <Button
                onClick={handleSpeak}
                size="sm"
                variant="ghost"
                className="flex-shrink-0 h-6 w-6 p-0 hover:bg-white/10 rounded-full"
              >
                {isPlaying ? (
                  <VolumeX className="h-3 w-3 text-white/70" />
                ) : (
                  <Volume2 className="h-3 w-3 text-white/70" />
                )}
              </Button>
            )}
          </div>
          
          {sources && sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <p className="text-xs text-white/70 mb-2">Źródła:</p>
              <div className="space-y-1">
                {sources.map((source, index) => (
                  <div key={index} className="text-xs text-white/60 bg-white/5 rounded p-2">
                    <div className="font-medium text-white/80">{source.title}</div>
                    <div className="mt-1">{source.snippet}</div>
                    <div className="mt-1 text-green-400">Pewność: {Math.round(source.confidence * 100)}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;