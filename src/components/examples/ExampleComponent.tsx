// Example component showing how to use constants throughout the application
import React from 'react';
import { ZOOM_SETTINGS } from '@/constants/devices';
import { UI_COLORS, SPACING } from '@/constants/ui';
import { EDITOR_SETTINGS } from '@/constants/editor';
import { getStatusClasses, getDeviceClass, validateZoom } from '@/constants/utils';

interface ExampleComponentProps {
  status: 'published' | 'draft' | 'error';
  device: 'desktop' | 'tablet' | 'mobile';
  zoom: number;
}

export const ExampleComponent: React.FC<ExampleComponentProps> = ({ 
  status, 
  device, 
  zoom 
}) => {
  // Use constant values instead of hardcoded ones
  const deviceConfig = getDeviceClass(device);
  const statusClasses = getStatusClasses(status);
  const validatedZoom = validateZoom(zoom);

  return (
    <div className={`min-h-screen ${UI_COLORS.GRADIENTS.MAIN}`}>
      {/* Status Badge using constants */}
      <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusClasses}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>

      {/* Device info using constants */}
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">
          {deviceConfig.icon} {deviceConfig.label}
        </h3>
        <p className="text-gray-600">
          Width: {deviceConfig.width}px, Max Width: {deviceConfig.maxWidth}px
        </p>
      </div>

      {/* Zoom controls using constants */}
      <div className="mt-4 flex items-center space-x-4">
        <button
          disabled={validatedZoom <= ZOOM_SETTINGS.MIN}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Zoom Out
        </button>
        <span className="text-gray-700">{validatedZoom}%</span>
        <button
          disabled={validatedZoom >= ZOOM_SETTINGS.MAX}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Zoom In
        </button>
      </div>

      {/* Editor canvas using constants */}
      <div 
        className="mt-4 border-2 rounded-lg overflow-hidden"
        style={{
          border: EDITOR_SETTINGS.SELECTION.INACTIVE_BORDER,
          borderRadius: `${EDITOR_SETTINGS.SELECTION.BORDER_RADIUS}px`,
          background: `
            linear-gradient(90deg, ${EDITOR_SETTINGS.GRID.COLOR} 1px, transparent 1px),
            linear-gradient(180deg, ${EDITOR_SETTINGS.GRID.COLOR} 1px, transparent 1px)
          `,
          backgroundSize: `${EDITOR_SETTINGS.GRID.SIZE}px ${EDITOR_SETTINGS.GRID.SIZE}px`
        }}
      >
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-900">Canvas Area</h2>
          <p className="text-gray-600 mt-2">
            This canvas uses constants for grid size ({EDITOR_SETTINGS.GRID.SIZE}px), 
            border styling, and colors.
          </p>
        </div>
      </div>

      {/* Spacing examples using constants */}
      <div className="mt-4 space-y-2">
        <div 
          className="bg-white rounded-lg shadow-sm"
          style={{ 
            padding: `${SPACING.PADDING.MD * 4}px`,
            margin: `${SPACING.MARGIN.SM * 4}px 0`
          }}
        >
          <h4 className="font-semibold">Using Spacing Constants</h4>
          <p className="text-gray-600">
            Padding: {SPACING.PADDING.MD * 4}px, Margin: {SPACING.MARGIN.SM * 4}px
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExampleComponent;
