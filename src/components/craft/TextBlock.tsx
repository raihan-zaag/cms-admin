import { useNode, type UserComponent } from '@craftjs/core'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Resizable } from 'react-resizable'
import 'react-resizable/css/styles.css'

interface TextBlockProps {
  text?: string
  fontSize?: string
  textAlign?: 'left' | 'center' | 'right'
  color?: string
  width?: number
  height?: number
  fontWeight?: 'normal' | 'bold' | '500' | '600' | '700'
  lineHeight?: string
}

export const TextBlock: UserComponent<TextBlockProps> = ({
  text = 'Edit this text',
  fontSize = '16',
  textAlign = 'left',
  color = '#000000',
  width = 300,
  height = 100,
  fontWeight = 'normal',
  lineHeight = '1.5',
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
      minConstraints={[100, 30]}
      resizeHandles={['se', 'e', 's']}
    >
      <div
        ref={(ref: HTMLDivElement | null) => {
          if (ref) {
            connect(drag(ref))
          }
        }}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          border: isActive ? '2px solid #3b82f6' : '1px solid transparent',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
        }}
        className="p-4 bg-white hover:shadow-md transition-shadow duration-200"
      >
        <p
          style={{
            fontSize: `${fontSize}px`,
            textAlign,
            color,
            fontWeight,
            lineHeight,
            margin: 0,
            wordWrap: 'break-word',
            overflow: 'hidden',
            height: '100%',
          }}
        >
          {text}
        </p>
        {isActive && (
          <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br">
            Text Block
          </div>
        )}
      </div>
    </Resizable>
  )
}

const TextBlockSettings = () => {
  const {
    actions: { setProp },
    props: { text, fontSize, textAlign, color, width, height, fontWeight, lineHeight },
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
            props.fontWeight = e.target.value as 'normal' | 'bold' | '500' | '600' | '700'
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
            props.textAlign = e.target.value as 'left' | 'center' | 'right'
          })}
          className="w-full p-2 border rounded"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div>
        <Label htmlFor="color">Text Color</Label>
        <Input
          id="color"
          type="color"
          value={color}
          onChange={(e) => setProp((props: TextBlockProps) => {
            props.color = e.target.value
          })}
        />
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
    width: 300,
    height: 100,
    fontWeight: 'normal',
    lineHeight: '1.5',
  },
  related: {
    settings: TextBlockSettings,
  },
}
