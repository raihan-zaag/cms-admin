import React from 'react';
import { useNode } from '@craftjs/core';
import { SpacingSettings } from './SpacingSettings';
import { useDesignTokensStore } from '../../../store/design-tokens';

interface TextProps {
  text?: string;
  fontSize?: number | string; // Allow both number and string for tokens
  fontWeight?: string;
  fontFamily?: string;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  color?: string;
  backgroundColor?: string;
  textAlign?: string;
  width?: string;
  height?: string;
  minWidth?: number;
  minHeight?: number;
  useDesignTokens?: boolean;
  useGlobalColor?: boolean; // NEW: Toggle for global vs individual settings
}

export const TextSettings: React.FC = () => {
  const {
    actions: { setProp },
    text,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    backgroundColor,
    textAlign,
    minWidth,
    minHeight,
    useDesignTokens,
    useGlobalColor,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
    fontWeight: node.data.props.fontWeight,
    fontFamily: node.data.props.fontFamily,
    color: node.data.props.color,
    backgroundColor: node.data.props.backgroundColor,
    textAlign: node.data.props.textAlign,
    minWidth: node.data.props.minWidth,
    minHeight: node.data.props.minHeight,
    useDesignTokens: node.data.props.useDesignTokens,
    useGlobalColor: node.data.props.useGlobalColor,
  }));

  const tokens = useDesignTokensStore();

  return (
    <div className="space-y-4">
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={useDesignTokens}
            onChange={(e) =>
              setProp((props: TextProps) => (props.useDesignTokens = e.target.checked))
            }
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <span className="text-sm font-medium text-gray-700">Use Design Tokens</span>
        </label>
      </div>

      <div className="border-t pt-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={useGlobalColor}
            onChange={(e) =>
              setProp((props: TextProps) => (props.useGlobalColor = e.target.checked))
            }
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <span className="text-sm font-medium text-gray-700">Use Global Settings</span>
        </label>
        <p className="text-xs text-gray-500 mt-1">
          {useGlobalColor 
            ? "Text inherits color and font from global design tokens" 
            : "Text uses its own individual color and font settings"
          }
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Text
        </label>
        <textarea
          value={text}
          onChange={(e) =>
            setProp((props: TextProps) => (props.text = e.target.value))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Font Size {useDesignTokens && '(or Token)'}
        </label>
        {useDesignTokens ? (
          <select
            value={fontSize}
            onChange={(e) =>
              setProp((props: TextProps) => (props.fontSize = e.target.value))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="@typography.xs">Extra Small (xs)</option>
            <option value="@typography.sm">Small (sm)</option>
            <option value="@typography.base">Base (base)</option>
            <option value="@typography.lg">Large (lg)</option>
            <option value="@typography.xl">Extra Large (xl)</option>
            <option value="@typography.2xl">2X Large (2xl)</option>
            {Object.keys(tokens.tokens.typography.fontSizes).map(sizeKey => (
              <option key={sizeKey} value={`@typography.${sizeKey}`}>
                {sizeKey} Token
              </option>
            ))}
          </select>
        ) : (
          <div>
            <input
              type="range"
              min="10"
              max="72"
              value={typeof fontSize === 'number' ? fontSize : 16}
              onChange={(e) =>
                setProp((props: TextProps) => (props.fontSize = parseInt(e.target.value)))
              }
              className="mt-1 block w-full"
            />
            <span className="text-sm text-gray-500">{typeof fontSize === 'number' ? fontSize : 16}px</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Font Family {useDesignTokens && '(or Token)'}
        </label>
        {useDesignTokens ? (
          <select
            value={fontFamily}
            onChange={(e) =>
              setProp((props: TextProps) => (props.fontFamily = e.target.value))
            }
            disabled={useGlobalColor}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
              useGlobalColor ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
            }`}
          >
            <option value="@font.primary">Primary Font</option>
            <option value="@font.secondary">Secondary Font</option>
            <option value="@font.mono">Monospace Font</option>
          </select>
        ) : (
          <select
            value={fontFamily || 'inherit'}
            onChange={(e) =>
              setProp((props: TextProps) => (props.fontFamily = e.target.value))
            }
            disabled={useGlobalColor}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
              useGlobalColor ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
            }`}
          >
            <option value="inherit">Inherit</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Courier New', monospace">Courier New</option>
          </select>
        )}
        {useGlobalColor && (
          <p className="text-xs text-gray-500 mt-1">
            Font family is inherited from global settings
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Font Weight
        </label>
        <select
          value={fontWeight}
          onChange={(e) =>
            setProp((props: TextProps) => (props.fontWeight = e.target.value))
          }
          disabled={useGlobalColor}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
            useGlobalColor ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
          }`}
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Lighter</option>
          <option value="bolder">Bolder</option>
        </select>
        {useGlobalColor && (
          <p className="text-xs text-gray-500 mt-1">
            Font weight is inherited from global settings
          </p>
        )}
      </div>

      {!useGlobalColor && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Text Color {useDesignTokens && '(or Token)'}
          </label>
          {useDesignTokens ? (
            <select
              value={color}
              onChange={(e) =>
                setProp((props: TextProps) => (props.color = e.target.value))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="@color.text">Text Color</option>
              <option value="@color.primary">Primary Color</option>
              <option value="@color.secondary">Secondary Color</option>
              <option value="@color.success">Success Color</option>
              <option value="@color.warning">Warning Color</option>
              <option value="@color.error">Error Color</option>
              <option value="@color.accent">Accent Color</option>
              <option value="@color.muted">Muted Color</option>
              {Object.keys(tokens.tokens.colors.light).map(colorKey => (
                <option key={colorKey} value={`@color.${colorKey}`}>
                  {colorKey} Token
                </option>
              ))}
            </select>
          ) : (
            <input
              type="color"
              value={color}
              onChange={(e) =>
                setProp((props: TextProps) => (props.color = e.target.value))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Background Color {useDesignTokens && '(or Token)'}
        </label>
        {useDesignTokens ? (
          <select
            value={backgroundColor}
            onChange={(e) =>
              setProp((props: TextProps) => (props.backgroundColor = e.target.value))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="transparent">Transparent</option>
            <option value="@color.background">Background Color</option>
            <option value="@color.primary">Primary Color</option>
            <option value="@color.secondary">Secondary Color</option>
            <option value="@color.accent">Accent Color</option>
            <option value="@color.muted">Muted Color</option>
            {Object.keys(tokens.tokens.colors.light).map(colorKey => (
              <option key={colorKey} value={`@color.${colorKey}`}>
                {colorKey} Token
              </option>
            ))}
          </select>
        ) : (
          <input
            type="color"
            value={backgroundColor === 'transparent' ? '#ffffff' : backgroundColor}
            onChange={(e) =>
              setProp((props: TextProps) => (props.backgroundColor = e.target.value))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        )}
        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={backgroundColor === 'transparent'}
            onChange={(e) =>
              setProp((props: TextProps) => (props.backgroundColor = e.target.checked ? 'transparent' : '#ffffff'))
            }
            className="mr-2"
          />
          <span className="text-sm text-gray-600">Transparent background</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Text Align
        </label>
        <select
          value={textAlign}
          onChange={(e) =>
            setProp((props: TextProps) => (props.textAlign = e.target.value))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Min Width
        </label>
        <input
          type="number"
          value={minWidth}
          onChange={(e) =>
            setProp((props: TextProps) => (props.minWidth = parseInt(e.target.value)))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Min Height
        </label>
        <input
          type="number"
          value={minHeight}
          onChange={(e) =>
            setProp((props: TextProps) => (props.minHeight = parseInt(e.target.value)))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <SpacingSettings />
    </div>
  );
};
