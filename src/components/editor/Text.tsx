import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizable } from 're-resizable';
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
  width = 'auto',
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
        overflow: 'hidden',
      }}
    >
      <div
        ref={(ref) => {
          if (ref) {
            connect(drag(ref));
          }
        }}
        className="cursor-text"
        style={{
          ...getContentStyles(
            { paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft },
            height,
            {
              backgroundColor: backgroundColor,
            }
          ),
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
