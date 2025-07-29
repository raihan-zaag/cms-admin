import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizer } from '../common/Resizer';
import { ButtonSettings } from './settings/ButtonSettings';
import { useTheme } from '@/hooks/useTheme';
import { useDesignTokensStore } from '@/store/design-tokens';
import { 
    type SpacingProps, 
    getContentStyles, 
    getDefaultCraftSpacing 
} from '../../lib/spacingUtils';

interface ButtonProps extends SpacingProps {
  text?: string;
  backgroundColor?: string;
  isTransparent?: boolean;
  color?: string;
  borderRadius?: number | string; // Allow both number and token string
  fontSize?: number | string; // Allow both number and token string
  fontWeight?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  useDesignTokens?: boolean; // Toggle for using design tokens
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
  height = 'auto',
  onClick,
  useDesignTokens = true,
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
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  // Use design tokens hook with automatic sync
  const { processToken } = useTheme();
  // Subscribe to design token changes to trigger re-renders
  useDesignTokensStore();

  // Process design tokens or use raw values
  const processedBackgroundColor = useDesignTokens && typeof backgroundColor === 'string' && backgroundColor.startsWith('@')
    ? processToken(backgroundColor)
    : backgroundColor;

  const processedColor = useDesignTokens && typeof color === 'string' && color.startsWith('@')
    ? processToken(color)
    : color;

  const processedBorderRadius = useDesignTokens && typeof borderRadius === 'string' && borderRadius.startsWith('@')
    ? processToken(borderRadius)
    : typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;

  const processedFontSize = useDesignTokens && typeof fontSize === 'string' && fontSize.startsWith('@')
    ? processToken(fontSize)
    : typeof fontSize === 'number' ? `${fontSize}px` : fontSize;

  const buttonStyle: React.CSSProperties = {
    ...getContentStyles(
      { paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft },
      height,
      {
        backgroundColor: isTransparent ? 'transparent' : processedBackgroundColor,
        color: processedColor,
        borderRadius: processedBorderRadius,
        fontSize: processedFontSize,
        fontWeight,
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        height: '100%',
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
        className="transition-all duration-200 hover:opacity-80"
        style={buttonStyle}
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
    width: 'auto',
    height: 'auto',
    useDesignTokens: true,
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
