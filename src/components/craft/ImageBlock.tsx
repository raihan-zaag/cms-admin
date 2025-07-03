import { useNode, type UserComponent } from '@craftjs/core'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Resizable } from 'react-resizable'
import 'react-resizable/css/styles.css'

interface ImageBlockProps {
  src?: string
  alt?: string
  width?: number
  height?: number
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  borderRadius?: string
}

export const ImageBlock: UserComponent<ImageBlockProps> = ({
  src = 'https://via.placeholder.com/400x300',
  alt = 'Image',
  width = 400,
  height = 300,
  objectFit = 'cover',
  borderRadius = '8',
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
      minConstraints={[100, 100]}
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
        className="p-2 bg-white hover:shadow-md transition-shadow duration-200"
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            borderRadius: `${borderRadius}px`,
          }}
        />
        {isActive && (
          <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br">
            Image Block
          </div>
        )}
      </div>
    </Resizable>
  )
}

const ImageBlockSettings = () => {
  const {
    actions: { setProp },
    props: { src, alt, width, height, objectFit, borderRadius },
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="src">Image URL</Label>
        <Input
          id="src"
          value={src || ''}
          onChange={(e) => setProp((props: ImageBlockProps) => {
            props.src = e.target.value
          })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <Label htmlFor="alt">Alt Text</Label>
        <Input
          id="alt"
          value={alt || ''}
          onChange={(e) => setProp((props: ImageBlockProps) => {
            props.alt = e.target.value
          })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="width">Width (px)</Label>
          <Input
            id="width"
            type="number"
            value={width || ''}
            onChange={(e) => setProp((props: ImageBlockProps) => {
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
            onChange={(e) => setProp((props: ImageBlockProps) => {
              props.height = parseInt(e.target.value)
            })}
            placeholder="300"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="objectFit">Object Fit</Label>
        <select
          id="objectFit"
          value={objectFit || 'cover'}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProp((props: ImageBlockProps) => {
            props.objectFit = e.target.value as 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
          })}
          className="w-full p-2 border rounded"
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="fill">Fill</option>
          <option value="none">None</option>
          <option value="scale-down">Scale Down</option>
        </select>
      </div>

      <div>
        <Label htmlFor="borderRadius">Border Radius (px)</Label>
        <Input
          id="borderRadius"
          type="number"
          value={borderRadius || ''}
          onChange={(e) => setProp((props: ImageBlockProps) => {
            props.borderRadius = e.target.value
          })}
          placeholder="8"
        />
      </div>
    </div>
  )
}

ImageBlock.craft = {
  props: {
    src: 'https://via.placeholder.com/400x300',
    alt: 'Image',
    width: 400,
    height: 300,
    objectFit: 'cover',
    borderRadius: '8',
  },
  related: {
    settings: ImageBlockSettings,
  },
}
