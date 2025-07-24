import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizable } from 're-resizable';
import { ContainerSettings } from './settings/ContainerSettings';
import { 
    type SpacingProps, 
    getContentStyles, 
    getDefaultCraftSpacing 
} from '../../lib/spacingUtils';

interface ContainerProps extends SpacingProps {
    background?: string;
    isTransparent?: boolean;
    children?: React.ReactNode;
    width?: string;
    height?: string;
    flexDirection?: 'row' | 'column';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'stretch' | 'flex-start' | 'center' | 'flex-end';
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: number;
}

interface ContainerComponent extends React.FC<ContainerProps> {
    craft?: {
        props: ContainerProps;
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

export const Container: ContainerComponent = ({
    background = '#ffffff',
    isTransparent = false,
    paddingTop = 10,
    paddingRight = 10,
    paddingBottom = 10,
    paddingLeft = 10,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    width = '100%',
    height = 'auto',
    flexDirection = 'column',
    justifyContent = 'flex-start',
    alignItems = 'stretch',
    flexWrap = 'nowrap',
    gap = 0,
    children,
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
                setProp((props: ContainerProps) => {
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
                    style={{
                        ...getContentStyles(
                            { paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft },
                            height,
                            {
                                background: isTransparent ? 'transparent' : background,
                                minHeight: height === 'auto' ? 'fit-content' : 'auto',
                                display: 'flex',
                                flexDirection: flexDirection,
                                justifyContent: justifyContent,
                                alignItems: alignItems,
                                flexWrap: flexWrap,
                                gap: `${gap}px`,
                            }
                        ),
                    }}
                >
                    {children}
                </div>
            </Resizable>
    );
};

Container.craft = {
    props: {
        background: '#ffffff',
        isTransparent: false,
        ...getDefaultCraftSpacing(),
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexWrap: 'nowrap',
        gap: 0,
    },
    rules: {
        canDrag: () => true,
        canDrop: () => true,
        canMoveIn: () => true,
        canMoveOut: () => true,
    },
    related: {
        settings: ContainerSettings,
    },
    displayName: 'Container',
};
