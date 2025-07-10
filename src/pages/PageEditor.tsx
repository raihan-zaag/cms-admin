import { useState } from 'react'
import { Editor } from '@craftjs/core'
import { TextBlock } from '@/components/craft/TextBlock'
import { ImageBlock } from '@/components/craft/ImageBlock'
import { Container } from '@/components/craft/Container'
import { ButtonBlock } from '@/components/craft/ButtonBlock'
import { GridLayout, GridColumn, Section } from '@/components/craft/ResponsiveLayout'
import {
  EditorHeader,
  EditorToolbar,
  EditorSidebar,
  EditorCanvas,
  SettingsPanel,
  EditorShortcuts,
  RenderNode,
} from '@/components/editor'
import '@/components/craft/craft-styles.css'

export function PageEditor() {
  const [pageTitle, setPageTitle] = useState('')
  const [pageSlug, setPageSlug] = useState('')
  const [isPreview, setPreview] = useState(false)
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [zoom, setZoom] = useState(100)
  const [selectedElements, setSelectedElements] = useState<Set<string>>(new Set())
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Editor
        resolver={{
          TextBlock,
          ImageBlock,
          Container,
          ButtonBlock,
          GridLayout,
          GridColumn,
          Section,
        }}
        onRender={RenderNode}
      >
        {/* Header */}
        <EditorHeader
          pageTitle={pageTitle}
          setPageTitle={setPageTitle}
          pageSlug={pageSlug}
          setPageSlug={setPageSlug}
          isPreview={isPreview}
          setPreview={setPreview}
        />

        {/* Toolbar */}
        {!isPreview && (
          <EditorToolbar
            viewportMode={viewportMode}
            setViewportMode={setViewportMode}
            zoom={zoom}
            setZoom={setZoom}
            isMultiSelectMode={isMultiSelectMode}
            setIsMultiSelectMode={setIsMultiSelectMode}
            selectedElements={selectedElements}
            setSelectedElements={setSelectedElements}
          />
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          {!isPreview && (
            <EditorSidebar
              isMultiSelectMode={isMultiSelectMode}
              setIsMultiSelectMode={setIsMultiSelectMode}
              selectedElements={selectedElements}
              setSelectedElements={setSelectedElements}
            />
          )}

          {/* Main Canvas */}
          <EditorCanvas
            viewportMode={viewportMode}
            zoom={zoom}
            isPreview={isPreview}
          />

          {/* Settings Panel */}
          {!isPreview && <SettingsPanel />}
        </div>

        {/* Keyboard Shortcuts */}
        <EditorShortcuts isPreview={isPreview} />
        {/* <DragDropHandler /> */}
      </Editor>
    </div>
  )
}
