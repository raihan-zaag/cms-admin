import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizer } from '../common/Resizer';
import { TextSettings } from './settings/TextSettings';
import { 
    type SpacingProps, 
    getContentStyles, 
    getDefaultCraftSpacing 
} from '../../lib/spacingUtils';

interface TextProps extends SpacingProps {
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: string;
  width?: string;
  height?: string;
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
  height = 'auto',
  paddingTop = 8,
  paddingRight = 8,
  paddingBottom = 8,
  paddingLeft = 8,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
}) => {
  const {
    selected,
    actions: { setProp }
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const [isEditing, setIsEditing] = React.useState(false);

  const textStyle: React.CSSProperties = {
    ...getContentStyles(
      { paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft },
      height,
      {
        backgroundColor: backgroundColor,
      }
    ),
    fontSize: `${fontSize}px`,
    fontWeight,
    color,
    textAlign: textAlign as 'left' | 'center' | 'right' | 'justify',
    cursor: 'text',
    width: '100%',
    height: '100%',
    border: 'none',
    outline: 'none',
    resize: 'none',
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
      <div
        className="cursor-text"
        style={textStyle}
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
    </Resizer>
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
    ...getDefaultCraftSpacing(),
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
