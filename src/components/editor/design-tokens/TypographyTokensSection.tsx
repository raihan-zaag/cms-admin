import React, { useState } from 'react';
import { useDesignTokensStore, type TypographyToken } from '@/store/design-tokens';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Type, Plus, Edit2 } from 'lucide-react';

export const TypographyTokensSection: React.FC = () => {
  const { tokens, updateTypographyToken } = useDesignTokensStore();
  const [editingToken, setEditingToken] = useState<string | null>(null);
  const [newTokenName, setNewTokenName] = useState('');
  const [newTokenData, setNewTokenData] = useState({
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: '400',
    letterSpacing: ''
  });
  const [isAddingToken, setIsAddingToken] = useState(false);

  const handleUpdateToken = (key: string, updates: Partial<TypographyToken>) => {
    const existingToken = tokens.typography.fontSizes[key];
    if (existingToken) {
      updateTypographyToken(key, { ...existingToken, ...updates });
    }
  };

  const handleAddToken = () => {
    if (newTokenName && newTokenData.fontSize) {
      const newToken: TypographyToken = {
        name: newTokenName,
        fontSize: newTokenData.fontSize,
        lineHeight: newTokenData.lineHeight,
        fontWeight: newTokenData.fontWeight,
        letterSpacing: newTokenData.letterSpacing || undefined
      };
      updateTypographyToken(newTokenName.toLowerCase().replace(/\s+/g, ''), newToken);
      setNewTokenName('');
      setNewTokenData({
        fontSize: '1rem',
        lineHeight: '1.5rem',
        fontWeight: '400',
        letterSpacing: ''
      });
      setIsAddingToken(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Typography Tokens</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingToken(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Size
        </Button>
      </div>

      {/* Font Family Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Font Families</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Primary Font</Label>
            <Input
              value={tokens.typography.fontFamily.primary}
              className="font-mono text-xs"
              readOnly
            />
          </div>
          <div>
            <Label>Secondary Font</Label>
            <Input
              value={tokens.typography.fontFamily.secondary}
              className="font-mono text-xs"
              readOnly
            />
          </div>
          <div>
            <Label>Monospace Font</Label>
            <Input
              value={tokens.typography.fontFamily.mono}
              className="font-mono text-xs"
              readOnly
            />
          </div>
        </CardContent>
      </Card>

      {/* Add new token form */}
      {isAddingToken && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Add New Typography Token</CardTitle>
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
                <Label htmlFor="fontSize">Font Size</Label>
                <Input
                  id="fontSize"
                  placeholder="1rem"
                  value={newTokenData.fontSize}
                  onChange={(e) => setNewTokenData(prev => ({ ...prev, fontSize: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="lineHeight">Line Height</Label>
                <Input
                  id="lineHeight"
                  placeholder="1.5rem"
                  value={newTokenData.lineHeight}
                  onChange={(e) => setNewTokenData(prev => ({ ...prev, lineHeight: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="fontWeight">Font Weight</Label>
                <Input
                  id="fontWeight"
                  placeholder="400"
                  value={newTokenData.fontWeight}
                  onChange={(e) => setNewTokenData(prev => ({ ...prev, fontWeight: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="letterSpacing">Letter Spacing</Label>
                <Input
                  id="letterSpacing"
                  placeholder="0.025em (optional)"
                  value={newTokenData.letterSpacing}
                  onChange={(e) => setNewTokenData(prev => ({ ...prev, letterSpacing: e.target.value }))}
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
                    fontSize: '1rem',
                    lineHeight: '1.5rem',
                    fontWeight: '400',
                    letterSpacing: ''
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Typography tokens */}
      <div className="space-y-3">
        {Object.entries(tokens.typography.fontSizes).map(([key, token]) => (
          <Card key={key} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="min-w-0 flex-1"
                  style={{
                    fontSize: token.fontSize,
                    lineHeight: token.lineHeight,
                    fontWeight: token.fontWeight,
                    letterSpacing: token.letterSpacing
                  }}
                >
                  <div className="font-medium text-sm mb-1">{token.name}</div>
                  <div className="text-gray-600 truncate">
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <div className="text-xs text-gray-500 font-mono mt-1">
                    @typography.{key}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                {editingToken === key ? (
                  <div className="flex items-center gap-2">
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      <Input
                        value={token.fontSize}
                        onChange={(e) => handleUpdateToken(key, { fontSize: e.target.value })}
                        className="w-16 h-6 text-xs"
                        placeholder="Size"
                      />
                      <Input
                        value={token.fontWeight}
                        onChange={(e) => handleUpdateToken(key, { fontWeight: e.target.value })}
                        className="w-16 h-6 text-xs"
                        placeholder="Weight"
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
                      <div>{token.fontSize} / {token.lineHeight}</div>
                      <div>Weight: {token.fontWeight}</div>
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
            <Type className="w-4 h-4" />
            Usage in Components
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs">
          <div className="bg-gray-50 p-3 rounded font-mono">
            <div className="text-gray-600">// Use typography tokens:</div>
            <div className="mt-1">
              <span className="text-blue-600">fontSize:</span> <span className="text-green-600">'@typography.lg'</span>
            </div>
            <div>
              <span className="text-blue-600">fontFamily:</span> <span className="text-green-600">'@font.primary'</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
