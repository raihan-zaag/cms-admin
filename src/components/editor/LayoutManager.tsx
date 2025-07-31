import { useState } from 'react';
import { useEditor } from '@craftjs/core';
import { useLayoutStore, type SavedLayout } from '@/store/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as Dialog from '@radix-ui/react-dialog';
import { 
  Save, 
  Upload, 
  Trash2, 
  FolderOpen, 
  Heading, 
  Navigation, 
  FileText,
  Layout,
  X,
  Plus
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

  // Check if a layout has compatibility issues
  const checkLayoutCompatibility = (layout: SavedLayout): { isCompatible: boolean; issues: string[] } => {
    const availableComponents = ['Container', 'RootContainer', 'GridContainer', 'Text', 'Button', 'ImageComponent'];
    const issues: string[] = [];
    
    try {
      Object.values(layout.craftJson).forEach((node: any) => {
        if (node?.type?.resolvedName) {
          const componentName = node.type.resolvedName;
          if (!availableComponents.includes(componentName)) {
            if (!issues.includes(componentName)) {
              issues.push(componentName);
            }
          }
        }
      });
    } catch (error) {
      console.error('Layout compatibility check error:', error);
      issues.push('Invalid layout structure');
    }
    
    return {
      isCompatible: issues.length === 0,
      issues
    };
  };

  const handleSaveLayout = () => {
    if (!layoutName.trim()) return;
    
    const craftJson = JSON.parse(query.serialize());
    saveLayout(layoutName, layoutType, craftJson);
    
    setLayoutName('');
    setSaveMode(false);
  };

  const sanitizeLayoutComponents = (craftJson: any): any => {
    console.log('Starting layout sanitization...');
    
    const componentMapping: Record<string, string> = {
      'TextComponent': 'Text',
      'ContainerCopy': 'Container',
      'Image': 'ImageComponent',
      // Add more mappings as needed based on your old component names
    };
    
    const validComponents = ['Container', 'RootContainer', 'GridContainer', 'Text', 'Button', 'ImageComponent'];
    const sanitizedJson = JSON.parse(JSON.stringify(craftJson)); // Deep clone to avoid mutations
    const nodesToRemove: string[] = [];
    
    // First pass: identify and fix component types
    Object.keys(sanitizedJson).forEach(nodeId => {
      const node = sanitizedJson[nodeId];
      
      if (!node) {
        console.warn(`Node ${nodeId} is null or undefined, removing...`);
        nodesToRemove.push(nodeId);
        return;
      }
      
      if (node.type && node.type.resolvedName) {
        const originalName = node.type.resolvedName;
        const mappedName = componentMapping[originalName];
        
        if (mappedName) {
          console.log(`Mapping component: ${originalName} -> ${mappedName}`);
          sanitizedJson[nodeId].type.resolvedName = mappedName;
        } else if (!validComponents.includes(originalName)) {
          console.warn(`Removing unsupported component: ${originalName} (node: ${nodeId})`);
          nodesToRemove.push(nodeId);
        }
      } else if (node.type && typeof node.type === 'string') {
        // Handle cases where type is a string instead of an object
        const originalName = node.type;
        const mappedName = componentMapping[originalName];
        
        if (mappedName) {
          console.log(`Converting string type: ${originalName} -> ${mappedName}`);
          sanitizedJson[nodeId].type = { resolvedName: mappedName };
        } else if (!validComponents.includes(originalName)) {
          console.warn(`Removing unsupported string component: ${originalName} (node: ${nodeId})`);
          nodesToRemove.push(nodeId);
        } else {
          // Convert valid string type to object format
          sanitizedJson[nodeId].type = { resolvedName: originalName };
        }
      } else {
        console.warn(`Node ${nodeId} has invalid type structure:`, node.type);
        nodesToRemove.push(nodeId);
      }
    });
    
    // Second pass: remove invalid nodes and clean up references
    nodesToRemove.forEach(nodeId => {
      delete sanitizedJson[nodeId];
      
      // Remove references to this node from other nodes
      Object.keys(sanitizedJson).forEach(otherNodeId => {
        const otherNode = sanitizedJson[otherNodeId];
        if (otherNode && otherNode.nodes && Array.isArray(otherNode.nodes)) {
          const originalLength = otherNode.nodes.length;
          otherNode.nodes = otherNode.nodes.filter((childId: string) => childId !== nodeId);
          if (otherNode.nodes.length !== originalLength) {
            console.log(`Removed reference to ${nodeId} from ${otherNodeId}`);
          }
        }
      });
    });
    
    // Third pass: ensure ROOT node exists and is valid
    if (!sanitizedJson.ROOT) {
      console.warn('No ROOT node found, creating a basic one...');
      sanitizedJson.ROOT = {
        type: { resolvedName: 'RootContainer' },
        isCanvas: true,
        props: {
          width: '100%',
          height: 'auto',
          background: '@color.background',
          useGlobalTokens: true
        },
        displayName: 'Root Container',
        custom: {},
        hidden: false,
        nodes: [],
        linkedNodes: {}
      };
    }
    
    console.log(`Sanitization complete. Removed ${nodesToRemove.length} invalid nodes.`);
    console.log('Final sanitized nodes:', Object.keys(sanitizedJson));
    
    return sanitizedJson;
  };

  const handleLoadLayout = (layoutId: string) => {
    const layout = loadLayout(layoutId);
    if (layout) {
      console.log('Loading layout:', layout.name, 'Type:', layout.type);
      console.log('Layout data structure:', layout.craftJson);
      
      try {
        // Validate and sanitize the layout components
        const validation = checkLayoutCompatibility(layout);
        console.log('Validation result:', validation);
        
        if (!validation.isCompatible) {
          console.warn('Layout has compatibility issues:', validation.issues);
          const proceed = confirm(
            `This layout contains unsupported components: ${validation.issues.join(', ')}.\n\n` +
            `These components will be removed or replaced. Do you want to continue?`
          );
          
          if (!proceed) {
            return;
          }
        }
        
        // Sanitize the layout to remove/replace unsupported components
        console.log('Original layout nodes:', Object.keys(layout.craftJson));
        const sanitizedCraftJson = sanitizeLayoutComponents(layout.craftJson);
        console.log('Sanitized layout nodes:', Object.keys(sanitizedCraftJson));
        
        // Validate the sanitized JSON before deserializing
        if (Object.keys(sanitizedCraftJson).length === 0) {
          throw new Error('No valid components found in layout after sanitization');
        }
        
        // Get the current editor state
        const currentState = JSON.parse(query.serialize());
        console.log('Current editor state:', Object.keys(currentState));
        
        // Check if the layout should be loaded as content inside RootContainer
        // or if it should replace the entire editor state
        if (layout.type === 'section' || layout.type === 'header' || layout.type === 'footer') {
          console.log('Loading as section/header/footer');
          // For sections/headers/footers, add them as children to the RootContainer
          const layoutNodes = sanitizedCraftJson;
          const rootNodeId = 'ROOT';
          
          if (currentState[rootNodeId] && layoutNodes.ROOT) {
            // Extract non-ROOT nodes from the layout
            const nodesToAdd = Object.fromEntries(
              Object.entries(layoutNodes).filter(([nodeId]) => nodeId !== 'ROOT')
            );
            
            // Get child nodes from layout ROOT
            const layoutChildNodes = layoutNodes.ROOT.nodes || [];
            
            // Merge the nodes into current state
            const mergedState = {
              ...currentState,
              ...nodesToAdd
            };
            
            // Add layout child nodes to current ROOT
            const existingChildNodes = currentState[rootNodeId].nodes || [];
            mergedState[rootNodeId] = {
              ...currentState[rootNodeId],
              nodes: [...existingChildNodes, ...layoutChildNodes]
            };
            
            console.log('Deserializing merged state with keys:', Object.keys(mergedState));
            actions.deserialize(JSON.stringify(mergedState));
          } else {
            // Fallback to complete replacement
            console.log('Fallback: complete replacement for section/header/footer');
            actions.deserialize(JSON.stringify(sanitizedCraftJson));
          }
        } else {
          // For complete pages, replace the entire editor state
          console.log('Loading as complete page');
          actions.deserialize(JSON.stringify(sanitizedCraftJson));
        }
        
        console.log('Layout loaded successfully');
        onClose();
      } catch (error) {
        console.error('Error loading layout:', error);
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack available');
        
        // Provide detailed error information
        let errorMessage = `Failed to load layout: ${error instanceof Error ? error.message : 'Unknown error'}`;
        
        if (error instanceof Error && error.message.includes('Cannot find component')) {
          errorMessage += '\n\nThis usually happens when:\n' +
            '• The layout contains components that are no longer available\n' +
            '• Component names have changed since the layout was saved\n' +
            '• The layout was created with a different version of the editor\n\n' +
            'Try using the "Clean Up" feature to remove problematic layouts.';
        } else if (error instanceof Error && error.message.includes('Invariant failed')) {
          errorMessage += '\n\nCraftJS deserialization error. Check the browser console for detailed component information.';
        }
        
        alert(errorMessage);
      }
    } else {
      console.error('Layout not found:', layoutId);
      alert('Layout not found. It may have been deleted.');
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
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl h-[80vh] bg-white rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-purple-600" />
              <Dialog.Title className="text-xl font-semibold">
                Layout Manager
              </Dialog.Title>
              {(() => {
                const incompatibleCount = savedLayouts.filter(layout => !checkLayoutCompatibility(layout).isCompatible).length;
                if (incompatibleCount > 0) {
                  return (
                    <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      {incompatibleCount} issues
                    </span>
                  );
                }
                return null;
              })()}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSaveMode(!saveMode)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Save Current Layout
              </Button>
              
              <Dialog.Close asChild>
                <button
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col p-6 overflow-hidden">
            {/* Save Layout Form */}
            {saveMode && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Current Layout
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="layoutName">Layout Name</Label>
                    <Input
                      id="layoutName"
                      value={layoutName}
                      onChange={(e) => setLayoutName(e.target.value)}
                      placeholder="Enter layout name..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="layoutType">Layout Type</Label>
                    <select
                      id="layoutType"
                      value={layoutType}
                      onChange={(e) => setLayoutType(e.target.value as SavedLayout['type'])}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="page">Page</option>
                      <option value="header">Header</option>
                      <option value="footer">Footer</option>
                      <option value="section">Section</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setSaveMode(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSaveLayout} 
                    disabled={!layoutName.trim()}
                  >
                    Save Layout
                  </Button>
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className="flex gap-2 mb-4 flex-wrap">
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

            {/* Compatibility Status & Cleanup */}
            {(() => {
              const incompatibleLayouts = filteredLayouts.filter(layout => !checkLayoutCompatibility(layout).isCompatible);
              if (incompatibleLayouts.length > 0) {
                return (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600">⚠️</span>
                        <span className="text-sm font-medium text-yellow-800">
                          {incompatibleLayouts.length} layout{incompatibleLayouts.length !== 1 ? 's' : ''} with compatibility issues
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (confirm(`Remove ${incompatibleLayouts.length} incompatible layout${incompatibleLayouts.length !== 1 ? 's' : ''}? This cannot be undone.`)) {
                            incompatibleLayouts.forEach(layout => deleteLayout(layout.id));
                          }
                        }}
                        className="text-xs"
                      >
                        Clean Up
                      </Button>
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            {/* Layouts Grid */}
            <div className="flex-1 overflow-y-auto">
              {filteredLayouts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredLayouts.map((layout) => {
                    const compatibility = checkLayoutCompatibility(layout);
                    
                    return (
                      <div key={layout.id} className="bg-white border rounded-lg hover:shadow-md transition-shadow">
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              {getCategoryIcon(layout.type)}
                              <h3 className="font-medium truncate">{layout.name}</h3>
                            </div>
                            
                            <div className="flex items-center gap-2 ml-2">
                              {!compatibility.isCompatible && (
                                <span 
                                  className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800 whitespace-nowrap"
                                  title={`Compatibility issues: ${compatibility.issues.join(', ')}`}
                                >
                                  ⚠️ Issues
                                </span>
                              )}
                              <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getCategoryColor(layout.type)}`}>
                                {layout.type}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-500 mb-3">
                            Created: {new Date(layout.createdAt).toLocaleDateString()}
                          </p>
                          
                          {!compatibility.isCompatible && (
                            <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                              <p className="font-medium text-yellow-800 mb-1">Compatibility Issues:</p>
                              <p className="text-yellow-700">
                                Missing components: {compatibility.issues.join(', ')}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex justify-between gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleLoadLayout(layout.id)}
                              className="flex items-center gap-2 flex-1"
                            >
                              <Upload className="h-4 w-4" />
                              {!compatibility.isCompatible ? 'Load (with fixes)' : 'Load'}
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteLayout(layout.id)}
                              className="text-red-600 hover:text-red-700 hover:border-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                  <Button 
                    className="mt-4"
                    onClick={() => setSaveMode(true)}
                  >
                    Save Current Layout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LayoutManager;
