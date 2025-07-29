import React from 'react';
import { useNode } from '@craftjs/core';
import { SpacingSettings } from './SpacingSettings';
import { useCraftDesignTokenOptions } from '@/lib/craftDesignTokenOptions';
import { CraftDesignTokenSelect, DesignTokenToggle } from '@/components/ui/CraftDesignTokenSelect';

interface ButtonProps {
  text?: string;
  backgroundColor?: string;
  isTransparent?: boolean;
  color?: string;
  borderRadius?: string | number;
  padding?: number;
  fontSize?: string | number;
  fontWeight?: string;
  width?: string;
  height?: string;
  minWidth?: number;
  minHeight?: number;
  useDesignTokens?: boolean;
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
    fontSize,
    fontWeight,
    useDesignTokens,
  } = useNode((node) => ({
    text: node.data.props.text,
    backgroundColor: node.data.props.backgroundColor,
    isTransparent: node.data.props.isTransparent,
    color: node.data.props.color,
    borderRadius: node.data.props.borderRadius,
    fontSize: node.data.props.fontSize,
    fontWeight: node.data.props.fontWeight,
    useDesignTokens: node.data.props.useDesignTokens,
  }));

  const { buttonOptions } = useCraftDesignTokenOptions();

  return (
    <div className="space-y-4">
      <DesignTokenToggle
        enabled={useDesignTokens}
        onChange={(enabled) =>
          setProp((props: ButtonProps) => (props.useDesignTokens = enabled))
        }
      />

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

      <CraftDesignTokenSelect
        label="Background Color"
        value={backgroundColor}
        onChange={(value) =>
          setProp((props: ButtonProps) => (props.backgroundColor = value))
        }
        options={buttonOptions.backgrounds}
        useDesignTokens={useDesignTokens}
        colorInput={true}
        description="Choose a background color for the button"
      />

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

      <CraftDesignTokenSelect
        label="Text Color"
        value={color}
        onChange={(value) =>
          setProp((props: ButtonProps) => (props.color = value))
        }
        options={buttonOptions.textColors}
        useDesignTokens={useDesignTokens}
        colorInput={true}
        description="Choose the text color for the button"
      />

      <CraftDesignTokenSelect
        label="Border Radius"
        value={borderRadius?.toString()}
        onChange={(value) =>
          setProp((props: ButtonProps) => (props.borderRadius = value))
        }
        options={buttonOptions.borders}
        useDesignTokens={useDesignTokens}
        rangeInput={true}
        rangeMin={0}
        rangeMax={50}
        rangeStep={1}
        description="Set the border radius for rounded corners"
      />

      <CraftDesignTokenSelect
        label="Font Size"
        value={fontSize?.toString()}
        onChange={(value) =>
          setProp((props: ButtonProps) => (props.fontSize = value))
        }
        options={buttonOptions.sizes}
        useDesignTokens={useDesignTokens}
        rangeInput={true}
        rangeMin={10}
        rangeMax={32}
        rangeStep={1}
        description="Set the font size for the button text"
      />

      <CraftDesignTokenSelect
        label="Font Weight"
        value={fontWeight}
        onChange={(value) =>
          setProp((props: ButtonProps) => (props.fontWeight = value))
        }
        options={buttonOptions.weights}
        useDesignTokens={useDesignTokens}
        textInput={true}
        placeholder="e.g., normal, bold, 400, 600"
        description="Set the font weight for the button text"
      />

      <SpacingSettings />
    </div>
  );
};
