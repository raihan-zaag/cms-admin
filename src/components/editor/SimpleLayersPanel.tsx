import React from 'react';
import { useEditor } from '@craftjs/core';

export const SimpleLayersPanel: React.FC = () => {
  const { nodes, selected, actions } = useEditor((state) => ({
    nodes: state.nodes,
    selected: state.events.selected,
  }));

  // Build a tree structure from the nodes
  const buildTree = (nodeId: string, depth = 0): any => {
    const node = nodes[nodeId];
    if (!node) return null;

    const children = node.data.nodes || [];
    const displayName = (node.data.type as any)?.craft?.displayName || 
                       (node.data.type as any)?.resolvedName || 
                       (typeof node.data.type === 'string' ? node.data.type : 'Component');

    return {
      id: nodeId,
      node,
      displayName,
      depth,
      children: children.map((childId: string) => buildTree(childId, depth + 1)).filter(Boolean)
    };
  };

  const renderNode = (treeNode: any) => {
    const isSelected = selected && (typeof selected === 'object' && 'has' in selected) 
      ? selected.has(treeNode.id) 
      : selected === treeNode.id;

    return (
      <div key={treeNode.id}>
        <div
          className={`
            flex items-center py-2 px-2 rounded-md cursor-pointer transition-colors
            ${isSelected 
              ? 'bg-blue-100 text-blue-800 border-l-2 border-blue-500' 
              : 'hover:bg-gray-100 text-gray-700'
            }
          `}
          style={{ paddingLeft: `${treeNode.depth * 16 + 8}px` }}
          onClick={() => {
            if (treeNode.id) {
              actions.selectNode(treeNode.id);
            }
          }}
        >
          <div className="flex items-center space-x-2 flex-1">
            <div className="flex items-center space-x-1">
              <div className={`w-3 h-3 rounded-sm ${
                isSelected ? 'bg-blue-500' : 'bg-gray-300'
              }`}></div>
              <span className="text-sm font-medium">
                {treeNode.displayName}
              </span>
            </div>
          </div>
        </div>
        {treeNode.children.map(renderNode)}
      </div>
    );
  };

  // Find the root node (usually the first node without a parent)
  const rootNodes = Object.keys(nodes).filter(id => !nodes[id].data.parent);
  
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Layers</h3>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 min-h-[200px]">
        {rootNodes.length === 0 ? (
          <div className="text-gray-500 text-sm p-4">
            No components added yet. Drag components from the toolbox to start building.
          </div>
        ) : (
          <div className="space-y-1">
            {rootNodes.map(rootId => {
              const tree = buildTree(rootId);
              return tree ? renderNode(tree) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
