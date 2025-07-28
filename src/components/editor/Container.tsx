import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizer } from '../common/Resizer';
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
    // Individual padding/margin props to match ContainerSettings
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    fillSpace?: 'yes' | 'no';
    shadow?: number;
    radius?: number;
};

const defaultProps: ContainerProps = {
    background: '#ffffff',
    isTransparent: false,
    width: '100%',
    height: '300px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    gap: 10,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
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
        height,
        flexDirection,
        justifyContent,
        alignItems,
        flexWrap,
        gap,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        fillSpace,
        shadow,
        radius,
        children,
    } = mergedProps;

    const {
        selected,
    } = useNode((state) => ({
        selected: state.events.selected,
    }));

    const containerStyle: React.CSSProperties = {
        width: '100%',
        height: height === 'auto' ? 'auto' : '100%',
        minHeight: height === 'auto' ? '100px' : '100%',
        display: 'flex',
        flexDirection: flexDirection as React.CSSProperties['flexDirection'],
        justifyContent: justifyContent as React.CSSProperties['justifyContent'],
        alignItems: alignItems as React.CSSProperties['alignItems'],
        flexWrap: flexWrap as React.CSSProperties['flexWrap'],
        gap: `${gap}px`,
        background: isTransparent ? 'transparent' : background,
        paddingTop: `${paddingTop}px`,
        paddingRight: `${paddingRight}px`,
        paddingBottom: `${paddingBottom}px`,
        paddingLeft: `${paddingLeft}px`,
        marginTop: `${marginTop}px`,
        marginRight: `${marginRight}px`,
        marginBottom: `${marginBottom}px`,
        marginLeft: `${marginLeft}px`,
        boxShadow: shadow === 0 ? 'none' : `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
        borderRadius: `${radius}px`,
        flex: fillSpace === 'yes' ? 1 : 'unset',
        boxSizing: 'border-box',
        overflow: 'visible',
        position: 'relative',
        border: selected ? EDITOR_SETTINGS.SELECTION.ACTIVE_BORDER : EDITOR_SETTINGS.SELECTION.INACTIVE_BORDER,
        minWidth: '50px', // Ensure minimum width
    };

    const resizerStyle: React.CSSProperties = {
        borderRadius: `${EDITOR_SETTINGS.SELECTION.BORDER_RADIUS}px`,
        overflow: 'visible',
        minHeight: height === 'auto' ? '100px' : 'auto',
        position: 'relative',
        zIndex: selected ? 10 : 1,
    };

    return (
        <Resizer
            propKey={{ width: 'width', height: 'height' }}
            style={resizerStyle}
            fillSpace={fillSpace}
        >
            <div style={containerStyle}>
                {children}
            </div>
        </Resizer>
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
