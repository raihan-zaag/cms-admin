import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { apiService } from '@/services/api'
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react'

interface Page {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
  author?: {
    name: string
    email: string
  }
}

interface PagesResponse {
  pages: Page[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export function PagesList() {
  const [pagesData, setPagesData] = useState<PagesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 10

  useEffect(() => {
    const loadPagesWithDebounce = async () => {
      setLoading(true)
      try {
        const params: Record<string, string | number> = {
          page: currentPage,
          limit,
        }
        
        if (searchTerm) params.search = searchTerm
        if (statusFilter !== 'all') params.status = statusFilter
        
        const response = await apiService.getPages(params)
        setPagesData(response)
      } catch (error) {
        console.error('Failed to load pages:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPagesWithDebounce()
  }, [searchTerm, statusFilter, currentPage])

  const loadPages = async () => {
    setLoading(true)
    try {
      const params: Record<string, string | number> = {
        page: currentPage,
        limit,
      }
      
      if (searchTerm) params.search = searchTerm
      if (statusFilter !== 'all') params.status = statusFilter
      
      const response = await apiService.getPages(params)
      setPagesData(response)
    } catch (error) {
      console.error('Failed to load pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return

    try {
      await apiService.deletePage(id)
      loadPages() // Reload the list
    } catch (error) {
      console.error('Failed to delete page:', error)
      alert('Failed to delete page')
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleStatusFilterChange = (status: 'all' | 'draft' | 'published') => {
    setStatusFilter(status)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Pages</h1>
        <Link to="/editor">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Page
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => handleStatusFilterChange('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'published' ? 'default' : 'outline'}
                onClick={() => handleStatusFilterChange('published')}
                size="sm"
              >
                Published
              </Button>
              <Button
                variant={statusFilter === 'draft' ? 'default' : 'outline'}
                onClick={() => handleStatusFilterChange('draft')}
                size="sm"
              >
                Draft
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pages List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="text-gray-500">Loading pages...</div>
        </div>
      ) : !pagesData || pagesData?.pages?.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'No pages match your filters.' 
                : 'No pages created yet.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Link to="/editor">
                <Button>Create your first page</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>
                {pagesData.total} Page{pagesData.total !== 1 ? 's' : ''}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-900">Title</th>
                      <th className="text-left p-4 font-medium text-gray-900">Status</th>
                      <th className="text-left p-4 font-medium text-gray-900">Last Modified</th>
                      <th className="text-left p-4 font-medium text-gray-900">Author</th>
                      <th className="text-right p-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagesData?.pages?.map((page) => (
                      <tr key={page.id} className="border-t hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900">{page.title}</p>
                            <p className="text-sm text-gray-500">/{page.slug}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(page.status)}>
                            {page.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {new Date(page.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {page.author?.name || 'Unknown'}
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeletePage(page.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          {pagesData.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              {Array.from({ length: pagesData.totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  onClick={() => setCurrentPage(page)}
                  size="sm"
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pagesData.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
