import React from 'react';
import { useNode } from '@craftjs/core';
import { SpacingSettings } from './SpacingSettings';

interface GridContainerProps {
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
}

export const GridContainerSettings: React.FC = () => {
    const {
        actions: { setProp },
        background,
        isTransparent,
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
    } = useNode((node) => ({
        background: node.data.props.background,
        isTransparent: node.data.props.isTransparent,
        gridTemplateColumns: node.data.props.gridTemplateColumns,
        gridTemplateRows: node.data.props.gridTemplateRows,
        gridGap: node.data.props.gridGap,
        gridColumnGap: node.data.props.gridColumnGap,
        gridRowGap: node.data.props.gridRowGap,
        justifyItems: node.data.props.justifyItems,
        alignItems: node.data.props.alignItems,
        justifyContent: node.data.props.justifyContent,
        alignContent: node.data.props.alignContent,
        gridAutoFlow: node.data.props.gridAutoFlow,
        gridAutoColumns: node.data.props.gridAutoColumns,
        gridAutoRows: node.data.props.gridAutoRows,
    }));

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Background Color
                </label>
                <div className="mt-1 flex space-x-2">
                    <input
                        type="color"
                        value={background}
                        onChange={(e) =>
                            setProp((props: GridContainerProps) => (props.background = e.target.value))
                        }
                        className="h-10 w-16 border border-gray-300 rounded cursor-pointer"
                    />
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isTransparent}
                            onChange={(e) =>
                                setProp((props: GridContainerProps) => (props.isTransparent = e.target.checked))
                            }
                            className="mr-2"
                        />
                        Transparent
                    </label>
                </div>
            </div>

            {/* Grid Layout Settings */}
            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Grid Layout</h3>
                
                {/* Grid Template Columns */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600">
                        Grid Columns
                    </label>
                    <select
                        value={gridTemplateColumns}
                        onChange={(e) =>
                            setProp((props: GridContainerProps) => (props.gridTemplateColumns = e.target.value))
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="1fr">1 Column</option>
                        <option value="repeat(2, 1fr)">2 Columns</option>
                        <option value="repeat(3, 1fr)">3 Columns</option>
                        <option value="repeat(4, 1fr)">4 Columns</option>
                        <option value="1fr 2fr">1:2 Ratio</option>
                        <option value="2fr 1fr">2:1 Ratio</option>
                        <option value="auto 1fr">Auto + Flex</option>
                        <option value="200px 1fr">Fixed + Flex</option>
                    </select>
                </div>

                {/* Grid Template Rows */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600">
                        Grid Rows
                    </label>
                    <select
                        value={gridTemplateRows}
                        onChange={(e) =>
                            setProp((props: GridContainerProps) => (props.gridTemplateRows = e.target.value))
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="auto">Auto</option>
                        <option value="repeat(2, 1fr)">2 Rows</option>
                        <option value="repeat(3, 1fr)">3 Rows</option>
                        <option value="repeat(4, 1fr)">4 Rows</option>
                        <option value="auto 1fr">Auto + Flex</option>
                        <option value="100px auto">Fixed + Auto</option>
                    </select>
                </div>

                {/* Grid Gap */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600">
                        Grid Gap: {gridGap}px
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={gridGap}
                        onChange={(e) =>
                            setProp((props: GridContainerProps) => (props.gridGap = parseInt(e.target.value)))
                        }
                        className="mt-1 w-full"
                    />
                </div>

                {/* Column Gap */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600">
                        Column Gap: {gridColumnGap}px
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={gridColumnGap}
                        onChange={(e) =>
                            setProp((props: GridContainerProps) => (props.gridColumnGap = parseInt(e.target.value)))
                        }
                        className="mt-1 w-full"
                    />
                </div>

                {/* Row Gap */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600">
                        Row Gap: {gridRowGap}px
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={gridRowGap}
                        onChange={(e) =>
                            setProp((props: GridContainerProps) => (props.gridRowGap = parseInt(e.target.value)))
                        }
                        className="mt-1 w-full"
                    />
                </div>
            </div>

            {/* Grid Alignment Settings */}
            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Grid Alignment</h3>
                
                {/* Justify Items */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600">
                        Justify Items
                    </label>
                    <select
                        value={justifyItems}
                        onChange={(e) =>
                            setProp((props: GridContainerProps) => (props.justifyItems = e.target.value as any))
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="start">Start</option>
                        <option value="end">End</option>
                        <option value="center">Center</option>
                        <option value="stretch">Stretch</option>
                    </select>
                </div>

                {/* Align Items */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600">
                        Align Items
                    </label>
                    <select
                        value={alignItems}
                        onChange={(e) =>
                            setProp((props: GridContainerProps) => (props.alignItems = e.target.value as any))
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="start">Start</option>
                        <option value="end">End</option>
                        <option value="center">Center</option>
                        <option value="stretch">Stretch</option>
                    </select>
                </div>

                {/* Justify Content */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600">
                        Justify Content
                    </label>
                    <select
                        value={justifyContent}
                        onChange={(e) =>
                            setProp((props: GridContainerProps) => (props.justifyContent = e.target.value as any))
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="start">Start</option>
                        <option value="end">End</option>
                        <option value="center">Center</option>
                        <option value="stretch">Stretch</option>
                        <option value="space-around">Space Around</option>
                        <option value="space-between">Space Between</option>
                        <option value="space-evenly">Space Evenly</option>
                    </select>
                </div>

                {/* Align Content */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600">
                        Align Content
                    </label>
                    <select
                        value={alignContent}
                        onChange={(e) =>
                            setProp((props: GridContainerProps) => (props.alignContent = e.target.value as any))
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="start">Start</option>
                        <option value="end">End</option>
                        <option value="center">Center</option>
                        <option value="stretch">Stretch</option>
                        <option value="space-around">Space Around</option>
                        <option value="space-between">Space Between</option>
                        <option value="space-evenly">Space Evenly</option>
                    </select>
                </div>
            </div>

            {/* Advanced Grid Settings */}
            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Advanced</h3>
                
                {/* Grid Auto Flow */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600">
                        Auto Flow
                    </label>
                    <select
                        value={gridAutoFlow}
                        onChange={(e) =>
                            setProp((props: GridContainerProps) => (props.gridAutoFlow = e.target.value as any))
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="row">Row</option>
                        <option value="column">Column</option>
                        <option value="row dense">Row Dense</option>
                        <option value="column dense">Column Dense</option>
                    </select>
                </div>

                {/* Grid Auto Columns */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600">
                        Auto Columns
                    </label>
                    <input
                        type="text"
                        value={gridAutoColumns}
                        onChange={(e) =>
                            setProp((props: GridContainerProps) => (props.gridAutoColumns = e.target.value))
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="auto, min-content, 200px, etc."
                    />
                </div>

                {/* Grid Auto Rows */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600">
                        Auto Rows
                    </label>
                    <input
                        type="text"
                        value={gridAutoRows}
                        onChange={(e) =>
                            setProp((props: GridContainerProps) => (props.gridAutoRows = e.target.value))
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="auto, min-content, 100px, etc."
                    />
                </div>
            </div>

            {/* Spacing Settings */}
            <SpacingSettings />
        </div>
    );
};
