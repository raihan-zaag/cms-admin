import React from 'react';

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
  gap?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  fillSpace?: string;
  shadow?: number;
  radius?: number;
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
}) => {
  const paddingValue = padding ?? 
    (paddingTop || paddingRight || paddingBottom || paddingLeft 
      ? `${paddingTop || 0}px ${paddingRight || 0}px ${paddingBottom || 0}px ${paddingLeft || 0}px`
      : undefined);
  
  const marginValue = margin ??
    (marginTop || marginRight || marginBottom || marginLeft
      ? `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`
      : undefined);

  const boxShadow = shadow ? `0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.1)` : undefined;
  const borderRadius = radius ? `${radius}px` : undefined;
  const gapValue = gap ? `${gap}px` : undefined;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: flexDirection as any,
        justifyContent: justifyContent as any,
        alignItems: alignItems as any,
        flexWrap: flexWrap as any,
        gap: gapValue,
        padding: paddingValue,
        margin: marginValue,
        background: isTransparent ? 'transparent' : background,
        width,
        height,
        minWidth,
        minHeight,
        boxShadow,
        borderRadius,
        flex: fillSpace === 'yes' ? 1 : undefined,
      }}
    >
      {children}
    </div>
  );
};
