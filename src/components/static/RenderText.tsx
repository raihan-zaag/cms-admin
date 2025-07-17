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
}) => {
  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        backgroundColor,
        textAlign,
        width,
        height,
        minWidth,
        minHeight,
      }}
    >
      {text}
    </div>
  );
};
