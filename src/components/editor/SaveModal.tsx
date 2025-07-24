import React, { useState } from 'react';
import { useEditor } from '@craftjs/core';
import { useLayoutStore, type SavedLayout } from '@/store/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Save, 
  X, 
  FileText, 
  Heading, 
  Navigation, 
  Layout as LayoutIcon 
} from 'lucide-react';

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaveModal: React.FC<SaveModalProps> = ({ isOpen, onClose }) => {
  const { query } = useEditor();
  const { saveLayout } = useLayoutStore();
  
  const [layoutName, setLayoutName] = useState('');
  const [layoutType, setLayoutType] = useState<SavedLayout['type']>('page');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!layoutName.trim()) return;
    
    setSaving(true);
    try {
      const craftJson = JSON.parse(query.serialize());
      
      // Add description to the layout metadata
      const layoutData = {
        ...craftJson,
        _metadata: {
          description: description.trim(),
          createdAt: new Date().toISOString(),
        }
      };
      
      saveLayout(layoutName, layoutType, layoutData);
      
      // Save to localStorage as backup
      localStorage.setItem('craft-page-backup', JSON.stringify(craftJson));
      
      // Reset form
      setLayoutName('');
      setDescription('');
      setLayoutType('page');
      
      onClose();
    } catch (error) {
      console.error('Error saving layout:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setLayoutName('');
    setDescription('');
    setLayoutType('page');
    onClose();
  };

  const getTypeIcon = (type: SavedLayout['type']) => {
    switch (type) {
      case 'header': return <Heading className="h-4 w-4" />;
      case 'footer': return <Navigation className="h-4 w-4" />;
      case 'page': return <FileText className="h-4 w-4" />;
      case 'section': return <LayoutIcon className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const typeOptions = [
    { value: 'page', label: 'Full Page', description: 'Complete page layout with all sections' },
    { value: 'header', label: 'Header', description: 'Navigation and top section' },
    { value: 'footer', label: 'Footer', description: 'Bottom section with links and info' },
    { value: 'section', label: 'Section', description: 'Reusable content section' },
  ] as const;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Save className="h-5 w-5" />
            Save Layout
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Layout Name */}
          <div className="space-y-2">
            <Label htmlFor="layoutName">Layout Name *</Label>
            <Input
              id="layoutName"
              value={layoutName}
              onChange={(e) => setLayoutName(e.target.value)}
              placeholder="Enter a descriptive name..."
              className="w-full"
            />
          </div>

          {/* Layout Type */}
          <div className="space-y-3">
            <Label>Layout Type *</Label>
            <div className="grid grid-cols-2 gap-2">
              {typeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLayoutType(option.value)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    layoutType === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {getTypeIcon(option.value)}
                    <span className="font-medium text-sm">{option.label}</span>
                  </div>
                  <p className="text-xs text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this layout..."
              rows={3}
              className="w-full resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleCancel} disabled={saving}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!layoutName.trim() || saving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {saving ? 'Saving...' : 'Save Layout'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SaveModal;
