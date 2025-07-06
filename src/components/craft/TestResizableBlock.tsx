import { useNode, type UserComponent } from '@craftjs/core'
import { EnhancedResizable } from './EnhancedResizable'

interface TestResizableBlockProps {
  width?: number
  height?: number
  text?: string
}

export const TestResizableBlock: UserComponent<TestResizableBlockProps> = ({
  width = 200,
  height = 100,
  text = 'Test Block - Click to select and resize'
}) => {
  const {
    connectors: { connect, drag },
    isActive,
    actions: { setProp },
  } = useNode((state) => ({
    isActive: state.events.selected,
  }))

  return (
    <EnhancedResizable
      onResize={(width: number, height: number) => {
        setProp((props: TestResizableBlockProps) => {
          props.width = width
          props.height = height
        })
      }}
      minWidth={100}
      minHeight={50}
      maxWidth={600}
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
        ref={(ref: HTMLDivElement | null) => {
          if (ref) {
            connect(drag(ref))
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f0f0f0',
          border: isActive ? '2px solid #3b82f6' : '1px solid #ccc',
          borderRadius: '4px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: '14px',
          color: '#333',
        }}
      >
        <div>
          <div>{text}</div>
          <div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>
            {width} × {height}
          </div>
        </div>
        {isActive && (
          <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
            Test Block
          </div>
        )}
      </div>
    </EnhancedResizable>
  )
}

TestResizableBlock.craft = {
  props: {
    width: 200,
    height: 100,
    text: 'Test Block - Click to select and resize'
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
} 