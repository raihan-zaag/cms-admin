import React from 'react'
import { useNode } from '@craftjs/core'
import { Resizable } from 'react-resizable'
import 'react-resizable/css/styles.css'

interface ResizeHandlesProps {
  children: React.ReactNode
  onResize?: (width: number, height: number) => void
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  width?: number
  height?: number
}

export const ResizeHandles: React.FC<ResizeHandlesProps> = ({
  children,
  onResize,
  minWidth = 50,
  minHeight = 30,
  maxWidth = 1200,
  maxHeight = 800,
  width = 200,
  height = 100,
}) => {
  const { isActive } = useNode((state) => ({
    isActive: state.events.selected,
  }))

  const handleResize = (_event: React.SyntheticEvent, { size }: { size: { width: number; height: number } }) => {
    onResize?.(size.width, size.height)
  }

  if (!isActive) {
    return (
      <div className="relative w-full h-full" style={{ width: `${width}px`, height: `${height}px` }}>
        {children}
      </div>
    )
  }

  return (
    <div className="relative">
      <Resizable
        width={width}
        height={height}
        onResize={handleResize}
        minConstraints={[minWidth, minHeight]}
        maxConstraints={[maxWidth, maxHeight]}
        resizeHandles={['se', 'sw', 'ne', 'nw', 's', 'n', 'e', 'w']}
      >
        <div 
          className="relative border-2 border-blue-500 rounded"
          style={{ 
            width: `${width}px`, 
            height: `${height}px`,
            position: 'relative'
          }}
        >
          {children}
          
          {/* Selection indicator */}
          <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
            {width} × {height}
          </div>
        </div>
      </Resizable>
    </div>
  )
}
