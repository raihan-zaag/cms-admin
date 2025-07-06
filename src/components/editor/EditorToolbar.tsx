import { Button } from '@/components/ui/button'
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  ZoomIn, 
  ZoomOut, 
  Layers
} from 'lucide-react'
import { UndoRedoButtons } from './UndoRedoButtons'
import { MultiSelectControls } from './MultiSelectControls'

interface EditorToolbarProps {
  viewportMode: 'desktop' | 'tablet' | 'mobile'
  setViewportMode: (mode: 'desktop' | 'tablet' | 'mobile') => void
  zoom: number
  setZoom: (zoom: number) => void
  isMultiSelectMode: boolean
  setIsMultiSelectMode: (value: boolean) => void
  selectedElements: Set<string>
  setSelectedElements: (value: Set<string>) => void
}

export function EditorToolbar({
  viewportMode,
  setViewportMode,
  zoom,
  setZoom,
  isMultiSelectMode,
  setIsMultiSelectMode,
  selectedElements,
  setSelectedElements
}: EditorToolbarProps) {
  return (
    <div className="px-6 py-2 flex items-center justify-between bg-gray-50">
      <div className="flex items-center space-x-4">
        {/* Viewport Controls */}
        <div className="flex items-center space-x-1 bg-white rounded-lg border p-1">
          <Button
            variant={viewportMode === 'desktop' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewportMode('desktop')}
            className="h-7 px-2"
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={viewportMode === 'tablet' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewportMode('tablet')}
            className="h-7 px-2"
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={viewportMode === 'mobile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewportMode('mobile')}
            className="h-7 px-2"
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-2 bg-white rounded-lg border px-3 py-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(Math.max(25, zoom - 25))}
            className="h-6 w-6 p-0"
          >
            <ZoomOut className="h-3 w-3" />
          </Button>
          <span className="text-sm font-medium min-w-[3rem] text-center">{zoom}%</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(Math.min(200, zoom + 25))}
            className="h-6 w-6 p-0"
          >
            <ZoomIn className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <UndoRedoButtons />
        <div className="w-px h-6 bg-gray-300" />
        <MultiSelectControls 
          isMultiSelectMode={isMultiSelectMode}
          setIsMultiSelectMode={setIsMultiSelectMode}
          selectedElements={selectedElements}
          setSelectedElements={setSelectedElements}
        />
        <div className="w-px h-6 bg-gray-300" />
        <LayersPanel />
      </div>
    </div>
  )
}

function LayersPanel() {
  return (
    <Button variant="ghost" size="sm" className="h-7 px-2">
      <Layers className="h-4 w-4" />
    </Button>
  )
} 