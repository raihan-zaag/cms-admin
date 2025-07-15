import React from 'react';
import { Layers } from '@craftjs/layers';
import { useEditor } from '@craftjs/core';

export const LayersPanel: React.FC = () => {
  const { selected } = useEditor((state) => ({
    selected: state.events.selected,
  }));

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Layers</h3>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
        <Layers 
          expandRootOnLoad={true}
          renderLayer={({ layer, children, depth }) => {
            if (!layer) return null;
            
            const layerId = layer.id || layer.nodeId;
            const isSelected = selected && layerId && selected.has(layerId);
            
            return (
              <div
                className={`
                  flex items-center py-1 px-2 rounded-md cursor-pointer transition-colors
                  ${isSelected 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'hover:bg-gray-100'
                  }
                `}
                style={{ paddingLeft: `${depth * 12 + 8}px` }}
              >
                <div className="flex items-center space-x-2 flex-1">
                  <span className="text-sm font-medium">
                    {layer.data?.custom?.displayName || 
                     layer.data?.type?.resolvedName || 
                     layer.data?.displayName ||
                     'Component'}
                  </span>
                </div>
                {children}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
