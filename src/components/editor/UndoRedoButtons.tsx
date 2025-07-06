import { useEditor } from '@craftjs/core'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

export function UndoRedoButtons() {
  const { canUndo, canRedo, actions } = useEditor((_state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }))

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => actions.history.undo()}
        disabled={!canUndo}
        className="h-7 px-2"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => actions.history.redo()}
        disabled={!canRedo}
        className="h-7 px-2"
      >
        <RotateCcw className="h-4 w-4 scale-x-[-1]" />
      </Button>
    </div>
  )
} 