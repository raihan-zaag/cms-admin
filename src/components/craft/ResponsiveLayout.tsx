import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { Resizable } from 'react-resizable'
import { useNode, type UserComponent } from '@craftjs/core'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface ResizableWrapperProps {
  children?: React.ReactNode
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
}

export const ResizableWrapper: UserComponent<ResizableWrapperProps> = ({
  children,
  width = 300,
  height = 200,
  minWidth = 100,
  minHeight = 50,
  maxWidth = 1000,
  maxHeight = 1000,
}) => {
  const {
    connectors: { connect, drag },
    isActive,
  } = useNode((state) => ({
    isActive: state.events.selected,
  }))

  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref))
        }
      }}
      className="relative"
    >
      <Resizable
        width={width}
        height={height}
        minConstraints={[minWidth, minHeight]}
        maxConstraints={[maxWidth, maxHeight]}
        resizeHandles={['se', 'e', 's']}
        className={`${isActive ? 'ring-2 ring-blue-500' : ''}`}
      >
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            border: isActive ? '2px solid #3b82f6' : '1px solid transparent',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative',
          }}
          className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {children}
          {isActive && (
            <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br">
              Resizable
            </div>
          )}
        </div>
      </Resizable>
    </div>
  )
}

interface GridLayoutProps {
  children?: React.ReactNode
  cols?: { lg: number; md: number; sm: number; xs: number; xxs: number }
  rowHeight?: number
  margin?: [number, number]
  containerPadding?: [number, number]
}

export const GridLayout: UserComponent<GridLayoutProps> = ({
  children,
  cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight = 30,
  margin = [10, 10],
  containerPadding = [10, 10],
}) => {
  const {
    connectors: { connect, drag },
  } = useNode()

  const layouts = {
    lg: [],
    md: [],
    sm: [],
    xs: [],
    xxs: [],
  }

  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref))
        }
      }}
      className="w-full"
    >
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={cols}
        rowHeight={rowHeight}
        margin={margin}
        containerPadding={containerPadding}
        isDraggable={true}
        isResizable={true}
        compactType="vertical"
      >
        {children}
      </ResponsiveGridLayout>
    </div>
  )
}

// Settings components
const ResizableWrapperSettings = () => {
  const {
    actions: { setProp },
    props: { width, height, minWidth, minHeight, maxWidth, maxHeight },
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Width</label>
          <input
            type="number"
            value={width || 300}
            onChange={(e) => setProp((props: ResizableWrapperProps) => {
              props.width = parseInt(e.target.value)
            })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Height</label>
          <input
            type="number"
            value={height || 200}
            onChange={(e) => setProp((props: ResizableWrapperProps) => {
              props.height = parseInt(e.target.value)
            })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Min Width</label>
          <input
            type="number"
            value={minWidth || 100}
            onChange={(e) => setProp((props: ResizableWrapperProps) => {
              props.minWidth = parseInt(e.target.value)
            })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Min Height</label>
          <input
            type="number"
            value={minHeight || 50}
            onChange={(e) => setProp((props: ResizableWrapperProps) => {
              props.minHeight = parseInt(e.target.value)
            })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Max Width</label>
          <input
            type="number"
            value={maxWidth || 1000}
            onChange={(e) => setProp((props: ResizableWrapperProps) => {
              props.maxWidth = parseInt(e.target.value)
            })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Height</label>
          <input
            type="number"
            value={maxHeight || 1000}
            onChange={(e) => setProp((props: ResizableWrapperProps) => {
              props.maxHeight = parseInt(e.target.value)
            })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  )
}

const GridLayoutSettings = () => {
  const {
    actions: { setProp },
    props: { rowHeight, margin },
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <div className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium mb-1">Row Height</label>
        <input
          type="number"
          value={rowHeight || 30}
          onChange={(e) => setProp((props: GridLayoutProps) => {
            props.rowHeight = parseInt(e.target.value)
          })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Margin X</label>
          <input
            type="number"
            value={margin?.[0] || 10}
            onChange={(e) => setProp((props: GridLayoutProps) => {
              const newMargin = props.margin || [10, 10]
              newMargin[0] = parseInt(e.target.value)
              props.margin = newMargin as [number, number]
            })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Margin Y</label>
          <input
            type="number"
            value={margin?.[1] || 10}
            onChange={(e) => setProp((props: GridLayoutProps) => {
              const newMargin = props.margin || [10, 10]
              newMargin[1] = parseInt(e.target.value)
              props.margin = newMargin as [number, number]
            })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  )
}

ResizableWrapper.craft = {
  props: {
    width: 300,
    height: 200,
    minWidth: 100,
    minHeight: 50,
    maxWidth: 1000,
    maxHeight: 1000,
  },
  related: {
    settings: ResizableWrapperSettings,
  },
}

GridLayout.craft = {
  props: {
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 30,
    margin: [10, 10],
    containerPadding: [10, 10],
  },
  related: {
    settings: GridLayoutSettings,
  },
}
