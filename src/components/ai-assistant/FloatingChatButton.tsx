
import React from 'react';
import { MessageCircle, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingChatButtonProps {
  isBlinking: boolean;
  onClick: () => void;
}

const FloatingChatButton = ({ isBlinking, onClick }: FloatingChatButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onClick}
        className={`glass-card rounded-full h-16 w-16 shadow-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 border-0 glow-hover ${
          isBlinking ? 'animate-pulse' : ''
        }`}
        size="icon"
      >
        <div className="relative">
          <MessageCircle className="h-7 w-7 text-white" />
          <Sparkles className="h-3 w-3 text-yellow-300 absolute -top-1 -right-1 animate-ping" />
        </div>
        {isBlinking && (
          <div className="absolute -top-2 -right-2 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-ping"></div>
        )}
      </Button>
      
      {isBlinking && (
        <div className="absolute -top-20 -left-40 glass-card bg-slate-900/90 text-white px-4 py-3 rounded-2xl text-sm whitespace-nowrap animate-bounce shadow-2xl border border-white/10">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-blue-400" />
            <span className="font-medium">Twój AI Prawnik</span>
          </div>
          <div className="text-xs text-slate-300 mt-1 flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Powered by Gemini Flash 2.5
          </div>
          <div className="absolute bottom-[-8px] left-10 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-slate-900/90"></div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatButton;
