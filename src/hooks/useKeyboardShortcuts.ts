import { useEffect } from 'react';
import { useEditor } from '@craftjs/core';
import { useLayoutStore } from '@/store/layout';

export const useKeyboardShortcuts = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  
  const { 
    undo, 
    redo, 
    canUndo, 
    canRedo
  } = useLayoutStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts when in edit mode
      if (!enabled) return;

      // Prevent default browser shortcuts
      if ((e.ctrlKey || e.metaKey) && ['z', 'y'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }

      // Get currently selected element
      const selectedId = query.getEvent('selected').first();

      // Undo (Ctrl+Z / Cmd+Z)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        if (canUndo()) {
          const previousState = undo();
          if (previousState) {
            actions.deserialize(JSON.stringify(previousState.craftJson));
          }
        }
        return;
      }

      // Redo (Ctrl+Y / Cmd+Y or Ctrl+Shift+Z / Cmd+Shift+Z)
      if (
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z')
      ) {
        if (canRedo()) {
          const nextState = redo();
          if (nextState) {
            actions.deserialize(JSON.stringify(nextState.craftJson));
          }
        }
        return;
      }

      // Delete (Delete / Backspace)
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        // Make sure we're not deleting text input
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (
          activeElement.tagName === 'INPUT' || 
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.contentEditable === 'true'
        )) {
          return;
        }
        
        actions.delete(selectedId);
        return;
      }

      // Move Up (Ctrl+Up / Cmd+Up)
      if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowUp' && selectedId) {
        const node = query.node(selectedId).get();
        const parent = node.data.parent;
        
        if (parent) {
          const parentNode = query.node(parent).get();
          const siblings = parentNode.data.nodes || [];
          const currentIndex = siblings.indexOf(selectedId);
          
          if (currentIndex > 0) {
            actions.move(selectedId, parent, currentIndex - 1);
          }
        }
        return;
      }

      // Move Down (Ctrl+Down / Cmd+Down)
      if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowDown' && selectedId) {
        const node = query.node(selectedId).get();
        const parent = node.data.parent;
        
        if (parent) {
          const parentNode = query.node(parent).get();
          const siblings = parentNode.data.nodes || [];
          const currentIndex = siblings.indexOf(selectedId);
          
          if (currentIndex < siblings.length - 1) {
            actions.move(selectedId, parent, currentIndex + 1);
          }
        }
        return;
      }

      // Duplicate (Ctrl+D / Cmd+D)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd' && selectedId) {
        const node = query.node(selectedId).get();
        const parent = node.data.parent;
        
        if (parent) {
          actions.add(node, parent);
        }
        return;
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, actions, query, undo, redo, canUndo, canRedo]);
};

export default useKeyboardShortcuts;
