import React from 'react';
import { useDesignTokensStore } from '../../store/design-tokens';
import { Button } from '../editor/Button';
import { Text } from '../editor/Text';
import { Container } from '../editor/Container';

export const DesignTokensDemo: React.FC = () => {
  const tokens = useDesignTokensStore();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Design Tokens Test</h2>

      {/* Container with Design Tokens */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Container with Design Tokens</h3>
        <Container
          background="@color.secondary"
          gap="@spacing.lg"
          paddingTop="@spacing.lg"
          paddingRight="@spacing.lg"
          paddingBottom="@spacing.lg"
          paddingLeft="@spacing.lg"
          radius="@radius.lg"
          useDesignTokens={true}
        >
          <Button
            text="Primary Button"
            backgroundColor="@color.primary"
            color="white"
            fontSize="@typography.base"
            borderRadius="@radius.md"
            useDesignTokens={true}
          />
          <Text
            text="This text uses design tokens"
            color="@color.text"
            fontSize="@typography.lg"
            useDesignTokens={true}
          />
          <Button
            text="Accent Button"
            backgroundColor="@color.accent"
            color="white"
            fontSize="@typography.sm"
            borderRadius="@radius.full"
            useDesignTokens={true}
          />
        </Container>
      </div>

      {/* Token Controls */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Test Token Changes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Primary Color:</label>
            <input
              type="color"
              value={tokens.tokens.colors.light.primary?.value || '#3b82f6'}
              onChange={(e) => tokens.updateColorToken('primary', { 
                name: 'Primary',
                value: e.target.value,
                category: 'primary'
              })}
              className="w-full h-10 rounded border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Secondary Color:</label>
            <input
              type="color"
              value={tokens.tokens.colors.light.secondary?.value || '#64748b'}
              onChange={(e) => tokens.updateColorToken('secondary', { 
                name: 'Secondary',
                value: e.target.value,
                category: 'secondary'
              })}
              className="w-full h-10 rounded border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Large Spacing:</label>
            <input
              type="range"
              min="8"
              max="40"
              value={parseInt(tokens.tokens.spacing.lg.value.replace('px', ''))}
              onChange={(e) => {
                const pxValue = parseInt(e.target.value);
                tokens.updateSpacingToken('lg', {
                  name: 'Large',
                  value: `${pxValue}px`,
                  rem: pxValue / 16,
                  px: pxValue
                });
              }}
              className="w-full"
            />
            <span className="text-sm text-gray-500">{tokens.tokens.spacing.lg.value}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Change the values above and watch the components update in real-time!
        </p>
      </div>
    </div>
  );
};
