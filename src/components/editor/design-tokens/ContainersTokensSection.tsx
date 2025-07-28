import React, { useState } from 'react';
import { useDesignTokensStore, type ContainerToken } from '@/store/design-tokens';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container, Plus, Edit2 } from 'lucide-react';

export const ContainersTokensSection: React.FC = () => {
  const { tokens, updateContainerToken } = useDesignTokensStore();
  const [editingToken, setEditingToken] = useState<string | null>(null);
  const [newTokenName, setNewTokenName] = useState('');
  const [newTokenData, setNewTokenData] = useState({
    maxWidth: '1200px',
    padding: '2rem'
  });
  const [isAddingToken, setIsAddingToken] = useState(false);

  const handleUpdateToken = (key: string, updates: Partial<ContainerToken>) => {
    const existingToken = tokens.containers[key];
    if (existingToken) {
      updateContainerToken(key, { ...existingToken, ...updates });
    }
  };

  const handleAddToken = () => {
    if (newTokenName && newTokenData.maxWidth) {
      const newToken: ContainerToken = {
        name: newTokenName,
        maxWidth: newTokenData.maxWidth,
        padding: newTokenData.padding
      };
      updateContainerToken(newTokenName.toLowerCase().replace(/\s+/g, ''), newToken);
      setNewTokenName('');
      setNewTokenData({
        maxWidth: '1200px',
        padding: '2rem'
      });
      setIsAddingToken(false);
    }
  };

  const getContainerWidth = (maxWidth: string) => {
    if (maxWidth === '100%') return 100;
    const px = parseInt(maxWidth);
    return Math.min(px / 15, 100); // Scale for visual representation
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Container Tokens</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingToken(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Container
        </Button>
      </div>

      {/* Add new token form */}
      {isAddingToken && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Add New Container Token</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="tokenName">Name</Label>
              <Input
                id="tokenName"
                placeholder="Token name"
                value={newTokenName}
                onChange={(e) => setNewTokenName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="maxWidth">Max Width</Label>
                <Input
                  id="maxWidth"
                  placeholder="1200px"
                  value={newTokenData.maxWidth}
                  onChange={(e) => setNewTokenData(prev => ({ ...prev, maxWidth: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="padding">Padding</Label>
                <Input
                  id="padding"
                  placeholder="2rem"
                  value={newTokenData.padding}
                  onChange={(e) => setNewTokenData(prev => ({ ...prev, padding: e.target.value }))}
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
                  setNewTokenData({
                    maxWidth: '1200px',
                    padding: '2rem'
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Container tokens grid */}
      <div className="space-y-3">
        {Object.entries(tokens.containers).map(([key, token]) => (
          <Card key={key} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Visual container representation */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div
                      className="bg-blue-100 border-2 border-blue-300 rounded h-8"
                      style={{
                        width: `${getContainerWidth(token.maxWidth)}px`,
                        minWidth: '40px'
                      }}
                    />
                    <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded m-1" />
                  </div>
                </div>
                
                <div>
                  <div className="font-medium text-sm">{token.name}</div>
                  <div className="text-xs text-gray-500 font-mono">
                    @container.{key}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {editingToken === key ? (
                  <div className="flex items-center gap-2">
                    <div className="grid grid-cols-1 gap-1">
                      <Input
                        value={token.maxWidth}
                        onChange={(e) => handleUpdateToken(key, { maxWidth: e.target.value })}
                        className="w-20 h-6 text-xs font-mono"
                        placeholder="Max Width"
                      />
                      <Input
                        value={token.padding}
                        onChange={(e) => handleUpdateToken(key, { padding: e.target.value })}
                        className="w-20 h-6 text-xs font-mono"
                        placeholder="Padding"
                      />
                    </div>
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
                      <div className="font-mono">{token.maxWidth}</div>
                      <div className="font-mono">padding: {token.padding}</div>
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
            <Container className="w-4 h-4" />
            Usage in Components
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs">
          <div className="bg-gray-50 p-3 rounded font-mono">
            <div className="text-gray-600">// Use container tokens:</div>
            <div className="mt-1">
              <span className="text-blue-600">maxWidth:</span> <span className="text-green-600">'@container.lg'</span>
            </div>
            <div>
              <span className="text-blue-600">padding:</span> <span className="text-green-600">'@container.lg.padding'</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
