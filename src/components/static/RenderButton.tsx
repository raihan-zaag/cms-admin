import React from 'react';
import { TokenProcessor } from '@/lib/token-processor';

interface RenderButtonProps {
  text?: string;
  backgroundColor?: string;
  isTransparent?: boolean;
  color?: string;
  borderRadius?: number | string;
  fontSize?: number | string;
  fontWeight?: string;
  fontFamily?: string;
  width?: string;
  height?: string;
  minWidth?: number;
  minHeight?: number;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  useDesignTokens?: boolean;
  useGlobalColor?: boolean;
}

export const RenderButton: React.FC<RenderButtonProps> = ({
  text = 'Button',
  backgroundColor = '#000',
  isTransparent,
  color = '#fff',
  borderRadius = 4,
  fontSize = 16,
  fontWeight = 'normal',
  fontFamily,
  width,
  height,
  minWidth,
  minHeight,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
  useDesignTokens = true,
}) => {
  const tokenProcessor = TokenProcessor.getInstance();

  // Helper function to process values that might be design tokens
  const processValue = (value: any): any => {
    if (typeof value === 'string' && value.startsWith('@') && useDesignTokens) {
      return tokenProcessor.processToken(value);
    }
    return value;
  };

  // Process all token-based values
  const processedBackgroundColor = processValue(backgroundColor);
  const processedColor = processValue(color);
  const processedBorderRadius = processValue(borderRadius);
  const processedFontSize = processValue(fontSize);
  const processedFontFamily = processValue(fontFamily);
  const processedPaddingTop = processValue(paddingTop);
  const processedPaddingRight = processValue(paddingRight);
  const processedPaddingBottom = processValue(paddingBottom);
  const processedPaddingLeft = processValue(paddingLeft);

  const paddingValue = (processedPaddingTop !== undefined || processedPaddingRight !== undefined || 
                       processedPaddingBottom !== undefined || processedPaddingLeft !== undefined) 
    ? `${processedPaddingTop || 0} ${processedPaddingRight || 0} ${processedPaddingBottom || 0} ${processedPaddingLeft || 0}`
    : '10px';

  const marginValue = `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`;

  return (
    <button
      className="craft-button"
      style={{
        backgroundColor: isTransparent ? 'transparent' : processedBackgroundColor,
        color: processedColor,
        borderRadius: processedBorderRadius,
        padding: paddingValue,
        fontSize: processedFontSize,
        fontWeight,
        fontFamily: processedFontFamily,
        width,
        height,
        minWidth,
        minHeight,
        margin: marginValue,
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {text}
    </button>
  );
};
