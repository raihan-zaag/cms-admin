import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizable } from 're-resizable';

interface ButtonProps {
  text?: string;
  backgroundColor?: string;
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

interface ButtonComponent extends React.FC<ButtonProps> {
  craft?: {
    props: ButtonProps;
    rules?: {
      canDrag?: () => boolean;
      canDrop?: () => boolean;
      canMoveIn?: () => boolean;
      canMoveOut?: () => boolean;
    };
    related: {
      settings: React.FC;
    };
    displayName?: string;
  };
}

export const Button: ButtonComponent = ({
  text = 'Click me',
  backgroundColor = '#3b82f6',
  color = '#ffffff',
  borderRadius = 8,
  padding = 12,
  fontSize = 16,
  fontWeight = 'normal',
  width = 'auto',
  height = 'auto',
  minWidth = 80,
  minHeight = 40,
  onClick,
}) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp }
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  return (
    <Resizable
      size={{
        width: width,
        height: height,
      }}
      onResizeStop={(_, __, ref) => {
        setProp((props: ButtonProps) => {
          props.width = ref.style.width;
          props.height = ref.style.height;
        });
      }}
      minWidth={minWidth}
      minHeight={minHeight}
      bounds="parent"
      handleStyles={{
        top: { zIndex: 1000 },
        right: { zIndex: 1000 },
        bottom: { zIndex: 1000 },
        left: { zIndex: 1000 },
        topRight: { zIndex: 1000 },
        bottomRight: { zIndex: 1000 },
        bottomLeft: { zIndex: 1000 },
        topLeft: { zIndex: 1000 },
      }}
      style={{
        border: selected ? '2px dashed #3b82f6' : '2px solid #e5e7eb',
        borderRadius: '4px',
      }}
    >
      <button
        ref={(ref) => {
          if (ref) {
            connect(drag(ref));
          }
        }}
        className="w-full h-full transition-all duration-200 hover:opacity-80"
        style={{
          backgroundColor,
          color,
          borderRadius: `${borderRadius}px`,
          padding: `${padding}px`,
          fontSize: `${fontSize}px`,
          fontWeight,
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        {text}
      </button>
    </Resizable>
  );
};

// Settings component for the Button
export const ButtonSettings: React.FC = () => {
  const {
    actions: { setProp },
    text,
    backgroundColor,
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
        />
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
    </div>
  );
};

Button.craft = {
  props: {
    text: 'Click me',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontWeight: 'normal',
    width: 'auto',
    height: 'auto',
    minWidth: 80,
    minHeight: 40,
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: ButtonSettings,
  },
  displayName: 'Button',
};
