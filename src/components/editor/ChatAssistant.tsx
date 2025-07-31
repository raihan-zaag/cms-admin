import React, { useState, useRef, useEffect } from 'react';
import { useEditor } from '@craftjs/core';
import { generateCraftJSFromPrompt } from '@/services/gemini';
import { X, Send, MessageCircle, Loader2 } from 'lucide-react';
import { logger } from '@/lib/logger';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isError?: boolean;
  contextData?: {
    addedComponents?: string[]; // IDs of components that were just added
    lastAction?: string; // 'add' | 'modify' | 'delete'
    componentTypes?: string[]; // Types of components that were added/modified
  };
}

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LayoutAnalysis {
  description: string;
  hasMultiColumn: boolean;
  hasCards: boolean;
  hasHero: boolean;
  componentCount: number;
}

// Offline fallback component generation
const getOfflineFallback = (prompt: string): Record<string, any> => {
  const nodeId = `node_${Date.now()}`;
  const lowerPrompt = prompt.toLowerCase();
  
  // Detect component type from prompt
  if (lowerPrompt.includes('text') || lowerPrompt.includes('paragraph') || lowerPrompt.includes('heading')) {
    return {
      [nodeId]: {
        type: { resolvedName: "TextComponent" },
        isCanvas: false,
        props: {
          text: lowerPrompt.includes('heading') ? "New Heading" : "New text content",
          fontSize: lowerPrompt.includes('heading') ? '32' : '16',
          textAlign: 'left',
          fontWeight: lowerPrompt.includes('heading') ? 'bold' : 'normal',
          color: { r: 0, g: 0, b: 0, a: 1 },
          margin: ['5', '5', '5', '5'],
          padding: ['10', '10', '10', '10']
        },
        displayName: "Text",
        custom: {},
        parent: "ROOT",
        hidden: false,
        nodes: [],
        linkedNodes: {}
      }
    };
  }
  
  if (lowerPrompt.includes('button')) {
    return {
      [nodeId]: {
        type: { resolvedName: "ButtonComponent" },
        isCanvas: false,
        props: {
          text: "New Button",
          size: "medium",
          variant: "contained",
          color: "primary",
          margin: ['5', '5', '5', '5'],
          padding: ['10', '15', '10', '15']
        },
        displayName: "Button",
        custom: {},
        parent: "ROOT",
        hidden: false,
        nodes: [],
        linkedNodes: {}
      }
    };
  }
  
  if (lowerPrompt.includes('image')) {
    return {
      [nodeId]: {
        type: { resolvedName: "ImageComponent" },
        isCanvas: false,
        props: {
          src: "https://via.placeholder.com/300x200/cccccc/666666?text=New+Image",
          alt: "Placeholder image",
          width: 300,
          height: 200,
          margin: ['5', '5', '5', '5']
        },
        displayName: "Image",
        custom: {},
        parent: "ROOT",
        hidden: false,
        nodes: [],
        linkedNodes: {}
      }
    };
  }
  
  // Default: Create a container with text
  const textNodeId = `text_${Date.now()}`;
  return {
    [nodeId]: {
      type: { resolvedName: "Container" },
      isCanvas: true,
      props: {
        background: { r: 248, g: 249, b: 250, a: 1 },
        padding: ['20', '20', '20', '20'],
        margin: ['10', '10', '10', '10'],
        borderRadius: '8',
        flexDirection: 'column'
      },
      displayName: "Container",
      custom: {},
      parent: "ROOT",
      hidden: false,
      nodes: [textNodeId],
      linkedNodes: {}
    },
    [textNodeId]: {
      type: { resolvedName: "TextComponent" },
      isCanvas: false,
      props: {
        text: "Basic component added (offline mode)",
        fontSize: '16',
        textAlign: 'left',
        color: { r: 107, g: 114, b: 128, a: 1 },
        margin: ['0', '0', '0', '0'],
        padding: ['0', '0', '0', '0']
      },
      displayName: "Text",
      custom: {},
      parent: nodeId,
      hidden: false,
      nodes: [],
      linkedNodes: {}
    }
  };
};

