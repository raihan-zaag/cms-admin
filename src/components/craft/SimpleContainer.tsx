import React from 'react'

interface SimpleContainerProps {
  background?: string
  backgroundColor?: string
  padding?: string
  margin?: string
  width?: number | string
  height?: number | string
  minWidth?: number | string
  minHeight?: number
  borderRadius?: string
  borderColor?: string
  borderWidth?: string
  children?: React.ReactNode
}

export const SimpleContainer: React.FC<SimpleContainerProps> = ({
  background = 'transparent',
  backgroundColor = '#ffffff',
  padding = '16',
  margin = '0',
  width = 400,
  height = 300,
  minWidth = 100,
  minHeight = 50,
  borderRadius = '8',
  borderColor = '#e5e7eb',
  borderWidth = '1',
  children,
}) => {
  const containerStyle = {
    background: background !== 'transparent' ? background : backgroundColor,
    padding: `${padding}px`,
    margin: `${margin}px`,
    width: typeof width === 'number' ? `${width}px` : width,
    height: height === 'auto' ? 'auto' : typeof height === 'number' ? `${height}px` : height,
    minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
    minHeight: `${minHeight}px`,
    border: `${borderWidth}px solid ${borderColor}`,
    borderRadius: `${borderRadius}px`,
    position: 'relative' as const,
    overflow: 'visible',
  }

  return (
    <div style={containerStyle}>
      {children}
      {!children && (
        <div className="text-gray-400 text-center py-8 min-h-[100px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
          Content area
        </div>
      )}
    </div>
  )
} 