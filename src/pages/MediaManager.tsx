import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { apiService } from '@/services/api'
import { Upload, Trash2, Search, Grid, List } from 'lucide-react'

interface MediaFile {
  id: string
  filename: string
  originalName: string
  mimetype: string
  size: number
  url: string
  createdAt: string
}

export function MediaManager() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    try {
      const response = await apiService.getMediaFiles()
      setFiles(response.files || [])
    } catch (error) {
      console.error('Failed to load media files:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const response = await apiService.uploadFile(file)
      setFiles([response.file, ...files])
    } catch (error) {
      console.error('Failed to upload file:', error)
      alert('Failed to upload file')
    } finally {
      setUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDeleteFile = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      await apiService.deleteMediaFile(id)
      setFiles(files.filter(file => file.id !== id))
    } catch (error) {
      console.error('Failed to delete file:', error)
      alert('Failed to delete file')
    }
  }

  const filteredFiles = files.filter(file =>
    file.originalName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const isImage = (mimetype: string) => mimetype.startsWith('image/')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
          
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {uploading ? 'Uploading...' : 'Upload File'}
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,video/*,.pdf,.doc,.docx,.txt"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="text-gray-500">Loading media files...</div>
        </div>
      ) : filteredFiles.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'No files match your search.' : 'No files uploaded yet.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => fileInputRef.current?.click()}>
                Upload your first file
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
            : "space-y-2"
        }>
          {filteredFiles.map((file) => (
            <MediaFileCard
              key={file.id}
              file={file}
              viewMode={viewMode}
              onDelete={() => handleDeleteFile(file.id)}
              isImage={isImage(file.mimetype)}
              formatFileSize={formatFileSize}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface MediaFileCardProps {
  file: MediaFile
  viewMode: 'grid' | 'list'
  onDelete: () => void
  isImage: boolean
  formatFileSize: (bytes: number) => string
}

function MediaFileCard({ file, viewMode, onDelete, isImage, formatFileSize }: MediaFileCardProps) {
  if (viewMode === 'list') {
    return (
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            {isImage ? (
              <img
                src={file.url}
                alt={file.originalName}
                className="w-12 h-12 object-cover rounded"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-mono">
                  {file.mimetype.split('/')[1]?.toUpperCase() || 'FILE'}
                </span>
              </div>
            )}
            <div>
              <p className="font-medium">{file.originalName}</p>
              <p className="text-sm text-gray-500">
                {formatFileSize(file.size)} • {new Date(file.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(file.url, '_blank')}
            >
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="aspect-square mb-3 bg-gray-100 rounded overflow-hidden">
          {isImage ? (
            <img
              src={file.url}
              alt={file.originalName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-sm font-mono text-gray-600">
                {file.mimetype.split('/')[1]?.toUpperCase() || 'FILE'}
              </span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium truncate" title={file.originalName}>
            {file.originalName}
          </p>
          <p className="text-xs text-gray-500">
            {formatFileSize(file.size)}
          </p>
        </div>
        
        <div className="flex justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(file.url, '_blank')}
          >
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
