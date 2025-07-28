import React, { useState } from 'react';
import { useDesignTokensStore, type SpacingToken } from '@/store/design-tokens';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Move, Plus, Edit2 } from 'lucide-react';

export const SpacingTokensSection: React.FC = () => {
  const { tokens, updateSpacingToken } = useDesignTokensStore();
  const [editingToken, setEditingToken] = useState<string | null>(null);
  const [newTokenName, setNewTokenName] = useState('');
  const [newTokenValue, setNewTokenValue] = useState('1rem');
  const [isAddingToken, setIsAddingToken] = useState(false);

  const handleUpdateToken = (key: string, updates: Partial<SpacingToken>) => {
    const existingToken = tokens.spacing[key];
    if (existingToken) {
      // Calculate rem and px values from the new value
      let rem = 0;
      let px = 0;
      const value = updates.value || existingToken.value;
      
      if (value.includes('rem')) {
        rem = parseFloat(value);
        px = rem * 16;
      } else if (value.includes('px')) {
        px = parseInt(value);
        rem = px / 16;
      }

      updateSpacingToken(key, { 
        ...existingToken, 
        ...updates,
        rem,
        px
      });
    }
  };

  const handleAddToken = () => {
    if (newTokenName && newTokenValue) {
      let rem = 0;
      let px = 0;
      
      if (newTokenValue.includes('rem')) {
        rem = parseFloat(newTokenValue);
        px = rem * 16;
      } else if (newTokenValue.includes('px')) {
        px = parseInt(newTokenValue);
        rem = px / 16;
      }

      const newToken: SpacingToken = {
        name: newTokenName,
        value: newTokenValue,
        rem,
        px
      };
      
      updateSpacingToken(newTokenName.toLowerCase().replace(/\s+/g, ''), newToken);
      setNewTokenName('');
      setNewTokenValue('1rem');
      setIsAddingToken(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Spacing Tokens</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingToken(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Spacing
        </Button>
      </div>

      {/* Add new token form */}
      {isAddingToken && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Add New Spacing Token</CardTitle>
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
                  placeholder="1rem or 16px"
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
                  setNewTokenValue('1rem');
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Spacing tokens grid */}
      <div className="space-y-3">
        {Object.entries(tokens.spacing).map(([key, token]) => (
          <Card key={key} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Visual spacing representation */}
                <div className="flex items-center gap-2">
                  <div
                    className="bg-blue-200 border border-blue-300 rounded"
                    style={{
                      width: `${Math.min(token.px, 64)}px`,
                      height: '24px',
                      minWidth: '8px'
                    }}
                  />
                  <div className="text-xs text-gray-500">
                    {token.px > 64 ? `${token.px}px` : ''}
                  </div>
                </div>
                
                <div>
                  <div className="font-medium text-sm">{token.name}</div>
                  <div className="text-xs text-gray-500 font-mono">
                    @spacing.{key}
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
                    <div className="text-xs text-gray-500 text-right">
                      <div className="font-mono">{token.value}</div>
                      <div>{token.rem}rem • {token.px}px</div>
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
            <Move className="w-4 h-4" />
            Usage in Components
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs">
          <div className="bg-gray-50 p-3 rounded font-mono">
            <div className="text-gray-600">// Use spacing tokens:</div>
            <div className="mt-1">
              <span className="text-blue-600">padding:</span> <span className="text-green-600">'@spacing.4'</span>
            </div>
            <div>
              <span className="text-blue-600">margin:</span> <span className="text-green-600">'@spacing.2 @spacing.4'</span>
            </div>
            <div>
              <span className="text-blue-600">gap:</span> <span className="text-green-600">'@spacing.6'</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
