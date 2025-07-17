import React from 'react';

interface RenderButtonProps {
  text?: string;
  backgroundColor?: string;
  color?: string;
  borderRadius?: number;
  padding?: number;
  fontSize?: number;
  fontWeight?: string;
  width?: string;
  height?: string;
  minWidth?: number;
  minHeight?: number;
}

export const RenderButton: React.FC<RenderButtonProps> = ({
  text = 'Button',
  backgroundColor = '#000',
  color = '#fff',
  borderRadius = 4,
  padding = 10,
  fontSize = 16,
  fontWeight = 'normal',
  width,
  height,
  minWidth,
  minHeight,
}) => {
  return (
    <button
      style={{
        backgroundColor,
        color,
        borderRadius,
        padding,
        fontSize,
        fontWeight,
        width,
        height,
        minWidth,
        minHeight,
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {text}
    </button>
  );
};
