import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizer } from '../common/Resizer';
import { ContainerSettings } from './settings/ContainerSettings';
import { EDITOR_SETTINGS } from '@/constants/editor';
import { useTheme } from '@/contexts/ThemeContext';

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
    gap?: string | number;
    // Individual padding/margin props to match ContainerSettings
    paddingTop?: string | number;
    paddingRight?: string | number;
    paddingBottom?: string | number;
    paddingLeft?: string | number;
    marginTop?: string | number;
    marginRight?: string | number;
    marginBottom?: string | number;
    marginLeft?: string | number;
    fillSpace?: 'yes' | 'no';
    shadow?: number;
    radius?: string | number;
    useDesignTokens?: boolean;
};

const defaultProps: ContainerProps = {
    background: '@color.background',
    isTransparent: false,
    width: '100%',
    height: '300px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    gap: '@spacing.md',
    paddingTop: '@spacing.sm',
    paddingRight: '@spacing.sm',
    paddingBottom: '@spacing.sm',
    paddingLeft: '@spacing.sm',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    fillSpace: 'no',
    shadow: 0,
    radius: '@radius.md',
    useDesignTokens: true,
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
        useDesignTokens,
        children,
    } = mergedProps;

    const {
        selected,
    } = useNode((state) => ({
        selected: state.events.selected,
    }));

    // Use design tokens hook
    const { processToken } = useTheme();

    // Process design tokens or use raw values
    const processedBackground = useDesignTokens && typeof background === 'string' && background.startsWith('@')
        ? processToken(background)
        : background;

    const processedGap = useDesignTokens && typeof gap === 'string' && gap.startsWith('@')
        ? processToken(gap)
        : typeof gap === 'number' ? `${gap}px` : gap;

    const processedRadius = useDesignTokens && typeof radius === 'string' && radius.startsWith('@')
        ? processToken(radius)
        : typeof radius === 'number' ? `${radius}px` : radius;

    // Process spacing tokens helper function
    const processSpacing = (value: string | number | undefined) => {
        if (!value) return '0px';
        if (useDesignTokens && typeof value === 'string' && value.startsWith('@')) {
            return processToken(value);
        }
        return typeof value === 'number' ? `${value}px` : value;
    };

    const containerStyle: React.CSSProperties = {
        width: '100%',
        height: height === 'auto' ? 'auto' : '100%',
        minHeight: height === 'auto' ? '100px' : '100%',
        display: 'flex',
        flexDirection: flexDirection as React.CSSProperties['flexDirection'],
        justifyContent: justifyContent as React.CSSProperties['justifyContent'],
        alignItems: alignItems as React.CSSProperties['alignItems'],
        flexWrap: flexWrap as React.CSSProperties['flexWrap'],
        gap: processedGap,
        background: isTransparent ? 'transparent' : processedBackground,
        borderRadius: processedRadius,
        paddingTop: processSpacing(paddingTop),
        paddingRight: processSpacing(paddingRight),
        paddingBottom: processSpacing(paddingBottom),
        paddingLeft: processSpacing(paddingLeft),
        marginTop: processSpacing(marginTop),
        marginRight: processSpacing(marginRight),
        marginBottom: processSpacing(marginBottom),
        marginLeft: processSpacing(marginLeft),
        boxShadow: shadow === 0 ? 'none' : `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
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
