import React from 'react';
import { useNode } from '@craftjs/core';
import { useGlobalDesignTokens } from '@/hooks/useGlobalDesignTokens';
import { useDesignTokenOptions } from '@/lib/designTokenOptions';
import { SelectOptionsRenderer } from '@/components/ui/SelectOptionsRenderer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Settings, RefreshCw, Palette, Type, Layout, Container } from 'lucide-react';

interface RootContainerProps {
    useGlobalTokens?: boolean;
    background?: string;
    isTransparent?: boolean;
    width?: string;
    height?: string;
    flexDirection?: 'row' | 'column';
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    gapX?: string; // Column gap (horizontal)
    gapY?: string; // Row gap (vertical)
    maxWidth?: string;
    padding?: string;
    paddingX?: string; // Horizontal padding (left/right)
    paddingY?: string; // Vertical padding (top/bottom)
    borderRadius?: string;
    fontFamily?: string;
    boxShadow?: string;
}

export const RootContainerSettings: React.FC = () => {
    const {
        actions: { setProp },
        useGlobalTokens,
        background,
        isTransparent,
        flexDirection,
        gap,
        gapX,
        gapY,
        padding,
        paddingX,
        paddingY,
    } = useNode((node) => ({
        useGlobalTokens: node.data.props.useGlobalTokens,
        background: node.data.props.background,
        isTransparent: node.data.props.isTransparent,
        flexDirection: node.data.props.flexDirection,
        gap: node.data.props.gap,
        gapX: node.data.props.gapX,
        gapY: node.data.props.gapY,
        padding: node.data.props.padding,
        paddingX: node.data.props.paddingX,
        paddingY: node.data.props.paddingY,
    }));

    const { globalSettings, updateGlobalSettings, resetGlobalSettings } = useGlobalDesignTokens();
    
    // Get dynamic design token options
    const { 
        fontFamilyOptions,
        colorOptions,
        spacingOptions,
        borderRadiusOptions,
        layoutDirectionOptions,
        justifyContentOptions,
        alignItemsOptions,
        containerOptions
    } = useDesignTokenOptions();

    return (
        <div className="space-y-4">
            {/* Global Tokens Toggle */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Global Design Tokens
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={useGlobalTokens}
                                onChange={(e) =>
                                    setProp((props: RootContainerProps) => (props.useGlobalTokens = e.target.checked))
                                }
                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            <span className="text-sm font-medium text-gray-700">Use Global Design Tokens</span>
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                            When enabled, the root container will use global design token settings that cascade to all components.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={resetGlobalSettings}
                            className="flex items-center gap-1"
                        >
                            <RefreshCw className="w-3 h-3" />
                            Reset to Defaults
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Global Typography Settings */}
            {useGlobalTokens && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Type className="w-4 h-4" />
                            Global Typography
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <Label htmlFor="primaryFont">Primary Font</Label>
                            <SelectOptionsRenderer
                                id="primaryFont"
                                value={globalSettings.fontFamily.primary}
                                onChange={(value) =>
                                    updateGlobalSettings({
                                        fontFamily: { 
                                            ...globalSettings.fontFamily, 
                                            primary: value 
                                        }
                                    })
                                }
                                options={fontFamilyOptions}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Global Colors */}
            {useGlobalTokens && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Palette className="w-4 h-4" />
                            Global Colors
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <Label htmlFor="backgroundColor">Background Color</Label>
                            <SelectOptionsRenderer
                                id="backgroundColor"
                                value={globalSettings.colors.background}
                                onChange={(value) =>
                                    updateGlobalSettings({
                                        colors: { 
                                            ...globalSettings.colors, 
                                            background: value 
                                        }
                                    })
                                }
                                options={colorOptions}
                            />
                        </div>

                        <div>
                            <Label htmlFor="textColor">Text Color</Label>
                            <SelectOptionsRenderer
                                id="textColor"
                                value={globalSettings.colors.text}
                                onChange={(value) =>
                                    updateGlobalSettings({
                                        colors: { 
                                            ...globalSettings.colors, 
                                            text: value 
                                        }
                                    })
                                }
                                options={colorOptions}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Global Layout */}
            {useGlobalTokens && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Layout className="w-4 h-4" />
                            Global Layout
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <Label htmlFor="flexDirection">Layout Direction</Label>
                            <SelectOptionsRenderer
                                id="flexDirection"
                                value={globalSettings.layout.flexDirection}
                                onChange={(value) =>
                                    updateGlobalSettings({
                                        layout: { 
                                            ...globalSettings.layout, 
                                            flexDirection: value as 'row' | 'column'
                                        }
                                    })
                                }
                                options={layoutDirectionOptions}
                            />
                        </div>

                        <div>
                            <Label htmlFor="justifyContent">Justify Content</Label>
                            <SelectOptionsRenderer
                                id="justifyContent"
                                value={globalSettings.layout.justifyContent}
                                onChange={(value) =>
                                    updateGlobalSettings({
                                        layout: { 
                                            ...globalSettings.layout, 
                                            justifyContent: value 
                                        }
                                    })
                                }
                                options={justifyContentOptions}
                            />
                        </div>

                        <div>
                            <Label htmlFor="alignItems">Align Items</Label>
                            <SelectOptionsRenderer
                                id="alignItems"
                                value={globalSettings.layout.alignItems}
                                onChange={(value) =>
                                    updateGlobalSettings({
                                        layout: { 
                                            ...globalSettings.layout, 
                                            alignItems: value 
                                        }
                                    })
                                }
                                options={alignItemsOptions}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Global Container Settings */}
            {useGlobalTokens && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Container className="w-4 h-4" />
                            Global Container
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <Label htmlFor="maxWidth">Max Width</Label>
                            <SelectOptionsRenderer
                                id="maxWidth"
                                value={globalSettings.container.maxWidth}
                                onChange={(value) =>
                                    updateGlobalSettings({
                                        container: { 
                                            ...globalSettings.container, 
                                            maxWidth: value 
                                        }
                                    })
                                }
                                options={containerOptions}
                            />
                        </div>

                        <div>
                            <Label htmlFor="borderRadius">Border Radius</Label>
                            <SelectOptionsRenderer
                                id="borderRadius"
                                value={globalSettings.container.borderRadius}
                                onChange={(value) =>
                                    updateGlobalSettings({
                                        container: { 
                                            ...globalSettings.container, 
                                            borderRadius: value 
                                        }
                                    })
                                }
                                options={borderRadiusOptions}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Container Spacing Settings */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Container Spacing Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div>
                        <Label htmlFor="gapX">Column Gap (Horizontal)</Label>
                        {(() => {
                            const effectiveGapX = useGlobalTokens 
                                ? (globalSettings.layout.gapX ?? '@spacing.0') 
                                : (gapX ?? '@spacing.0');
                            return (
                                <SelectOptionsRenderer
                                    id="gapX"
                                    value={effectiveGapX}
                                    onChange={(value) => {
                                        if (useGlobalTokens) {
                                            updateGlobalSettings({
                                                layout: {
                                                    ...globalSettings.layout,
                                                    gapX: value === '@spacing.0' ? undefined : value
                                                }
                                            });
                                        } else {
                                            setProp((props: RootContainerProps) => (props.gapX = value));
                                        }
                                    }}
                                    options={spacingOptions}
                                />
                            );
                        })()}
                    </div>

                    <div>
                        <Label htmlFor="gapY">Row Gap (Vertical)</Label>
                        {(() => {
                            const effectiveGapY = useGlobalTokens 
                                ? (globalSettings.layout.gapY ?? '@spacing.0') 
                                : (gapY ?? '@spacing.0');
                            return (
                                <SelectOptionsRenderer
                                    id="gapY"
                                    value={effectiveGapY}
                                    onChange={(value) => {
                                        if (useGlobalTokens) {
                                            updateGlobalSettings({
                                                layout: {
                                                    ...globalSettings.layout,
                                                    gapY: value === '@spacing.0' ? undefined : value
                                                }
                                            });
                                        } else {
                                            setProp((props: RootContainerProps) => (props.gapY = value));
                                        }
                                    }}
                                    options={spacingOptions}
                                />
                            );
                        })()}
                    </div>

                    <div>
                        <Label htmlFor="paddingX">Horizontal Padding</Label>
                        {(() => {
                            const effectivePaddingX = useGlobalTokens 
                                ? (globalSettings.container.paddingX ?? '@spacing.0') 
                                : (paddingX ?? '@spacing.0');
                            return (
                                <SelectOptionsRenderer
                                    id="paddingX"
                                    value={effectivePaddingX}
                                    onChange={(value) => {
                                        if (useGlobalTokens) {
                                            updateGlobalSettings({
                                                container: {
                                                    ...globalSettings.container,
                                                    paddingX: value === '@spacing.0' ? undefined : value
                                                }
                                            });
                                        } else {
                                            setProp((props: RootContainerProps) => (props.paddingX = value));
                                        }
                                    }}
                                    options={spacingOptions}
                                />
                            );
                        })()}
                    </div>

                    <div>
                        <Label htmlFor="paddingY">Vertical Padding</Label>
                        {(() => {
                            const effectivePaddingY = useGlobalTokens 
                                ? (globalSettings.container.paddingY ?? '@spacing.0') 
                                : (paddingY ?? '@spacing.0');
                            return (
                                <SelectOptionsRenderer
                                    id="paddingY"
                                    value={effectivePaddingY}
                                    onChange={(value) => {
                                        if (useGlobalTokens) {
                                            updateGlobalSettings({
                                                container: {
                                                    ...globalSettings.container,
                                                    paddingY: value === '@spacing.0' ? undefined : value
                                                }
                                            });
                                        } else {
                                            setProp((props: RootContainerProps) => (props.paddingY = value));
                                        }
                                    }}
                                    options={spacingOptions}
                                />
                            );
                        })()}
                    </div>
                </CardContent>
            </Card>

            {/* Manual Overrides (when global tokens are disabled) */}
            {!useGlobalTokens && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Manual Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <Label htmlFor="manualBackground">Background</Label>
                            <SelectOptionsRenderer
                                id="manualBackground"
                                value={background}
                                onChange={(value) =>
                                    setProp((props: RootContainerProps) => (props.background = value))
                                }
                                options={colorOptions}
                            />
                        </div>

                        <div>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={isTransparent}
                                    onChange={(e) =>
                                        setProp((props: RootContainerProps) => (props.isTransparent = e.target.checked))
                                    }
                                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                                <span className="text-sm font-medium text-gray-700">Transparent Background</span>
                            </label>
                        </div>

                        <div>
                            <Label htmlFor="manualFlexDirection">Layout Direction</Label>
                            <SelectOptionsRenderer
                                id="manualFlexDirection"
                                value={flexDirection}
                                onChange={(value) =>
                                    setProp((props: RootContainerProps) => (props.flexDirection = value as 'row' | 'column'))
                                }
                                options={layoutDirectionOptions}
                            />
                        </div>

                        <div>
                            <Label htmlFor="manualGap">Gap</Label>
                            <SelectOptionsRenderer
                                id="manualGap"
                                value={gap || '@spacing.0'}
                                onChange={(value) =>
                                    setProp((props: RootContainerProps) => (props.gap = value))
                                }
                                options={spacingOptions}
                            />
                        </div>

                        <div>
                            <Label htmlFor="manualPadding">Padding</Label>
                            <SelectOptionsRenderer
                                id="manualPadding"
                                value={padding || '@spacing.0'}
                                onChange={(value) =>
                                    setProp((props: RootContainerProps) => (props.padding = value))
                                }
                                options={spacingOptions}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
