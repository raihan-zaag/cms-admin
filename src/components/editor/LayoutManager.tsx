import React, { useState, useEffect } from 'react';
import { useEditor } from '@craftjs/core';
import { useLayoutStore, type SavedLayout } from '@/store/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Save, 
  Upload, 
  Trash2, 
  FolderOpen, 
  Heading, 
  Navigation, 
  FileText,
  Layout,
  X
} from 'lucide-react';

interface LayoutManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LayoutManager: React.FC<LayoutManagerProps> = ({ isOpen, onClose }) => {
  const { query, actions } = useEditor();
  const { 
    savedLayouts, 
    saveLayout, 
    loadLayout, 
    deleteLayout, 
    getLayoutsByType 
  } = useLayoutStore();
  
  const [saveMode, setSaveMode] = useState(false);
  const [layoutName, setLayoutName] = useState('');
  const [layoutType, setLayoutType] = useState<SavedLayout['type']>('page');
  const [selectedCategory, setSelectedCategory] = useState<SavedLayout['type'] | 'all'>('all');

  // Add escape key support
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSaveLayout = () => {
    if (!layoutName.trim()) return;
    
    const craftJson = JSON.parse(query.serialize());
    saveLayout(layoutName, layoutType, craftJson);
    
    setLayoutName('');
    setSaveMode(false);
  };

  const handleLoadLayout = (layoutId: string) => {
    const layout = loadLayout(layoutId);
    if (layout) {
      // Clear current content and load the layout
      actions.deserialize(JSON.stringify(layout.craftJson));
      onClose();
    }
  };

  const handleDeleteLayout = (layoutId: string) => {
    if (confirm('Are you sure you want to delete this layout?')) {
      deleteLayout(layoutId);
    }
  };

  const filteredLayouts = selectedCategory === 'all' 
    ? savedLayouts 
    : getLayoutsByType(selectedCategory);

  const getCategoryIcon = (type: SavedLayout['type']) => {
    switch (type) {
      case 'header': return <Heading className="h-4 w-4" />;
      case 'footer': return <Navigation className="h-4 w-4" />;
      case 'page': return <FileText className="h-4 w-4" />;
      case 'section': return <Layout className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (type: SavedLayout['type']) => {
    switch (type) {
      case 'header': return 'bg-blue-100 text-blue-800';
      case 'footer': return 'bg-green-100 text-green-800';
      case 'page': return 'bg-purple-100 text-purple-800';
      case 'section': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Layout Manager
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSaveMode(!saveMode)}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Current Layout
            </Button>
            
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {/* Save Layout Form */}
          {saveMode && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="layoutName">Layout Name</Label>
                    <Input
                      id="layoutName"
                      value={layoutName}
                      onChange={(e) => setLayoutName(e.target.value)}
                      placeholder="Enter layout name..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="layoutType">Layout Type</Label>
                    <select
                      id="layoutType"
                      value={layoutType}
                      onChange={(e) => setLayoutType(e.target.value as SavedLayout['type'])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="page">Page</option>
                      <option value="header">Header</option>
                      <option value="footer">Footer</option>
                      <option value="section">Section</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setSaveMode(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveLayout} disabled={!layoutName.trim()}>
                    Save Layout
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Category Filter */}
          <div className="flex space-x-2 mb-4">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All ({savedLayouts.length})
            </Button>
            <Button
              variant={selectedCategory === 'header' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('header')}
              className="flex items-center gap-2"
            >
              <Heading className="h-4 w-4" />
              Headers ({getLayoutsByType('header').length})
            </Button>
            <Button
              variant={selectedCategory === 'footer' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('footer')}
              className="flex items-center gap-2"
            >
              <Navigation className="h-4 w-4" />
              Footers ({getLayoutsByType('footer').length})
            </Button>
            <Button
              variant={selectedCategory === 'page' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('page')}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Pages ({getLayoutsByType('page').length})
            </Button>
            <Button
              variant={selectedCategory === 'section' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('section')}
              className="flex items-center gap-2"
            >
              <Layout className="h-4 w-4" />
              Sections ({getLayoutsByType('section').length})
            </Button>
          </div>

          {/* Layouts Grid */}
          <div className="flex-1 overflow-y-auto">
            {filteredLayouts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLayouts.map((layout) => (
                  <Card key={layout.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(layout.type)}
                          <h3 className="font-medium truncate">{layout.name}</h3>
                        </div>
                        
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(layout.type)}`}>
                          {layout.type}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-3">
                        Created: {new Date(layout.createdAt).toLocaleDateString()}
                      </p>
                      
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleLoadLayout(layout.id)}
                          className="flex items-center gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Load
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteLayout(layout.id)}
                          className="text-red-600 hover:text-red-700 flex items-center gap-2"
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
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FolderOpen className="h-16 w-16 mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No layouts found</h3>
                <p className="text-sm text-center">
                  {selectedCategory === 'all' 
                    ? 'Save your first layout to get started' 
                    : `No ${selectedCategory} layouts saved yet`}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LayoutManager;
