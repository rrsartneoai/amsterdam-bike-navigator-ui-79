
import React from 'react';
import { Bot, Loader2 } from 'lucide-react';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 flex items-center gap-2 shadow-sm">
        <Bot className="h-4 w-4 text-blue-600" />
        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
        <span className="text-sm text-gray-600">Analizuję prawo polskie...</span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
