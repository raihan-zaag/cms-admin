import React from 'react';
import { TokenProcessor } from '@/lib/token-processor';

interface RenderContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  background?: string;
  isTransparent?: boolean;
  padding?: number | string; // Allow string for tokens
  margin?: number;
  width?: string;
  height?: string;
  minWidth?: number;
  minHeight?: number;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  flexWrap?: string;
  gap?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  fillSpace?: string;
  shadow?: number;
  radius?: number | string;
  borderRadius?: string;
  position?: string;
  top?: string;
  left?: string;
  zIndex?: string | number;
  overflow?: string;
  useDesignTokens?: boolean;
  useGlobalTokens?: boolean; // Add this to interface but filter it out
  
  // RootContainer specific properties
  maxWidth?: string;
  paddingX?: string;
  paddingY?: string;
  gapX?: string;
  gapY?: string;
  fontFamily?: string;
  boxShadow?: string;
}

export const RenderContainer: React.FC<RenderContainerProps> = ({
  children,
  background,
  isTransparent,
  padding,
  margin,
  width,
  height,
  minWidth,
  minHeight,
  flexDirection,
  justifyContent,
  alignItems,
  flexWrap,
  gap,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  fillSpace,
  shadow,
  radius,
  borderRadius,
  position,
  top,
  left,
  zIndex,
  overflow,
  useDesignTokens = true,
  // RootContainer specific properties
  maxWidth,
  paddingX,
  paddingY,
  gapX,
  gapY,
  fontFamily,
  boxShadow,
  ...rest
}) => {
  // Remove useGlobalTokens from rest props to prevent it from being passed to DOM
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { useGlobalTokens: _, ...cleanRest } = rest as any;
  
  // Get fresh TokenProcessor instance for each render to ensure latest tokens
  const tokenProcessor = TokenProcessor.getInstance();

  // Helper function to process values that might be design tokens
  const processValue = (value: any): any => {
    if (typeof value === 'string' && value.startsWith('@') && useDesignTokens) {
      const processed = tokenProcessor.processToken(value);
      console.log(`RenderContainer token: ${value} -> ${processed}`);
      return processed;
    }
    return value;
  };

  // Process all token-based values
  const processedBackground = processValue(background);
  const processedGap = processValue(gap);
  const processedPadding = processValue(padding);
  const processedPaddingTop = processValue(paddingTop);
  const processedPaddingRight = processValue(paddingRight);
  const processedPaddingBottom = processValue(paddingBottom);
  const processedPaddingLeft = processValue(paddingLeft);
  const processedRadius = processValue(radius);
  const processedBorderRadius = processValue(borderRadius);
  
  // Process RootContainer specific properties
  const processedMaxWidth = processValue(maxWidth);
  const processedPaddingX = processValue(paddingX);
  const processedPaddingY = processValue(paddingY);
  const processedGapX = processValue(gapX);
  const processedGapY = processValue(gapY);
  const processedFontFamily = processValue(fontFamily);
  const processedBoxShadow = processValue(boxShadow);

  const paddingValue = processedPadding ?? 
    (processedPaddingTop || processedPaddingRight || processedPaddingBottom || processedPaddingLeft 
      ? `${processedPaddingTop || 0} ${processedPaddingRight || 0} ${processedPaddingBottom || 0} ${processedPaddingLeft || 0}`
      : undefined) ??
    (processedPaddingX || processedPaddingY 
      ? `${processedPaddingY || 0} ${processedPaddingX || 0}`
      : undefined);
  
  const marginValue = margin ??
    (marginTop || marginRight || marginBottom || marginLeft
      ? `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`
      : undefined);

  const shadowValue = processedBoxShadow || (shadow ? `0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.1)` : undefined);
  const borderRadiusValue = processedBorderRadius || (processedRadius ? processedRadius : undefined);
  const gapValue = processedGap || (processedGapX && processedGapY ? `${processedGapY} ${processedGapX}` : processedGapX || processedGapY);

  return (
    <div
      {...cleanRest}
      className="craft-container responsive-container"
      style={{
        display: 'flex',
        flexDirection: flexDirection as any,
        justifyContent: justifyContent as any,
        alignItems: alignItems as any,
        flexWrap: flexWrap as any,
        gap: gapValue,
        padding: paddingValue,
        margin: marginValue,
        background: isTransparent ? 'transparent' : processedBackground,
        width,
        height,
        minWidth,
        minHeight,
        maxWidth: processedMaxWidth,
        boxShadow: shadowValue,
        borderRadius: borderRadiusValue,
        flex: fillSpace === 'yes' ? 1 : undefined,
        position: position as any,
        top,
        left,
        zIndex,
        overflow: overflow as any,
        fontFamily: processedFontFamily,
        ...cleanRest.style,
      }}
    >
      {children}
    </div>
  );
};
