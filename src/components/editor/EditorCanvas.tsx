import { Frame, Element, useEditor } from '@craftjs/core'
import { Container } from '@/components/craft/Container'

interface EditorCanvasProps {
  viewportMode: 'desktop' | 'tablet' | 'mobile'
  zoom: number
  isPreview?: boolean
}

export function EditorCanvas({ viewportMode, zoom, isPreview = false }: EditorCanvasProps) {
  const getViewportWidth = () => {
    if (isPreview) return '100%' // Full width in preview mode
    switch (viewportMode) {
      case 'tablet': return '768px'
      case 'mobile': return '375px'
      default: return '100%'
    }
  }

  return (
    <div className="flex-1 overflow-hidden bg-gray-100 flex flex-col">
      <div className="flex-1 overflow-auto p-6">
        <div 
          className={`mx-auto transition-all duration-300 bg-white shadow-lg rounded-lg overflow-hidden ${
            isPreview ? 'shadow-none rounded-none' : ''
          }`}
          style={{ 
            width: getViewportWidth(),
            transform: isPreview ? 'none' : `scale(${zoom / 100})`,
            transformOrigin: 'top center'
          }}
        >
          <Frame>
            <Element 
              is={Container}
              background="transparent"
              backgroundColor="#ffffff"
              padding="20"
              margin="0"
              width={isPreview ? '100%' : 1200}
              height={'auto'}
              minWidth={isPreview ? '100%' : 400}
              minHeight={600}
              canvas
            >
            </Element>
          </Frame>
        </div>
      </div>

      {/* Status Bar - Hide in preview mode */}
      {!isPreview && (
        <div className="bg-white border-t border-gray-200 px-6 py-2 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>Viewport: {viewportMode}</span>
            <span>Zoom: {zoom}%</span>
            <SelectedInfo />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600">● Ready</span>
          </div>
        </div>
      )}
    </div>
  )
}

function SelectedInfo() {
  const { selected } = useEditor((_state, query) => {
    const currentNodeId = query.getEvent('selected').last()
    return {
      selected: currentNodeId ? query.node(currentNodeId).get().data.displayName || 'Component' : null
    }
  })

  return selected ? (
    <span>Selected: {selected}</span>
  ) : (
    <span>No selection</span>
  )
} 