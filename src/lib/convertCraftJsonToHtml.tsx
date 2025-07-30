
import { RenderButton } from '@/components/static/RenderButton';
import { RenderContainer } from '@/components/static/RenderContainer';
import { RenderImage } from '@/components/static/RenderImage';
import { RenderText } from '@/components/static/RenderText';
import { TokenProcessor } from '@/lib/token-processor';
import { useDesignTokensStore } from '@/store/design-tokens';
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
  RootContainer: RenderContainer, // RootContainer renders as Container in HTML
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
    // Ensure TokenProcessor is updated with current design tokens
    const store = useDesignTokensStore.getState();
    const tokenProcessor = TokenProcessor.getInstance();
    tokenProcessor.updateState(store.tokens, store.currentTheme);

    const tree = renderNode(rootNode, json, 'ROOT');
    if (!tree) {
      throw new Error('Failed to render root node');
    }
    
    // Generate comprehensive CSS for the HTML output with responsive support
    const cssStyles = `
      <style>
        /* Reset and base styles */
        body { 
          margin: 0; 
          padding: 0; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
          line-height: 1.6;
        }
        * { 
          box-sizing: border-box; 
        }
        img { 
          max-width: 100%; 
          height: auto; 
          display: block;
        }
        button { 
          cursor: pointer; 
          border: none;
          outline: none;
        }
        
        /* Container base styles */
        .craft-container {
          display: flex;
        }
        
        /* Responsive utilities */
        .responsive-container {
          width: 100%;
          max-width: 100%;
        }
        
        /* Mobile-first responsive breakpoints */
        @media (max-width: 640px) {
          .craft-container {
            flex-direction: column !important;
            padding: 0.5rem !important;
          }
          .craft-container > * {
            width: 100% !important;
            max-width: 100% !important;
            margin-bottom: 1rem;
          }
          /* Typography scaling */
          h1 { font-size: 1.875rem !important; }
          h2 { font-size: 1.5rem !important; }
          h3 { font-size: 1.25rem !important; }
          .text-4xl { font-size: 1.875rem !important; }
          .text-3xl { font-size: 1.5rem !important; }
          .text-2xl { font-size: 1.25rem !important; }
          .text-xl { font-size: 1.125rem !important; }
          .text-lg { font-size: 1rem !important; }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .craft-container {
            padding: 1rem !important;
          }
          .craft-container[style*="flex-direction: row"] > * {
            flex: 1;
            min-width: 0;
          }
        }
        
        @media (min-width: 769px) {
          .responsive-container {
            max-width: 1200px;
            margin: 0 auto;
          }
        }
        
        /* Image responsiveness */
        .craft-image {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        
        /* Button responsiveness */
        .craft-button {
          display: inline-block;
          text-align: center;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        @media (max-width: 640px) {
          .craft-button {
            width: 100%;
            display: block;
          }
        }
        
        /* Text responsiveness */
        .craft-text {
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        
        /* Spacing adjustments for mobile */
        @media (max-width: 640px) {
          [style*="gap"] {
            gap: 0.5rem !important;
          }
          [style*="padding"] {
            padding: 0.5rem !important;
          }
        }
      </style>
    `;
    
    const htmlContent = ReactDOMServer.renderToStaticMarkup(tree);
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${cssStyles}</head><body>${htmlContent}</body></html>`;
  } catch (error) {
    console.error('Error converting Craft JSON to HTML:', error);
    console.error('JSON structure:', JSON.stringify(json, null, 2));
    throw error;
  }
}
