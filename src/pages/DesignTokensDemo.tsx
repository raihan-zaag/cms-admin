import React from 'react';
import { useDesignTokensStore } from '@/store/design-tokens';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const DesignTokensDemo: React.FC = () => {
  const { tokens, currentTheme, setTheme } = useDesignTokensStore();
  const { processToken } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Design Tokens Demo
          </h1>
          <p className="text-gray-600">
            This demo shows how design tokens work in real-time. Try changing the theme or editing tokens in the Design Tokens panel.
          </p>
        </div>

        {/* Theme Switcher */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Theme Switcher</CardTitle>
            <CardDescription>
              Switch between light and dark themes to see tokens in action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button
                variant={currentTheme === 'light' ? 'default' : 'outline'}
                onClick={() => setTheme('light')}
              >
                Light
              </Button>
              <Button
                variant={currentTheme === 'dark' ? 'default' : 'outline'}
                onClick={() => setTheme('dark')}
              >
                Dark
              </Button>
              <Button
                variant={currentTheme === 'auto' ? 'default' : 'outline'}
                onClick={() => setTheme('auto')}
              >
                Auto
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Color Tokens Demo */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Color Tokens</CardTitle>
            <CardDescription>
              These colors use design tokens and update automatically
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(currentTheme === 'dark' ? tokens.colors.dark : tokens.colors.light).slice(0, 8).map(([key, token]) => (
                <div key={key} className="text-center">
                  <div
                    className="w-16 h-16 rounded-lg border-2 border-gray-200 mx-auto mb-2"
                    style={{ backgroundColor: processToken(`@color.${key}`) }}
                  />
                  <div className="text-sm font-medium">{token.name}</div>
                  <div className="text-xs text-gray-500 font-mono">@color.{key}</div>
                  <div className="text-xs text-gray-400">{token.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Typography Tokens Demo */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Typography Tokens</CardTitle>
            <CardDescription>
              Different text sizes using typography tokens
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(tokens.typography.fontSizes).slice(0, 6).map(([key]) => (
              <div key={key} className="flex items-center justify-between">
                <div 
                  style={{ 
                    fontSize: processToken(`@typography.${key}`),
                    lineHeight: processToken(`@typography.${key}.lineHeight`),
                    fontWeight: processToken(`@typography.${key}.fontWeight`)
                  }}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
                <Badge variant="outline" className="ml-4 font-mono">
                  @typography.{key}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Spacing Tokens Demo */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Spacing Tokens</CardTitle>
            <CardDescription>
              Visual representation of spacing tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(tokens.spacing).slice(0, 8).map(([key, token]) => (
                <div key={key} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-mono">@spacing.{key}</div>
                  <div 
                    className="bg-blue-200 h-6 border border-blue-300 rounded"
                    style={{ width: processToken(`@spacing.${key}`) }}
                  />
                  <div className="text-sm text-gray-500">{token.value} ({token.px}px)</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Components with Tokens Demo */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Components Using Tokens</CardTitle>
            <CardDescription>
              Example components that automatically adapt to token changes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Button with token-based styling */}
            <div className="p-4 border rounded-lg">
              <button
                className="px-4 py-2 rounded font-medium transition-colors"
                style={{
                  backgroundColor: processToken('@color.primary'),
                  color: processToken('@color.background'),
                  borderRadius: processToken('@radius.md'),
                  fontSize: processToken('@typography.base'),
                  padding: `${processToken('@spacing.2')} ${processToken('@spacing.4')}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = processToken('@color.primaryHover');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = processToken('@color.primary');
                }}
              >
                Token-based Button
              </button>
              <div className="mt-2 text-xs text-gray-500 font-mono">
                background: @color.primary, radius: @radius.md, padding: @spacing.2 @spacing.4
              </div>
            </div>

            {/* Card with token-based styling */}
            <div
              className="rounded border"
              style={{
                backgroundColor: processToken('@color.surface'),
                borderColor: processToken('@color.border'),
                borderRadius: processToken('@radius.lg'),
                padding: processToken('@spacing.6'),
                color: processToken('@color.text'),
              }}
            >
              <h3 
                style={{ 
                  fontSize: processToken('@typography.lg'),
                  fontWeight: processToken('@typography.lg.fontWeight'),
                  marginBottom: processToken('@spacing.2')
                }}
              >
                Token-based Card
              </h3>
              <p 
                style={{ 
                  fontSize: processToken('@typography.sm'),
                  color: processToken('@color.textMuted'),
                  marginBottom: processToken('@spacing.4')
                }}
              >
                This card uses design tokens for colors, spacing, and typography.
              </p>
              <div className="text-xs text-gray-500 font-mono">
                background: @color.surface, border: @color.border, padding: @spacing.6
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CSS Generation Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Generated CSS Custom Properties</CardTitle>
            <CardDescription>
              These CSS variables are automatically generated from your tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
              <pre>{`/* Auto-generated CSS Custom Properties */
:root {
  --color-primary: ${processToken('@color.primary')};
  --color-background: ${processToken('@color.background')};
  --spacing-4: ${processToken('@spacing.4')};
  --radius-md: ${processToken('@radius.md')};
  --font-size-base: ${processToken('@typography.base')};
  /* ... more variables ... */
}`}</pre>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              You can use these CSS custom properties in your stylesheets or access them via the token processor API.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
