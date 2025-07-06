import { useNode, type UserComponent } from '@craftjs/core'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EnhancedResizable } from './EnhancedResizable'

interface ContainerProps {
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
  isResponsive?: boolean
  children?: React.ReactNode
}

export const Container: UserComponent<ContainerProps> = ({
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
  isResponsive = false,
  children,
}) => {
  const {
    connectors: { connect, drag },
    isActive,
    actions: { setProp },
  } = useNode((state) => ({
    isActive: state.events.selected,
  }))

  const containerStyle = {
    background: background !== 'transparent' ? background : backgroundColor,
    padding: `${padding}px`,
    margin: `${margin}px`,
    width: isResponsive ? '100%' : typeof width === 'number' ? `${width}px` : width,
    height: height === 'auto' ? 'auto' : typeof height === 'number' ? `${height}px` : height,
    minWidth: `${minWidth}px`,
    minHeight: `${minHeight}px`,
    border: isActive 
      ? '2px solid #3b82f6' 
      : `${borderWidth}px solid ${borderColor}`,
    borderRadius: `${borderRadius}px`,
    position: 'relative' as const,
    overflow: 'visible',
  }

  if (isResponsive) {
    return (
      <div
        ref={(ref: HTMLDivElement | null) => {
          if (ref) {
            connect(drag(ref))
          }
        }}
        style={containerStyle}
        className="relative transition-all duration-200 hover:shadow-md w-full"
      >
        {children}
        {!children && (
          <div className="text-gray-400 text-center py-8 min-h-[100px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
            Drop components here
          </div>
        )}
        {isActive && (
          <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
            Container
          </div>
        )}
      </div>
    )
  }

  return (
    <EnhancedResizable
      onResize={(width: number, height: number) => {
        setProp((props: ContainerProps) => {
          props.width = width
          props.height = height
        })
      }}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={1200}
      maxHeight={height === 'auto' ? 2000 : 800}
      width={typeof width === 'number' ? width : 400}
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
        style={containerStyle}
        className="relative transition-all duration-200 hover:shadow-md w-full h-full"
      >
        {children}
        {!children && (
          <div className="text-gray-400 text-center py-8 min-h-[100px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
            Drop components here
          </div>
        )}
        {isActive && (
          <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
            Container
          </div>
        )}
      </div>
    </EnhancedResizable>
  )
}

const ContainerSettings = () => {
  const {
    actions: { setProp },
    props: { 
      background, 
      backgroundColor, 
      padding, 
      margin, 
      width, 
      height, 
      minWidth, 
      minHeight,
      borderRadius,
      borderColor,
      borderWidth,
      isResponsive
    },
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
            value={backgroundColor || '#ffffff'}
            onChange={(e) => setProp((props: ContainerProps) => {
              props.backgroundColor = e.target.value
            })}
            className="w-16 h-10"
          />
          <Input
            value={backgroundColor || '#ffffff'}
            onChange={(e) => setProp((props: ContainerProps) => {
              props.backgroundColor = e.target.value
            })}
            placeholder="#ffffff"
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="background">Background (CSS)</Label>
        <Input
          id="background"
          value={background || ''}
          onChange={(e) => setProp((props: ContainerProps) => {
            props.background = e.target.value
          })}
          placeholder="linear-gradient(45deg, #ff0000, #00ff00)"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isResponsive"
          checked={isResponsive || false}
          onChange={(e) => setProp((props: ContainerProps) => {
            props.isResponsive = e.target.checked
          })}
        />
        <Label htmlFor="isResponsive">Responsive Width</Label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="padding">Padding (px)</Label>
          <Input
            id="padding"
            type="number"
            value={padding || ''}
            onChange={(e) => setProp((props: ContainerProps) => {
              props.padding = e.target.value
            })}
            placeholder="16"
          />
        </div>

        <div>
          <Label htmlFor="margin">Margin (px)</Label>
          <Input
            id="margin"
            type="number"
            value={margin || ''}
            onChange={(e) => setProp((props: ContainerProps) => {
              props.margin = e.target.value
            })}
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="borderRadius">Border Radius (px)</Label>
          <Input
            id="borderRadius"
            type="number"
            value={borderRadius || ''}
            onChange={(e) => setProp((props: ContainerProps) => {
              props.borderRadius = e.target.value
            })}
            placeholder="8"
          />
        </div>

        <div>
          <Label htmlFor="borderWidth">Border Width (px)</Label>
          <Input
            id="borderWidth"
            type="number"
            value={borderWidth || ''}
            onChange={(e) => setProp((props: ContainerProps) => {
              props.borderWidth = e.target.value
            })}
            placeholder="1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="borderColor">Border Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={borderColor || '#e5e7eb'}
            onChange={(e) => setProp((props: ContainerProps) => {
              props.borderColor = e.target.value
            })}
            className="w-16 h-10"
          />
          <Input
            value={borderColor || '#e5e7eb'}
            onChange={(e) => setProp((props: ContainerProps) => {
              props.borderColor = e.target.value
            })}
            placeholder="#e5e7eb"
            className="flex-1"
          />
        </div>
      </div>

      {!isResponsive && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="width">Width (px)</Label>
            <Input
              id="width"
              type="number"
              value={typeof width === 'number' ? width : ''}
              onChange={(e) => setProp((props: ContainerProps) => {
                const value = e.target.value
                props.width = value ? parseInt(value) : '100%'
              })}
              placeholder="400"
            />
          </div>

          <div>
            <Label htmlFor="height">Height (px)</Label>
            <Input
              id="height"
              type="number"
              value={typeof height === 'number' ? height : ''}
              onChange={(e) => setProp((props: ContainerProps) => {
                const value = e.target.value
                props.height = value ? parseInt(value) : 'auto'
              })}
              placeholder="300"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="minWidth">Min Width (px)</Label>
          <Input
            id="minWidth"
            type="number"
            value={typeof minWidth === 'number' ? minWidth : ''}
            onChange={(e) => setProp((props: ContainerProps) => {
              const value = e.target.value
              props.minWidth = value ? parseInt(value) : '100%'
            })}
            placeholder="100"
          />
        </div>

        <div>
          <Label htmlFor="minHeight">Min Height (px)</Label>
          <Input
            id="minHeight"
            type="number"
            value={minHeight || ''}
            onChange={(e) => setProp((props: ContainerProps) => {
              props.minHeight = parseInt(e.target.value)
            })}
            placeholder="50"
          />
        </div>
      </div>
    </div>
  )
}

Container.craft = {
  props: {
    background: 'transparent',
    backgroundColor: '#ffffff',
    padding: '16',
    margin: '0',
    width: 400,
    height: 300,
    minWidth: 100,
    minHeight: 50,
    borderRadius: '8',
    borderColor: '#e5e7eb',
    borderWidth: '1',
    isResponsive: false,
  },
  related: {
    settings: ContainerSettings,
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
}
