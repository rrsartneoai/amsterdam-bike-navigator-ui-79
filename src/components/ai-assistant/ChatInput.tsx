
import React, { useEffect } from 'react';
import { Send, Sparkles, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useToast } from '@/hooks/use-toast';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
}

const ChatInput = ({ value, onChange, onSend, onKeyPress, isLoading }: ChatInputProps) => {
  const { isListening, transcript, startListening, stopListening, resetTranscript, error } = useSpeechRecognition();
  const { toast } = useToast();

  useEffect(() => {
    if (transcript) {
      onChange(transcript);
      resetTranscript();
    }
  }, [transcript, onChange, resetTranscript]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Błąd nagrywania",
        description: error,
        variant: "destructive"
      });
    }
  }, [error, toast]);

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="glass border-t border-white/10 p-4">
      <div className="flex gap-3">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Zadaj pytanie prawne..."
          disabled={isLoading}
          className="flex-1 glass-card border-white/20 focus:border-blue-400 focus:ring-blue-400 bg-white/5 text-white placeholder:text-white/60 rounded-2xl"
        />
        <Button
          onClick={handleMicClick}
          disabled={isLoading}
          size="icon"
          className={`glass-card rounded-2xl shadow-lg border-0 glow-hover transition-all ${
            isListening 
              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse' 
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
          }`}
        >
          {isListening ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
        <Button
          onClick={onSend}
          disabled={isLoading || !value.trim()}
          size="icon"
          className="glass-card rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg border-0 glow-hover"
        >
          {isLoading ? (
            <Sparkles className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
      <p className="text-xs text-white/60 mt-2 text-center flex items-center justify-center gap-1">
        <Sparkles className="h-3 w-3" />
        AI może popełniać błędy. Zawsze weryfikuj informacje prawne.
      </p>
    </div>
  );
};

export default ChatInput;
