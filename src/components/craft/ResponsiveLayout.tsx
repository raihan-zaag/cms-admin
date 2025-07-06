import { useNode, type UserComponent } from '@craftjs/core'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { EnhancedResizable } from './EnhancedResizable'

interface GridLayoutProps {
  columns?: number
  gap?: string
  backgroundColor?: string
  padding?: string
  borderRadius?: string
  width?: number
  height?: number
  children?: React.ReactNode
}

interface GridColumnProps {
  span?: number
  backgroundColor?: string
  padding?: string
  borderRadius?: string
  children?: React.ReactNode
}

interface SectionProps {
  backgroundColor?: string
  padding?: string
  margin?: string
  borderRadius?: string
  borderWidth?: string
  borderColor?: string
  width?: number
  height?: number
  children?: React.ReactNode
}

export const GridLayout: UserComponent<GridLayoutProps> = ({
  columns = 2,
  gap = '16',
  backgroundColor = 'transparent',
  padding = '16',
  borderRadius = '8',
  width = 800,
  height = 400,
  children,
}) => {
  const {
    connectors: { connect, drag },
    isActive,
    actions: { setProp },
  } = useNode((state) => ({
    isActive: state.events.selected,
  }))

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
    backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : 'transparent',
    padding: `${padding}px`,
    borderRadius: `${borderRadius}px`,
    border: isActive ? '2px solid #3b82f6' : '1px solid transparent',
    width: `${width}px`,
    height: `${height}px`,
    position: 'relative' as const,
    minHeight: '200px',
  }

  return (
    <EnhancedResizable
      onResize={(newWidth: number, newHeight: number) => {
        setProp((props: GridLayoutProps) => {
          props.width = newWidth
          props.height = newHeight
        })
      }}
      minWidth={200}
      minHeight={150}
      maxWidth={1200}
      maxHeight={800}
      width={width}
      height={height}
      enable={{
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <div
        ref={(ref: HTMLDivElement | null) => {
          if (ref) {
            connect(drag(ref))
          }
        }}
        style={gridStyle}
        className="relative transition-all duration-200 hover:shadow-md w-full h-full"
      >
        {children}
        {!children && (
          <div className="col-span-full text-gray-400 text-center py-8 min-h-[100px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
            Drop components or grid columns here
          </div>
        )}
        {isActive && (
          <div className="absolute -top-6 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
            Grid Layout ({columns} columns)
          </div>
        )}
      </div>
    </EnhancedResizable>
  )
}

export const GridColumn: UserComponent<GridColumnProps> = ({
  span = 1,
  backgroundColor = 'transparent',
  padding = '12',
  borderRadius = '4',
  children,
}) => {
  const {
    connectors: { connect, drag },
    isActive,
  } = useNode((state) => ({
    isActive: state.events.selected,
  }))

  const columnStyle = {
    gridColumn: `span ${span}`,
    backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : 'transparent',
    padding: `${padding}px`,
    borderRadius: `${borderRadius}px`,
    border: isActive ? '2px solid #10b981' : '1px solid transparent',
    position: 'relative' as const,
    minHeight: '100px',
  }

  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref))
        }
      }}
      style={columnStyle}
      className="relative transition-all duration-200 hover:shadow-sm"
    >
      {children}
      {!children && (
        <div className="text-gray-400 text-center py-4 min-h-[80px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
          Drop components here
        </div>
      )}
      {isActive && (
        <div className="absolute -top-6 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
          Grid Column (span {span})
        </div>
      )}
    </div>
  )
}

