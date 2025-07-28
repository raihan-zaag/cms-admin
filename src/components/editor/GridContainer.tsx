import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizer } from '../common/Resizer';
import { GridContainerSettings } from './settings/GridContainerSettings';
import { EDITOR_SETTINGS } from '@/constants/editor';

export type GridContainerProps = {
    background?: string;
    isTransparent?: boolean;
    children?: React.ReactNode;
    width?: string;
    height?: string;
    // Grid-specific properties
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    gridGap?: number;
    gridColumnGap?: number;
    gridRowGap?: number;
    justifyItems?: 'start' | 'end' | 'center' | 'stretch';
    alignItems?: 'start' | 'end' | 'center' | 'stretch';
    justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
    alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
    gridAutoFlow?: 'row' | 'column' | 'row dense' | 'column dense';
    gridAutoColumns?: string;
    gridAutoRows?: string;
    // Individual padding/margin props
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

const defaultProps: GridContainerProps = {
    background: '#ffffff',
    isTransparent: false,
    width: '100%',
    height: '300px',
    gridTemplateColumns: 'repeat(2, 1fr)', // Default 2-column grid
    gridTemplateRows: 'auto',
    gridGap: 10,
    gridColumnGap: 10,
    gridRowGap: 10,
    justifyItems: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'start',
    alignContent: 'start',
    gridAutoFlow: 'row',
    gridAutoColumns: 'auto',
    gridAutoRows: 'auto',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    fillSpace: 'no',
    shadow: 0,
    radius: 0,
};

export const GridContainer = (props: Partial<GridContainerProps>) => {
    const mergedProps = {
        ...defaultProps,
        ...props,
    };
    
    const {
        background,
        isTransparent,
        height,
        gridTemplateColumns,
        gridTemplateRows,
        gridGap,
        gridColumnGap,
        gridRowGap,
        justifyItems,
        alignItems,
        justifyContent,
        alignContent,
        gridAutoFlow,
        gridAutoColumns,
        gridAutoRows,
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
        display: 'grid',
        gridTemplateColumns,
        gridTemplateRows,
        gap: gridGap ? `${gridGap}px` : undefined,
        columnGap: gridColumnGap ? `${gridColumnGap}px` : undefined,
        rowGap: gridRowGap ? `${gridRowGap}px` : undefined,
        justifyItems: justifyItems as React.CSSProperties['justifyItems'],
        alignItems: alignItems as React.CSSProperties['alignItems'],
        justifyContent: justifyContent as React.CSSProperties['justifyContent'],
        alignContent: alignContent as React.CSSProperties['alignContent'],
        gridAutoFlow: gridAutoFlow as React.CSSProperties['gridAutoFlow'],
        gridAutoColumns,
        gridAutoRows,
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

GridContainer.craft = {
    displayName: 'Grid Container',
    props: defaultProps,
    rules: {
        canDrag: () => true,
        canDrop: () => true,
        canMoveIn: () => true,
        canMoveOut: () => true,
    },
    related: {
        settings: GridContainerSettings,
    },
};
