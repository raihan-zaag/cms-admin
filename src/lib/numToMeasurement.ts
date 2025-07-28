export const isPercentage = (value: string | number): boolean => {
  return typeof value === 'string' && value.trim().endsWith('%');
};

export const pxToPercent = (px: number, total: number): number => {
  if (total === 0) return 0;
  return parseFloat(((px / total) * 100).toFixed(2));
};

export const percentToPx = (
  percentOrPx: string | number,
  total: number
): number => {
  if (typeof percentOrPx === 'number') return percentOrPx;

  const value = percentOrPx.trim();
  if (value.endsWith('%')) {
    const numeric = parseFloat(value.replace('%', ''));
    return Math.round((numeric / 100) * total);
  }

  return parseInt(value, 10); // fallback for px value in string
};

export const getElementDimensions = (el: HTMLElement | null) => {
  if (!el) return { width: 0, height: 0 };
  const rect = el.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
};
