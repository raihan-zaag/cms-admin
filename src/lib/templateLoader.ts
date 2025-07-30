import { useEditor } from '@craftjs/core';

export interface TemplateNode {
  type: { resolvedName: string };
  isCanvas: boolean;
  props: Record<string, any>;
  displayName: string;
  custom: Record<string, any>;
  hidden: boolean;
  nodes: string[];
  linkedNodes: Record<string, any>;
}

export interface TemplateData {
  [nodeId: string]: TemplateNode;
}

/**
 * Template Loader Utility
 * 
 * This utility provides functions to load templates into the editor
 * while preserving the RootContainer structure.
 */

/**
 * Loads a template into the current RootContainer by merging the template's child nodes
 * with the existing editor state, preserving the RootContainer structure.
 */
export const loadTemplateIntoRootContainer = (
  templateData: TemplateData,
  actions: ReturnType<typeof useEditor>['actions'],
  query: ReturnType<typeof useEditor>['query']
): void => {
  try {
    const templateRoot = templateData.ROOT;
    if (!templateRoot) {
      throw new Error('Template must have a ROOT node');
    }

    // Get current editor state
    const currentState = JSON.parse(query.serialize());
    
    // Get the template's child nodes (excluding ROOT)
    const templateChildNodes = templateRoot.nodes || [];
    
    // Create a modified template that will be merged with current state
    const nodesToMerge: Record<string, any> = {};
    
    // Extract all non-ROOT nodes from template
    Object.entries(templateData).forEach(([nodeId, nodeData]) => {
      if (nodeId !== 'ROOT') {
        nodesToMerge[nodeId] = nodeData;
      }
    });
    
    // Find the current ROOT container in the editor
    let rootContainerId = 'ROOT';
    Object.entries(currentState).forEach(([nodeId, nodeData]: [string, any]) => {
      if (nodeData?.type?.resolvedName === 'RootContainer' || nodeId === 'ROOT') {
        rootContainerId = nodeId;
      }
    });
    
    // Merge template nodes into current state
    const mergedState = {
      ...currentState,
      ...nodesToMerge
    };
    
    // Update the root container to include template's child nodes
    if (mergedState[rootContainerId]) {
      const existingChildNodes = mergedState[rootContainerId].nodes || [];
      mergedState[rootContainerId] = {
        ...mergedState[rootContainerId],
        nodes: [...existingChildNodes, ...templateChildNodes]
      };
    }
    
    // Apply the merged state
    actions.deserialize(JSON.stringify(mergedState));
    
    console.log('Template loaded successfully into RootContainer');
  } catch (error) {
    console.error('Error loading template into RootContainer:', error);
    throw error;
  }
};

/**
 * Load template data from JSON file
 */
export const loadTemplateFromJson = async (templatePath: string): Promise<TemplateData> => {
  try {
    const response = await fetch(templatePath);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${response.statusText}`);
    }
    const templateData = await response.json();
    return templateData;
  } catch (error) {
    console.error('Error loading template from JSON:', error);
    throw error;
  }
};

/**
 * Helper function to load a specific template (like the travel template)
 */
export const loadTravelTemplate = async (
  actions: ReturnType<typeof useEditor>['actions'],
  query: ReturnType<typeof useEditor>['query']
): Promise<void> => {
  try {
    const templateData = await loadTemplateFromJson('/travelTemplate.json');
    loadTemplateIntoRootContainer(templateData, actions, query);
  } catch (error) {
    console.error('Error loading travel template:', error);
    throw error;
  }
};

/**
 * Helper function to load business template
 */
export const loadBusinessTemplate = async (
  actions: ReturnType<typeof useEditor>['actions'],
  query: ReturnType<typeof useEditor>['query']
): Promise<void> => {
  try {
    const templateData = await loadTemplateFromJson('/businessTemplate.json');
    loadTemplateIntoRootContainer(templateData, actions, query);
  } catch (error) {
    console.error('Error loading business template:', error);
    throw error;
  }
};

/**
 * Helper function to load portfolio template
 */
export const loadPortfolioTemplate = async (
  actions: ReturnType<typeof useEditor>['actions'],
  query: ReturnType<typeof useEditor>['query']
): Promise<void> => {
  try {
    const templateData = await loadTemplateFromJson('/portfolioTemplate.json');
    loadTemplateIntoRootContainer(templateData, actions, query);
  } catch (error) {
    console.error('Error loading portfolio template:', error);
    throw error;
  }
};
