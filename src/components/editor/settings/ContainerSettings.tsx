import React from 'react';
import { useNode } from '@craftjs/core';
import { SpacingSettings } from './SpacingSettings';
import { useDesignTokensStore } from '../../../store/design-tokens';

interface ContainerProps {
    background?: string;
    isTransparent?: boolean;
    paddingTop?: number | string;
    paddingRight?: number | string;
    paddingBottom?: number | string;
    paddingLeft?: number | string;
    marginTop?: number | string;
    marginRight?: number | string;
    marginBottom?: number | string;
    marginLeft?: number | string;
    children?: React.ReactNode;
    width?: string;
    height?: string;
    flexDirection?: 'row' | 'column';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'stretch' | 'flex-start' | 'center' | 'flex-end';
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: number | string;
    radius?: number | string;
    useDesignTokens?: boolean;
}

export const ContainerSettings: React.FC = () => {
    const {
        actions: { setProp },
        background,
        isTransparent,
        flexDirection,
        justifyContent,
        alignItems,
        flexWrap,
        gap,
        radius,
        width,
        useDesignTokens,
    } = useNode((node) => ({
        background: node.data.props.background,
        isTransparent: node.data.props.isTransparent,
        flexDirection: node.data.props.flexDirection,
        justifyContent: node.data.props.justifyContent,
        alignItems: node.data.props.alignItems,
        flexWrap: node.data.props.flexWrap,
        gap: node.data.props.gap,
        radius: node.data.props.radius,
        width: node.data.props.width,
        useDesignTokens: node.data.props.useDesignTokens,
    }));

    const tokens = useDesignTokensStore();

    return (
        <div className="space-y-4">
            <div>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={useDesignTokens}
                        onChange={(e) =>
                            setProp((props: ContainerProps) => (props.useDesignTokens = e.target.checked))
                        }
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="text-sm font-medium text-gray-700">Use Design Tokens</span>
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Width {useDesignTokens && '(or Token)'}
                </label>
                {useDesignTokens ? (
                    <select
                        value={width}
                        onChange={(e) =>
                            setProp((props: ContainerProps) => (props.width = e.target.value))
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    >
                        <option value="@container.xs">Extra Small (320px)</option>
                        <option value="@container.sm">Small (480px)</option>
                        <option value="@container.md">Medium (768px)</option>
                        <option value="@container.lg">Large (1024px)</option>
                        <option value="@container.xl">Extra Large (1280px)</option>
                        <option value="@container.full">Full Width (100%)</option>
                        {Object.keys(tokens.tokens.containers).map(containerKey => (
                            <option key={containerKey} value={`@container.${containerKey}`}>
                                {containerKey} Token
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        value={width}
                        onChange={(e) =>
                            setProp((props: ContainerProps) => (props.width = e.target.value))
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        placeholder="e.g., 100%, 500px, auto"
                    />
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Background Color {useDesignTokens && '(or Token)'}
                </label>
                {useDesignTokens ? (
                    <select
                        value={background}
                        onChange={(e) =>
                            setProp((props: ContainerProps) => (props.background = e.target.value))
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    >
                        <option value="transparent">Transparent</option>
                        <option value="@color.background">Background Color</option>
                        <option value="@color.primary">Primary Color</option>
                        <option value="@color.secondary">Secondary Color</option>
                        <option value="@color.accent">Accent Color</option>
                        <option value="@color.muted">Muted Color</option>
                        {Object.keys(tokens.tokens.colors.light).map(colorKey => (
                            <option key={colorKey} value={`@color.${colorKey}`}>
                                {colorKey} Token
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="color"
                        value={background}
                        onChange={(e) =>
                            setProp((props: ContainerProps) => (props.background = e.target.value))
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        disabled={isTransparent}
                    />
                )}
            </div>

            <div>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={isTransparent}
                        onChange={(e) =>
                            setProp((props: ContainerProps) => (props.isTransparent = e.target.checked))
                        }
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="text-sm font-medium text-gray-700">Transparent Background</span>
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Border Radius {useDesignTokens && '(or Token)'}
                </label>
                {useDesignTokens ? (
                    <select
                        value={radius}
                        onChange={(e) =>
                            setProp((props: ContainerProps) => (props.radius = e.target.value))
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    >
                        <option value="@radius.none">None (0px)</option>
                        <option value="@radius.sm">Small (4px)</option>
                        <option value="@radius.md">Medium (8px)</option>
                        <option value="@radius.lg">Large (12px)</option>
                        <option value="@radius.xl">Extra Large (16px)</option>
                        <option value="@radius.full">Full (50%)</option>
                        {Object.keys(tokens.tokens.borderRadius).map(radiusKey => (
                            <option key={radiusKey} value={`@radius.${radiusKey}`}>
                                {radiusKey} Token
                            </option>
                        ))}
                    </select>
                ) : (
                    <div>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={typeof radius === 'number' ? radius : 8}
                            onChange={(e) =>
                                setProp((props: ContainerProps) => (props.radius = parseInt(e.target.value)))
                            }
                            className="mt-1 block w-full"
                        />
                        <span className="text-sm text-gray-500">{typeof radius === 'number' ? radius : 8}px</span>
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Gap {useDesignTokens && '(or Token)'}
                </label>
                {useDesignTokens ? (
                    <select
                        value={gap}
                        onChange={(e) =>
                            setProp((props: ContainerProps) => (props.gap = e.target.value))
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    >
                        <option value="@spacing.xs">Extra Small (4px)</option>
                        <option value="@spacing.sm">Small (8px)</option>
                        <option value="@spacing.md">Medium (16px)</option>
                        <option value="@spacing.lg">Large (24px)</option>
                        <option value="@spacing.xl">Extra Large (32px)</option>
                        <option value="@spacing.2xl">2X Large (48px)</option>
                        {Object.keys(tokens.tokens.spacing).map(spacingKey => (
                            <option key={spacingKey} value={`@spacing.${spacingKey}`}>
                                {spacingKey} Token
                            </option>
                        ))}
                    </select>
                ) : (
                    <div>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={typeof gap === 'number' ? gap : 16}
                            onChange={(e) =>
                                setProp((props: ContainerProps) => (props.gap = parseInt(e.target.value)))
                            }
                            className="mt-1 block w-full"
                        />
                        <span className="text-sm text-gray-500">{typeof gap === 'number' ? gap : 16}px</span>
                    </div>
                )}
            </div>

            <SpacingSettings />

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Layout Direction
                </label>
                <select
                    value={flexDirection}
                    onChange={(e) =>
                        setProp((props: ContainerProps) => (props.flexDirection = e.target.value as 'row' | 'column'))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="column">Column</option>
                    <option value="row">Row</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Justify Content
                </label>
                <select
                    value={justifyContent}
                    onChange={(e) =>
                        setProp((props: ContainerProps) => (props.justifyContent = e.target.value as any))
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
                <label className="block text-sm font-medium text-gray-700">
                    Align Items
                </label>
                <select
                    value={alignItems}
                    onChange={(e) =>
                        setProp((props: ContainerProps) => (props.alignItems = e.target.value as any))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="stretch">Stretch</option>
                    <option value="flex-start">Start</option>
                    <option value="center">Center</option>
                    <option value="flex-end">End</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Flex Wrap
                </label>
                <select
                    value={flexWrap}
                    onChange={(e) =>
                        setProp((props: ContainerProps) => (props.flexWrap = e.target.value as any))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="nowrap">No Wrap</option>
                    <option value="wrap">Wrap</option>
                    <option value="wrap-reverse">Wrap Reverse</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Gap
                </label>
                <input
                    type="range"
                    min="0"
                    max="50"
                    value={gap}
                    onChange={(e) =>
                        setProp((props: ContainerProps) => (props.gap = parseInt(e.target.value)))
                    }
                    className="mt-1 block w-full"
                />
                <span className="text-sm text-gray-500">{gap}px</span>
            </div>
        </div>
    );
};
