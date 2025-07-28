import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizer } from '../common/Resizer';
import { ButtonSettings } from './settings/ButtonSettings';
import { useTheme } from '@/hooks/useTheme';
import { 
    type SpacingProps, 
    getContentStyles, 
    getDefaultCraftSpacing 
} from '../../lib/spacingUtils';

interface TokenizedButtonProps extends SpacingProps {
  text?: string;
  backgroundColor?: string;
  isTransparent?: boolean;
  color?: string;
  borderRadius?: string; // Can accept tokens like '@radius.md'
  fontSize?: string; // Can accept tokens like '@typography.lg'
  fontWeight?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  // Token support
  useDesignTokens?: boolean;
}

interface TokenizedButtonComponent extends React.FC<TokenizedButtonProps> {
  craft?: {
    props: TokenizedButtonProps;
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

export const TokenizedButton: TokenizedButtonComponent = ({
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

  const { processToken, processStyleObject } = useTheme();

  // Process tokens in style properties
  const processedStyles = useDesignTokens 
    ? processStyleObject({
        backgroundColor: isTransparent ? 'transparent' : backgroundColor,
        color,
        borderRadius,
        fontSize,
      })
    : {
        backgroundColor: isTransparent ? 'transparent' : backgroundColor,
        color,
        borderRadius: typeof borderRadius === 'string' && borderRadius.includes('px') ? borderRadius : `${borderRadius}px`,
        fontSize: typeof fontSize === 'string' && fontSize.includes('px') ? fontSize : `${fontSize}px`,
      };

  const buttonStyle: React.CSSProperties = {
    ...getContentStyles(
      { paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft },
      height,
      {
        ...processedStyles,
        fontWeight,
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        height: '100%',
      }
    ),
  };

  const resizerStyle: React.CSSProperties = {
    border: selected ? `2px dashed ${useDesignTokens ? processToken('@color.primary') : '#3b82f6'}` : '2px solid #e5e7eb',
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

TokenizedButton.craft = {
  props: {
    ...getDefaultCraftSpacing(),
    text: 'Click me',
    backgroundColor: '@color.primary',
    isTransparent: false,
    color: '@color.text',
    borderRadius: '@radius.md',
    fontSize: '@typography.base',
    fontWeight: 'normal',
    height: 'auto',
    useDesignTokens: true,
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
  displayName: 'Tokenized Button',
};
