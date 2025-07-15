import React from 'react';
import { Layers } from '@craftjs/layers';
import { useEditor } from '@craftjs/core';

export const LayersPanel: React.FC = () => {
  const { selected, actions, nodes } = useEditor((state) => ({
    selected: state.events.selected,
    nodes: state.nodes,
  }));

  // Debug logging
  console.log('LayersPanel - Selected:', selected);
  console.log('LayersPanel - Nodes:', Object.keys(nodes));

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Layers</h3>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 min-h-[200px]">
        {Object.keys(nodes).length === 0 ? (
          <div className="text-gray-500 text-sm p-4">
            No components added yet. Drag components from the toolbox to start building.
          </div>
        ) : (
          <Layers 
            expandRootOnLoad={true}
            renderLayer={({ layer, children, depth }) => {
              console.log('Rendering layer:', layer);
              
              if (!layer) {
                console.log('Layer is null/undefined');
                return null;
              }
              
              const layerId = layer.id;
              const isSelected = selected && (typeof selected === 'object' && 'has' in selected) 
                ? selected.has(layerId) 
                : selected === layerId;
              
              // Get display name from various sources
              let displayName = 'Component';
              
              if (layer.data?.type?.craft?.displayName) {
                displayName = layer.data.type.craft.displayName;
              } else if (layer.data?.custom?.displayName) {
                displayName = layer.data.custom.displayName;
              } else if (layer.data?.displayName) {
                displayName = layer.data.displayName;
              } else if (layer.data?.type?.resolvedName) {
                displayName = layer.data.type.resolvedName.replace(/([A-Z])/g, ' $1').trim();
              } else if (layer.data?.type?.name) {
                displayName = layer.data.type.name;
              }
              
              console.log(`Layer ${layerId} displayName: ${displayName}`);
              
              return (
                <div
                  key={layerId}
                  className={`
                    flex items-center py-2 px-2 rounded-md cursor-pointer transition-colors
                    ${isSelected 
                      ? 'bg-blue-100 text-blue-800 border-l-2 border-blue-500' 
                      : 'hover:bg-gray-100 text-gray-700'
                    }
                  `}
                  style={{ paddingLeft: `${depth * 16 + 8}px` }}
                  onClick={() => {
                    console.log('Clicking on layer:', layerId);
                    if (layerId && actions) {
                      actions.selectNode(layerId);
                    }
                  }}
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="flex items-center space-x-1">
                      <div className={`w-3 h-3 rounded-sm ${
                        isSelected ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                      <span className="text-sm font-medium">
                        {displayName}
                      </span>
                    </div>
                  </div>
                  {children}
                </div>
              );
            }}
          />
        )}
      </div>
    </div>
  );
};
