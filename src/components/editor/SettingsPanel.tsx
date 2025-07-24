import React from 'react';
import { useEditor } from '@craftjs/core';
import { 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  MoveUp, 
  MoveDown 
} from 'lucide-react';

export const SettingsPanel: React.FC = () => {
  const { selected, actions, query } = useEditor((_, query) => {
    const currentlySelectedNodeId = query.getEvent('selected').first();
    return {
      selected: currentlySelectedNodeId,
    };
  });

  const handleMoveUp = () => {
    if (selected) {
      const node = query.node(selected).get();
      const parent = node.data.parent;
      
      if (parent) {
        const parentNode = query.node(parent).get();
        const siblings = parentNode.data.nodes || [];
        const currentIndex = siblings.indexOf(selected);
        
        if (currentIndex > 0) {
          actions.move(selected, parent, currentIndex - 1);
        }
      }
    }
  };

  const handleMoveDown = () => {
    if (selected) {
      const node = query.node(selected).get();
      const parent = node.data.parent;
      
      if (parent) {
        const parentNode = query.node(parent).get();
        const siblings = parentNode.data.nodes || [];
        const currentIndex = siblings.indexOf(selected);
        
        if (currentIndex < siblings.length - 1) {
          actions.move(selected, parent, currentIndex + 1);
        }
      }
    }
  };

  const handleMoveToTop = () => {
    if (selected) {
      const node = query.node(selected).get();
      const parent = node.data.parent;
      if (parent) {
        actions.move(selected, parent, 0);
      }
    }
  };

  const handleMoveToBottom = () => {
    if (selected) {
      const node = query.node(selected).get();
      const parent = node.data.parent;
      
      if (parent) {
        const parentNode = query.node(parent).get();
        const siblings = parentNode.data.nodes || [];
        actions.move(selected, parent, siblings.length - 1);
      }
    }
  };

  return (
    <div className=" bg-gray-50  border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Settings</h3>
      
      {selected && (
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">Element Properties</h4>
            {(() => {
              const node = query.node(selected).get();
              const Related = node.related && node.related.settings;
              
              return Related ? <Related /> : (
                <p className="text-sm text-gray-500">
                  No settings available for this element
                </p>
              );
            })()}
          </div>

          {/* Movement Actions */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">Position</h4>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                onClick={handleMoveUp}
                className="px-3 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowUp className="h-4 w-4" />
                Up
              </button>
              
              <button
                onClick={handleMoveDown}
                className="px-3 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowDown className="h-4 w-4" />
                Down
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleMoveToTop}
                className="px-3 py-2 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                <MoveUp className="h-4 w-4" />
                To Top
              </button>
              
              <button
                onClick={handleMoveToBottom}
                className="px-3 py-2 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                <MoveDown className="h-4 w-4" />
                To Bottom
              </button>
            </div>
          </div>

          {/* Delete Action */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">Danger Zone</h4>
            <button
              onClick={() => {
                actions.delete(selected);
              }}
              className="w-full px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Element
            </button>
          </div>
        </div>
      )}

      {!selected && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">
            Select an element to view its settings
          </p>
        </div>
      )}
    </div>
  );
};
