import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('VITE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Analyze generated CraftJS components to provide meaningful feedback
 */
const analyzeCraftJSComponents = (craftJson: any) => {
  const components: ComponentAnalysis[] = [];
  const suggestions: string[] = [];
  
  // Analyze each component
  Object.entries(craftJson).forEach(([key, component]: [string, any]) => {
    const componentType = component.type?.resolvedName;
    let description = '';
    
    switch (componentType) {
      case 'Container': {
        const hasBackground = component.props?.background;
        const hasColumns = component.nodes?.length > 1 && component.props?.flexDirection === 'row';
        const hasCards = component.props?.boxShadow || component.props?.borderRadius;
        
        if (hasColumns) {
          description = `${component.nodes.length}-column layout container`;
        } else if (hasCards) {
          description = 'Card-style container with styling';
        } else if (hasBackground) {
          description = 'Styled container with background';
        } else {
          description = 'Layout container for organizing content';
        }
        break;
      }
        
      case 'Text': {
        const fontSize = component.props?.fontSize || 16;
        const isBold = component.props?.fontWeight === 'bold';
        const text = component.props?.text || '';
        
        if (isBold && fontSize >= 18) {
          description = 'Heading text element';
        } else if (fontSize >= 18) {
          description = 'Large text element';
        } else if (text.length > 100) {
          description = 'Paragraph text content';
        } else {
          description = 'Text element';
        }
        break;
      }
        
      case 'Button': {
        const buttonText = component.props?.text || 'Button';
        description = `Interactive button: "${buttonText}"`;
        break;
      }
        
      case 'ImageComponent': {
        const alt = component.props?.alt || 'image';
        description = `Image placeholder for ${alt}`;
        break;
      }
        
      default:
        description = `${componentType} component`;
    }
    
    components.push({
      type: componentType,
      description,
      key
    });
  });
  
  // Generate contextual suggestions
  const hasText = components.some(c => c.type === 'Text');
  const hasImages = components.some(c => c.type === 'ImageComponent');
  const hasButtons = components.some(c => c.type === 'Button');
  const hasContainers = components.some(c => c.type === 'Container');
  
  if (hasImages && !hasText) {
    suggestions.push('Add descriptive text to complement your images');
  }
  
  if (hasText && !hasImages) {
    suggestions.push('Consider adding images to make your content more visual');
  }
  
  if (hasContainers && !hasButtons) {
    suggestions.push('Add call-to-action buttons to encourage user interaction');
  }
  
  if (components.length === 1) {
    suggestions.push('Ask me to add more components to build out your page');
  }
  
  // Generate explanation based on what was actually created
  const componentTypes = [...new Set(components.map(c => c.type))];
  const explanation = `Created ${components.length} component${components.length > 1 ? 's' : ''}: ${componentTypes.join(', ')}. ${components.map(c => c.description).join(', ')}.`;
  
  return {
    explanation,
    components,
    suggestions
  };
};

export interface CraftJSGenerationRequest {
  prompt: string;
  context?: string;
  isFollowUp?: boolean;
  lastComponentIds?: string[];
  lastComponentTypes?: string[];
}

export interface CraftJSGenerationResponse {
  craftJson: any;
  explanation?: string;
  componentsAdded?: ComponentAnalysis[];
  suggestions?: string[];
}

export interface ComponentAnalysis {
  type: string;
  description: string;
  key: string;
}

/**
 * Generate CraftJS components to add to existing ROOT container
 */
export const generateCraftJSFromPrompt = async (
  request: CraftJSGenerationRequest,
  retries = 3
): Promise<CraftJSGenerationResponse> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const timestamp = Date.now();
      
      // Enhanced system prompt with follow-up support
      const isFollowUpRequest = request.isFollowUp && request.lastComponentTypes?.length;
      const followUpContext = isFollowUpRequest ? 
        `\n\n🔄 FOLLOW-UP REQUEST CONTEXT:
- User just added: ${request.lastComponentTypes?.join(', ')} components
- This is a modification/refinement request for recently added components
- Focus on creating components that complement or modify the recent additions
- Consider the user's request in context of what was just added\n` : '';
      
      const systemPrompt = `You are a CraftJS component generator. Your task is to generate individual CraftJS components that can be added to an existing page.

IMPORTANT: Generate ONLY the new components to be added, NOT a complete page structure. Do not include ROOT container.${followUpContext}

CONTEXT UNDERSTANDING:
- If user wants to MODIFY existing layout, generate components that work well with the current structure
- If current page has multi-column layout, consider adding compatible components
- If current page has cards, consider similar styling for consistency
- If current page is simple, you can add more complex structures
${isFollowUpRequest ? '- FOLLOW-UP REQUEST: User is refining recently added components - create complementary or replacement components' : ''}

CraftJS Component Structure Guidelines:
- Each component has: type, isCanvas, props, displayName, custom, parent, nodes
- Available components: Container, Text, Button, ImageComponent
- Container: isCanvas=true, can contain child nodes, uses 'background' prop (not backgroundColor)
- Text: props.text for content, supports fontSize, color, etc.
- Button: props.text, backgroundColor, color, etc.
- ImageComponent: DON'T add src URL - user will add their own image

RESPONSIVE LAYOUT RULES (CRITICAL FOR MOBILE-FIRST DESIGN):
- Use individual padding/margin props: paddingTop, paddingRight, paddingBottom, paddingLeft
- Use marginTop, marginRight, marginBottom, marginLeft for spacing between components
- For Container gap between children: use proper flexbox gap values (8, 12, 16, 20, 24, 32)
- RESPONSIVE WIDTHS: Always use percentages or 'auto' - NEVER fixed pixel widths except for max-width
- For multi-column: Use flexible percentages that work on mobile (100% on small, 50% on medium, 33% on large)
- Height should be 'auto' unless specifically needed
- Use flexWrap: 'wrap' for responsive layouts
- Use minWidth for preventing too-small columns

Example output for "Add a text component":
{
  "text_${timestamp}": {
    "type": {"resolvedName": "Text"},
    "isCanvas": false,
    "props": {
      "text": "Generated text content",
      "fontSize": 16,
      "color": "#333333",
      "paddingTop": 12,
      "paddingRight": 16,
      "paddingBottom": 12,
      "paddingLeft": 16,
      "marginBottom": 16,
      "width": "auto",
      "height": "auto",
      "minWidth": "100px",
      "maxWidth": "800px"
    },
    "displayName": "Text",
    "custom": {},
    "parent": "ROOT",
    "nodes": []
  }
}

Example output for "Add a container with text":
{
  "container_${timestamp}": {
    "type": {"resolvedName": "Container"},
    "isCanvas": true,
    "props": {
      "background": "#f8f9fa",
      "paddingTop": 24,
      "paddingRight": 24,
      "paddingBottom": 24,
      "paddingLeft": 24,
      "marginBottom": 20,
      "flexDirection": "column",
      "justifyContent": "flex-start",
      "alignItems": "stretch",
      "gap": 16,
      "width": "100%",
      "height": "auto"
    },
    "displayName": "Container",
    "custom": {},
    "parent": "ROOT",
    "nodes": ["text_${timestamp + 1}"]
  },
  "text_${timestamp + 1}": {
    "type": {"resolvedName": "Text"},
    "isCanvas": false,
    "props": {
      "text": "Content inside container",
      "fontSize": 16,
      "color": "#333333",
      "paddingTop": 8,
      "paddingRight": 8,
      "paddingBottom": 8,
      "paddingLeft": 8,
      "width": "auto",
      "height": "auto",
      "minWidth": "100px"
    },
    "displayName": "Text", 
    "custom": {},
    "parent": "container_${timestamp}",
    "nodes": []
  }
}

Example output for "Add a product card":
{
  "container_${timestamp}": {
    "type": {"resolvedName": "Container"},
    "isCanvas": true,
    "props": {
      "background": "#ffffff",
      "paddingTop": 20,
      "paddingRight": 20,
      "paddingBottom": 20,
      "paddingLeft": 20,
      "marginBottom": 24,
      "flexDirection": "column",
      "justifyContent": "flex-start",
      "alignItems": "stretch",
      "gap": 16,
      "width": "100%",
      "maxWidth": "400px",
      "height": "auto",
      "borderRadius": "8px",
      "boxShadow": "0 2px 8px rgba(0,0,0,0.1)"
    },
    "displayName": "Container",
    "custom": {},
    "parent": "ROOT",
    "nodes": ["image_${timestamp + 1}", "text_${timestamp + 2}", "text_${timestamp + 3}"]
  },
  "image_${timestamp + 1}": {
    "type": {"resolvedName": "ImageComponent"},
    "isCanvas": false,
    "props": {
      "alt": "Product image",
      "width": "100%",
      "height": "200px",
      "marginBottom": 12
    },
    "displayName": "ImageComponent",
    "custom": {},
    "parent": "container_${timestamp}",
    "nodes": []
  },
  "text_${timestamp + 2}": {
    "type": {"resolvedName": "Text"},
    "isCanvas": false,
    "props": {
      "text": "Product Name",
      "fontSize": 18,
      "fontWeight": "bold",
      "color": "#1a1a1a",
      "paddingTop": 4,
      "paddingBottom": 8
    },
    "displayName": "Text",
    "custom": {},
    "parent": "container_${timestamp}",
    "nodes": []
  },
  "text_${timestamp + 3}": {
    "type": {"resolvedName": "Text"},
    "isCanvas": false,
    "props": {
      "text": "Product description with features and benefits.",
      "fontSize": 14,
      "color": "#666666",
      "lineHeight": "1.5"
    },
    "displayName": "Text",
    "custom": {},
    "parent": "container_${timestamp}",
    "nodes": []
  }
}

Example output for "Add a two-column layout":
{
  "container_${timestamp}": {
    "type": {"resolvedName": "Container"},
    "isCanvas": true,
    "props": {
      "flexDirection": "row",
      "flexWrap": "wrap",
      "justifyContent": "space-between",
      "alignItems": "flex-start",
      "gap": 24,
      "paddingTop": 24,
      "paddingRight": 16,
      "paddingBottom": 24,
      "paddingLeft": 16,
      "marginBottom": 24,
      "width": "100%",
      "height": "auto"
    },
    "displayName": "Container",
    "custom": {},
    "parent": "ROOT",
    "nodes": ["text_${timestamp + 1}", "image_${timestamp + 2}"]
  },
  "text_${timestamp + 1}": {
    "type": {"resolvedName": "Text"},
    "isCanvas": false,
    "props": {
      "text": "This is the text content for the two-column layout. It provides detailed information about the topic.",
      "fontSize": 16,
      "color": "#333333",
      "lineHeight": "1.6",
      "width": "100%",
      "minWidth": "280px",
      "flex": "1 1 45%",
      "paddingRight": 12
    },
    "displayName": "Text",
    "custom": {},
    "parent": "container_${timestamp}",
    "nodes": []
  },
  "image_${timestamp + 2}": {
    "type": {"resolvedName": "ImageComponent"},
    "isCanvas": false,
    "props": {
      "alt": "Column image",
      "width": "100%",
      "minWidth": "280px",
      "flex": "1 1 45%",
      "height": "250px"
    },
    "displayName": "ImageComponent",
    "custom": {},
    "parent": "container_${timestamp}",
    "nodes": []
  }
}

Example output for "Add a three-column grid":
{
  "container_${timestamp}": {
    "type": {"resolvedName": "Container"},
    "isCanvas": true,
    "props": {
      "flexDirection": "row",
      "flexWrap": "wrap",
      "justifyContent": "space-between",
      "alignItems": "stretch",
      "gap": 20,
      "paddingTop": 24,
      "paddingRight": 16,
      "paddingBottom": 24,
      "paddingLeft": 16,
      "marginBottom": 32,
      "width": "100%",
      "height": "auto"
    },
    "displayName": "Container",
    "custom": {},
    "parent": "ROOT",
    "nodes": ["col1_${timestamp + 1}", "col2_${timestamp + 2}", "col3_${timestamp + 3}"]
  },
  "col1_${timestamp + 1}": {
    "type": {"resolvedName": "Container"},
    "isCanvas": true,
    "props": {
      "background": "#f8f9fa",
      "paddingTop": 16,
      "paddingRight": 16,
      "paddingBottom": 16,
      "paddingLeft": 16,
      "flexDirection": "column",
      "flex": "1 1 300px",
      "minWidth": "280px",
      "width": "100%",
      "height": "auto",
      "gap": 12,
      "borderRadius": "6px"
    },
    "displayName": "Container",
    "custom": {},
    "parent": "container_${timestamp}",
    "nodes": ["text_${timestamp + 4}"]
  },
  "col2_${timestamp + 2}": {
    "type": {"resolvedName": "Container"},
    "isCanvas": true,
    "props": {
      "background": "#f8f9fa",
      "paddingTop": 16,
      "paddingRight": 16,
      "paddingBottom": 16,
      "paddingLeft": 16,
      "flexDirection": "column",
      "flex": "1 1 300px",
      "minWidth": "280px",
      "width": "100%",
      "height": "auto",
      "gap": 12,
      "borderRadius": "6px"
    },
    "displayName": "Container",
    "custom": {},
    "parent": "container_${timestamp}",
    "nodes": ["text_${timestamp + 5}"]
  },
  "col3_${timestamp + 3}": {
    "type": {"resolvedName": "Container"},
    "isCanvas": true,
    "props": {
      "background": "#f8f9fa",
      "paddingTop": 16,
      "paddingRight": 16,
      "paddingBottom": 16,
      "paddingLeft": 16,
      "flexDirection": "column",
      "flex": "1 1 300px",
      "minWidth": "280px",
      "width": "100%",
      "height": "auto",
      "gap": 12,
      "borderRadius": "6px"
    },
    "displayName": "Container",
    "custom": {},
    "parent": "container_${timestamp}",
    "nodes": ["text_${timestamp + 6}"]
  },
  "text_${timestamp + 4}": {
    "type": {"resolvedName": "Text"},
    "isCanvas": false,
    "props": {
      "text": "Column 1 content",
      "fontSize": 14,
      "color": "#333333"
    },
    "displayName": "Text",
    "custom": {},
    "parent": "col1_${timestamp + 1}",
    "nodes": []
  },
  "text_${timestamp + 5}": {
    "type": {"resolvedName": "Text"},
    "isCanvas": false,
    "props": {
      "text": "Column 2 content",
      "fontSize": 14,
      "color": "#333333"
    },
    "displayName": "Text",
    "custom": {},
    "parent": "col2_${timestamp + 2}",
    "nodes": []
  },
  "text_${timestamp + 6}": {
    "type": {"resolvedName": "Text"},
    "isCanvas": false,
    "props": {
      "text": "Column 3 content",
      "fontSize": 14,
      "color": "#333333"
    },
    "displayName": "Text",
    "custom": {},
    "parent": "col3_${timestamp + 3}",
    "nodes": []
  }
}

CRITICAL RULES FOR RESPONSIVE LAYOUTS:
1. Generate unique node IDs using timestamp-based numbers
2. Set parent: "ROOT" for top-level components
3. Set parent: "parentNodeId" for nested components
4. Return only JSON, no markdown formatting
5. Use individual padding/margin props, never shorthand
6. RESPONSIVE: Always use flex properties (flex: "1 1 300px") for responsive columns
7. RESPONSIVE: Always add flexWrap: "wrap" for multi-column layouts
8. RESPONSIVE: Use minWidth (280px minimum) and maxWidth for containers
9. RESPONSIVE: Use width: "100%" with flex properties for responsive behavior
10. Use proper flexbox gap values (8, 12, 16, 20, 24, 32)
11. For ImageComponent: NEVER add src URL, only alt, width, height
12. Include proper borderRadius and boxShadow for cards
13. Use consistent spacing: 8px, 12px, 16px, 20px, 24px, 32px
14. RESPONSIVE: Ensure layouts work on mobile (single column) and desktop (multi-column)
15. Always set flexDirection, justifyContent, alignItems for containers
16. RESPONSIVE: Use textAlign: "center" for titles and hero sections
17. RESPONSIVE: Add minHeight for sections that need minimum height
18. TEXT SIZING: Always set width: "auto", height: "auto" for Text components
19. TEXT SIZING: Use minWidth: "100px" and maxWidth as needed for Text components
20. TEXT SIZING: Text components should auto-resize based on content length

Context: ${request.context || 'Adding to existing page'}

User Prompt: ${request.prompt}

Generate CraftJS components to add:`;

      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      const generatedText = response.text();

      // Clean up the response - remove markdown formatting if present
      const cleanedText = generatedText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      try {
        const craftJson = JSON.parse(cleanedText);
        
        // Analyze the generated components to provide meaningful feedback
        const componentAnalysis = analyzeCraftJSComponents(craftJson);
        
        return {
          craftJson,
          explanation: componentAnalysis.explanation,
          componentsAdded: componentAnalysis.components,
          suggestions: componentAnalysis.suggestions
        };
      } catch (parseError) {
        console.error('Failed to parse generated JSON:', parseError);
        console.error('Generated text:', cleanedText);
        throw new Error('Generated content is not valid JSON');
      }
    } catch (error: any) {
      console.error(`Gemini API attempt ${attempt}/${retries} failed:`, error);
      
      // Check if it's a rate limit or overload error
      const isRetryableError = 
        error?.message?.includes('503') || 
        error?.message?.includes('overloaded') ||
        error?.message?.includes('rate limit') ||
        error?.message?.includes('quota exceeded');
      
      if (attempt < retries && isRetryableError) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Exponential backoff, max 5s
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // Final attempt or non-retryable error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('503') || errorMessage.includes('overloaded')) {
        throw new Error('🤖 Gemini AI is currently overloaded. Please try again in a few minutes.');
      } else if (errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
        throw new Error('⏱️ API rate limit reached. Please wait a moment and try again.');
      } else if (errorMessage.includes('VITE_GEMINI_API_KEY')) {
        throw new Error('🔑 API key not configured. Please check your environment settings.');
      } else {
        throw new Error(`Failed to generate CraftJS components: ${errorMessage}`);
      }
    }
  }
  
  throw new Error('Failed to generate components after multiple attempts');
};

