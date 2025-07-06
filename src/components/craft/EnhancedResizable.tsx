import React from 'react'
import { useNode } from '@craftjs/core'
import { Resizable } from 're-resizable'

interface EnhancedResizableProps {
  children: React.ReactNode
  onResize?: (width: number, height: number) => void
  minWidth?: number | string
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  width?: number | string
  height?: number | string
  enable?: {
    top?: boolean
    right?: boolean
    bottom?: boolean
    left?: boolean
    topRight?: boolean
    bottomRight?: boolean
    bottomLeft?: boolean
    topLeft?: boolean
  }
  lockAspectRatio?: boolean
  className?: string
}

export const EnhancedResizable: React.FC<EnhancedResizableProps> = ({
  children,
  onResize,
  minWidth = 50,
  minHeight = 30,
  maxWidth = 1200,
  maxHeight = 800,
  width = 200,
  height = 100,
  enable = {
    top: false,
    right: true,
    bottom: true,
    left: false,
    topRight: false,
    bottomRight: true,
    bottomLeft: false,
    topLeft: false,
  },
  lockAspectRatio = false,
  className = '',
}) => {
  const { isActive } = useNode((state) => ({
    isActive: state.events.selected,
  }))

  const handleResizeStop = (
    _e: MouseEvent | TouchEvent,
    _direction: string,
    ref: HTMLElement
  ) => {
    const newWidth = ref.offsetWidth
    const newHeight = ref.offsetHeight
    onResize?.(newWidth, newHeight)
  }

  // If not active, just render the content without resize handles
  if (!isActive) {
    return (
      <div 
        className={`relative ${className}`} 
        style={{ 
          width: typeof width === 'number' ? `${width}px` : width, 
          height: height === 'auto' ? 'auto' : (typeof height === 'number' ? `${height}px` : height)
        }}
      >
        {children}
      </div>
    )
  }

  const currentWidth = typeof width === 'number' ? width : parseInt(width as string) || 200
  const currentHeight = height === 'auto' ? 100 : (typeof height === 'number' ? height : parseInt(height as string) || 100)
  const currentMinWidth = typeof minWidth === 'number' ? minWidth : parseInt(minWidth as string) || 50

  return (
    <Resizable
      size={{
        width: currentWidth,
        height: currentHeight,
      }}
      minWidth={currentMinWidth}
      minHeight={minHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      enable={enable}
      lockAspectRatio={lockAspectRatio}
      onResizeStop={handleResizeStop}
      className={`relative ${className}`}
      style={{
        border: isActive ? '2px solid #3b82f6' : 'none',
      }}
      handleStyles={{
        bottomRight: {
          width: '12px',
          height: '12px',
          backgroundColor: '#3b82f6',
          border: '2px solid #ffffff',
          borderRadius: '50%',
          right: '-6px',
          bottom: '-6px',
          cursor: 'se-resize',
          zIndex: 1000,
        },
        bottom: {
          height: '8px',
          backgroundColor: '#3b82f6',
          borderRadius: '4px',
          bottom: '-4px',
          cursor: 's-resize',
          zIndex: 1000,
        },
        right: {
          width: '8px',
          backgroundColor: '#3b82f6',
          borderRadius: '4px',
          right: '-4px',
          cursor: 'e-resize',
          zIndex: 1000,
        },
      }}
      handleClasses={{
        bottomRight: 'resize-handle-bottom-right',
        bottom: 'resize-handle-bottom',
        right: 'resize-handle-right',
      }}
    >
      {children}
    </Resizable>
  )
}
