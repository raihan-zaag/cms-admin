import React from 'react'
import { useEditor } from '@craftjs/core'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Settings, Trash2, Copy, Move } from 'lucide-react'

export function SettingsPanel() {
  const { selected, actions } = useEditor((_state, query) => {
    const currentNodeId = query.getEvent('selected').last()
    let selected = null

    if (currentNodeId) {
      const node = query.node(currentNodeId).get()
      const isRoot = !node.data.parent || node.data.parent === 'ROOT'
      const isTopLevelNode = query.node(currentNodeId).isTopLevelNode()
      const isDeletable = query.node(currentNodeId).isDeletable()
      
      // Allow deletion of any node, including root
      const canDelete = isDeletable
      
      selected = {
        id: currentNodeId,
        name: node.data.name || node.data.displayName || 'Component',
        settings: node.related?.settings,
        canDelete,
        isRoot,
        isTopLevelNode,
        nodeCount: Object.keys(query.getNodes()).length
      }
    }

    return { selected }
  })

  const handleDelete = () => {
    if (selected && selected.canDelete) {
      try {
        actions.delete(selected.id)
      } catch (error) {
        console.warn('Cannot delete component:', error)
        alert('Cannot delete this component.')
      }
    } else if (selected) {
      alert('This component cannot be deleted.')
    }
  }

  const handleDuplicate = () => {
    if (selected) {
      try {
        // For now, we'll just show a message. Duplication in CraftJS requires more complex logic
        alert('Duplication feature coming soon! You can copy and paste components manually for now.')
      } catch (error) {
        console.warn('Cannot duplicate component:', error)
        alert('Cannot duplicate this component.')
      }
    }
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200">
      <Card className="h-full rounded-none border-0">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <span>Properties</span>
            </div>
            {selected && selected.canDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                title="Delete component"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            {selected && !selected.canDelete && (
              <Button
                variant="ghost"
                size="sm"
                disabled
                className="text-gray-300 h-8 w-8 p-0"
                title="Cannot delete this component"
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
                  {selected.isRoot && (
                    <Badge variant="outline" className="text-xs">
                      Root
                    </Badge>
                  )}
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={handleDuplicate}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Duplicate
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Move className="h-4 w-4 mr-1" />
                    Move
                  </Button>
                </div>
                
                {/* Deletion instructions */}
                <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                  <div className="font-medium mb-1">Delete Component:</div>
                  <div className="space-y-1">
                    <div>• Click the trash icon above</div>
                    <div>• Press Delete key (not Backspace)</div>
                    <div>• Use multi-select mode for bulk deletion</div>
                    {selected.isRoot && (
                      <div className="text-orange-600 font-medium">⚠️ Deleting root will clear the entire canvas</div>
                    )}
                  </div>
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