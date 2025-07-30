import React from 'react';
import { TokenProcessor } from '@/lib/token-processor';

interface RenderTextProps {
  text: string;
  fontSize?: number | string;
  fontFamily?: string;
  fontWeight?: string;
  lineHeight?: string | number;
  letterSpacing?: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: string;
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

export const RenderText: React.FC<RenderTextProps> = ({
  text,
  fontSize,
  fontFamily,
  fontWeight,
  lineHeight,
  letterSpacing,
  color,
  backgroundColor,
  textAlign,
  width,
  height,
  minWidth,
  minHeight,
  paddingTop = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingLeft = 0,
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
  const processedFontSize = processValue(fontSize);
  const processedFontFamily = processValue(fontFamily);
  const processedColor = processValue(color);
  const processedBackgroundColor = processValue(backgroundColor);
  const processedPaddingTop = processValue(paddingTop);
  const processedPaddingRight = processValue(paddingRight);
  const processedPaddingBottom = processValue(paddingBottom);
  const processedPaddingLeft = processValue(paddingLeft);

  const paddingValue = `${processedPaddingTop || 0} ${processedPaddingRight || 0} ${processedPaddingBottom || 0} ${processedPaddingLeft || 0}`;
  const marginValue = `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;

  return (
    <div
      className="craft-text"
      style={{
        fontSize: processedFontSize,
        fontFamily: processedFontFamily,
        fontWeight,
        lineHeight,
        letterSpacing,
        color: processedColor,
        backgroundColor: processedBackgroundColor === 'transparent' ? 'transparent' : processedBackgroundColor,
        textAlign: textAlign as any,
        width: width === 'auto' ? 'auto' : width,
        height: height === 'auto' ? 'auto' : height,
        minWidth,
        minHeight,
        padding: paddingValue,
        margin: marginValue,
      }}
    >
      {text}
    </div>
  );
};
