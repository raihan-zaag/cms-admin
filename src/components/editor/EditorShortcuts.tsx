import React from 'react'
import { useEditor } from '@craftjs/core'

interface EditorShortcutsProps {
  isPreview: boolean
}

export function EditorShortcuts({ isPreview }: EditorShortcutsProps) {
  const { actions, query } = useEditor()

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPreview) return
      
      // Only allow Delete key to delete blocks
      if (e.key === 'Delete') {
        e.preventDefault()
        const currentNodeId = query.getEvent('selected').last()
        if (currentNodeId) {
          const node = query.node(currentNodeId).get()
          if (node && query.node(currentNodeId).isDeletable()) {
            try {
              actions.delete(currentNodeId)
            } catch (error) {
              console.warn('Cannot delete component:', error)
            }
          }
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [actions, query, isPreview])

  return null
} 