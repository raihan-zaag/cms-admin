/**
 * Improved convertCraftJsonToHtml with better architecture
 * 
 * Uses React Context instead of global state for better isolation
 */

import { RenderButton } from '@/components/static/RenderButton';
import { RenderContainer } from '@/components/static/RenderContainer';
import { RenderRootContainer } from '@/components/static/RenderRootContainer';
import { RenderGridContainer } from '@/components/static/RenderGridContainer';
import { RenderImage } from '@/components/static/RenderImage';
import { RenderText } from '@/components/static/RenderText';
import { TokenProcessor } from '@/lib/token-processor';
import { useDesignTokensStore } from '@/store/design-tokens';
import { PreviewProvider } from '@/contexts/PreviewContext';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import beautify from 'js-beautify';
import type { GlobalDesignTokenSettings } from '@/hooks/useGlobalDesignTokens';

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
  RootContainer: RenderRootContainer,
  ContainerCopy: RenderContainer,
  GridContainer: RenderGridContainer,
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

export function convertCraftJsonToHtmlV2(
  json: CraftJson, 
  globalDesignTokens?: GlobalDesignTokenSettings
): string {
  const rootNode = json['ROOT'];
  if (!rootNode) {
    throw new Error('Missing ROOT node in JSON');
  }

  try {
    // Ensure TokenProcessor is updated with current design tokens
    const store = useDesignTokensStore.getState();
    const tokenProcessor = TokenProcessor.getInstance();
    tokenProcessor.updateState(store.tokens, store.currentTheme);
    
    // Debug: Log token processing
    if (globalDesignTokens) {
      console.log('Processing preview with global design tokens:', globalDesignTokens);
    }

    // Wrap the tree with PreviewProvider for context
    const wrappedTree = (
      <PreviewProvider globalDesignTokens={globalDesignTokens}>
        {renderNode(rootNode, json, 'ROOT')}
      </PreviewProvider>
    );

    if (!wrappedTree) {
      throw new Error('Failed to render root node');
    }
    
    // Generate CSS (same as before)
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
        
        /* Container styles */
        .craft-container, .craft-root-container {
          display: flex;
        }
        
        .craft-grid-container {
          display: grid;
        }
        
        .responsive-container {
          width: 100%;
          max-width: 100%;
        }
        
        .craft-image {
          max-width: 100%;
          height: auto;
        }
        
        .craft-button {
          display: inline-block;
          text-decoration: none;
          cursor: pointer;
          border: none;
          outline: none;
        }
        
        .craft-text {
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        
        @media (max-width: 480px) {
          .craft-container[style*="flex-direction: row"] {
            flex-direction: column;
          }
          
          .craft-grid-container[style*="repeat("] {
            grid-template-columns: 1fr;
          }
        }
      </style>
    `;
    
    const htmlContent = ReactDOMServer.renderToStaticMarkup(wrappedTree);
    const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${cssStyles}</head><body><div class="responsive-container">${htmlContent}</div></body></html>`;
    
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
