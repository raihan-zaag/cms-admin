
import { RenderButton } from '@/components/static/RenderButton';
import { RenderContainer } from '@/components/static/RenderContainer';
import { RenderGridContainer } from '@/components/static/RenderGridContainer';
import { RenderImage } from '@/components/static/RenderImage';
import { RenderText } from '@/components/static/RenderText';
import { TokenProcessor } from '@/lib/token-processor';
import { useDesignTokensStore } from '@/store/design-tokens';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import beautify from 'js-beautify';


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
  GridContainer: RenderGridContainer, // Add GridContainer mapping
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
    
    // Debug: Log some token processing to ensure it's working
    console.log('Token processing test:');
    console.log('@spacing.md ->', tokenProcessor.processToken('@spacing.md'));
    console.log('@spacing.lg ->', tokenProcessor.processToken('@spacing.lg'));
    console.log('@container.xl ->', tokenProcessor.processToken('@container.xl'));
    console.log('@color.background ->', tokenProcessor.processToken('@color.background'));

    const tree = renderNode(rootNode, json, 'ROOT');
    if (!tree) {
      throw new Error('Failed to render root node');
    }
    
    // Generate minimal CSS for the HTML output - respect original spacing from Craft.js JSON
    const cssStyles = `
      <style>
        /* Reset and base styles only */
        body { 
          margin: 0; 
          padding: 0; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
          line-height: 1.6;
        }
        * { 
          box-sizing: border-box; 
        }
        
        /* Basic container styles - preserve original layout */
        .craft-container {
          display: flex;
        }
        
        .craft-grid-container {
          display: grid;
        }
        
        /* Basic responsive utilities */
        .responsive-container {
          width: 100%;
          max-width: 100%;
        }
        
        /* Image responsiveness */
        .craft-image {
          max-width: 100%;
          height: auto;
        }
        
        /* Button base styles */
        .craft-button {
          display: inline-block;
          text-decoration: none;
          cursor: pointer;
          border: none;
          outline: none;
        }
        
        /* Text base styles */
        .craft-text {
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        
        /* Minimal responsive adjustments - only for extreme mobile cases */
        @media (max-width: 480px) {
          /* Only force column layout for very small screens if flex direction is row */
          .craft-container[style*="flex-direction: row"] {
            flex-direction: column;
          }
          
          /* Grid containers get single column on very small screens */
          .craft-grid-container[style*="repeat("] {
            grid-template-columns: 1fr;
          }
          
          /* Images remain responsive */
          .craft-image {
            width: 100%;
          }
        }
      </style>
    `;
    
    const htmlContent = ReactDOMServer.renderToStaticMarkup(tree);
    const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${cssStyles}</head><body><div class="responsive-container">${htmlContent}</div></body></html>`;
    
    // Beautify the HTML output
    return beautify.html(fullHtml, {
      indent_size: 2,
      indent_char: ' ',
      max_preserve_newlines: 1,
      preserve_newlines: true,
      end_with_newline: true,
      wrap_line_length: 0,
      indent_inner_html: true
    });
  } catch (error) {
    console.error('Error converting Craft JSON to HTML:', error);
    console.error('JSON structure:', JSON.stringify(json, null, 2));
    throw error;
  }
}
