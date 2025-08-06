import React from 'react';
import { TokenProcessor } from '@/lib/token-processor';
import { getGlobalDesignTokensForRender } from '@/lib/convertCraftJsonToHtml';

interface RenderRootContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  
  // Global design token overrides
  useGlobalTokens?: boolean;
  
  // Background
  background?: string;
  isTransparent?: boolean;
  
  // Dimensions
  width?: string;
  height?: string;
  
  // Layout
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'stretch' | 'flex-start' | 'center' | 'flex-end';
  gap?: string;
  gapX?: string; // Column gap (horizontal)
  gapY?: string; // Row gap (vertical)
  
  // Container sizing
  maxWidth?: string;
  padding?: string;
  paddingX?: string; // Horizontal padding (left/right)
  paddingY?: string; // Vertical padding (top/bottom)
  borderRadius?: string;
  
  // Typography (applied to all child components)
  fontFamily?: string;
  
  // Advanced styling
  boxShadow?: string;
}

export const RenderRootContainer: React.FC<RenderRootContainerProps> = ({
  children,
  background,
  isTransparent,
  width,
  height,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  gapX,
  gapY,
  maxWidth,
  padding,
  paddingX,
  paddingY,
  borderRadius,
  fontFamily,
  boxShadow,
  ...rest
}) => {
  // Get fresh TokenProcessor instance for each render to ensure latest tokens
  const tokenProcessor = TokenProcessor.getInstance();

  // Get global design tokens if available
  const globalDesignTokens = getGlobalDesignTokensForRender();

  // Helper function to process values that might be design tokens
  const processValue = (value: any): any => {
    if (typeof value === 'string' && value.startsWith('@')) {
      const processed = tokenProcessor.processToken(value);
      console.log(`RenderRootContainer token: ${value} -> ${processed}`);
      return processed;
    }
    return value;
  };

    // Helper function to get value from global design tokens or use prop value
  const getTokenValue = (propValue: string | undefined, globalPath: string, useGlobalTokens: boolean = true) => {
    // If global design tokens are available and useGlobalTokens is not explicitly false
    if (globalDesignTokens && useGlobalTokens !== false) {
      // Use global settings - directly access the values
      const pathParts = globalPath.split('.');
      let value: any = globalDesignTokens;
      for (const part of pathParts) {
        value = value?.[part];
      }
      
      // If we have a value from global settings, process it if it's a token, otherwise use it directly
      if (value !== undefined && value !== null) {
        if (typeof value === 'string' && value.startsWith('@')) {
          return processValue(value);
        }
        return value;
      }
    }
    
    // Fallback to prop value
    return propValue && propValue.startsWith('@') ? processValue(propValue) : propValue;
  };

  // Process all values using the global design tokens logic
  const processedBackground = isTransparent ? 'transparent' : getTokenValue(background, 'colors.background');
  const processedMaxWidth = getTokenValue(maxWidth, 'container.maxWidth');
  const processedBorderRadius = getTokenValue(borderRadius, 'container.borderRadius');
  const processedFontFamily = getTokenValue(fontFamily, 'fontFamily.primary');
  const processedBoxShadow = getTokenValue(boxShadow, 'container.boxShadow') || boxShadow;

  // Helper function to resolve spacing tokens directly
  const resolveSpacingToken = (tokenValue: string): string => {
    if (!tokenValue) return '';
    
    // If it's already a processed value (not a token), return as is
    if (!tokenValue.startsWith('@')) {
      return tokenValue;
    }
    
    return processValue(tokenValue);
  };

  // Helper function to build padding string from individual values
  const buildPaddingString = (
    mainPadding?: string,
    paddingXValue?: string,
    paddingYValue?: string
  ) => {
    // If specific X or Y padding is provided, use them
    if (paddingXValue || paddingYValue) {
      const x = paddingXValue ? resolveSpacingToken(paddingXValue) : '0';
      const y = paddingYValue ? resolveSpacingToken(paddingYValue) : '0';
      return `${y} ${x}`;
    }
    
    // Otherwise use main padding
    return mainPadding ? resolveSpacingToken(mainPadding) : '';
  };

  // Helper function to build gap object for CSS
  const buildGapValues = (
    mainGap?: string,
    gapXValue?: string,
    gapYValue?: string
  ) => {
    // If specific X or Y gap is provided, use CSS Grid gap properties
    if (gapXValue || gapYValue) {
      return {
        rowGap: gapYValue ? resolveSpacingToken(gapYValue) : '0',
        columnGap: gapXValue ? resolveSpacingToken(gapXValue) : '0',
      };
    }
    
    // Otherwise use main gap
    return {
      gap: mainGap ? resolveSpacingToken(mainGap) : '',
    };
  };

  // Build complex values using global design tokens if available
  const processedPadding = (() => {
    if (globalDesignTokens) {
      const globalPadding = globalDesignTokens.container?.padding;
      const globalPaddingX = globalDesignTokens.container?.paddingX;
      const globalPaddingY = globalDesignTokens.container?.paddingY;
      return buildPaddingString(globalPadding || padding, globalPaddingX || paddingX, globalPaddingY || paddingY);
    }
    return buildPaddingString(padding, paddingX, paddingY);
  })();

  const gapStyles = (() => {
    if (globalDesignTokens) {
      const globalGap = globalDesignTokens.layout?.gap;
      const globalGapX = globalDesignTokens.layout?.gapX;
      const globalGapY = globalDesignTokens.layout?.gapY;
      return buildGapValues(globalGap || gap, globalGapX || gapX, globalGapY || gapY);
    }
    return buildGapValues(gap, gapX, gapY);
  })();

  // Get layout values from global design tokens if available
  const processedFlexDirection = globalDesignTokens?.layout?.flexDirection || flexDirection;
  const processedJustifyContent = globalDesignTokens?.layout?.justifyContent || justifyContent;
  const processedAlignItems = globalDesignTokens?.layout?.alignItems || alignItems;

  // Get text color - default to a readable color
  const textColor = processValue('@color.text') || '#0f172a';

  const containerStyle: React.CSSProperties = {
    width: width,
    height: height === 'auto' ? 'auto' : height,
    minHeight: height === 'auto' ? '100vh' : height,
    maxWidth: processedMaxWidth,
    margin: '0 auto', // Center the container
    display: 'flex',
    flexDirection: processedFlexDirection as React.CSSProperties['flexDirection'],
    justifyContent: processedJustifyContent as React.CSSProperties['justifyContent'],
    alignItems: processedAlignItems as React.CSSProperties['alignItems'],
    ...gapStyles, // Spread gap, rowGap, or columnGap properties
    background: processedBackground,
    padding: processedPadding,
    borderRadius: processedBorderRadius,
    fontFamily: processedFontFamily,
    color: textColor, // Add text color for inheritance
    boxShadow: processedBoxShadow,
    boxSizing: 'border-box',
    overflow: 'visible',
    position: 'relative',
    ...rest.style,
  };

  console.log('RenderRootContainer styles:', containerStyle);
  console.log('RenderRootContainer props:', {
    background,
    padding,
    paddingX,
    paddingY,
    gap,
    gapX,
    gapY,
    maxWidth,
    borderRadius,
    fontFamily,
  });
  console.log('Global design tokens:', globalDesignTokens);
  console.log('Processed values:', {
    processedBackground,
    processedMaxWidth,
    processedBorderRadius,
    processedFontFamily,
    processedBoxShadow,
    processedPadding,
    gapStyles,
  });

  return (
    <div
      {...rest}
      className="craft-root-container responsive-container"
      style={containerStyle}
    >
      {children}
    </div>
  );
};
