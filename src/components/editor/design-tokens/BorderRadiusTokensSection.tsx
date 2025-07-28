import React, { useState } from 'react';
import { useDesignTokensStore, type BorderRadiusToken } from '@/store/design-tokens';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Box, Plus, Edit2 } from 'lucide-react';

export const BorderRadiusTokensSection: React.FC = () => {
  const { tokens, updateBorderRadiusToken } = useDesignTokensStore();
  const [editingToken, setEditingToken] = useState<string | null>(null);
  const [newTokenName, setNewTokenName] = useState('');
  const [newTokenValue, setNewTokenValue] = useState('0.25rem');
  const [isAddingToken, setIsAddingToken] = useState(false);

  const handleUpdateToken = (key: string, updates: Partial<BorderRadiusToken>) => {
    const existingToken = tokens.borderRadius[key];
    if (existingToken) {
      updateBorderRadiusToken(key, { ...existingToken, ...updates });
    }
  };

  const handleAddToken = () => {
    if (newTokenName && newTokenValue) {
      const newToken: BorderRadiusToken = {
        name: newTokenName,
        value: newTokenValue
      };
      updateBorderRadiusToken(newTokenName.toLowerCase().replace(/\s+/g, ''), newToken);
      setNewTokenName('');
      setNewTokenValue('0.25rem');
      setIsAddingToken(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Border Radius Tokens</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingToken(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Radius
        </Button>
      </div>

      {/* Add new token form */}
      {isAddingToken && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Add New Border Radius Token</CardTitle>
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
                  placeholder="0.25rem or 4px"
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
                  setNewTokenValue('0.25rem');
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Border radius tokens grid */}
      <div className="space-y-3">
        {Object.entries(tokens.borderRadius).map(([key, token]) => (
          <Card key={key} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Visual border radius representation */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-12 h-12 bg-blue-200 border-2 border-blue-300"
                    style={{
                      borderRadius: token.value === '9999px' ? '50%' : token.value
                    }}
                  />
                </div>
                
                <div>
                  <div className="font-medium text-sm">{token.name}</div>
                  <div className="text-xs text-gray-500 font-mono">
                    @radius.{key}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {editingToken === key ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={token.value}
                      onChange={(e) => handleUpdateToken(key, { value: e.target.value })}
                      className="w-24 text-xs font-mono"
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
        ))}
      </div>

      {/* Usage example */}
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Box className="w-4 h-4" />
            Usage in Components
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs">
          <div className="bg-gray-50 p-3 rounded font-mono">
            <div className="text-gray-600">// Use border radius tokens:</div>
            <div className="mt-1">
              <span className="text-blue-600">borderRadius:</span> <span className="text-green-600">'@radius.md'</span>
            </div>
            <div>
              <span className="text-blue-600">borderTopLeftRadius:</span> <span className="text-green-600">'@radius.lg'</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
