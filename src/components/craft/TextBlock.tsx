import { useNode, type UserComponent } from '@craftjs/core'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { EnhancedResizable } from './EnhancedResizable'

interface TextBlockProps {
  text?: string
  fontSize?: string
  textAlign?: 'left' | 'center' | 'right'
  color?: string
  backgroundColor?: string
  width?: number
  height?: number
  fontWeight?: 'normal' | 'bold' | '500' | '600' | '700'
  lineHeight?: string
  padding?: string
  borderRadius?: string
  isResponsive?: boolean
}

// Helper for responsive style
const getResponsiveStyle = (isResponsive: boolean, width: number, height: number) => ({
  width: isResponsive ? '100%' : `${width}px`,
  height: isResponsive ? 'auto' : `${height}px`,
  minHeight: isResponsive ? '50px' : `${height}px`,
})

export const TextBlock: UserComponent<TextBlockProps> = ({
  text = 'Edit this text',
  fontSize = '16',
  textAlign = 'left',
  color = '#000000',
  backgroundColor = 'transparent',
  width = 300,
  height = 100,
  fontWeight = 'normal',
  lineHeight = '1.5',
  padding = '16',
  borderRadius = '4',
  isResponsive = false,
}) => {
  // Craft.js connectors and selection state
  const {
    connectors: { connect, drag },
    isActive,
    actions: { setProp },
  } = useNode((state) => ({
    isActive: state.events.selected,
  }))

  // Unified style logic
  const containerStyle = {
    ...getResponsiveStyle(isResponsive, width, height),
    backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : 'transparent',
    padding: `${padding}px`,
    borderRadius: `${borderRadius}px`,
    border: isActive ? '2px solid #3b82f6' : '1px solid transparent',
    overflow: 'visible',
    position: 'relative' as const,
  }

  const textStyle = {
    fontSize: `${fontSize}px`,
    textAlign: textAlign as 'left' | 'center' | 'right',
    color,
    fontWeight,
    lineHeight,
    margin: 0,
    wordWrap: 'break-word' as const,
    overflow: 'visible',
    width: '100%',
    height: isResponsive ? 'auto' : '100%',
  }

  // Responsive or resizable rendering
  if (isResponsive) {
    return (
      <div
        ref={(ref: HTMLDivElement | null) => { if (ref) connect(drag(ref)); }}
        style={containerStyle}
        className="hover:shadow-md transition-shadow duration-200 w-full"
      >
        <p style={textStyle}>{text}</p>
        {isActive && (
          <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
            Text Block
          </div>
        )}
      </div>
    )
  }

  return (
    <EnhancedResizable
      onResize={(width: number, height: number) => {
        setProp((props: TextBlockProps) => {
          props.width = width
          props.height = height
        })
      }}
      minWidth={50}
      minHeight={30}
      maxWidth={800}
      maxHeight={400}
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
        ref={(ref: HTMLDivElement | null) => { if (ref) connect(drag(ref)); }}
        style={containerStyle}
        className="hover:shadow-md transition-shadow duration-200 w-full h-full"
      >
        <p style={textStyle}>{text}</p>
        {isActive && (
          <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
            Text Block
          </div>
        )}
      </div>
    </EnhancedResizable>
  )
}

const TextBlockSettings = () => {
  const {
    actions: { setProp },
    props: { 
      text, 
      fontSize, 
      textAlign, 
      color, 
      backgroundColor, 
      width, 
      height, 
      fontWeight, 
      lineHeight, 
      padding, 
      borderRadius, 
      isResponsive 
    },
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="text">Text</Label>
        <Textarea
          id="text"
          value={text || ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProp((props: TextBlockProps) => {
            props.text = e.target.value
          })}
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isResponsive"
          checked={isResponsive || false}
          onChange={(e) => setProp((props: TextBlockProps) => {
            props.isResponsive = e.target.checked
          })}
        />
        <Label htmlFor="isResponsive">Responsive Width</Label>
      </div>

      <div>
        <Label htmlFor="backgroundColor">Background Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={backgroundColor !== 'transparent' ? backgroundColor : '#ffffff'}
            onChange={(e) => setProp((props: TextBlockProps) => {
              props.backgroundColor = e.target.value
            })}
            className="w-16 h-10"
          />
          <Input
            value={backgroundColor || 'transparent'}
            onChange={(e) => setProp((props: TextBlockProps) => {
              props.backgroundColor = e.target.value
            })}
            placeholder="transparent"
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="color">Text Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={color || '#000000'}
            onChange={(e) => setProp((props: TextBlockProps) => {
              props.color = e.target.value
            })}
            className="w-16 h-10"
          />
          <Input
            value={color || '#000000'}
            onChange={(e) => setProp((props: TextBlockProps) => {
              props.color = e.target.value
            })}
            placeholder="#000000"
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
              value={width || ''}
              onChange={(e) => setProp((props: TextBlockProps) => {
                props.width = parseInt(e.target.value)
              })}
              placeholder="300"
            />
          </div>

          <div>
            <Label htmlFor="height">Height (px)</Label>
            <Input
              id="height"
              type="number"
              value={height || ''}
              onChange={(e) => setProp((props: TextBlockProps) => {
                props.height = parseInt(e.target.value)
              })}
              placeholder="100"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="padding">Padding (px)</Label>
          <Input
            id="padding"
            type="number"
            value={padding || ''}
            onChange={(e) => setProp((props: TextBlockProps) => {
              props.padding = e.target.value
            })}
            placeholder="16"
          />
        </div>

        <div>
          <Label htmlFor="borderRadius">Border Radius (px)</Label>
          <Input
            id="borderRadius"
            type="number"
            value={borderRadius || ''}
            onChange={(e) => setProp((props: TextBlockProps) => {
              props.borderRadius = e.target.value
            })}
            placeholder="4"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fontSize">Font Size (px)</Label>
          <Input
            id="fontSize"
            type="number"
            value={fontSize || '16'}
            onChange={(e) => setProp((props: TextBlockProps) => {
              props.fontSize = e.target.value
            })}
          />
        </div>

        <div>
          <Label htmlFor="lineHeight">Line Height</Label>
          <Input
            id="lineHeight"
            value={lineHeight || '1.5'}
            onChange={(e) => setProp((props: TextBlockProps) => {
              props.lineHeight = e.target.value
            })}
            placeholder="1.5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="fontWeight">Font Weight</Label>
        <select
          id="fontWeight"
          value={fontWeight}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProp((props: TextBlockProps) => {
            props.fontWeight = e.target.value as TextBlockProps['fontWeight']
          })}
          className="w-full p-2 border rounded"
        >
          <option value="normal">Normal</option>
          <option value="500">Medium</option>
          <option value="600">Semi Bold</option>
          <option value="bold">Bold</option>
          <option value="700">Extra Bold</option>
        </select>
      </div>

      <div>
        <Label htmlFor="textAlign">Text Align</Label>
        <select
          id="textAlign"
          value={textAlign}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProp((props: TextBlockProps) => {
            props.textAlign = e.target.value as TextBlockProps['textAlign']
          })}
          className="w-full p-2 border rounded"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
    </div>
  )
}

TextBlock.craft = {
  props: {
    text: 'Edit this text',
    fontSize: '16',
    textAlign: 'left',
    color: '#000000',
    backgroundColor: 'transparent',
    width: 300,
    height: 100,
    fontWeight: 'normal',
    lineHeight: '1.5',
    padding: '16',
    borderRadius: '4',
    isResponsive: false,
  },
  related: {
    settings: TextBlockSettings,
  },
}
