import React from 'react';

export interface RenderGridContainerProps {
  background?: string;
  isTransparent?: boolean;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  // Grid-specific properties
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridGap?: number;
  gridColumnGap?: number;
  gridRowGap?: number;
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  alignItems?: 'start' | 'end' | 'center' | 'stretch';
  justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
  alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
  gridAutoFlow?: 'row' | 'column' | 'row dense' | 'column dense';
  gridAutoColumns?: string;
  gridAutoRows?: string;
  // Spacing properties
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  shadow?: number;
  radius?: number;
  fillSpace?: 'yes' | 'no';
  // Remove editor-specific props that shouldn't be in DOM
  useGlobalTokens?: boolean;
}

export const RenderGridContainer: React.FC<RenderGridContainerProps> = ({
  background = '#ffffff',
  isTransparent = false,
  children,
  width = '100%',
  height = '300px',
  gridTemplateColumns = 'repeat(2, 1fr)',
  gridTemplateRows = 'auto',
  gridGap = 10,
  gridColumnGap,
  gridRowGap,
  justifyItems = 'stretch',
  alignItems = 'stretch',
  justifyContent = 'start',
  alignContent = 'start',
  gridAutoFlow = 'row',
  gridAutoColumns = 'auto',
  gridAutoRows = 'auto',
  paddingTop = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
  shadow = 0,
  radius = 0,
  fillSpace = 'no',
  // Don't include useGlobalTokens in destructuring as it shouldn't be passed to DOM
  ...otherProps
}) => {
  // Filter out any editor-specific props that shouldn't be in the DOM
  const cleanProps = { ...otherProps };
  delete (cleanProps as any).useGlobalTokens;

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns,
    gridTemplateRows,
    gap: gridGap ? `${gridGap}px` : undefined,
    columnGap: gridColumnGap ? `${gridColumnGap}px` : undefined,
    rowGap: gridRowGap ? `${gridRowGap}px` : undefined,
    justifyItems,
    alignItems,
    justifyContent,
    alignContent,
    gridAutoFlow,
    gridAutoColumns,
    gridAutoRows,
    background: isTransparent ? 'transparent' : background,
    width,
    height,
    paddingTop: `${paddingTop}px`,
    paddingRight: `${paddingRight}px`,
    paddingBottom: `${paddingBottom}px`,
    paddingLeft: `${paddingLeft}px`,
    marginTop: `${marginTop}px`,
    marginRight: `${marginRight}px`,
    marginBottom: `${marginBottom}px`,
    marginLeft: `${marginLeft}px`,
    borderRadius: radius ? `${radius}px` : undefined,
    boxShadow: shadow ? `0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.1)` : undefined,
    flex: fillSpace === 'yes' ? 1 : undefined,
    boxSizing: 'border-box',
  };

  return (
    <div 
      className="craft-grid-container responsive-container" 
      style={containerStyle}
      {...cleanProps}
    >
      {children}
    </div>
  );
};

export default RenderGridContainer;
