import React from 'react';
import { useEditor } from '@craftjs/core';

export const Viewport: React.FC = () => {
  const { enabled, actions } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Canvas</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => actions.setOptions(options => options.enabled = !enabled)}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              enabled 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            {enabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>
      
      <div className="h-full min-h-[600px] bg-gray-50 relative overflow-auto">
        <div 
          className="absolute inset-0 p-4"
          style={{
            background: `
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(180deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        >
          {/* The canvas content will be rendered here by CraftJS */}
        </div>
      </div>
    </div>
  );
};
