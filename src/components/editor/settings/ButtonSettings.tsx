import React from 'react';
import { useNode } from '@craftjs/core';
import { SpacingSettings } from './SpacingSettings';

interface ButtonProps {
  text?: string;
  backgroundColor?: string;
  isTransparent?: boolean;
  color?: string;
  borderRadius?: number;
  padding?: number;
  fontSize?: number;
  fontWeight?: string;
  width?: string;
  height?: string;
  minWidth?: number;
  minHeight?: number;
  onClick?: () => void;
}

export const ButtonSettings: React.FC = () => {
  const {
    actions: { setProp },
    text,
    backgroundColor,
    isTransparent,
    color,
    borderRadius,
    padding,
    fontSize,
    fontWeight,
    minWidth,
    minHeight,
  } = useNode((node) => ({
    text: node.data.props.text,
    backgroundColor: node.data.props.backgroundColor,
    isTransparent: node.data.props.isTransparent,
    color: node.data.props.color,
    borderRadius: node.data.props.borderRadius,
    padding: node.data.props.padding,
    fontSize: node.data.props.fontSize,
    fontWeight: node.data.props.fontWeight,
    minWidth: node.data.props.minWidth,
    minHeight: node.data.props.minHeight,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Text
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) =>
            setProp((props: ButtonProps) => (props.text = e.target.value))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Background Color
        </label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) =>
            setProp((props: ButtonProps) => (props.backgroundColor = e.target.value))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          disabled={isTransparent}
        />
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isTransparent}
            onChange={(e) =>
              setProp((props: ButtonProps) => (props.isTransparent = e.target.checked))
            }
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <span className="text-sm font-medium text-gray-700">Transparent Background</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Text Color
        </label>
        <input
          type="color"
          value={color}
          onChange={(e) =>
            setProp((props: ButtonProps) => (props.color = e.target.value))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Border Radius
        </label>
        <input
          type="range"
          min="0"
          max="50"
          value={borderRadius}
          onChange={(e) =>
            setProp((props: ButtonProps) => (props.borderRadius = parseInt(e.target.value)))
          }
          className="mt-1 block w-full"
        />
        <span className="text-sm text-gray-500">{borderRadius}px</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Padding
        </label>
        <input
          type="range"
          min="0"
          max="50"
          value={padding}
          onChange={(e) =>
            setProp((props: ButtonProps) => (props.padding = parseInt(e.target.value)))
          }
          className="mt-1 block w-full"
        />
        <span className="text-sm text-gray-500">{padding}px</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Font Size
        </label>
        <input
          type="range"
          min="10"
          max="32"
          value={fontSize}
          onChange={(e) =>
            setProp((props: ButtonProps) => (props.fontSize = parseInt(e.target.value)))
          }
          className="mt-1 block w-full"
        />
        <span className="text-sm text-gray-500">{fontSize}px</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Font Weight
        </label>
        <select
          value={fontWeight}
          onChange={(e) =>
            setProp((props: ButtonProps) => (props.fontWeight = e.target.value))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Lighter</option>
          <option value="bolder">Bolder</option>
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
            setProp((props: ButtonProps) => (props.minWidth = parseInt(e.target.value)))
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
            setProp((props: ButtonProps) => (props.minHeight = parseInt(e.target.value)))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <SpacingSettings />
    </div>
  );
};
