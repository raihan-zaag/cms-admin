import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SavedLayout {
  id: string
  name: string
  type: 'header' | 'footer' | 'page' | 'section'
  craftJson: any
  thumbnail?: string
  createdAt: string
  updatedAt: string
}

export interface HistoryState {
  id: string
  craftJson: any
  timestamp: number
}

interface LayoutState {
  savedLayouts: SavedLayout[]
  history: HistoryState[]
  currentHistoryIndex: number
  
  // Layout management
  saveLayout: (name: string, type: SavedLayout['type'], craftJson: any) => void
  loadLayout: (id: string) => SavedLayout | null
  deleteLayout: (id: string) => void
  getAllLayouts: () => SavedLayout[]
  getLayoutsByType: (type: SavedLayout['type']) => SavedLayout[]
  
  // History management
  addToHistory: (craftJson: any) => void
  undo: () => HistoryState | null
  redo: () => HistoryState | null
  canUndo: () => boolean
  canRedo: () => boolean
  clearHistory: () => void
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set, get) => ({
      savedLayouts: [],
      history: [],
      currentHistoryIndex: -1,
      
      // Layout management
      saveLayout: (name: string, type: SavedLayout['type'], craftJson: any) => {
        const newLayout: SavedLayout = {
          id: `layout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name,
          type,
          craftJson,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        
        set(state => ({
          savedLayouts: [...state.savedLayouts, newLayout]
        }))
      },
      
      loadLayout: (id: string) => {
        const state = get()
        return state.savedLayouts.find(layout => layout.id === id) || null
      },
      
      deleteLayout: (id: string) => {
        set(state => ({
          savedLayouts: state.savedLayouts.filter(layout => layout.id !== id)
        }))
      },
      
      getAllLayouts: () => {
        return get().savedLayouts
      },
      
      getLayoutsByType: (type: SavedLayout['type']) => {
        return get().savedLayouts.filter(layout => layout.type === type)
      },
      
      // History management
      addToHistory: (craftJson: any) => {
        const state = get()
        
        // Don't add if it's the same as the current state
        if (state.history.length > 0 && state.currentHistoryIndex >= 0) {
          const currentState = state.history[state.currentHistoryIndex];
          if (JSON.stringify(currentState.craftJson) === JSON.stringify(craftJson)) {
            console.log('Skipping duplicate history entry');
            return;
          }
        }
        
        const newHistoryItem: HistoryState = {
          id: `history_${Date.now()}`,
          craftJson: JSON.parse(JSON.stringify(craftJson)), // Deep clone
          timestamp: Date.now()
        }
        
        // Remove any future history items if we're not at the end
        const newHistory = state.history.slice(0, state.currentHistoryIndex + 1)
        newHistory.push(newHistoryItem)
        
        // Keep only last 50 history items
        const limitedHistory = newHistory.slice(-50)
        
        set({
          history: limitedHistory,
          currentHistoryIndex: limitedHistory.length - 1
        })
        
        console.log('Added to history, total items:', limitedHistory.length, 'current index:', limitedHistory.length - 1);
      },
      
      undo: () => {
        const state = get()
        console.log('Undo requested. Current index:', state.currentHistoryIndex, 'History length:', state.history.length);
        if (state.currentHistoryIndex > 0) {
          const newIndex = state.currentHistoryIndex - 1
          set({ currentHistoryIndex: newIndex })
          console.log('Undo successful. New index:', newIndex);
          return state.history[newIndex]
        }
        console.log('Cannot undo - at beginning of history');
        return null
      },
      
      redo: () => {
        const state = get()
        console.log('Redo requested. Current index:', state.currentHistoryIndex, 'History length:', state.history.length);
        if (state.currentHistoryIndex < state.history.length - 1) {
          const newIndex = state.currentHistoryIndex + 1
          set({ currentHistoryIndex: newIndex })
          console.log('Redo successful. New index:', newIndex);
          return state.history[newIndex]
        }
        console.log('Cannot redo - at end of history');
        return null
      },
      
      canUndo: () => {
        const state = get()
        return state.currentHistoryIndex > 0
      },
      
      canRedo: () => {
        const state = get()
        return state.currentHistoryIndex < state.history.length - 1
      },
      
      clearHistory: () => {
        set({
          history: [],
          currentHistoryIndex: -1
        })
      }
    }),
    {
      name: 'layout-storage',
      partialize: (state) => ({
        savedLayouts: state.savedLayouts,
        // Don't persist history and clipboard for performance
      }),
    }
  )
)
