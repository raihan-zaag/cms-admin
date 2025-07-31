import React from 'react';
import { generateCraftJSFromPrompt, generateTextContent } from '@/services/gemini';

const AITestComponent: React.FC = () => {
  const testCraftJSGeneration = async () => {
    try {
      console.log('Testing CraftJS generation...');
      const result = await generateCraftJSFromPrompt({
        prompt: 'Add a simple text component with hello world',
        context: 'Testing'
      });
      console.log('Generated CraftJS:', result);
      alert('Check console for generated CraftJS JSON');
    } catch (error) {
      console.error('CraftJS generation failed:', error);
      alert('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const testTextGeneration = async () => {
    try {
      console.log('Testing text generation...');
      const result = await generateTextContent('Write a simple hello world message');
      console.log('Generated text:', result);
      alert('Generated text: ' + result);
    } catch (error) {
      console.error('Text generation failed:', error);
      alert('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
      <h3 className="text-sm font-bold mb-2">AI Test Panel</h3>
      <div className="space-y-2">
        <button
          onClick={testCraftJSGeneration}
          className="w-full px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test CraftJS Generation
        </button>
        <button
          onClick={testTextGeneration}
          className="w-full px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Text Generation
        </button>
      </div>
    </div>
  );
};

export default AITestComponent;
