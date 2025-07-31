import React, { useState } from 'react';
import { generateTextContent } from '@/services/gemini';
import { Wand2, Loader2, X } from 'lucide-react';

interface AIContentGeneratorProps {
  onContentGenerated: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({
  onContentGenerated,
  placeholder = 'Describe the content you want to generate...',
  className = ''
}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const generatedContent = await generateTextContent(prompt);
      onContentGenerated(generatedContent);
      setPrompt('');
      setShowPrompt(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
    if (e.key === 'Escape') {
      setShowPrompt(false);
      setPrompt('');
      setError(null);
    }
  };

  const examplePrompts = [
    'Write a compelling headline for a tech startup',
    'Create a professional bio for a designer', 
    'Generate a product description for a mobile app',
    'Write engaging call-to-action text',
    'Create a testimonial quote',
    'Write a company mission statement'
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowPrompt(true)}
        className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors shadow-md ${className}`}
        title="Generate content with AI"
      >
        <Wand2 className="h-3 w-3" />
        AI Generate
      </button>

      {/* Modal positioned relative to button with backdrop */}
      {showPrompt && (
        <React.Fragment>
          {/* Backdrop overlay for clicking outside to close */}
          <div 
            className="fixed inset-0 z-[9998]"
            onClick={() => {
              setShowPrompt(false);
              setPrompt('');
              setError(null);
            }}
          />
          <div className="absolute top-full left-0 mt-2 z-[9999]">
            <div className="bg-white border border-gray-200 rounded-lg shadow-xl w-96 max-w-[90vw] max-h-[90vh] overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-900">AI Content Generator</h4>
              <button
                onClick={() => {
                  setShowPrompt(false);
                  setPrompt('');
                  setError(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {error && (
              <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                className="w-full p-3 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={4}
                disabled={isLoading}
                maxLength={200}
                autoFocus
              />

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{prompt.length}/200</span>
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      Generate
                    </>
                  )}
                </button>
              </div>

              {/* Example prompts */}
              <div>
                <div className="text-xs text-gray-600 mb-2">Examples:</div>
                <div className="flex flex-wrap gap-1">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(example)}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                      disabled={isLoading}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                Press Enter to generate, Shift+Enter for new line, Esc to close
              </div>
            </div>
          </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default AIContentGenerator;
