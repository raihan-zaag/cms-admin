
import { RenderButton } from '@/components/static/RenderButton';
import { RenderContainer } from '@/components/static/RenderContainer';
import { RenderImage } from '@/components/static/RenderImage';
import { RenderText } from '@/components/static/RenderText';
import React from 'react';
import ReactDOMServer from 'react-dom/server';


type CraftNodeType = {
  id?: string;
  type: {
    resolvedName: string;
  };
  props: Record<string, any>;
  displayName?: string;
  isCanvas?: boolean;
  parent?: string;
  hidden?: boolean;
  nodes?: string[];
  linkedNodes?: Record<string, string>;
  custom?: Record<string, any>;
};

type CraftJson = Record<string, CraftNodeType>;

// Maps resolved component names to actual React components
const componentMap: Record<string, React.ElementType> = {
  Container: RenderContainer,
  ContainerCopy: RenderContainer,
  Text: RenderText,
  Button: RenderButton,
  ImageComponent: RenderImage
};

function renderNode(node: CraftNodeType, allNodes: CraftJson, nodeId?: string): React.ReactElement | null {
  const Component = componentMap[node.type.resolvedName];
  if (!Component) {
    console.warn(`Unknown component type: ${node.type.resolvedName}`);
    return null;
  }

  const children = (node.nodes || []).map(childId => {
    const childNode = allNodes[childId];
    if (!childNode) {
      console.warn(`Child node not found: ${childId}`);
      return null;
    }
    return renderNode(childNode, allNodes, childId);
  }).filter(Boolean);

  return (
    <Component key={nodeId || node.id} {...node.props}>
      {children}
    </Component>
  );
}

export function convertCraftJsonToHtml(json: CraftJson): string {
  const rootNode = json['ROOT'];
  if (!rootNode) {
    throw new Error('Missing ROOT node in JSON');
  }

  try {
    const tree = renderNode(rootNode, json, 'ROOT');
    if (!tree) {
      throw new Error('Failed to render root node');
    }
    return ReactDOMServer.renderToStaticMarkup(tree);
  } catch (error) {
    console.error('Error converting Craft JSON to HTML:', error);
    console.error('JSON structure:', JSON.stringify(json, null, 2));
    throw error;
  }
}