export const Section: UserComponent<SectionProps> = ({
  backgroundColor = 'transparent',
  padding = '24',
  margin = '0',
  borderRadius = '8',
  borderWidth = '1',
  borderColor = '#e5e7eb',
  width = 600,
  height = 300,
  children,
}) => {
  const {
    connectors: { connect, drag },
    isActive,
    actions: { setProp },
  } = useNode((state) => ({
    isActive: state.events.selected,
  }))

  const sectionStyle = {
    backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : 'transparent',
    padding: `${padding}px`,
    margin: `${margin}px`,
    borderRadius: `${borderRadius}px`,
    border: isActive 
      ? '2px solid #8b5cf6' 
      : `${borderWidth}px solid ${borderColor}`,
    width: `${width}px`,
    height: `${height}px`,
    position: 'relative' as const,
    minHeight: '150px',
  }

  return (
    <EnhancedResizable
      onResize={(newWidth: number, newHeight: number) => {
        setProp((props: SectionProps) => {
          props.width = newWidth
          props.height = newHeight
        })
      }}
      minWidth={150}
      minHeight={100}
      maxWidth={1000}
      maxHeight={600}
      width={width}
      height={height}
      enable={{
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <div
        ref={(ref: HTMLDivElement | null) => {
          if (ref) {
            connect(drag(ref))
          }
        }}
        style={sectionStyle}
        className="relative transition-all duration-200 hover:shadow-md w-full h-full"
      >
        {children}
        {!children && (
          <div className="text-gray-400 text-center py-8 min-h-[100px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
            Drop grid layouts or components here
          </div>
        )}
        {isActive && (
          <div className="absolute -top-6 left-0 bg-purple-500 text-white text-xs px-2 py-1 rounded z-10">
            Section
          </div>
        )}
      </div>
    </EnhancedResizable>
  )
}

// Settings components
const GridLayoutSettings = () => {
  const {
    actions: { setProp },
    props: { columns, gap, backgroundColor, width, height },
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="columns">Columns</Label>
        <Input
          id="columns"
          type="number"
          value={columns || 2}
          onChange={(e) => setProp((props: GridLayoutProps) => {
            props.columns = parseInt(e.target.value) || 2
          })}
          min="1"
          max="12"
        />
      </div>

      <div>
        <Label htmlFor="gap">Gap (px)</Label>
        <Input
          id="gap"
          type="number"
          value={gap || '16'}
          onChange={(e) => setProp((props: GridLayoutProps) => {
            props.gap = e.target.value
          })}
        />
      </div>

      <div>
        <Label htmlFor="backgroundColor">Background Color</Label>
        <div className="flex gap-2">
          <Input
            id="backgroundColor"
            type="color"
            value={backgroundColor === 'transparent' ? '#ffffff' : backgroundColor}
            onChange={(e) => setProp((props: GridLayoutProps) => {
              props.backgroundColor = e.target.value
            })}
            className="w-16"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setProp((props: GridLayoutProps) => {
              props.backgroundColor = 'transparent'
            })}
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="width">Width (px)</Label>
          <Input
            id="width"
            type="number"
            value={width || 800}
            onChange={(e) => setProp((props: GridLayoutProps) => {
              props.width = parseInt(e.target.value) || 800
            })}
          />
        </div>
        <div>
          <Label htmlFor="height">Height (px)</Label>
          <Input
            id="height"
            type="number"
            value={height || 400}
            onChange={(e) => setProp((props: GridLayoutProps) => {
              props.height = parseInt(e.target.value) || 400
            })}
          />
        </div>
      </div>
    </div>
  )
}

const GridColumnSettings = () => {
  const {
    actions: { setProp },
    props: { span, backgroundColor, padding },
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="span">Column Span</Label>
        <Input
          id="span"
          type="number"
          value={span || 1}
          onChange={(e) => setProp((props: GridColumnProps) => {
            props.span = parseInt(e.target.value) || 1
          })}
          min="1"
          max="12"
        />
      </div>

      <div>
        <Label htmlFor="backgroundColor">Background Color</Label>
        <div className="flex gap-2">
          <Input
            id="backgroundColor"
            type="color"
            value={backgroundColor === 'transparent' ? '#ffffff' : backgroundColor}
            onChange={(e) => setProp((props: GridColumnProps) => {
              props.backgroundColor = e.target.value
            })}
            className="w-16"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setProp((props: GridColumnProps) => {
              props.backgroundColor = 'transparent'
            })}
          >
            Clear
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="padding">Padding (px)</Label>
        <Input
          id="padding"
          type="number"
          value={padding || '12'}
          onChange={(e) => setProp((props: GridColumnProps) => {
            props.padding = e.target.value
          })}
        />
      </div>
    </div>
  )
}

const SectionSettings = () => {
  const {
    actions: { setProp },
    props: { backgroundColor, padding, margin, width, height },
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="backgroundColor">Background Color</Label>
        <div className="flex gap-2">
          <Input
            id="backgroundColor"
            type="color"
            value={backgroundColor === 'transparent' ? '#ffffff' : backgroundColor}
            onChange={(e) => setProp((props: SectionProps) => {
              props.backgroundColor = e.target.value
            })}
            className="w-16"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setProp((props: SectionProps) => {
              props.backgroundColor = 'transparent'
            })}
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="padding">Padding (px)</Label>
          <Input
            id="padding"
            type="number"
            value={padding || '24'}
            onChange={(e) => setProp((props: SectionProps) => {
              props.padding = e.target.value
            })}
          />
        </div>
        <div>
          <Label htmlFor="margin">Margin (px)</Label>
          <Input
            id="margin"
            type="number"
            value={margin || '0'}
            onChange={(e) => setProp((props: SectionProps) => {
              props.margin = e.target.value
            })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="width">Width (px)</Label>
          <Input
            id="width"
            type="number"
            value={width || 600}
            onChange={(e) => setProp((props: SectionProps) => {
              props.width = parseInt(e.target.value) || 600
            })}
          />
        </div>
        <div>
          <Label htmlFor="height">Height (px)</Label>
          <Input
            id="height"
            type="number"
            value={height || 300}
            onChange={(e) => setProp((props: SectionProps) => {
              props.height = parseInt(e.target.value) || 300
            })}
          />
        </div>
      </div>
    </div>
  )
}

// Craft configurations
GridLayout.craft = {
  props: {
    columns: 2,
    gap: '16',
    backgroundColor: 'transparent',
    padding: '16',
    borderRadius: '8',
    width: 800,
    height: 400,
  },
  related: {
    settings: GridLayoutSettings,
  },
  rules: {
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
}

GridColumn.craft = {
  props: {
    span: 1,
    backgroundColor: 'transparent',
    padding: '12',
    borderRadius: '4',
  },
  related: {
    settings: GridColumnSettings,
  },
  rules: {
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
}

Section.craft = {
  props: {
    backgroundColor: 'transparent',
    padding: '24',
    margin: '0',
    borderRadius: '8',
    borderWidth: '1',
    borderColor: '#e5e7eb',
    width: 600,
    height: 300,
  },
  related: {
    settings: SectionSettings,
  },
  rules: {
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
}
