import { useNode, type UserComponent } from '@craftjs/core'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EnhancedResizable } from './EnhancedResizable'

interface ButtonBlockProps {
  text?: string
  backgroundColor?: string
  textColor?: string
  borderRadius?: string
  padding?: string
  fontSize?: string
  fontWeight?: 'normal' | 'bold' | '500' | '600' | '700'
  width?: number
  height?: number
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  href?: string
  isResizable?: boolean
}

// Helper for responsive style
const getResponsiveStyle = (isResizable: boolean, width: number, height: number) => ({
  width: isResizable ? `${width}px` : '100%',
  height: isResizable ? `${height}px` : 'auto',
})

export const ButtonBlock: UserComponent<ButtonBlockProps> = ({
  text = 'Button',
  backgroundColor = '#3b82f6',
  textColor = '#ffffff',
  borderRadius = '6',
  padding = '12',
  fontSize = '14',
  fontWeight = '500',
  width = 120,
  height = 40,
  variant = 'default',
  href = '',
  isResizable = false,
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
  const buttonStyle = {
    ...getResponsiveStyle(isResizable, width, height),
    backgroundColor: variant === 'default' ? backgroundColor : undefined,
    color: textColor,
    borderRadius: `${borderRadius}px`,
    padding: `${padding}px`,
    fontSize: `${fontSize}px`,
    fontWeight,
    minWidth: isResizable ? undefined : 'fit-content',
    border: isActive ? '2px solid #3b82f6' : variant === 'outline' ? `1px solid ${backgroundColor}` : 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  }

  // Button element with drag/connect
  const ButtonComponent = () => (
    <button
      ref={(ref: HTMLButtonElement | null) => { if (ref) connect(drag(ref)); }}
      style={buttonStyle}
      className="transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onClick={(e) => {
        e.preventDefault()
        if (href && !isActive) {
          window.open(href, '_blank')
        }
      }}
    >
      {text}
      {isActive && (
        <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
          Button
        </div>
      )}
    </button>
  )

  // Resizable or full-width rendering
  if (isResizable) {
    return (
      <EnhancedResizable
        onResize={(width: number, height: number) => {
          setProp((props: ButtonBlockProps) => {
            props.width = width
            props.height = height
          })
        }}
        minWidth={60}
        minHeight={30}
        maxWidth={300}
        maxHeight={80}
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
        <div style={{ width: '100%', height: '100%' }}>
          <ButtonComponent />
        </div>
      </EnhancedResizable>
    )
  }

  return (
    <div className="w-full">
      <ButtonComponent />
    </div>
  )
}

const ButtonBlockSettings = () => {
  const {
    actions: { setProp },
    props: { 
      text, 
      backgroundColor, 
      textColor, 
      borderRadius, 
      padding, 
      fontSize, 
      fontWeight, 
      width, 
      height, 
      variant, 
      href, 
      isResizable 
    },
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="text">Button Text</Label>
        <Input
          id="text"
          value={text || ''}
          onChange={(e) => setProp((props: ButtonBlockProps) => {
            props.text = e.target.value
          })}
          placeholder="Button"
        />
      </div>

      <div>
        <Label htmlFor="href">Link URL (optional)</Label>
        <Input
          id="href"
          value={href || ''}
          onChange={(e) => setProp((props: ButtonBlockProps) => {
            props.href = e.target.value
          })}
          placeholder="https://example.com"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isResizable"
          checked={isResizable || false}
          onChange={(e) => setProp((props: ButtonBlockProps) => {
            props.isResizable = e.target.checked
          })}
        />
        <Label htmlFor="isResizable">Resizable</Label>
      </div>

      <div>
        <Label htmlFor="variant">Variant</Label>
        <select
          id="variant"
          value={variant || 'default'}
          onChange={(e) => setProp((props: ButtonBlockProps) => {
            props.variant = e.target.value as ButtonBlockProps['variant']
          })}
          className="w-full p-2 border rounded"
        >
          <option value="default">Default</option>
          <option value="destructive">Destructive</option>
          <option value="outline">Outline</option>
          <option value="secondary">Secondary</option>
          <option value="ghost">Ghost</option>
          <option value="link">Link</option>
        </select>
      </div>

      <div>
        <Label htmlFor="backgroundColor">Background Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={backgroundColor || '#3b82f6'}
            onChange={(e) => setProp((props: ButtonBlockProps) => {
              props.backgroundColor = e.target.value
            })}
            className="w-16 h-10"
          />
          <Input
            value={backgroundColor || '#3b82f6'}
            onChange={(e) => setProp((props: ButtonBlockProps) => {
              props.backgroundColor = e.target.value
            })}
            placeholder="#3b82f6"
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="textColor">Text Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={textColor || '#ffffff'}
            onChange={(e) => setProp((props: ButtonBlockProps) => {
              props.textColor = e.target.value
            })}
            className="w-16 h-10"
          />
          <Input
            value={textColor || '#ffffff'}
            onChange={(e) => setProp((props: ButtonBlockProps) => {
              props.textColor = e.target.value
            })}
            placeholder="#ffffff"
            className="flex-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fontSize">Font Size (px)</Label>
          <Input
            id="fontSize"
            type="number"
            value={fontSize || ''}
            onChange={(e) => setProp((props: ButtonBlockProps) => {
              props.fontSize = e.target.value
            })}
            placeholder="14"
          />
        </div>

        <div>
          <Label htmlFor="fontWeight">Font Weight</Label>
          <select
            id="fontWeight"
            value={fontWeight || 'normal'}
            onChange={(e) => setProp((props: ButtonBlockProps) => {
              props.fontWeight = e.target.value as ButtonBlockProps['fontWeight']
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="padding">Padding (px)</Label>
          <Input
            id="padding"
            type="number"
            value={padding || ''}
            onChange={(e) => setProp((props: ButtonBlockProps) => {
              props.padding = e.target.value
            })}
            placeholder="12"
          />
        </div>

        <div>
          <Label htmlFor="borderRadius">Border Radius (px)</Label>
          <Input
            id="borderRadius"
            type="number"
            value={borderRadius || ''}
            onChange={(e) => setProp((props: ButtonBlockProps) => {
              props.borderRadius = e.target.value
            })}
            placeholder="6"
          />
        </div>
      </div>

      {isResizable && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="width">Width (px)</Label>
            <Input
              id="width"
              type="number"
              value={width || ''}
              onChange={(e) => setProp((props: ButtonBlockProps) => {
                props.width = parseInt(e.target.value)
              })}
              placeholder="120"
            />
          </div>

          <div>
            <Label htmlFor="height">Height (px)</Label>
            <Input
              id="height"
              type="number"
              value={height || ''}
              onChange={(e) => setProp((props: ButtonBlockProps) => {
                props.height = parseInt(e.target.value)
              })}
              placeholder="40"
            />
          </div>
        </div>
      )}
    </div>
  )
}

ButtonBlock.craft = {
  props: {
    text: 'Button',
    backgroundColor: '#3b82f6',
    textColor: '#ffffff',
    borderRadius: '6',
    padding: '12',
    fontSize: '14',
    fontWeight: '500',
    width: 120,
    height: 40,
    variant: 'default',
    href: '',
    isResizable: true,
  },
  related: {
    settings: ButtonBlockSettings,
  },
}
