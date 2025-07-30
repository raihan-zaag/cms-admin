import React from 'react';
import { TokenProcessor } from '@/lib/token-processor';

interface RenderContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  background?: string;
  isTransparent?: boolean;
  padding?: number;
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
  ...rest
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
  const processedBackground = processValue(background);
  const processedGap = processValue(gap);
  const processedPaddingTop = processValue(paddingTop);
  const processedPaddingRight = processValue(paddingRight);
  const processedPaddingBottom = processValue(paddingBottom);
  const processedPaddingLeft = processValue(paddingLeft);
  const processedRadius = processValue(radius);
  const processedBorderRadius = processValue(borderRadius);

  const paddingValue = padding ?? 
    (processedPaddingTop || processedPaddingRight || processedPaddingBottom || processedPaddingLeft 
      ? `${processedPaddingTop || 0} ${processedPaddingRight || 0} ${processedPaddingBottom || 0} ${processedPaddingLeft || 0}`
      : undefined);
  
  const marginValue = margin ??
    (marginTop || marginRight || marginBottom || marginLeft
      ? `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`
      : undefined);

  const boxShadow = shadow ? `0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.1)` : undefined;
  const borderRadiusValue = processedBorderRadius || (processedRadius ? processedRadius : undefined);
  const gapValue = processedGap;

  return (
    <div
      {...rest}
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
        boxShadow,
        borderRadius: borderRadiusValue,
        flex: fillSpace === 'yes' ? 1 : undefined,
        position: position as any,
        top,
        left,
        zIndex,
        overflow: overflow as any,
        ...rest.style,
      }}
    >
      {children}
    </div>
  );
};
