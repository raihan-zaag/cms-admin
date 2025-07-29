import React from 'react';
import { useNode } from '@craftjs/core';
import { useGlobalDesignTokens } from '@/hooks/useGlobalDesignTokens';
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
                            <select
                                id="primaryFont"
                                value={globalSettings.fontFamily.primary}
                                onChange={(e) =>
                                    updateGlobalSettings({
                                        fontFamily: { 
                                            ...globalSettings.fontFamily, 
                                            primary: e.target.value 
                                        }
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="@typography.primary">Primary Font (@typography.primary)</option>
                                <option value="@typography.secondary">Secondary Font (@typography.secondary)</option>
                                <option value="@typography.mono">Mono Font (@typography.mono)</option>
                            </select>
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
                            <select
                                id="backgroundColor"
                                value={globalSettings.colors.background}
                                onChange={(e) =>
                                    updateGlobalSettings({
                                        colors: { 
                                            ...globalSettings.colors, 
                                            background: e.target.value 
                                        }
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="@color.background">Background (@color.background)</option>
                                <option value="@color.surface">Surface (@color.surface)</option>
                                <option value="@color.primary">Primary (@color.primary)</option>
                                <option value="@color.secondary">Secondary (@color.secondary)</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="textColor">Text Color</Label>
                            <select
                                id="textColor"
                                value={globalSettings.colors.text}
                                onChange={(e) =>
                                    updateGlobalSettings({
                                        colors: { 
                                            ...globalSettings.colors, 
                                            text: e.target.value 
                                        }
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="@color.text">Text (@color.text)</option>
                                <option value="@color.textMuted">Text Muted (@color.textMuted)</option>
                                <option value="@color.primary">Primary (@color.primary)</option>
                                <option value="@color.secondary">Secondary (@color.secondary)</option>
                            </select>
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
                            <select
                                id="flexDirection"
                                value={globalSettings.layout.flexDirection}
                                onChange={(e) =>
                                    updateGlobalSettings({
                                        layout: { 
                                            ...globalSettings.layout, 
                                            flexDirection: e.target.value as 'row' | 'column'
                                        }
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="column">Column</option>
                                <option value="row">Row</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="justifyContent">Justify Content</Label>
                            <select
                                id="justifyContent"
                                value={globalSettings.layout.justifyContent}
                                onChange={(e) =>
                                    updateGlobalSettings({
                                        layout: { 
                                            ...globalSettings.layout, 
                                            justifyContent: e.target.value 
                                        }
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="flex-start">Start</option>
                                <option value="center">Center</option>
                                <option value="flex-end">End</option>
                                <option value="space-between">Space Between</option>
                                <option value="space-around">Space Around</option>
                                <option value="space-evenly">Space Evenly</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="alignItems">Align Items</Label>
                            <select
                                id="alignItems"
                                value={globalSettings.layout.alignItems}
                                onChange={(e) =>
                                    updateGlobalSettings({
                                        layout: { 
                                            ...globalSettings.layout, 
                                            alignItems: e.target.value 
                                        }
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="stretch">Stretch</option>
                                <option value="flex-start">Start</option>
                                <option value="center">Center</option>
                                <option value="flex-end">End</option>
                            </select>
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
                            <select
                                id="maxWidth"
                                value={globalSettings.container.maxWidth}
                                onChange={(e) =>
                                    updateGlobalSettings({
                                        container: { 
                                            ...globalSettings.container, 
                                            maxWidth: e.target.value 
                                        }
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="@container.sm">Small (640px)</option>
                                <option value="@container.md">Medium (768px)</option>
                                <option value="@container.lg">Large (1024px)</option>
                                <option value="@container.xl">Extra Large (1280px)</option>
                                <option value="@container.2xl">2X Large (1400px)</option>
                                <option value="@container.full">Full Width</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="borderRadius">Border Radius</Label>
                            <select
                                id="borderRadius"
                                value={globalSettings.container.borderRadius}
                                onChange={(e) =>
                                    updateGlobalSettings({
                                        container: { 
                                            ...globalSettings.container, 
                                            borderRadius: e.target.value 
                                        }
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="@radius.none">None</option>
                                <option value="@radius.sm">Small</option>
                                <option value="@radius.md">Medium</option>
                                <option value="@radius.lg">Large</option>
                                <option value="@radius.xl">Extra Large</option>
                                <option value="@radius.full">Full</option>
                            </select>
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
                        <select
                            id="gapX"
                            value={gapX || ''}
                            onChange={(e) =>
                                setProp((props: RootContainerProps) => (props.gapX = e.target.value || undefined))
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Use default gap</option>
                            <option value="@spacing.none">None (0px)</option>
                            <option value="@spacing.xs">Extra Small (4px)</option>
                            <option value="@spacing.sm">Small (8px)</option>
                            <option value="@spacing.md">Medium (16px)</option>
                            <option value="@spacing.lg">Large (24px)</option>
                            <option value="@spacing.xl">Extra Large (32px)</option>
                            <option value="@spacing.2xl">2X Large (40px)</option>
                            <option value="@spacing.3xl">3X Large (48px)</option>
                        </select>
                        
                    </div>

                    <div>
                        <Label htmlFor="gapY">Row Gap (Vertical)</Label>
                        <select
                            id="gapY"
                            value={gapY || ''}
                            onChange={(e) =>
                                setProp((props: RootContainerProps) => (props.gapY = e.target.value || undefined))
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Use default gap</option>
                            <option value="@spacing.none">None (0px)</option>
                            <option value="@spacing.xs">Extra Small (4px)</option>
                            <option value="@spacing.sm">Small (8px)</option>
                            <option value="@spacing.md">Medium (16px)</option>
                            <option value="@spacing.lg">Large (24px)</option>
                            <option value="@spacing.xl">Extra Large (32px)</option>
                            <option value="@spacing.2xl">2X Large (40px)</option>
                            <option value="@spacing.3xl">3X Large (48px)</option>
                        </select>
                        
                    </div>

                    <div>
                        <Label htmlFor="paddingX">Horizontal Padding</Label>
                        <select
                            id="paddingX"
                            value={paddingX || ''}
                            onChange={(e) =>
                                setProp((props: RootContainerProps) => (props.paddingX = e.target.value || undefined))
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Use default padding</option>
                            <option value="@spacing.none">None (0px)</option>
                            <option value="@spacing.xs">Extra Small (4px)</option>
                            <option value="@spacing.sm">Small (8px)</option>
                            <option value="@spacing.md">Medium (16px)</option>
                            <option value="@spacing.lg">Large (24px)</option>
                            <option value="@spacing.xl">Extra Large (32px)</option>
                            <option value="@spacing.2xl">2X Large (40px)</option>
                            <option value="@spacing.3xl">3X Large (48px)</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="paddingY">Vertical Padding</Label>
                        <select
                            id="paddingY"
                            value={paddingY || ''}
                            onChange={(e) =>
                                setProp((props: RootContainerProps) => (props.paddingY = e.target.value || undefined))
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Use default padding</option>
                            <option value="@spacing.none">None (0px)</option>
                            <option value="@spacing.xs">Extra Small (4px)</option>
                            <option value="@spacing.sm">Small (8px)</option>
                            <option value="@spacing.md">Medium (16px)</option>
                            <option value="@spacing.lg">Large (24px)</option>
                            <option value="@spacing.xl">Extra Large (32px)</option>
                            <option value="@spacing.2xl">2X Large (40px)</option>
                            <option value="@spacing.3xl">3X Large (48px)</option>
                        </select>
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
                            <select
                                id="manualBackground"
                                value={background}
                                onChange={(e) =>
                                    setProp((props: RootContainerProps) => (props.background = e.target.value))
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="@color.background">Background (@color.background)</option>
                                <option value="@color.surface">Surface (@color.surface)</option>
                                <option value="@color.primary">Primary (@color.primary)</option>
                                <option value="@color.secondary">Secondary (@color.secondary)</option>
                            </select>
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
                            <select
                                id="manualFlexDirection"
                                value={flexDirection}
                                onChange={(e) =>
                                    setProp((props: RootContainerProps) => (props.flexDirection = e.target.value as 'row' | 'column'))
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="column">Column</option>
                                <option value="row">Row</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="manualGap">Gap</Label>
                            <select
                                id="manualGap"
                                value={gap || ''}
                                onChange={(e) =>
                                    setProp((props: RootContainerProps) => (props.gap = e.target.value))
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="">Default</option>
                                <option value="@spacing.none">None (0px)</option>
                                <option value="@spacing.xs">Extra Small (4px)</option>
                                <option value="@spacing.sm">Small (8px)</option>
                                <option value="@spacing.md">Medium (16px)</option>
                                <option value="@spacing.lg">Large (24px)</option>
                                <option value="@spacing.xl">Extra Large (32px)</option>
                                <option value="@spacing.2xl">2X Large (40px)</option>
                                <option value="@spacing.3xl">3X Large (48px)</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="manualPadding">Padding</Label>
                            <select
                                id="manualPadding"
                                value={padding || ''}
                                onChange={(e) =>
                                    setProp((props: RootContainerProps) => (props.padding = e.target.value))
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="">Default</option>
                                <option value="@spacing.none">None (0px)</option>
                                <option value="@spacing.xs">Extra Small (4px)</option>
                                <option value="@spacing.sm">Small (8px)</option>
                                <option value="@spacing.md">Medium (16px)</option>
                                <option value="@spacing.lg">Large (24px)</option>
                                <option value="@spacing.xl">Extra Large (32px)</option>
                                <option value="@spacing.2xl">2X Large (40px)</option>
                                <option value="@spacing.3xl">3X Large (48px)</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
