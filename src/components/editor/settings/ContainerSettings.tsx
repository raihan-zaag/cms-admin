import React from 'react';
import { useNode } from '@craftjs/core';
import { SpacingSettings } from './SpacingSettings';

interface ContainerProps {
    background?: string;
    isTransparent?: boolean;
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    children?: React.ReactNode;
    width?: string;
    height?: string;
    flexDirection?: 'row' | 'column';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'stretch' | 'flex-start' | 'center' | 'flex-end';
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: number;
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
    } = useNode((node) => ({
        background: node.data.props.background,
        isTransparent: node.data.props.isTransparent,
        flexDirection: node.data.props.flexDirection,
        justifyContent: node.data.props.justifyContent,
        alignItems: node.data.props.alignItems,
        flexWrap: node.data.props.flexWrap,
        gap: node.data.props.gap,
    }));

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Background Color
                </label>
                <input
                    type="color"
                    value={background}
                    onChange={(e) =>
                        setProp((props: ContainerProps) => (props.background = e.target.value))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    disabled={isTransparent}
                />
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
