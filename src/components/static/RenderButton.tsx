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
  useGlobalColor = true,
}) => {
  const tokenProcessor = TokenProcessor.getInstance();

  const processValue = (value: any): any => {
    if (typeof value === 'string' && value.startsWith('@') && useDesignTokens) {
      return tokenProcessor.processToken(value);
    }
    return value;
  };

  const processedBackgroundColor = processValue(backgroundColor);
  const processedColor = processValue(color);
  const processedBorderRadius = processValue(borderRadius);
  const processedFontSize = processValue(fontSize);
  const processedFontFamily = processValue(fontFamily);

  // Spacing helpers
  const toCss = (v: any): string | undefined => {
    if (v === undefined || v === null) return undefined;
    if (typeof v === 'number') return `${v}px`;
    if (/^\d+$/.test(v)) return `${v}px`;
    return v; // assume already has unit or token processed
  };

  const allPaddingUndefined = [paddingTop, paddingRight, paddingBottom, paddingLeft].every(v => v === undefined);
  const finalPaddingTop = toCss(allPaddingUndefined ? 8 : paddingTop);
  const finalPaddingRight = toCss(allPaddingUndefined ? 16 : paddingRight);
  const finalPaddingBottom = toCss(allPaddingUndefined ? 8 : paddingBottom);
  const finalPaddingLeft = toCss(allPaddingUndefined ? 16 : paddingLeft);

  const marginValue = `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`;

  return (
    <button
      className={`craft-button ${useGlobalColor ? 'use-global-color' : 'use-individual-color'}`}
      style={{
        backgroundColor: isTransparent ? 'transparent' : processedBackgroundColor,
        color: useGlobalColor ? 'inherit' : processedColor,
        ...(useGlobalColor ? {} : { '--craft-button-color': processedColor } as any),
        borderRadius: processedBorderRadius,
        fontSize: processedFontSize,
        fontWeight,
        fontFamily: processedFontFamily,
        width,
        height,
        minWidth,
        minHeight,
        margin: marginValue,
        paddingTop: finalPaddingTop,
        paddingRight: finalPaddingRight,
        paddingBottom: finalPaddingBottom,
        paddingLeft: finalPaddingLeft,
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {text}
    </button>
  );
};
