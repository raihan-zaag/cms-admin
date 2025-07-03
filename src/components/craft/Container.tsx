import { useNode, type UserComponent } from '@craftjs/core'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Resizable } from 'react-resizable'
import 'react-resizable/css/styles.css'

interface ContainerProps {
  background?: string
  padding?: string
  margin?: string
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  children?: React.ReactNode
}

export const Container: UserComponent<ContainerProps> = ({
  background = 'transparent',
  padding = '16',
  margin = '0',
  width = 400,
  height = 300,
  minWidth = 100,
  minHeight = 50,
  children,
}) => {
  const {
    connectors: { connect, drag },
    isActive,
  } = useNode((state) => ({
    isActive: state.events.selected,
  }))

  return (
    <Resizable
      width={width}
      height={height}
      minConstraints={[minWidth, minHeight]}
      resizeHandles={['se', 'e', 's']}
    >
      <div
        ref={(ref: HTMLDivElement | null) => {
          if (ref) {
            connect(drag(ref))
          }
        }}
        style={{
          background,
          padding: `${padding}px`,
          margin: `${margin}px`,
          width: `${width}px`,
          height: `${height}px`,
          border: isActive ? '2px solid #3b82f6' : children ? 'none' : '2px dashed #e5e7eb',
          borderRadius: '4px',
          position: 'relative',
        }}
        className="relative transition-all duration-200 hover:shadow-md"
      >
        {children || (
          <div className="text-gray-400 text-center py-8">
            Drop components here
          </div>
        )}
        {isActive && (
          <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br">
            Container
          </div>
        )}
      </div>
    </Resizable>
  )
}

const ContainerSettings = () => {
  const {
    actions: { setProp },
    props: { background, padding, margin, width, height, minWidth, minHeight },
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="background">Background</Label>
        <Input
          id="background"
          value={background || ''}
          onChange={(e) => setProp((props: ContainerProps) => {
            props.background = e.target.value
          })}
          placeholder="transparent, #ffffff, etc."
        />
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
          <Label htmlFor="width">Width (px)</Label>
          <Input
            id="width"
            type="number"
            value={width || ''}
            onChange={(e) => setProp((props: ContainerProps) => {
              props.width = parseInt(e.target.value)
            })}
            placeholder="400"
          />
        </div>

        <div>
          <Label htmlFor="height">Height (px)</Label>
          <Input
            id="height"
            type="number"
            value={height || ''}
            onChange={(e) => setProp((props: ContainerProps) => {
              props.height = parseInt(e.target.value)
            })}
            placeholder="300"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="minWidth">Min Width (px)</Label>
          <Input
            id="minWidth"
            type="number"
            value={minWidth || ''}
            onChange={(e) => setProp((props: ContainerProps) => {
              props.minWidth = parseInt(e.target.value)
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
    padding: '16',
    margin: '0',
    width: 400,
    height: 300,
    minWidth: 100,
    minHeight: 50,
  },
  related: {
    settings: ContainerSettings,
  },
}
