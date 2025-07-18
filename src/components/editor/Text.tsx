import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizable } from 're-resizable';

interface TextProps {
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: string;
  width?: string;
  height?: string;
  minWidth?: number;
  minHeight?: number;
}

interface TextComponent extends React.FC<TextProps> {
  craft?: {
    props: TextProps;
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

export const Text: TextComponent = ({
  text = 'Click to edit text',
  fontSize = 16,
  fontWeight = 'normal',
  color = '#000000',
  backgroundColor = 'transparent',
  textAlign = 'left',
  width = 'auto',
  height = 'auto',
  minWidth = 50,
  minHeight = 20,
}) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp }
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <Resizable
      size={{
        width: width,
        height: height,
      }}
      onResizeStop={(_, __, ref) => {
        setProp((props: TextProps) => {
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
      <div
        ref={(ref) => {
          if (ref) {
            connect(drag(ref));
          }
        }}
        className="w-full h-full cursor-text"
        style={{
          backgroundColor: backgroundColor,
        }}
        onClick={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
      >
        {isEditing ? (
          <textarea
            value={text}
            onChange={(e) =>
              setProp((props: TextProps) => (props.text = e.target.value))
            }
            autoFocus
            className="w-full h-full resize-none border-none outline-none bg-transparent"
            style={{
              fontSize: `${fontSize}px`,
              fontWeight,
              color,
              textAlign: textAlign as 'left' | 'center' | 'right' | 'justify',
              backgroundColor: 'transparent',
            }}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              fontSize: `${fontSize}px`,
              fontWeight,
              color,
              textAlign: textAlign as 'left' | 'center' | 'right' | 'justify',
              whiteSpace: 'pre-wrap',
            }}
          >
            {text}
          </div>
        )}
      </div>
    </Resizable>
  );
};

// Settings component for the Text
export const TextSettings: React.FC = () => {
  const {
    actions: { setProp },
    text,
    fontSize,
    fontWeight,
    color,
    backgroundColor,
    textAlign,
    minWidth,
    minHeight,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
    fontWeight: node.data.props.fontWeight,
    color: node.data.props.color,
    backgroundColor: node.data.props.backgroundColor,
    textAlign: node.data.props.textAlign,
    minWidth: node.data.props.minWidth,
    minHeight: node.data.props.minHeight,
  }));

  return (
    <div className="space-y-4">
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
          Font Size
        </label>
        <input
          type="range"
          min="10"
          max="72"
          value={fontSize}
          onChange={(e) =>
            setProp((props: TextProps) => (props.fontSize = parseInt(e.target.value)))
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
            setProp((props: TextProps) => (props.fontWeight = e.target.value))
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
          Color
        </label>
        <input
          type="color"
          value={color}
          onChange={(e) =>
            setProp((props: TextProps) => (props.color = e.target.value))
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
          value={backgroundColor === 'transparent' ? '#ffffff' : backgroundColor}
          onChange={(e) =>
            setProp((props: TextProps) => (props.backgroundColor = e.target.value))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
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
    </div>
  );
};

Text.craft = {
  props: {
    text: 'Click to edit text',
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000000',
    backgroundColor: 'transparent',
    textAlign: 'left',
    width: 'auto',
    height: 'auto',
    minWidth: 50,
    minHeight: 20,
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: TextSettings,
  },
  displayName: 'Text',
};