// Analyze current page layout structure
const analyzeCurrentLayout = (parsedState: any): LayoutAnalysis => {
  const nodes = Object.values(parsedState);
  const containers = nodes.filter((node: any) => node.type?.resolvedName === 'Container');
  
  let description = '';
  let hasMultiColumn = false;
  let hasCards = false;
  let hasHero = false;
  
  // Check for multi-column layout
  const rowContainers = containers.filter((container: any) => 
    container.props?.flexDirection === 'row' && container.nodes?.length > 1
  );
  hasMultiColumn = rowContainers.length > 0;
  
  // Check for card-like structures
  const cardContainers = containers.filter((container: any) => 
    container.nodes?.length > 1 && 
    container.props?.boxShadow &&
    container.props?.borderRadius
  );
  hasCards = cardContainers.length > 0;
  
  // Check for hero sections (large containers with center alignment)
  const heroContainers = containers.filter((container: any) => 
    container.props?.minHeight && 
    parseInt(container.props.minHeight) > 300 &&
    container.props?.alignItems === 'center'
  );
  hasHero = heroContainers.length > 0;
  
  if (nodes.length <= 2) {
    description = 'Simple page with minimal content';
  } else if (hasHero) {
    description = 'Page with hero section and content';
  } else if (hasCards) {
    description = 'Card-based layout with multiple sections';
  } else if (hasMultiColumn) {
    description = 'Multi-column layout with side-by-side content';
  } else {
    description = 'Single-column layout with stacked content';
  }
  
  return {
    description,
    hasMultiColumn,
    hasCards,
    hasHero,
    componentCount: nodes.length
  };
};

