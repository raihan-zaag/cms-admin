import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizer } from '../common/Resizer';
import { RootContainerSettings } from './settings/RootContainerSettings';
import { EDITOR_SETTINGS } from '@/constants/editor';
import { useTheme } from '@/contexts/ThemeContext';
import { useGlobalDesignTokens } from '@/hooks/useGlobalDesignTokens';
import { useDesignTokensStore } from '@/store/design-tokens';

export type RootContainerProps = {
    children?: React.ReactNode;
    width?: string;
    height?: string;
    
    // Global design token overrides
    useGlobalTokens?: boolean;
    
    // Background
    background?: string;
    isTransparent?: boolean;
    
    // Layout
    flexDirection?: 'row' | 'column';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'stretch' | 'flex-start' | 'center' | 'flex-end';
    gap?: string;
    gapX?: string; // Column gap (horizontal)
    gapY?: string; // Row gap (vertical)
    
    // Container sizing
    maxWidth?: string;
    padding?: string;
    paddingX?: string; // Horizontal padding (left/right)
    paddingY?: string; // Vertical padding (top/bottom)
    borderRadius?: string;
    
    // Typography (applied to all child components)
    fontFamily?: string;
    
    // Advanced styling
    boxShadow?: string;
};

const defaultProps: RootContainerProps = {
    useGlobalTokens: true,
    background: '@color.background',
    isTransparent: false,
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: '@spacing.md',
    gapX: undefined,
    gapY: undefined,
    maxWidth: '@container.xl',
    padding: '@spacing.lg',
    paddingX: undefined,
    paddingY: undefined,
    borderRadius: '@radius.md',
    fontFamily: '@font.primary',
    boxShadow: 'none',
};

