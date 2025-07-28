import React, { useState } from 'react';
import { useDesignTokensStore, type ColorToken } from '@/store/design-tokens';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Palette } from 'lucide-react';

export const ColorTokensSection: React.FC = () => {
  const { tokens, currentTheme, updateColorToken } = useDesignTokensStore();
  const [editingToken, setEditingToken] = useState<string | null>(null);
  const [newTokenName, setNewTokenName] = useState('');
  const [newTokenValue, setNewTokenValue] = useState('#000000');
  const [isAddingToken, setIsAddingToken] = useState(false);

  const currentColors = currentTheme === 'dark' ? tokens.colors.dark : tokens.colors.light;

  const handleUpdateToken = (key: string, updates: Partial<ColorToken>) => {
    const existingToken = currentColors[key];
    if (existingToken) {
      updateColorToken(key, { ...existingToken, ...updates }, currentTheme === 'dark' ? 'dark' : 'light');
    }
  };

  const handleAddToken = () => {
    if (newTokenName && newTokenValue) {
      const newToken: ColorToken = {
        name: newTokenName,
        value: newTokenValue,
        category: 'custom'
      };
      updateColorToken(newTokenName.toLowerCase().replace(/\s+/g, ''), newToken, currentTheme === 'dark' ? 'dark' : 'light');
      setNewTokenName('');
      setNewTokenValue('#000000');
      setIsAddingToken(false);
    }
  };

  const getCategoryColor = (category: ColorToken['category']) => {
    switch (category) {
      case 'primary':
        return 'bg-blue-100 text-blue-800';
      case 'secondary':
        return 'bg-gray-100 text-gray-800';
      case 'neutral':
        return 'bg-slate-100 text-slate-800';
      case 'semantic':
        return 'bg-green-100 text-green-800';
      case 'custom':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Theme indicator */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="capitalize">
          {currentTheme} Theme Colors
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingToken(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Color
        </Button>
      </div>

      {/* Add new token form */}
      {isAddingToken && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Add New Color Token</CardTitle>
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
                <Label htmlFor="tokenValue">Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="tokenValue"
                    type="color"
                    value={newTokenValue}
                    onChange={(e) => setNewTokenValue(e.target.value)}
                    className="w-12 h-9 p-1 border rounded"
                  />
                  <Input
                    value={newTokenValue}
                    onChange={(e) => setNewTokenValue(e.target.value)}
                    placeholder="#000000"
                  />
                </div>
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
                  setNewTokenValue('#000000');
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Color tokens grid */}
      <div className="grid gap-3">
        {Object.entries(currentColors).map(([key, token]) => (
          <Card key={key} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Color preview */}
                <div
                  className="w-8 h-8 rounded-md border border-gray-200 shadow-sm"
                  style={{ backgroundColor: token.value }}
                />
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{token.name}</span>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${getCategoryColor(token.category)}`}
                    >
                      {token.category}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    @color.{key}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {editingToken === key ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={token.value}
                      onChange={(e) => handleUpdateToken(key, { value: e.target.value })}
                      className="w-10 h-8 p-1 border rounded"
                    />
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
                    <span className="text-xs font-mono text-gray-500">
                      {token.value}
                    </span>
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
            <Palette className="w-4 h-4" />
            Usage in Components
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs">
          <div className="bg-gray-50 p-3 rounded font-mono">
            <div className="text-gray-600">// Use tokens in your components:</div>
            <div className="mt-1">
              <span className="text-blue-600">backgroundColor:</span> <span className="text-green-600">'@color.primary'</span>
            </div>
            <div>
              <span className="text-blue-600">color:</span> <span className="text-green-600">'@color.text'</span>
            </div>
            <div>
              <span className="text-blue-600">borderColor:</span> <span className="text-green-600">'@color.border'</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
