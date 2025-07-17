
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
  Text: RenderText,
  Button: RenderButton,
  ImageComponent: RenderImage
};

function renderNode(node: CraftNodeType, allNodes: CraftJson): React.ReactElement | null {
  const Component = componentMap[node.type.resolvedName];
  if (!Component) return null;

  const children = (node.nodes || []).map(id => {
    const childNode = allNodes[id];
    if (!childNode) return null;
    return renderNode(childNode, allNodes);
  });

  return (
    <Component key={node.id} {...node.props}>
      {children}
    </Component>
  );
}

export function convertCraftJsonToHtml(json: CraftJson): string {
  const rootNode = json['ROOT'];
  if (!rootNode) {
    throw new Error('Missing ROOT node in JSON');
  }

  const tree = renderNode(rootNode, json);
  return ReactDOMServer.renderToStaticMarkup(tree);
}
