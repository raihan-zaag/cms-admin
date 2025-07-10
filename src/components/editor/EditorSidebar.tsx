import { useEditor, Element } from '@craftjs/core'
import { Button } from '@/components/ui/button'
import { Layers, Copy, CheckSquare, Trash2 } from 'lucide-react'
import { TextBlock } from '@/components/craft/TextBlock'
import { ImageBlock } from '@/components/craft/ImageBlock'
import { Container } from '@/components/craft/Container'
import { ButtonBlock } from '@/components/craft/ButtonBlock'
import { GridLayout, GridColumn, Section } from '@/components/craft/ResponsiveLayout'

interface EditorSidebarProps {
  isMultiSelectMode: boolean
  setIsMultiSelectMode: (value: boolean) => void
  selectedElements: Set<string>
  setSelectedElements: (value: Set<string>) => void
}

export function EditorSidebar({
  isMultiSelectMode,
  setIsMultiSelectMode,
  selectedElements,
  setSelectedElements
}: EditorSidebarProps) {
  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Layers className="h-4 w-4" />
          Components
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <ComponentButton component="Container" label="Container" icon="📦" />
          <ComponentButton component="Section" label="Section" icon="📋" />
          <ComponentButton component="GridLayout" label="Grid" icon="⚏" />
          <ComponentButton component="GridColumn" label="Column" icon="" />
          <ComponentButton component="TextBlock" label="Text" icon="" />
          <ComponentButton component="ImageBlock" label="Image" icon="️" />
          <ComponentButton component="ButtonBlock" label="Button" icon="🔘" />
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          <QuickActionsPanel 
            isMultiSelectMode={isMultiSelectMode}
            setIsMultiSelectMode={setIsMultiSelectMode}
            selectedElements={selectedElements}
            setSelectedElements={setSelectedElements}
          />

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Tips</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Drag components to the canvas</p>
              <p>• Click to select and see resize handles</p>
              <p>• Use Section → Grid → Columns for layouts</p>
              <p>• Containers accept child components</p>
              <p>• Grid columns can span multiple cells</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComponentButton({ component, label, icon }: { component: string; label: string; icon?: string }) {
  const { connectors } = useEditor()

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('component', component)
  }

  return (
    <Button
      ref={(ref: HTMLButtonElement | null) => {
        if (ref) {
          const componentElement = 
            component === 'TextBlock' ? (
              <Element is={TextBlock} isResponsive={true} width={600} height={100} />
            ) :
            component === 'ImageBlock' ? (
              <Element is={ImageBlock} isResponsive={true} width={600} height={200} />
            ) :
            component === 'Container' ? (
              <Element is={Container} isResponsive={true} width={600} height={300} canvas />
            ) :
            component === 'Section' ? (
              <Element is={Section} width={800} height={300} canvas />
            ) :
            component === 'ButtonBlock' ? (
              <Element is={ButtonBlock} isResizable={true} width={120} height={40} />
            ) :
            component === 'GridLayout' ? (
              <Element is={GridLayout} width={800} height={400} canvas />
            ) :
            component === 'GridColumn' ? (
              <Element is={GridColumn} span={1} canvas />
            ) :
            <div>Unknown Component</div>

          connectors.create(ref, componentElement)
        }
      }}
      variant="outline"
      className="w-full justify-start hover:bg-blue-50 cursor-move h-12 text-left"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="flex items-center gap-2 w-full">
        {icon && <span className="text-lg">{icon}</span>}
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-xs text-gray-500">{component}</span>
        </div>
      </div>
    </Button>
  )
}

function QuickActionsPanel({ 
  isMultiSelectMode, 
  setIsMultiSelectMode, 
  selectedElements, 
  setSelectedElements 
}: {
  isMultiSelectMode: boolean
  setIsMultiSelectMode: (value: boolean) => void
  selectedElements: Set<string>
  setSelectedElements: (value: Set<string>) => void
}) {
  const { actions, query } = useEditor()

  return (
    <div>
      <h4 className="font-medium text-gray-700 mb-2">Quick Actions</h4>
      <div className="space-y-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start"
          onClick={() => {
            alert('Duplication feature coming soon!')
          }}
        >
          <Copy className="h-4 w-4 mr-2" />
          Duplicate Selected
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start"
          onClick={() => setIsMultiSelectMode(!isMultiSelectMode)}
        >
          <CheckSquare className="h-4 w-4 mr-2" />
          {isMultiSelectMode ? 'Exit Multi-Select' : 'Multi-Select Mode'}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start text-red-600 hover:text-red-700"
          onClick={() => {
            if (isMultiSelectMode && selectedElements.size > 0) {
              const confirmDelete = window.confirm(`Delete ${selectedElements.size} selected element(s)?`)
              if (confirmDelete) {
                selectedElements.forEach(nodeId => {
                  try {
                    const node = query.node(nodeId).get()
                    if (node && query.node(nodeId).isDeletable()) {
                      actions.delete(nodeId)
                    }
                  } catch (error) {
                    console.warn('Could not delete element:', nodeId, error)
                  }
                })
                setSelectedElements(new Set())
                setIsMultiSelectMode(false)
              }
            }
          }}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete Selected
        </Button>
      </div>
    </div>
  )
} 