/**
 * Utility functions for handling margin and padding calculations in editor components
 */

export interface SpacingProps {
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

/**
 * Calculate total horizontal margin (left + right)
 */
export const getTotalHorizontalMargin = (props: SpacingProps): number => {
  const marginLeft = props.marginLeft || 0;
  const marginRight = props.marginRight || 0;
  return marginLeft + marginRight;
};

/**
 * Calculate total vertical margin (top + bottom)
 */
export const getTotalVerticalMargin = (props: SpacingProps): number => {
  const marginTop = props.marginTop || 0;
  const marginBottom = props.marginBottom || 0;
  return marginTop + marginBottom;
};

/**
 * Calculate total horizontal padding (left + right)
 */
export const getTotalHorizontalPadding = (props: SpacingProps): number => {
  const paddingLeft = props.paddingLeft || 0;
  const paddingRight = props.paddingRight || 0;
  return paddingLeft + paddingRight;
};

/**
 * Calculate total vertical padding (top + bottom)
 */
export const getTotalVerticalPadding = (props: SpacingProps): number => {
  const paddingTop = props.paddingTop || 0;
  const paddingBottom = props.paddingBottom || 0;
  return paddingTop + paddingBottom;
};

/**
 * Generate margin styles object
 */
export const getMarginStyles = (props: SpacingProps) => ({
  marginTop: `${props.marginTop || 0}px`,
  marginRight: `${props.marginRight || 0}px`,
  marginBottom: `${props.marginBottom || 0}px`,
  marginLeft: `${props.marginLeft || 0}px`,
});

/**
 * Generate padding styles object
 */
export const getPaddingStyles = (props: SpacingProps) => ({
  paddingTop: `${props.paddingTop || 0}px`,
  paddingRight: `${props.paddingRight || 0}px`,
  paddingBottom: `${props.paddingBottom || 0}px`,
  paddingLeft: `${props.paddingLeft || 0}px`,
});

/**
 * Calculate compressed width accounting for margins
 * Returns calc() string for CSS width property
 */
export const getCompressedWidth = (props: SpacingProps): string => {
  const totalHorizontalMargin = getTotalHorizontalMargin(props);
  return totalHorizontalMargin > 0 
    ? `calc(100% - ${totalHorizontalMargin}px)` 
    : '100%';
};

/**
 * Calculate compressed height accounting for margins
 * Returns calc() string for CSS height property
 */
export const getCompressedHeight = (props: SpacingProps, height: string = 'auto'): string => {
  if (height === 'auto') return 'auto';
  
  const totalVerticalMargin = getTotalVerticalMargin(props);
  return totalVerticalMargin > 0 
    ? `calc(100% - ${totalVerticalMargin}px)` 
    : '100%';
};

/**
 * Generate complete content div styles with margins, padding, and compressed dimensions
 */
export const getContentStyles = (
  props: SpacingProps, 
  height: string = 'auto',
  additionalStyles: React.CSSProperties = {}
): React.CSSProperties => ({
  ...getMarginStyles(props),
  ...getPaddingStyles(props),
  width: getCompressedWidth(props),
  height: getCompressedHeight(props, height),
  boxSizing: 'border-box' as const,
  overflow: 'hidden' as const,
  ...additionalStyles,
});

/**
 * Default spacing values for components
 */
export const DEFAULT_SPACING = {
  paddingTop: 10,
  paddingRight: 10,
  paddingBottom: 10,
  paddingLeft: 10,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
} as const;

/**
 * Generate default craft props with spacing
 */
export const getDefaultCraftSpacing = () => DEFAULT_SPACING;
