import { useEditor } from '@craftjs/core'
import { Button } from '@/components/ui/button'
import { CheckSquare, X } from 'lucide-react'

interface MultiSelectControlsProps {
  isMultiSelectMode: boolean
  setIsMultiSelectMode: (value: boolean) => void
  selectedElements: Set<string>
  setSelectedElements: (value: Set<string>) => void
}

export function MultiSelectControls({ 
  isMultiSelectMode, 
  setIsMultiSelectMode, 
  selectedElements, 
  setSelectedElements 
}: MultiSelectControlsProps) {
  const { actions, query } = useEditor()

  const handleBulkDelete = () => {
    if (selectedElements.size === 0) {
      alert('No elements selected for deletion')
      return
    }

    const confirmDelete = window.confirm(`Delete ${selectedElements.size} selected element(s)?`)
    if (!confirmDelete) return

    // Delete elements one by one (reverse order to avoid index issues)
    const elementsArray = Array.from(selectedElements)
    elementsArray.forEach(nodeId => {
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

  const toggleMultiSelect = () => {
    setIsMultiSelectMode(!isMultiSelectMode)
    if (!isMultiSelectMode) {
      setSelectedElements(new Set())
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={isMultiSelectMode ? 'default' : 'ghost'}
        size="sm"
        onClick={toggleMultiSelect}
        className="h-7 px-2"
        title="Multi-select mode"
      >
        <CheckSquare className="h-4 w-4" />
        {isMultiSelectMode && <span className="ml-1 text-xs">{selectedElements.size}</span>}
      </Button>
      
      {isMultiSelectMode && selectedElements.size > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBulkDelete}
          className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          title={`Delete ${selectedElements.size} selected element(s)`}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
} 