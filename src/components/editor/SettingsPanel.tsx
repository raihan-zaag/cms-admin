import React from 'react';
import { useEditor } from '@craftjs/core';

export const SettingsPanel: React.FC = () => {
  const { selected, actions, query } = useEditor((_, query) => {
    const currentlySelectedNodeId = query.getEvent('selected').first();
    return {
      selected: currentlySelectedNodeId,
    };
  });

  return (
    <div className="w-64 bg-gray-50 border-l border-gray-200 p-4">
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

          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">Actions</h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  actions.delete(selected);
                }}
                className="w-full px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete Element
              </button>
              
              <button
                onClick={() => {
                  const node = query.node(selected).get();
                  const parent = node.data.parent;
                  if (parent) {
                    actions.move(selected, parent, 0);
                  }
                }}
                className="w-full px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Move to Top
              </button>
            </div>
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
