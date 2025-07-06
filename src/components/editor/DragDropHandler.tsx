import React from 'react'
import { useEditor } from '@craftjs/core'

export function DragDropHandler() {
  const { actions, query } = useEditor()

  React.useEffect(() => {
    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      const componentType = e.dataTransfer?.getData('component')
      if (componentType) {
        // Handle component drop logic here if needed
        console.log('Dropped component:', componentType)
      }
    }

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
    }

    document.addEventListener('drop', handleDrop)
    document.addEventListener('dragover', handleDragOver)

    return () => {
      document.removeEventListener('drop', handleDrop)
      document.removeEventListener('dragover', handleDragOver)
    }
  }, [actions, query])

  return null
} 