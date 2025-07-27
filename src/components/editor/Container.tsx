import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizable } from 're-resizable';
import { ContainerSettings } from './settings/ContainerSettings';
import { EDITOR_SETTINGS } from '@/constants/editor';

export type ContainerProps = {
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
    padding?: string[];
    margin?: string[];
    fillSpace?: 'yes' | 'no';
    shadow?: number;
    radius?: number;
};

const defaultProps: ContainerProps = {
    background: '#ffffff',
    isTransparent: false,
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    gap: 10,
    padding: ['0', '0', '', '0'], 
    margin: ['0', '0', '0', '0'],
    fillSpace: 'no',
    shadow: 0,
    radius: 0,
};

export const Container = (props: Partial<ContainerProps>) => {
    const mergedProps = {
        ...defaultProps,
        ...props,
    };
    
    const {
        background,
        isTransparent,
        width,
        height,
        flexDirection,
        justifyContent,
        alignItems,
        flexWrap,
        gap,
        padding,
        margin,
        fillSpace,
        shadow,
        radius,
        children,
    } = mergedProps;

    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp }
    } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
    }));

    const isAutoHeight = height === 'auto';

    return (
        <Resizable
            size={{
                width: width!,
                height: isAutoHeight ? 'auto' : height!,
            }}
            minHeight={isAutoHeight ? 100 : undefined}
            onResizeStop={(_, __, ref) => {
                setProp((props: ContainerProps) => {
                    props.width = ref.style.width;
                    props.height = ref.style.height;
                });
            }}
            bounds="parent"
            enable={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                topRight: true,
                bottomRight: true,
                bottomLeft: true,
                topLeft: true,
            }}
            handleStyles={{
                top: { zIndex: 999 },
                right: { zIndex: 999 },
                bottom: { zIndex: 999 },
                left: { zIndex: 999 },
                topRight: { zIndex: 999 },
                bottomRight: { zIndex: 999 },
                bottomLeft: { zIndex: 999 },
                topLeft: { zIndex: 999 },
            }}
            style={{
                border: selected ? EDITOR_SETTINGS.SELECTION.ACTIVE_BORDER : EDITOR_SETTINGS.SELECTION.INACTIVE_BORDER,
                borderRadius: `${EDITOR_SETTINGS.SELECTION.BORDER_RADIUS}px`,
                overflow: 'visible',
                minHeight: isAutoHeight ? '100px' : 'auto',
                position: 'relative',
                zIndex: selected ? 10 : 1, // Lower z-index for containers, higher when selected
            }}
        >
            <div
                ref={(ref) => {
                    if (ref) {
                        connect(drag(ref));
                    }
                }}
                style={{
                    width: '100%',
                    height: isAutoHeight ? 'auto' : '100%',
                    minHeight: isAutoHeight ? '100px' : '100%',
                    display: 'flex',
                    flexDirection: flexDirection as React.CSSProperties['flexDirection'],
                    justifyContent: justifyContent as React.CSSProperties['justifyContent'],
                    alignItems: alignItems as React.CSSProperties['alignItems'],
                    flexWrap: flexWrap as React.CSSProperties['flexWrap'],
                    gap: `${gap}px`,
                    background: isTransparent ? 'transparent' : background,
                    padding: `${padding![0]}px ${padding![1]}px ${padding![2]}px ${padding![3]}px`,
                    margin: `${margin![0]}px ${margin![1]}px ${margin![2]}px ${margin![3]}px`,
                    boxShadow: shadow === 0 ? 'none' : `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
                    borderRadius: `${radius}px`,
                    flex: fillSpace === 'yes' ? 1 : 'unset',
                    boxSizing: 'border-box',
                    overflow: 'visible',
                    position: 'relative',
                    zIndex: 1,
                    minWidth: '100%',
                }}
            >
                {children}
            </div>
        </Resizable>
    );
};

Container.craft = {
    displayName: 'Container',
    props: defaultProps,
    rules: {
        canDrag: () => true,
        canDrop: () => true,
        canMoveIn: () => true,
        canMoveOut: () => true,
    },
    related: {
        settings: ContainerSettings,
    },
};
