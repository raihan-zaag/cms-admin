import { useNode, type UserComponent } from '@craftjs/core'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

interface CardBlockProps {
  title?: string
  content?: string
  backgroundColor?: string
  borderColor?: string
  borderRadius?: string
  padding?: string
  textAlign?: 'left' | 'center' | 'right'
  titleColor?: string
  contentColor?: string
}

export const CardBlock: UserComponent<CardBlockProps> = ({
  title = 'Card Title',
  content = 'This is the card content. You can customize this text and styling.',
  backgroundColor = '#ffffff',
  borderColor = '#e5e7eb',
  borderRadius = '8',
  padding = '24',
  textAlign = 'left',
  titleColor = '#1f2937',
  contentColor = '#6b7280',
}) => {
  const {
    connectors: { connect, drag },
  } = useNode()

  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref))
        }
      }}
      className="p-4 w-full"
    >
      <Card
        style={{
          backgroundColor,
          borderColor,
          borderRadius: `${borderRadius}px`,
          padding: `${padding}px`,
          textAlign,
        }}
        className="border-2 transition-all duration-200 hover:shadow-lg"
      >
        <CardHeader className="pb-4">
          <CardTitle 
            style={{ color: titleColor }}
            className="text-xl font-semibold"
          >
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: contentColor }} className="leading-relaxed">
            {content}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

const CardBlockSettings = () => {
  const {
    actions: { setProp },
    props: { 
      title, 
      content, 
      backgroundColor, 
      borderColor, 
      borderRadius, 
      padding, 
      textAlign, 
      titleColor, 
      contentColor 
    },
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title || ''}
          onChange={(e) => setProp((props: CardBlockProps) => {
            props.title = e.target.value
          })}
          placeholder="Card Title"
        />
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content || ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProp((props: CardBlockProps) => {
            props.content = e.target.value
          })}
          placeholder="Card content..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="backgroundColor">Background Color</Label>
        <Input
          id="backgroundColor"
          type="color"
          value={backgroundColor || '#ffffff'}
          onChange={(e) => setProp((props: CardBlockProps) => {
            props.backgroundColor = e.target.value
          })}
        />
      </div>

      <div>
        <Label htmlFor="borderColor">Border Color</Label>
        <Input
          id="borderColor"
          type="color"
          value={borderColor || '#e5e7eb'}
          onChange={(e) => setProp((props: CardBlockProps) => {
            props.borderColor = e.target.value
          })}
        />
      </div>

      <div>
        <Label htmlFor="borderRadius">Border Radius (px)</Label>
        <Input
          id="borderRadius"
          type="number"
          value={borderRadius || ''}
          onChange={(e) => setProp((props: CardBlockProps) => {
            props.borderRadius = e.target.value
          })}
          placeholder="8"
        />
      </div>

      <div>
        <Label htmlFor="padding">Padding (px)</Label>
        <Input
          id="padding"
          type="number"
          value={padding || ''}
          onChange={(e) => setProp((props: CardBlockProps) => {
            props.padding = e.target.value
          })}
          placeholder="24"
        />
      </div>

      <div>
        <Label htmlFor="textAlign">Text Alignment</Label>
        <select
          id="textAlign"
          value={textAlign || 'left'}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProp((props: CardBlockProps) => {
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
        <Label htmlFor="titleColor">Title Color</Label>
        <Input
          id="titleColor"
          type="color"
          value={titleColor || '#1f2937'}
          onChange={(e) => setProp((props: CardBlockProps) => {
            props.titleColor = e.target.value
          })}
        />
      </div>

      <div>
        <Label htmlFor="contentColor">Content Color</Label>
        <Input
          id="contentColor"
          type="color"
          value={contentColor || '#6b7280'}
          onChange={(e) => setProp((props: CardBlockProps) => {
            props.contentColor = e.target.value
          })}
        />
      </div>
    </div>
  )
}

CardBlock.craft = {
  props: {
    title: 'Card Title',
    content: 'This is the card content. You can customize this text and styling.',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderRadius: '8',
    padding: '24',
    textAlign: 'left',
    titleColor: '#1f2937',
    contentColor: '#6b7280',
  },
  related: {
    settings: CardBlockSettings,
  },
}