export const RootContainer = (props: Partial<RootContainerProps>) => {
    const mergedProps = {
        ...defaultProps,
        ...props,
    };
    
    const {
        children,
        useGlobalTokens,
        background,
        isTransparent,
        width,
        height,
        flexDirection,
        justifyContent,
        alignItems,
        gap,
        gapX,
        gapY,
        maxWidth,
        padding,
        paddingX,
        paddingY,
        borderRadius,
        fontFamily,
        boxShadow,
    } = mergedProps;

    const {
        selected,
    } = useNode((state) => ({
        selected: state.events.selected,
    }));

    // Access theme processing and global design tokens
    const { processToken } = useTheme();
    const { globalSettings } = useGlobalDesignTokens();
    const designTokensStore = useDesignTokensStore();

    // Helper function to resolve spacing tokens directly
    const resolveSpacingToken = React.useCallback((tokenValue: string) => {
        if (!tokenValue) return '';
        
        // Semantic to numeric mapping fallback
        const semanticMapping: Record<string, string> = {
            'none': '0',  // 0
            'xs': '1',    // 0.25rem
            'sm': '2',    // 0.5rem
            'md': '4',    // 1rem
            'lg': '6',    // 1.5rem
            'xl': '8',    // 2rem
            '2xl': '10',  // 2.5rem
            '3xl': '12',  // 3rem
        };
        
        // Handle @spacing.* tokens
        if (tokenValue.startsWith('@spacing.')) {
            const spacingKey = tokenValue.replace('@spacing.', '');
            let spacingToken = designTokensStore.tokens.spacing[spacingKey];
            
            // If semantic key not found, try numeric equivalent
            if (!spacingToken && semanticMapping[spacingKey]) {
                const numericKey = semanticMapping[spacingKey];
                spacingToken = designTokensStore.tokens.spacing[numericKey];
            }
            
            if (spacingToken?.value) {
                return spacingToken.value;
            }
        }
        
        // Handle direct spacing key references (without @spacing. prefix)
        let spacingToken = designTokensStore.tokens.spacing[tokenValue];
        
        // If semantic key not found, try numeric equivalent
        if (!spacingToken && semanticMapping[tokenValue]) {
            const numericKey = semanticMapping[tokenValue];
            spacingToken = designTokensStore.tokens.spacing[numericKey];
        }
        
        if (spacingToken?.value) {
            return spacingToken.value;
        }
        
        // Fallback to processToken for other token types
        return processToken(tokenValue);
    }, [designTokensStore.tokens.spacing, processToken]);

    // Helper function to build padding string from individual values
    const buildPaddingString = React.useCallback((
        mainPadding?: string,
        paddingXValue?: string,
        paddingYValue?: string
    ) => {
        // If specific X or Y padding is provided, use them
        if (paddingXValue || paddingYValue) {
            const x = paddingXValue ? resolveSpacingToken(paddingXValue) : '0';
            const y = paddingYValue ? resolveSpacingToken(paddingYValue) : '0';
            return `${y} ${x}`;
        }
        
        // Otherwise use main padding
        return mainPadding ? resolveSpacingToken(mainPadding) : '';
    }, [resolveSpacingToken]);

    // Helper function to build gap object for CSS
    const buildGapValues = React.useCallback((
        mainGap?: string,
        gapXValue?: string,
        gapYValue?: string
    ) => {
        // If specific X or Y gap is provided, use CSS Grid gap properties
        if (gapXValue || gapYValue) {
            return {
                rowGap: gapYValue ? resolveSpacingToken(gapYValue) : '0',
                columnGap: gapXValue ? resolveSpacingToken(gapXValue) : '0',
            };
        }
        
        // Otherwise use main gap
        return {
            gap: mainGap ? resolveSpacingToken(mainGap) : '',
        };
    }, [resolveSpacingToken]);

    // Force re-render when global settings change
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    
    React.useEffect(() => {
        if (useGlobalTokens) {
            forceUpdate();
        }
    }, [globalSettings, useGlobalTokens]);

    // Process design tokens - use global settings if enabled, otherwise use props
    const getTokenValue = React.useCallback((propValue: string | undefined, globalPath: string) => {
        if (!useGlobalTokens) {
            return propValue && propValue.startsWith('@') ? processToken(propValue) : propValue;
        }
        
        // Use global settings - directly access the values
        const pathParts = globalPath.split('.');
        let value: any = globalSettings;
        for (const part of pathParts) {
            value = value?.[part];
        }
        
        // If we have a value from global settings, process it if it's a token, otherwise use it directly
        if (value !== undefined && value !== null) {
            if (typeof value === 'string' && value.startsWith('@')) {
                return processToken(value);
            }
            return value;
        }
        
        // Fallback to prop value
        return propValue && propValue.startsWith('@') ? processToken(propValue) : propValue;
    }, [useGlobalTokens, globalSettings, processToken]);

    // Get text color from global settings
    const getTextColor = React.useCallback(() => {
        if (useGlobalTokens && globalSettings.colors.text) {
            // If global text color is a token reference
            if (globalSettings.colors.text.startsWith('@')) {
                return processToken(globalSettings.colors.text);
            }
            // If it's a direct color value
            return globalSettings.colors.text;
        }
        
        // Default fallback
        return processToken('@color.text');
    }, [useGlobalTokens, globalSettings.colors.text, processToken]);

    // Apply processed values - wrapped in useMemo for proper re-rendering
    const processedBackground = React.useMemo(() => {
        const result = isTransparent 
            ? 'transparent' 
            : getTokenValue(background, 'colors.background');
        return result;
    }, [isTransparent, background, getTokenValue]);
    
    const processedGap = React.useMemo(() => {
        if (useGlobalTokens) {
            const gapValue = globalSettings.layout.gap;
            const gapXValue = globalSettings.layout.gapX;
            const gapYValue = globalSettings.layout.gapY;
            return buildGapValues(gapValue, gapXValue || gapX, gapYValue || gapY);
        } else {
            return buildGapValues(gap, gapX, gapY);
        }
    }, [useGlobalTokens, globalSettings.layout.gap, globalSettings.layout.gapX, globalSettings.layout.gapY, gap, gapX, gapY, buildGapValues]);
    
    const processedMaxWidth = React.useMemo(() => {
        const result = getTokenValue(maxWidth, 'container.maxWidth');
        return result;
    }, [maxWidth, getTokenValue]);
    
    const processedPadding = React.useMemo(() => {
        if (useGlobalTokens) {
            const paddingValue = globalSettings.container.padding;
            const paddingXValue = globalSettings.container.paddingX;
            const paddingYValue = globalSettings.container.paddingY;
            return buildPaddingString(paddingValue, paddingXValue || paddingX, paddingYValue || paddingY);
        } else {
            return buildPaddingString(padding, paddingX, paddingY);
        }
    }, [useGlobalTokens, globalSettings.container.padding, globalSettings.container.paddingX, globalSettings.container.paddingY, padding, paddingX, paddingY, buildPaddingString]);
    
    const processedBorderRadius = React.useMemo(() => {
        const result = getTokenValue(borderRadius, 'container.borderRadius');
        return result;
    }, [borderRadius, getTokenValue]);
    
    const processedFontFamily = React.useMemo(() => {
        let result;
        
        if (useGlobalTokens) {
            const globalFontValue = globalSettings.fontFamily.primary;
            
            // Handle the incorrect @typography.primary token by converting it to @font.primary
            if (globalFontValue === '@typography.primary') {
                result = processToken('@font.primary');
            } else if (globalFontValue === '@typography.secondary') {
                result = processToken('@font.secondary');
            } else if (globalFontValue === '@typography.mono') {
                result = processToken('@font.mono');
            } else if (globalFontValue?.startsWith('@')) {
                result = processToken(globalFontValue);
            } else {
                result = globalFontValue;
            }
        } else {
            result = fontFamily?.startsWith('@') ? processToken(fontFamily) : fontFamily;
        }
        
        return result;
    }, [fontFamily, useGlobalTokens, globalSettings.fontFamily.primary, processToken]);
    
    const processedTextColor = React.useMemo(() => {
        return getTextColor();
    }, [getTextColor]);
    
    const processedFlexDirection = React.useMemo(() => {
        return useGlobalTokens 
            ? globalSettings.layout.flexDirection 
            : flexDirection;
    }, [useGlobalTokens, globalSettings.layout.flexDirection, flexDirection]);
    
    const processedJustifyContent = React.useMemo(() => {
        return useGlobalTokens 
            ? globalSettings.layout.justifyContent 
            : justifyContent;
    }, [useGlobalTokens, globalSettings.layout.justifyContent, justifyContent]);
    
    const processedAlignItems = React.useMemo(() => {
        return useGlobalTokens 
            ? globalSettings.layout.alignItems 
            : alignItems;
    }, [useGlobalTokens, globalSettings.layout.alignItems, alignItems]);

    const containerStyle: React.CSSProperties = React.useMemo(() => {
        const gapStyles = processedGap;
        
        return {
            width: width,
            height: height === 'auto' ? 'auto' : height,
            minHeight: height === 'auto' ? '100vh' : height,
            maxWidth: processedMaxWidth,
            margin: '0 auto', // Center the container
            display: 'flex',
            flexDirection: processedFlexDirection as React.CSSProperties['flexDirection'],
            justifyContent: processedJustifyContent as React.CSSProperties['justifyContent'],
            alignItems: processedAlignItems as React.CSSProperties['alignItems'],
            ...gapStyles, // Spread gap, rowGap, or columnGap properties
            background: processedBackground,
            padding: processedPadding,
            borderRadius: processedBorderRadius,
            fontFamily: processedFontFamily,
            color: processedTextColor, // Add text color for inheritance
            boxShadow: boxShadow,
            boxSizing: 'border-box',
            overflow: 'visible',
            position: 'relative',
            border: selected ? EDITOR_SETTINGS.SELECTION.ACTIVE_BORDER : EDITOR_SETTINGS.SELECTION.INACTIVE_BORDER,
        };
    }, [
        width, 
        height, 
        processedMaxWidth, 
        processedFlexDirection, 
        processedJustifyContent, 
        processedAlignItems, 
        processedGap, 
        processedBackground, 
        processedPadding, 
        processedBorderRadius, 
        processedFontFamily, 
        processedTextColor, 
        boxShadow, 
        selected
    ]);

    const resizerStyle: React.CSSProperties = {
        borderRadius: `${EDITOR_SETTINGS.SELECTION.BORDER_RADIUS}px`,
        overflow: 'visible',
        minHeight: height === 'auto' ? '100vh' : 'auto',
        position: 'relative',
        zIndex: selected ? 10 : 1,
        width: '100%',
    };

    return (
        <Resizer
            propKey={{ width: 'width', height: 'height' }}
            style={resizerStyle}
        >
            <div 
                key={useGlobalTokens ? JSON.stringify(globalSettings) : 'static'}
                style={containerStyle}
                className={useGlobalTokens ? 'global-design-tokens-root' : ''}
            >
                {children}
            </div>
        </Resizer>
    );
};

RootContainer.craft = {
    displayName: 'Root Container',
    props: defaultProps,
    rules: {
        canDrag: () => false, // Root container cannot be dragged
        canDrop: () => true,
        canMoveIn: () => true,
        canMoveOut: () => false, // Root container cannot be moved out
    },
    related: {
        settings: RootContainerSettings,
    },
};
