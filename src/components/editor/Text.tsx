import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizer } from '../common/Resizer';
import { TextSettings } from './settings/TextSettings';
import { useTheme } from '@/hooks/useTheme';
import { useDesignTokensStore } from '@/store/design-tokens';
import { 
    type SpacingProps, 
    getContentStyles, 
    getDefaultCraftSpacing 
} from '../../lib/spacingUtils';

interface TextProps extends SpacingProps {
  text?: string;
  fontSize?: number | string; // Allow both number and token string
  fontWeight?: string;
  fontFamily?: string; // Add font family support
  lineHeight?: string | number; // Add line height
  letterSpacing?: string | number; // Add letter spacing
  color?: string;
  backgroundColor?: string;
  textAlign?: string;
  width?: string;
  height?: string;
  useDesignTokens?: boolean; // Toggle for using design tokens
}

interface TextComponent extends React.FC<TextProps> {
  craft?: {
    props: TextProps;
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

export const Text: TextComponent = ({
  text = 'Click to edit text',
  fontSize = '@typography.base',
  fontWeight = 'normal',
  fontFamily = '@typography.primary',
  lineHeight = 'normal',
  letterSpacing = 'normal',
  color = '@color.text',
  backgroundColor = 'transparent',
  textAlign = 'left',
  height = 'auto',
  useDesignTokens = true,
  paddingTop = 8,
  paddingRight = 8,
  paddingBottom = 8,
  paddingLeft = 8,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
}) => {
  const {
    selected,
    actions: { setProp }
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  // Use design tokens hook with automatic sync
  const { processToken } = useTheme();
  // Subscribe to design token changes to trigger re-renders
  useDesignTokensStore();

  const [isEditing, setIsEditing] = React.useState(false);

  // Process design tokens or use raw values
  const processedFontSize = useDesignTokens && typeof fontSize === 'string' && fontSize.startsWith('@')
    ? processToken(fontSize)
    : typeof fontSize === 'number' ? `${fontSize}px` : fontSize;

  const processedFontFamily = useDesignTokens && typeof fontFamily === 'string' && fontFamily.startsWith('@')
    ? processToken(fontFamily)
    : fontFamily;

  const processedLineHeight = useDesignTokens && typeof lineHeight === 'string' && lineHeight.startsWith('@')
    ? processToken(lineHeight)
    : lineHeight;

  const processedLetterSpacing = useDesignTokens && typeof letterSpacing === 'string' && letterSpacing.startsWith('@')
    ? processToken(letterSpacing)
    : letterSpacing;

  const processedColor = useDesignTokens && typeof color === 'string' && color.startsWith('@')
    ? processToken(color)
    : color;

  const textStyle: React.CSSProperties = {
    ...getContentStyles(
      { paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft },
      height,
      {
        backgroundColor: backgroundColor,
      }
    ),
    fontSize: processedFontSize,
    fontFamily: processedFontFamily,
    fontWeight,
    lineHeight: processedLineHeight,
    letterSpacing: processedLetterSpacing,
    color: processedColor,
    textAlign: textAlign as 'left' | 'center' | 'right' | 'justify',
    cursor: 'text',
    width: '100%',
    height: '100%',
    border: 'none',
    outline: 'none',
    resize: 'none',
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
      <div
        className="cursor-text"
        style={textStyle}
        onClick={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
      >
        {isEditing ? (
          <textarea
            value={text}
            onChange={(e) =>
              setProp((props: TextProps) => (props.text = e.target.value))
            }
            autoFocus
            className="w-full h-full resize-none border-none outline-none bg-transparent"
            style={{
              fontSize: `${fontSize}px`,
              fontWeight,
              color,
              textAlign: textAlign as 'left' | 'center' | 'right' | 'justify',
              backgroundColor: 'transparent',
            }}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              fontSize: `${fontSize}px`,
              fontWeight,
              color,
              textAlign: textAlign as 'left' | 'center' | 'right' | 'justify',
              whiteSpace: 'pre-wrap',
            }}
          >
            {text}
          </div>
        )}
      </div>
    </Resizer>
  );
};

Text.craft = {
  props: {
    text: 'Click to edit text',
    fontSize: '@typography.base',
    fontFamily: '@typography.primary',
    fontWeight: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '@color.text',
    backgroundColor: 'transparent',
    textAlign: 'left',
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
    settings: TextSettings,
  },
  displayName: 'Text',
};
