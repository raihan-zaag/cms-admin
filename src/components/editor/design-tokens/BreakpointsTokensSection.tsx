import React, { useState } from 'react';
import { useDesignTokensStore, type BreakpointToken } from '@/store/design-tokens';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Plus, Edit2 } from 'lucide-react';

export const BreakpointsTokensSection: React.FC = () => {
  const { tokens, updateBreakpointToken } = useDesignTokensStore();
  const [editingToken, setEditingToken] = useState<string | null>(null);
  const [newTokenName, setNewTokenName] = useState('');
  const [newTokenValue, setNewTokenValue] = useState('768px');
  const [isAddingToken, setIsAddingToken] = useState(false);

  const handleUpdateToken = (key: string, updates: Partial<BreakpointToken>) => {
    const existingToken = tokens.breakpoints[key];
    if (existingToken) {
      // Calculate px value from the new value
      let px = 0;
      const value = updates.value || existingToken.value;
      
      if (value.includes('px')) {
        px = parseInt(value);
      }

      updateBreakpointToken(key, { 
        ...existingToken, 
        ...updates,
        px
      });
    }
  };

  const handleAddToken = () => {
    if (newTokenName && newTokenValue) {
      let px = 0;
      
      if (newTokenValue.includes('px')) {
        px = parseInt(newTokenValue);
      }

      const newToken: BreakpointToken = {
        name: newTokenName,
        value: newTokenValue,
        px
      };
      
      updateBreakpointToken(newTokenName.toLowerCase().replace(/\s+/g, ''), newToken);
      setNewTokenName('');
      setNewTokenValue('768px');
      setIsAddingToken(false);
    }
  };

  const getDeviceType = (px: number) => {
    if (px < 640) return { type: 'Mobile', color: 'bg-green-100 text-green-800' };
    if (px < 1024) return { type: 'Tablet', color: 'bg-blue-100 text-blue-800' };
    return { type: 'Desktop', color: 'bg-purple-100 text-purple-800' };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Breakpoint Tokens</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingToken(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Breakpoint
        </Button>
      </div>

      {/* Add new token form */}
      {isAddingToken && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Add New Breakpoint Token</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="tokenName">Name</Label>
                <Input
                  id="tokenName"
                  placeholder="Token name"
                  value={newTokenName}
                  onChange={(e) => setNewTokenName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="tokenValue">Value</Label>
                <Input
                  id="tokenValue"
                  placeholder="768px"
                  value={newTokenValue}
                  onChange={(e) => setNewTokenValue(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAddToken}>
                Add Token
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsAddingToken(false);
                  setNewTokenName('');
                  setNewTokenValue('768px');
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Breakpoint tokens grid */}
      <div className="space-y-3">
        {Object.entries(tokens.breakpoints).map(([key, token]) => {
          const deviceInfo = getDeviceType(token.px);
          
          return (
            <Card key={key} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Visual breakpoint representation */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div
                        className="bg-gray-200 border border-gray-300 rounded h-8"
                        style={{
                          width: `${Math.min(token.px / 10, 80)}px`,
                          minWidth: '20px'
                        }}
                      />
                      <div className="absolute -bottom-1 left-0 text-xs text-gray-500">
                        {token.px}px
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{token.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${deviceInfo.color}`}>
                        {deviceInfo.type}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      @breakpoint.{key}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {editingToken === key ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={token.value}
                        onChange={(e) => handleUpdateToken(key, { value: e.target.value })}
                        className="w-20 text-xs font-mono"
                      />
                      <Button
                        size="sm"
                        onClick={() => setEditingToken(null)}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="text-xs text-gray-500 font-mono">
                        {token.value}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingToken(key)}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Usage example */}
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Usage in Components
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs">
          <div className="bg-gray-50 p-3 rounded font-mono">
            <div className="text-gray-600">// Use breakpoint tokens:</div>
            <div className="mt-1">
              <span className="text-blue-600">@media (min-width:</span> <span className="text-green-600">@breakpoint.md</span><span className="text-blue-600">)</span>
            </div>
            <div>
              <span className="text-blue-600">@media (max-width:</span> <span className="text-green-600">@breakpoint.lg</span><span className="text-blue-600">)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