/**
 * Generate content for text components
 */
export const generateTextContent = async (prompt: string, retries = 3): Promise<string> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const systemPrompt = `You are a content generator for web text elements. Generate appropriate text content based on the user's prompt.

Rules:
1. Return only the text content, no formatting
2. Keep it concise and relevant
3. Match the tone and style requested
4. No markdown or HTML tags

User Prompt: ${prompt}

Generate text content:`;

      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error: any) {
      console.error(`Text generation attempt ${attempt}/${retries} failed:`, error);
      
      // Check if it's a rate limit or overload error
      const isRetryableError = 
        error?.message?.includes('503') || 
        error?.message?.includes('overloaded') ||
        error?.message?.includes('rate limit') ||
        error?.message?.includes('quota exceeded');
      
      if (attempt < retries && isRetryableError) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Exponential backoff, max 5s
        console.log(`Retrying text generation in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // Final attempt or non-retryable error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('503') || errorMessage.includes('overloaded')) {
        throw new Error('🤖 Gemini AI is currently overloaded. Please try again in a few minutes.');
      } else if (errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
        throw new Error('⏱️ API rate limit reached. Please wait a moment and try again.');
      } else {
        throw new Error(`Failed to generate text content: ${errorMessage}`);
      }
    }
  }
  
  throw new Error('Failed to generate text content after multiple attempts');
};
