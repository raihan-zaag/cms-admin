import React from 'react';
import { useEditor, type Node } from '@craftjs/core';

interface TreeNode {
  id: string;
  node: Node;
  displayName: string;
  depth: number;
  children: TreeNode[];
}

interface ComponentType {
  craft?: {
    displayName?: string;
  };
  resolvedName?: string;
}

export const LayersPanel: React.FC = () => {
  const { nodes, selected, actions } = useEditor((state) => ({
    nodes: state.nodes,
    selected: state.events.selected,
  }));

  // Build a tree structure from the nodes
  const buildTree = React.useCallback((nodeId: string, depth = 0): TreeNode | null => {
    const node = nodes[nodeId];
    if (!node) return null;

    const children = node.data.nodes || [];
    const componentType = node.data.type as ComponentType;
    const displayName = componentType?.craft?.displayName || 
                       componentType?.resolvedName || 
                       (typeof node.data.type === 'string' ? node.data.type : 'Component');

    return {
      id: nodeId,
      node,
      displayName,
      depth,
      children: children.map((childId: string) => buildTree(childId, depth + 1)).filter((child): child is TreeNode => child !== null)
    };
  }, [nodes]);

  const renderNode = React.useCallback((treeNode: TreeNode): React.ReactElement => {
    const isSelected = selected && (typeof selected === 'object' && 'has' in selected) 
      ? (selected as Set<string>).has(treeNode.id) 
      : selected === treeNode.id;

    const handleClick = () => {
      if (treeNode.id) {
        actions.selectNode(treeNode.id);
      }
    };

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
          onClick={handleClick}
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
  }, [selected, actions]);

  // Find the root node (usually the first node without a parent)
  const rootNodes = React.useMemo(() => 
    Object.keys(nodes).filter(id => !nodes[id]?.data?.parent),
    [nodes]
  );
  
  return (
    <div className=" bg-gray-50  border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Layers</h3>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 min-h-[200px]">
        {rootNodes.length === 0 ? (
          <div className="text-gray-500 text-sm p-4 text-center">
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
