import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizer } from '../common/Resizer';
import { ButtonSettings } from './settings/ButtonSettings';
import { 
    type SpacingProps, 
    getContentStyles, 
    getDefaultCraftSpacing 
} from '../../lib/spacingUtils';

interface ButtonProps extends SpacingProps {
  text?: string;
  backgroundColor?: string;
  isTransparent?: boolean;
  color?: string;
  borderRadius?: number;
  fontSize?: number;
  fontWeight?: string;
  width?: string;
  height?: string;
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
  fontSize = 16,
  fontWeight = 'normal',
  height = 'auto',
  onClick,
  paddingTop = 12,
  paddingRight = 12,
  paddingBottom = 12,
  paddingLeft = 12,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
}) => {
  const {
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const buttonStyle: React.CSSProperties = {
    ...getContentStyles(
      { paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft },
      height,
      {
        backgroundColor: isTransparent ? 'transparent' : backgroundColor,
        color,
        borderRadius: `${borderRadius}px`,
        fontSize: `${fontSize}px`,
        fontWeight,
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        height: '100%',
      }
    ),
  };

  const resizerStyle: React.CSSProperties = {
    border: selected ? '2px dashed #3b82f6' : '2px solid #e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  };

  return (
    <Resizer
      propKey={{ width: 'width', height: 'height' }}
      style={resizerStyle}
    >
      <button
        className="transition-all duration-200 hover:opacity-80"
        style={buttonStyle}
        onClick={onClick}
      >
        {text}
      </button>
    </Resizer>
  );
};

Button.craft = {
  props: {
    text: 'Click me',
    backgroundColor: '#3b82f6',
    isTransparent: false,
    color: '#ffffff',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'normal',
    width: 'auto',
    height: 'auto',
    ...getDefaultCraftSpacing(),
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
