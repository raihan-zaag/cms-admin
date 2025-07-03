import { useState } from 'react'
import React from 'react'
import { Editor, Frame, Element, useEditor } from '@craftjs/core'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HeroSection } from '@/components/craft/HeroSection'
import { TextBlock } from '@/components/craft/TextBlock'
import { ImageBlock } from '@/components/craft/ImageBlock'
import { Container } from '@/components/craft/Container'
import { CardBlock } from '@/components/craft/CardBlock'
import { ResizableWrapper, GridLayout } from '@/components/craft/ResponsiveLayout'
import { apiService } from '@/services/api'
import { 
  Save, 
  Eye, 
  Settings, 
  Trash2, 
  Monitor, 
  Tablet, 
  Smartphone,
  Layers,
  Move,
  Copy,
  RotateCcw,
  ZoomIn,
  ZoomOut
} from 'lucide-react'

export function PageEditor() {
  const [pageTitle, setPageTitle] = useState('')
  const [pageSlug, setPageSlug] = useState('')
  const [isPreview, setPreview] = useState(false)
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [zoom, setZoom] = useState(100)

  const getViewportWidth = () => {
    switch (viewportMode) {
      case 'tablet': return '768px'
      case 'mobile': return '375px'
      default: return '100%'
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Editor
        resolver={{
          HeroSection,
          TextBlock,
          ImageBlock,
          Container,
          CardBlock,
          ResizableWrapper,
          GridLayout,
        }}
        onRender={RenderNode}
      >
        {/* Enhanced Header */}
        <div className="bg-white border-b shadow-sm">
          {/* Top Bar */}
          <div className="px-6 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-semibold text-gray-900">Page Builder</h1>
                  <Badge variant="secondary" className="text-xs">Professional</Badge>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <Label htmlFor="pageTitle" className="text-xs text-gray-500 mb-1">Page Title</Label>
                    <Input
                      id="pageTitle"
                      value={pageTitle}
                      onChange={(e) => setPageTitle(e.target.value)}
                      placeholder="Enter page title"
                      className="w-64 h-8"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="pageSlug" className="text-xs text-gray-500 mb-1">URL Slug</Label>
                    <Input
                      id="pageSlug"
                      value={pageSlug}
                      onChange={(e) => setPageSlug(e.target.value)}
                      placeholder="page-url-slug"
                      className="w-64 h-8"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreview(!isPreview)}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  {isPreview ? 'Edit' : 'Preview'}
                </Button>
                <SaveButton pageTitle={pageTitle} pageSlug={pageSlug} />
              </div>
            </div>
          </div>

          {/* Toolbar */}
          {!isPreview && (
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
                <LayersPanel />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Enhanced Sidebar */}
          {!isPreview && (
            <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Components
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <ComponentButton component="Container" label="Container" icon="📦" />
                  <ComponentButton component="HeroSection" label="Hero" icon="🎯" />
                  <ComponentButton component="TextBlock" label="Text" icon="📝" />
                  <ComponentButton component="ImageBlock" label="Image" icon="🖼️" />
                  <ComponentButton component="CardBlock" label="Card" icon="🃏" />
                  <ComponentButton component="GridLayout" label="Grid" icon="⚏" />
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate Selected
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Move className="h-4 w-4 mr-2" />
                        Move to Layer
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Selected
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Tips</h4>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>• Drag components to the canvas</p>
                      <p>• Click to select and edit properties</p>
                      <p>• Resize handles appear on selection</p>
                      <p>• Use grid layout for responsive design</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Main Editor */}
          <div className="flex-1 overflow-hidden bg-gray-100 flex flex-col">
            <div className="flex-1 overflow-auto p-6">
              <div 
                className="mx-auto transition-all duration-300 bg-white shadow-lg rounded-lg overflow-hidden"
                style={{ 
                  width: getViewportWidth(),
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top center'
                }}
              >
                <Frame>
                  <Element 
                    is={Container}
                    background="white"
                    padding="0"
                    margin="0"
                    width={viewportMode === 'mobile' ? 375 : viewportMode === 'tablet' ? 768 : 1200}
                    height={800}
                    canvas
                  >
                    {/* Default responsive grid container */}
                    <Element
                      is={GridLayout}
                      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                      rowHeight={30}
                      margin={[10, 10]}
                      canvas
                    />
                  </Element>
                </Frame>
              </div>
            </div>

            {/* Status Bar */}
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
          </div>

          {/* Enhanced Settings Panel */}
          {!isPreview && <EnhancedSettingsPanel />}
        </div>
      </Editor>
    </div>
  )
}

function SaveButton({ pageTitle, pageSlug }: { pageTitle: string; pageSlug: string }) {
  const { query } = useEditor()
  const [isSaving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!pageTitle.trim()) {
      alert('Please enter a page title')
      return
    }

    setSaving(true)
    try {
      const content = query.serialize()
      
      await apiService.createPage({
        title: pageTitle,
        slug: pageSlug || pageTitle.toLowerCase().replace(/\s+/g, '-'),
        content: JSON.parse(content),
        status: 'draft',
      })
      
      alert('Page saved successfully!')
    } catch (error) {
      console.error('Failed to save page:', error)
      alert('Failed to save page')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Button
      onClick={handleSave}
      disabled={isSaving}
      className="flex items-center gap-2"
    >
      <Save className="h-4 w-4" />
      {isSaving ? 'Saving...' : 'Save Page'}
    </Button>
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
            component === 'HeroSection' ? <HeroSection /> :
            component === 'TextBlock' ? <TextBlock /> :
            component === 'ImageBlock' ? <ImageBlock /> :
            component === 'Container' ? <Container /> :
            component === 'CardBlock' ? <CardBlock /> :
            component === 'GridLayout' ? <GridLayout /> :
            component === 'ResizableWrapper' ? <ResizableWrapper /> :
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

// Helper Components
function UndoRedoButtons() {
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

function LayersPanel() {
  return (
    <Button variant="ghost" size="sm" className="h-7 px-2">
      <Layers className="h-4 w-4" />
    </Button>
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

function EnhancedSettingsPanel() {
  const { selected, actions } = useEditor((_state, query) => {
    const currentNodeId = query.getEvent('selected').last()
    let selected = null

    if (currentNodeId) {
      const node = query.node(currentNodeId).get()
      selected = {
        id: currentNodeId,
        name: node.data.name || node.data.displayName || 'Component',
        settings: node.related?.settings
      }
    }

    return { selected }
  })

  return (
    <div className="w-80 bg-white border-l border-gray-200">
      <Card className="h-full rounded-none border-0">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <span>Properties</span>
            </div>
            {selected && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  actions.delete(selected.id)
                }}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-1">
          {selected ? (
            <div className="h-full">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {selected.name}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Configure the properties for this component
                </p>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {selected.settings && (
                  <div className="max-h-96 overflow-y-auto">
                    {React.createElement(selected.settings)}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Copy className="h-4 w-4 mr-1" />
                    Duplicate
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Move className="h-4 w-4 mr-1" />
                    Move
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <Settings className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No Component Selected</h3>
              <p className="text-sm text-gray-500">
                Click on any component in the canvas to edit its properties
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Component to render editing indicators
function RenderNode({ render }: { render: React.ReactElement }) {
  return (
    <div className="relative">
      {render}
    </div>
  )
}
