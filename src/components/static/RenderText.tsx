import React from 'react';

interface RenderTextProps {
  text: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: string;
  width?: string;
  height?: string;
  minWidth?: number;
  minHeight?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const RenderText: React.FC<RenderTextProps> = ({
  text,
  fontSize,
  fontWeight,
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
}) => {
  const paddingValue = `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;
  const marginValue = `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`;

  return (
    <div
      style={{
        fontSize: fontSize ? `${fontSize}px` : undefined,
        fontWeight,
        color,
        backgroundColor: backgroundColor === 'transparent' ? 'transparent' : backgroundColor,
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
