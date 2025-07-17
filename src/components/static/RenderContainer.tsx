import React from 'react';

interface RenderContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  background?: string;
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
}

export const RenderContainer: React.FC<RenderContainerProps> = ({
  children,
  background,
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
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection,
        justifyContent,
        alignItems,
        flexWrap,
        gap,
        padding,
        margin,
        background,
        width,
        height,
        minWidth,
        minHeight,
      }}
    >
      {children}
    </div>
  );
};
