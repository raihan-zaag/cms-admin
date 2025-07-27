import { useState } from 'react';
import { useEditor } from '@craftjs/core';
import { useLayoutStore, type SavedLayout } from '@/store/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import * as Dialog from '@radix-ui/react-dialog';
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
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <Save className="h-5 w-5 text-blue-600" />
              <Dialog.Title className="text-lg font-semibold">
                Save Layout
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Layout Name */}
            <div className="space-y-2">
              <Label htmlFor="layoutName">Layout Name *</Label>
              <Input
                id="layoutName"
                value={layoutName}
                onChange={(e) => setLayoutName(e.target.value)}
                placeholder="Enter layout name..."
                className="w-full"
                disabled={saving}
              />
            </div>

            {/* Layout Type */}
            <div className="space-y-2">
              <Label>Layout Type *</Label>
              <div className="grid grid-cols-2 gap-2">
                {typeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setLayoutType(option.value)}
                    disabled={saving}
                    className={`p-3 rounded-lg border text-left transition-all disabled:opacity-50 ${
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
                disabled={saving}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 p-6 border-t bg-gray-50">
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SaveModal;
