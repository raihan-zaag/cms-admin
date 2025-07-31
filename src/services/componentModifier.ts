export interface ComponentModification {
  componentId: string;
  componentType: string;
  modifications: {
    color?: string;
    fontSize?: number;
    backgroundColor?: string;
    textAlign?: string;
    fontWeight?: string;
  };
}

/**
 * Analyze modification requests and extract specific changes
 */
export const analyzeModificationRequest = (prompt: string) => {
  const lowerPrompt = prompt.toLowerCase();
  const modifications: any = {};
  
  // Color modifications
  const colorMatches = lowerPrompt.match(/\b(blue|red|green|yellow|purple|orange|black|white|gray|grey)\b/);
  if (colorMatches) {
    const colorMap: any = {
      blue: '#2563eb', red: '#dc2626', green: '#16a34a', yellow: '#ca8a04',
      purple: '#9333ea', orange: '#ea580c', black: '#000000', white: '#ffffff',
      gray: '#6b7280', grey: '#6b7280'
    };
    modifications.color = colorMap[colorMatches[0]];
  }
  
  // Background color
  if (lowerPrompt.includes('background')) {
    if (colorMatches) {
      const colorMap: any = {
        blue: '#dbeafe', red: '#fee2e2', green: '#dcfce7', yellow: '#fef3c7',
        purple: '#e9d5ff', orange: '#fed7aa', black: '#1f2937', white: '#ffffff',
        gray: '#f3f4f6', grey: '#f3f4f6'
      };
      modifications.backgroundColor = colorMap[colorMatches[0]];
    }
  }
  
  // Size modifications
  if (lowerPrompt.includes('larger') || lowerPrompt.includes('bigger')) {
    modifications.fontSize = 24;
  } else if (lowerPrompt.includes('smaller')) {
    modifications.fontSize = 14;
  } else if (lowerPrompt.includes('huge') || lowerPrompt.includes('big')) {
    modifications.fontSize = 32;
  }
  
  // Alignment
  if (lowerPrompt.includes('center')) {
    modifications.textAlign = 'center';
  } else if (lowerPrompt.includes('left')) {
    modifications.textAlign = 'left';
  } else if (lowerPrompt.includes('right')) {
    modifications.textAlign = 'right';
  }
  
  // Font weight
  if (lowerPrompt.includes('bold')) {
    modifications.fontWeight = 'bold';
  } else if (lowerPrompt.includes('normal') || lowerPrompt.includes('regular')) {
    modifications.fontWeight = 'normal';
  }
  
  return modifications;
};

/**
 * Apply modifications to specific components in the CraftJS state
 */
export const applyComponentModifications = (
  currentState: any,
  componentIds: string[],
  modifications: any
): { updatedState: any; modifiedCount: number; description: string } => {
  const updatedState = { ...currentState };
  let modifiedCount = 0;
  let description = '';
  
  componentIds.forEach(componentId => {
    if (updatedState[componentId]) {
      const component = updatedState[componentId];
      const componentType = component.type?.resolvedName;
      
      if (modifications.color && (componentType === 'Text' || componentType === 'Button')) {
        component.props.color = modifications.color;
        modifiedCount++;
        description += `Changed ${componentType.toLowerCase()} color to ${modifications.color}. `;
      }
      
      if (modifications.fontSize && componentType === 'Text') {
        component.props.fontSize = modifications.fontSize;
        modifiedCount++;
        description += `Updated text size to ${modifications.fontSize}px. `;
      }
      
      if (modifications.backgroundColor && (componentType === 'Container' || componentType === 'Button')) {
        if (componentType === 'Container') {
          component.props.background = modifications.backgroundColor;
        } else {
          component.props.backgroundColor = modifications.backgroundColor;
        }
        modifiedCount++;
        description += `Changed ${componentType.toLowerCase()} background to ${modifications.backgroundColor}. `;
      }
      
      if (modifications.textAlign && componentType === 'Text') {
        component.props.textAlign = modifications.textAlign;
        modifiedCount++;
        description += `Aligned text to ${modifications.textAlign}. `;
      }
      
      if (modifications.fontWeight && componentType === 'Text') {
        component.props.fontWeight = modifications.fontWeight;
        modifiedCount++;
        description += `Made text ${modifications.fontWeight}. `;
      }
    }
  });
  
  return {
    updatedState,
    modifiedCount,
    description: description.trim()
  };
};

/**
 * Detect if a prompt is a follow-up modification request
 */
export const isFollowUpModification = (prompt: string, hasRecentComponents: boolean): boolean => {
  if (!hasRecentComponents) return false;
  
  const followUpKeywords = [
    // Modification keywords
    'change', 'update', 'modify', 'edit', 'alter', 'adjust', 'fix', 'improve',
    // Reference to previous
    'that', 'this', 'it', 'them', 'those', 'the above', 'the last', 'previous',
    // Style/color changes
    'color', 'size', 'font', 'background', 'make it', 'can you',
    // Positioning
    'move', 'position', 'align', 'center', 'left', 'right',
    // Content changes
    'text should', 'content should', 'replace', 'instead'
  ];
  
  const lowerPrompt = prompt.toLowerCase();
  return followUpKeywords.some(keyword => lowerPrompt.includes(keyword));
};
