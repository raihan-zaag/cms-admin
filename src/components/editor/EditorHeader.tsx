import { useState } from 'react'
import { useEditor } from '@craftjs/core'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Save, Eye } from 'lucide-react'
import { apiService } from '@/services/api'

interface EditorHeaderProps {
  pageTitle: string
  setPageTitle: (title: string) => void
  pageSlug: string
  setPageSlug: (slug: string) => void
  isPreview: boolean
  setPreview: (preview: boolean) => void
}

export function EditorHeader({
  pageTitle,
  setPageTitle,
  pageSlug,
  setPageSlug,
  isPreview,
  setPreview
}: EditorHeaderProps) {
  return (
    <div className="bg-white border-b shadow-sm">
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