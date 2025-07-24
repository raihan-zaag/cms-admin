import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLayoutStore, type SavedLayout } from '@/store/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Download, 
  FileText,
  Heading,
  Navigation,
  Layout as LayoutIcon
} from 'lucide-react';

export function SavedLayoutsList() {
  const { 
    getAllLayouts, 
    deleteLayout, 
    getLayoutsByType 
  } = useLayoutStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<SavedLayout['type'] | 'all'>('all');
  
  const allLayouts = getAllLayouts();
  
  // Filter layouts based on search and type
  const filteredLayouts = allLayouts.filter(layout => {
    const matchesSearch = layout.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || layout.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleDeleteLayout = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteLayout(id);
    }
  };

  const handleExportLayout = (layout: SavedLayout) => {
    const dataStr = JSON.stringify(layout, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${layout.name.replace(/\s+/g, '_')}_layout.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryIcon = (type: SavedLayout['type']) => {
    switch (type) {
      case 'header': return <Heading className="h-4 w-4" />;
      case 'footer': return <Navigation className="h-4 w-4" />;
      case 'page': return <FileText className="h-4 w-4" />;
      case 'section': return <LayoutIcon className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (type: SavedLayout['type']) => {
    switch (type) {
      case 'header': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'footer': return 'bg-green-100 text-green-800 border-green-200';
      case 'page': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'section': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeCount = (type: SavedLayout['type']) => {
    return getLayoutsByType(type).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saved Layouts</h1>
          <p className="text-gray-600 mt-2">
            Manage your saved page layouts, headers, footers, and sections
          </p>
        </div>
        
        <Link to="/editor">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Layout
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search layouts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Type Filter */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('all')}
              >
                All ({allLayouts.length})
              </Button>
              <Button
                variant={selectedType === 'page' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('page')}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Pages ({getTypeCount('page')})
              </Button>
              <Button
                variant={selectedType === 'header' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('header')}
                className="flex items-center gap-2"
              >
                <Heading className="h-4 w-4" />
                Headers ({getTypeCount('header')})
              </Button>
              <Button
                variant={selectedType === 'footer' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('footer')}
                className="flex items-center gap-2"
              >
                <Navigation className="h-4 w-4" />
                Footers ({getTypeCount('footer')})
              </Button>
              <Button
                variant={selectedType === 'section' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('section')}
                className="flex items-center gap-2"
              >
                <LayoutIcon className="h-4 w-4" />
                Sections ({getTypeCount('section')})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layouts Grid */}
      {filteredLayouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLayouts.map((layout) => (
            <Card key={layout.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {getCategoryIcon(layout.type)}
                    <CardTitle className="text-lg truncate">{layout.name}</CardTitle>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getCategoryColor(layout.type)} flex items-center gap-1 flex-shrink-0`}
                  >
                    {layout.type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Created: {new Date(layout.createdAt).toLocaleDateString()}</p>
                  <p>Updated: {new Date(layout.updatedAt).toLocaleDateString()}</p>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  <Link to="/editor" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportLayout(layout)}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteLayout(layout.id, layout.name)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <LayoutIcon className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">No layouts found</h3>
                <p className="text-gray-600 mt-1">
                  {searchTerm 
                    ? `No layouts match "${searchTerm}"` 
                    : selectedType === 'all'
                    ? 'Create your first layout to get started'
                    : `No ${selectedType} layouts found`
                  }
                </p>
              </div>
              {!searchTerm && selectedType === 'all' && (
                <Link to="/editor">
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Layout
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default SavedLayoutsList;
