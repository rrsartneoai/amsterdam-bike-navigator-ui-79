
import React from 'react';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
  isLoading: boolean;
}

const SuggestedQuestions = ({ questions, onQuestionClick, isLoading }: SuggestedQuestionsProps) => {
  return (
    <div className="px-2">
      <p className="text-xs text-gray-500 mb-2">Przykładowe pytania:</p>
      <div className="space-y-1">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="text-left w-full text-xs p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
            disabled={isLoading}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
