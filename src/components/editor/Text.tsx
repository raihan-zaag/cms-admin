import React, { useMemo } from 'react';
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
  useGlobalColor?: boolean; // NEW: Toggle for using global settings vs individual settings
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
  fontFamily = '@font.primary', // ✅ Fixed: Use @font.primary instead of @typography.primary
  lineHeight = 'normal',
  letterSpacing = 'normal',
  color = '@color.text',
  backgroundColor = 'transparent',
  textAlign = 'left',
  height = 'auto',
  useDesignTokens = true,
  useGlobalColor = true, // NEW: Default to using global settings
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
    actions: { setProp },
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
    id: state.id,
  }));

  // Create unique identifier for this text instance
  const textId = useMemo(() => `text-${id}`, [id]);

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

  console.log('Font family processing:', {
    original: fontFamily,
    processed: processedFontFamily,
    useDesignTokens,
    isTokenString: typeof fontFamily === 'string' && fontFamily.startsWith('@'),
    directTokenTest: processToken('@font.mono'),
    directFontPrimary: processToken('@font.primary')
  });

  const processedLineHeight = useDesignTokens && typeof lineHeight === 'string' && lineHeight.startsWith('@')
    ? processToken(lineHeight)
    : lineHeight;

  const processedLetterSpacing = useDesignTokens && typeof letterSpacing === 'string' && letterSpacing.startsWith('@')
    ? processToken(letterSpacing)
    : letterSpacing;

  const processedColor = useGlobalColor 
    ? 'inherit' // This will inherit from the global design tokens root
    : (useDesignTokens && typeof color === 'string' && color.startsWith('@'))
      ? processToken(color)
      : color;

  const processedBackgroundColor = useDesignTokens && typeof backgroundColor === 'string' && backgroundColor.startsWith('@')
    ? processToken(backgroundColor)
    : backgroundColor;

  
  const textStyle: React.CSSProperties = {
    ...getContentStyles(
      { paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft },
      height,
      {
        backgroundColor: processedBackgroundColor,
      }
    ),
    fontSize: processedFontSize,
    fontWeight,
    lineHeight: processedLineHeight,
    letterSpacing: processedLetterSpacing,
    textAlign: textAlign as 'left' | 'center' | 'right' | 'justify',
    cursor: 'text',
    width: '100%',
    height: '100%',
    border: 'none',
    outline: 'none',
    resize: 'none',
    // Only set individual styles if not using global mode
    ...(useGlobalColor ? {} : { 
      '--craft-text-color': processedColor,
      color: processedColor,
      '--craft-text-font-family': processedFontFamily,
      fontFamily: processedFontFamily
    }),
  };

  const resizerStyle: React.CSSProperties = {
    border: selected ? '2px dashed #3b82f6' : '2px solid #e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  };

  console.log('Text component processing:', {
    original: { fontSize, fontFamily, color, backgroundColor },
    processed: { 
      processedFontSize, 
      processedFontFamily, 
      processedColor, 
      processedBackgroundColor 
    },
    useGlobalColor,
    useDesignTokens
  });
  console.log('Text rendered with styles:', textStyle);

  return (
    <Resizer
      propKey={{ width: 'width', height: 'height' }}
      style={resizerStyle}
    >
      <div
        className={`cursor-text craft-text ${useGlobalColor ? 'use-global-color' : 'use-individual-color'}`}
        style={textStyle}
        data-text-id={textId}
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
              fontSize: processedFontSize,
              fontFamily: useGlobalColor ? 'inherit' : processedFontFamily,
              fontWeight,
              lineHeight: processedLineHeight,
              letterSpacing: processedLetterSpacing,
              color: useGlobalColor ? 'inherit' : processedColor,
              textAlign: textAlign as 'left' | 'center' | 'right' | 'justify',
              backgroundColor: 'transparent',
            }}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              fontSize: processedFontSize,
              fontFamily: useGlobalColor ? 'inherit' : processedFontFamily,
              fontWeight,
              lineHeight: processedLineHeight,
              letterSpacing: processedLetterSpacing,
              color: useGlobalColor ? 'inherit' : processedColor,
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
    fontFamily: '@font.primary', // ✅ Fixed: Use @font.primary instead of @typography.primary
    fontWeight: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '@color.text',
    backgroundColor: 'transparent',
    textAlign: 'left',
    width: 'auto',
    height: 'auto',
    useDesignTokens: true,
    useGlobalColor: true, // Default to using global settings
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
