import React, { useMemo } from 'react';
import { useNode } from '@craftjs/core';
import { useTheme } from '@/hooks/useTheme';
import { useDesignTokensStore } from '@/store/design-tokens';
import { getContentStyles, getDefaultCraftSpacing, type SpacingProps } from '@/lib/spacingUtils';
import { Resizer } from '@/components/common/Resizer';
import { ButtonSettings } from '../settings';


interface ButtonProps extends SpacingProps {
  text?: string;
  backgroundColor?: string;
  isTransparent?: boolean;
  color?: string;
  borderRadius?: number | string; // Allow both number and token string
  fontSize?: number | string; // Allow both number and token string
  fontWeight?: string;
  fontFamily?: string; // Add font family support
  width?: string;
  height?: string;
  onClick?: () => void;
  useDesignTokens?: boolean; // Toggle for using design tokens
  useGlobalColor?: boolean; // NEW: Toggle for using global color vs individual color
}

interface ButtonComponent extends React.FC<ButtonProps> {
  craft?: {
    props: ButtonProps;
    rules?: {
      canDrag?: () => boolean;
      canDrop?: () => boolean;
      canMoveIn?: () => boolean;
      canMoveOut?: () => boolean;
    };
    related: {
      settings: React.FC;
    };
    displayName?: string;
  };
}

export const Button: ButtonComponent = ({
  text = 'Click me',
  backgroundColor = '@color.primary',
  isTransparent = false,
  color = '@color.text',
  borderRadius = '@radius.md',
  fontSize = '@typography.base',
  fontWeight = 'normal',
  fontFamily = '@font.primary',
  height = 'auto',
  onClick,
  useDesignTokens = true,
  useGlobalColor = true, // NEW: Default to using global color
  paddingTop = 12,
  paddingRight = 12,
  paddingBottom = 12,
  paddingLeft = 12,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
}) => {
  const {
    selected,
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
    id: state.id,
  }));

  // Create unique identifier for this button instance
  const buttonId = useMemo(() => `button-${id}`, [id]);

  // Use design tokens hook with automatic sync
  const { processToken } = useTheme();
  // Subscribe to design token changes to trigger re-renders
  useDesignTokensStore();

  // Process design tokens or use raw values
  const processedBackgroundColor = (useDesignTokens && typeof backgroundColor === 'string' && backgroundColor.startsWith('@'))
    ? processToken(backgroundColor)
    : backgroundColor;

  // For color: Use global inheritance if useGlobalColor is true, otherwise use individual color
  const processedColor = useGlobalColor 
    ? 'inherit' // This will inherit from the global design tokens root
    : (useDesignTokens && typeof color === 'string' && color.startsWith('@'))
      ? processToken(color)
      : color;

  const processedBorderRadius = (useDesignTokens && typeof borderRadius === 'string' && borderRadius.startsWith('@'))
    ? processToken(borderRadius)
    : typeof borderRadius === 'number' ? `${borderRadius}px` : `${borderRadius}px`;

  const processedFontSize = (useDesignTokens && typeof fontSize === 'string' && fontSize.startsWith('@'))
    ? processToken(fontSize)
    : typeof fontSize === 'number' ? `${fontSize}px` : `${fontSize}px`;

  const processedFontFamily = (useDesignTokens && typeof fontFamily === 'string' && fontFamily.startsWith('@'))
    ? processToken(fontFamily)
    : fontFamily;

  const buttonStyle: React.CSSProperties = {
    ...getContentStyles(
      { paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft },
      height,
      {
        backgroundColor: isTransparent ? 'transparent' : processedBackgroundColor,
        borderRadius: processedBorderRadius,
        fontSize: processedFontSize,
        fontWeight,
        fontFamily: processedFontFamily,
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        // Only set individual color if not using global color
        ...(useGlobalColor ? {} : { 
          '--craft-button-color': processedColor,
          color: processedColor 
        }),
      }
    ),
  };

  const resizerStyle: React.CSSProperties = {
    border: selected ? '2px dashed #3b82f6' : '2px solid #e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  };

  

  return (
    <Resizer
      propKey={{ width: 'width', height: 'height' }}
      style={resizerStyle}
    >
      <button
        className={`craft-button transition-all duration-200 hover:opacity-80 ${useGlobalColor ? 'use-global-color' : 'use-individual-color'}`}
        style={buttonStyle}
        data-button-id={buttonId}
        onClick={onClick}
      >
        {text}
      </button>
    </Resizer>
  );
};

Button.craft = {
  props: {
    text: 'Click me',
    backgroundColor: '@color.primary',
    isTransparent: false,
    color: '@color.text',
    borderRadius: '@radius.md',
    fontSize: '@typography.base',
    fontWeight: 'normal',
    fontFamily: '@font.primary',
    width: 'auto',
    height: 'auto',
    useDesignTokens: true,
    useGlobalColor: true,
    ...getDefaultCraftSpacing(),
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: ButtonSettings,
  },
  displayName: 'Button',
};
