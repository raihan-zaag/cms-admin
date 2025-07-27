// Utility functions for working with constants
import { DEVICE_BREAKPOINTS, ZOOM_SETTINGS } from './devices';
import { UI_COLORS, SPACING } from './ui';

/**
 * Get device-specific styles based on current device type
 */
export const getDeviceClass = (device: 'desktop' | 'tablet' | 'mobile') => {
  const config = DEVICE_BREAKPOINTS[device.toUpperCase() as keyof typeof DEVICE_BREAKPOINTS];
  return {
    width: config.WIDTH,
    maxWidth: config.MAX_WIDTH,
    borderWidth: config.BORDER_WIDTH,
    borderRadius: config.BORDER_RADIUS,
    borderColor: config.BORDER_COLOR,
    label: config.LABEL,
    icon: config.ICON
  };
};

/**
 * Get status-specific CSS classes
 */
export const getStatusClasses = (status: 'published' | 'draft' | 'error') => {
  const statusMap = {
    published: UI_COLORS.STATUS.PUBLISHED,
    draft: UI_COLORS.STATUS.DRAFT,
    error: UI_COLORS.STATUS.ERROR
  };
  
  const config = statusMap[status];
  return `${config.BACKGROUND} ${config.TEXT}`;
};

/**
 * Validate zoom level within allowed range
 */
export const validateZoom = (zoom: number): number => {
  return Math.max(ZOOM_SETTINGS.MIN, Math.min(ZOOM_SETTINGS.MAX, zoom));
};

/**
 * Get spacing class name from numeric value
 */
export const getSpacingValue = (type: 'padding' | 'margin' | 'gap', size: keyof typeof SPACING.PADDING) => {
  const spacingMap = {
    padding: SPACING.PADDING,
    margin: SPACING.MARGIN,
    gap: SPACING.GAP
  };
  
  return spacingMap[type][size];
};

/**
 * Generate responsive grid classes
 */
export const generateGridBackground = () => {
  return `
    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px),
    linear-gradient(180deg, rgba(0,0,0,0.1) 1px, transparent 1px)
  `;
};