const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onClose }) => {
  const { actions, query } = useEditor();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hi! I can help you create and modify components using natural language. Here\'s how it works:\n\n**🎨 Create Components:**\n• "Add a hero section with title and button"\n• "Create a contact form with email field"\n• "Add a product card with image"\n\n**🔄 Modify Last Response:**\n• "Make it blue" \n• "Update the text to be larger"\n• "Change the background color"\n• "Make it centered"\n\n**Key:** Use keywords like "update", "modify", "change", "make it" to modify your last creation!\n\n*I always store your last response and can modify it precisely!*',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(true);
  const [lastAddedComponents, setLastAddedComponents] = useState<string[]>([]);
  const [conversationContext, setConversationContext] = useState<{
    lastAction?: string;
    lastComponentTypes?: string[];
    canModifyLast?: boolean;
    originalPrompt?: string; // Save the original prompt for regeneration
    lastGenerationContext?: string; // Save the context used for generation
    lastAIResponse?: any; // Store the complete last AI response for modifications
    lastCraftJSComponents?: Record<string, any>; // Store the last generated components
  }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Helper function to detect modification requests using keywords
  const isModificationRequest = (prompt: string): boolean => {
    const modificationKeywords = [
      'update', 'modify', 'change', 'edit', 'alter', 'adjust', 
      'make it', 'make them', 'make the', 'convert', 'transform'
    ];
    
    const lowerPrompt = prompt.toLowerCase();
    return modificationKeywords.some(keyword => lowerPrompt.includes(keyword));
  };

  // Enhanced addMessage function with context support
  const addMessage = (type: 'user' | 'assistant', content: string, isError = false, contextData?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      isError,
      contextData
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Handle modifications by using stored previous response and applying changes
  const handleModificationRequest = async (userPrompt: string, currentState: any) => {
    try {
      // Check if we have a previous response to modify
      if (!conversationContext.lastAIResponse || !conversationContext.lastCraftJSComponents) {
        throw new Error('No previous response found to modify. Please create something first.');
      }

      // Remove existing components first
      const updatedState = { ...currentState };
      
      // Remove the last added components from the state
      lastAddedComponents.forEach(componentId => {
        delete updatedState[componentId];
      });
      
      // Remove component IDs from ROOT node
      if (updatedState.ROOT && updatedState.ROOT.nodes) {
        updatedState.ROOT.nodes = updatedState.ROOT.nodes.filter(
          (nodeId: string) => !lastAddedComponents.includes(nodeId)
        );
      }
      
      // Create modification prompt using the stored previous response
      const modificationPrompt = `Based on this previous response: "${conversationContext.originalPrompt}", now ${userPrompt}. 
      
Previous components created: ${conversationContext.lastComponentTypes?.join(', ') || 'components'}
      
Please generate the modified version according to the user's request.`;
      
      logger.info('Modifying previous response', {
        originalPrompt: conversationContext.originalPrompt,
        modificationRequest: userPrompt,
        lastComponentTypes: conversationContext.lastComponentTypes
      });
      
      // Generate modified components
      const response = await generateCraftJSFromPrompt({
        prompt: modificationPrompt,
        context: `Modifying previous response. Original context: ${conversationContext.lastGenerationContext || 'Previous generation'}`
      });
      
      const newCraftJSComponents = response.craftJson;
      
      if (newCraftJSComponents && typeof newCraftJSComponents === 'object') {
        // Add the new modified components
        const newNodeIds: string[] = [];
        Object.keys(newCraftJSComponents).forEach(nodeId => {
          updatedState[nodeId] = newCraftJSComponents[nodeId];
          if (newCraftJSComponents[nodeId].parent === "ROOT") {
            newNodeIds.push(nodeId);
          }
        });
        
        // Update ROOT node with new component IDs
        if (updatedState.ROOT && newNodeIds.length > 0) {
          const currentRootNodes = updatedState.ROOT.nodes || [];
          updatedState.ROOT.nodes = [...currentRootNodes, ...newNodeIds];
        }
        
        // Apply the updated state
        actions.deserialize(JSON.stringify(updatedState));
        
        // Update conversation context with new response (this becomes the new "last response")
        const componentTypes = response.componentsAdded?.map((c: any) => c.type) || [];
        setLastAddedComponents(newNodeIds);
        setConversationContext({
          lastAction: 'modify',
          lastComponentTypes: componentTypes,
          canModifyLast: true,
          originalPrompt: conversationContext.originalPrompt, // Keep original prompt
          lastGenerationContext: `Modified: ${userPrompt}`,
          lastAIResponse: response, // Store the new response
          lastCraftJSComponents: newCraftJSComponents // Store the new components
        });
        
        // Success message for modifications
        const explanation = response.explanation || `Modified components based on your request`;
        const componentDetails = response.componentsAdded?.map((c: any) => `• **${c.type}**: ${c.description}`).join('\n') || '';
        
        addMessage('assistant', `🔄 **${explanation}**

${componentDetails}

**Modified based on:** "${userPrompt}"

💡 **Want to make more changes?** Try:
• "Make it even bigger"
• "Change the color to green"
• "Add more elements"
• "Center align everything"

*Previous components deleted and replaced with modified version!*`);
        
        logger.info('Successfully modified previous response', { 
          newComponentCount: Object.keys(newCraftJSComponents).length,
          newNodeIds,
          removedComponents: lastAddedComponents
        });
      } else {
        throw new Error('Invalid response format from AI service');
      }
      
    } catch (error: any) {
      logger.error('Error in modification request:', error);
      addMessage('assistant', `❌ **Modification failed**: ${error.message}

💡 **Try:**
• "Make the text blue"
• "Make it larger" 
• "Change background to red"
• Or create something new first, then modify it

*I need a previous response to modify.*`, true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userPrompt = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Check if this is a modification request using keywords
    const isModification = isModificationRequest(userPrompt);

    // Add user message with modification indicator
    const userMessageContent = isModification ? 
      `🔄 ${userPrompt}` : userPrompt;
    addMessage('user', userMessageContent);

    try {
      // Get current page state for context
      const currentState = query.serialize();
      const parsedState = JSON.parse(currentState);
      
      // Handle modification requests - modify previous response
      if (isModification && conversationContext.lastAIResponse && lastAddedComponents.length > 0) {
        await handleModificationRequest(userPrompt, parsedState);
        return;
      }
      
      // If it's a modification request but no previous response, inform user
      if (isModification) {
        addMessage('assistant', `🤔 **No previous response to modify**

You asked to "${userPrompt}" but I don't have a previous response stored to modify.

💡 **Try creating something first:**
• "Create a hero section"
• "Add a contact form"
• "Create a product card"

Then you can modify it with:
• "Make it blue"
• "Make it larger"
• "Update the text"`);
        setIsLoading(false);
        return;
      }
      
      // Handle new component generation
      // Analyze current layout
      const layoutAnalysis = analyzeCurrentLayout(parsedState);
      
      let contextPrompt = userPrompt;
      
      // Enhanced context for new requests
      if (layoutAnalysis.componentCount > 2) {
        contextPrompt = `Current page has: ${layoutAnalysis.description}. User wants to: ${userPrompt}. Please add complementary components to the existing layout.`;
      }

      logger.info('Generating new CraftJS components', { 
        prompt: contextPrompt,
        currentLayout: layoutAnalysis
      });

      const response = await generateCraftJSFromPrompt({
        prompt: contextPrompt,
        context: `Current layout: ${layoutAnalysis.description}`
      });

      const craftJSComponents = response.craftJson;

      if (craftJSComponents && typeof craftJSComponents === 'object') {
        // Parse current state
        const currentData = JSON.parse(currentState);
        const updatedData = { ...currentData };

        // Add new components
        const newNodeIds: string[] = [];
        Object.keys(craftJSComponents).forEach(nodeId => {
          updatedData[nodeId] = craftJSComponents[nodeId];
          // Track top-level nodes (direct children of ROOT)
          if (craftJSComponents[nodeId].parent === "ROOT") {
            newNodeIds.push(nodeId);
          }
        });

        // Update ROOT node to include new top-level components
        if (updatedData.ROOT && newNodeIds.length > 0) {
          const currentRootNodes = updatedData.ROOT.nodes || [];
          updatedData.ROOT.nodes = [...currentRootNodes, ...newNodeIds];
        }

        // Apply the updated state
        actions.deserialize(JSON.stringify(updatedData));

        // Enhanced success message with specific feedback
        const explanation = response.explanation || `Added ${Object.keys(craftJSComponents).length} component(s)`;
        const componentDetails = response.componentsAdded?.map((c: any) => `• **${c.type}**: ${c.description}`).join('\n') || '';
        const suggestions = response.suggestions?.length ? 
          `\n**Next steps:**\n${response.suggestions.map((s: any) => `• ${s}`).join('\n')}` : 
          `\n**What you can do now:**\n• Select any component to customize its properties\n• Drag components to reposition them\n• Ask me to add more elements or modify existing ones`;

        // Add modification suggestion for the newly added components
        const modificationSuggestion = `\n\n💡 **Want to modify these components?** Try saying:\n• "Make it larger"\n• "Change the color to blue"\n• "Update the text"\n• "Make it centered"`;

        // Store this response and context for future modifications
        const componentTypes = response.componentsAdded?.map((c: any) => c.type) || [];
        setLastAddedComponents(newNodeIds);
        setConversationContext({
          lastAction: 'add',
          lastComponentTypes: componentTypes,
          canModifyLast: true,
          originalPrompt: userPrompt, // Store the original prompt
          lastGenerationContext: `Creating ${componentTypes.join(', ')} components`,
          lastAIResponse: response, // Store the complete AI response
          lastCraftJSComponents: craftJSComponents // Store the generated components
        });

        // Add context data to the assistant message
        const contextData = {
          addedComponents: newNodeIds,
          lastAction: 'add',
          componentTypes: componentTypes
        };

        addMessage('assistant', `✅ **${explanation}**

${componentDetails}

${suggestions}${modificationSuggestion}

*Tip: Use "update" or "modify" keywords to change these components!*`, false, contextData);

        logger.info('Successfully added CraftJS components', { 
          componentCount: Object.keys(craftJSComponents).length,
          newNodeIds 
        });
      } else {
        throw new Error('Invalid response format from AI service');
      }
    } catch (error: any) {
      logger.error('Error generating components:', error);
      
      let errorMessage = '';
      
      // Enhanced error handling with specific messages and fallbacks
      if (error.message.includes('overloaded')) {
        setApiAvailable(false);
        errorMessage = `🤖 **Gemini AI is currently overloaded**
        
This is a temporary issue on Google's side. I'll try to help with a basic component:

• **Wait 2-3 minutes** and try again for AI-generated layouts
• **Use simpler prompts** like "Add a text component"  
• **Try during off-peak hours** for better reliability

*Attempting basic component generation as fallback...*`;
        
        // Try offline fallback
        try {
          const fallbackComponents = getOfflineFallback(userPrompt);
          const currentState = query.serialize();
          const currentData = JSON.parse(currentState);
          const updatedData = { ...currentData };
          
          const newNodeIds: string[] = [];
          Object.keys(fallbackComponents).forEach(nodeId => {
            updatedData[nodeId] = fallbackComponents[nodeId];
            if (fallbackComponents[nodeId].parent === "ROOT") {
              newNodeIds.push(nodeId);
            }
          });
          
          if (updatedData.ROOT && newNodeIds.length > 0) {
            const currentRootNodes = updatedData.ROOT.nodes || [];
            updatedData.ROOT.nodes = [...currentRootNodes, ...newNodeIds];
          }
          
          actions.deserialize(JSON.stringify(updatedData));
          addMessage('assistant', `✅ **Basic Component Added** (Offline Mode)

Added a simple component while AI is overloaded. Try again later for AI-generated layouts with better styling and content.

*Component(s) added: ${newNodeIds.length}*`);
          return; // Skip showing error message
        } catch {
          // Fallback failed, continue with error message
        }
      } else if (error.message.includes('rate limit') || error.message.includes('quota')) {
        setApiAvailable(false);
        setTimeout(() => setApiAvailable(true), 60000); // Reset after 1 minute
        errorMessage = `⏰ **Rate Limit Reached**
        
You've reached the Gemini API usage limit. I'll retry automatically in 1 minute.

• **Wait 60 seconds** for automatic retry
• **Reduce prompt frequency** for better experience
• Consider using simpler prompts while rate limited

*Status: Temporary rate limiting active*`;
      } else if (error.message.includes('API_KEY') || error.message.includes('authentication')) {
        errorMessage = `🔑 **API Configuration Issue**
        
There's a problem with the Gemini API setup:

• **Check API key configuration** in environment variables
• **Verify API key permissions** for Gemini AI
• **Contact administrator** if this persists

*Status: Authentication problem detected*`;
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = `🌐 **Network Connection Issue**
        
Unable to reach the Gemini AI service:

• **Check internet connection** and try again
• **Verify firewall settings** aren't blocking requests
• **Try again in a few moments** - temporary network issue

*Status: Network connectivity problem*`;
      } else {
        errorMessage = `❌ **Sorry, I couldn't generate that layout**
        
${error.message}

**What you can try:**
• **Simplify your prompt** - try "Add a text component"
• **Wait a moment** and try again
• **Check your internet connection**
• **Try a different type of component**

*If this continues, there may be a temporary service issue.*`;
      }
      
      addMessage('assistant', errorMessage, true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl h-[80vh] rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <h2 className="text-lg font-semibold">AI Layout Assistant</h2>
            {!apiAvailable && (
              <span className="text-xs bg-orange-500 px-2 py-1 rounded-full">
                Limited Mode
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : message.isError
                    ? 'bg-red-50 border border-red-200 text-red-800 rounded-bl-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-gray-600">Generating components...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-gray-50 rounded-b-lg">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={apiAvailable ? "Describe the layout you want to add..." : "Try simple prompts like 'Add text' while AI is limited..."}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            {apiAvailable 
              ? "💡 Try: 'Add a hero section', 'Add a contact form', 'Add product cards'"
              : "⚠️ AI is temporarily limited - using basic component generation"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
