import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizable } from 're-resizable';
import { ButtonSettings } from './settings/ButtonSettings';

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
  isTransparent = false,
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
          backgroundColor: isTransparent ? 'transparent' : backgroundColor,
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

Button.craft = {
  props: {
    text: 'Click me',
    backgroundColor: '#3b82f6',
    isTransparent: false,
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
