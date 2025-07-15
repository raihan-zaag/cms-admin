import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizable } from 're-resizable';

interface ContainerProps {
    background?: string;
    padding?: number;
    margin?: number;
    children?: React.ReactNode;
    width?: string;
    height?: string;
    minWidth?: number;
    minHeight?: number;
}

interface ContainerComponent extends React.FC<ContainerProps> {
    craft?: {
        props: ContainerProps;
        rules?: {
            canDrag?: () => boolean;
            canDrop?: () => boolean;
            canMoveIn?: () => boolean;
            canMoveOut?: () => boolean;
        };
        related: {
            settings: React.FC;
        };
        displayName?: string;
    };
}

export const Container: ContainerComponent = ({
    background = '#ffffff',
    padding = 10,
    margin = 10,
    children,
    width = '100%',
    height = 'auto',
    
}) => {
    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp }
    } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
    }));

    return (
        <Resizable
            size={{
                width: width,
                height: height,
            }}
            onResizeStop={(_, __, ref) => {
                setProp((props: ContainerProps) => {
                    props.width = ref.style.width;
                    props.height = ref.style.height;
                });
            }}
            bounds="parent"
            handleStyles={{
                top: { zIndex: 1000 },
                right: { zIndex: 1000 },
                bottom: { zIndex: 1000 },
                left: { zIndex: 1000 },
                topRight: { zIndex: 1000 },
                bottomRight: { zIndex: 1000 },
                bottomLeft: { zIndex: 1000 },
                topLeft: { zIndex: 1000 },
            }}

            style={{
                background,
                border: selected ? '2px dashed #3b82f6' : '2px solid #e5e7eb',
                borderRadius: '4px',
            }}
        >
            <div
                ref={(ref) => {
                    if (ref) {
                        connect(drag(ref));
                    }
                }}
                style={{
                    margin: `${margin}px`,
                    padding: `${padding}px`,
                    background: background,
                    width: '100%',
                    height: '200px',
                }}
            >
                {children}
            </div>

        </Resizable>

    );
};

// Settings component for the Container
export const ContainerSettings: React.FC = () => {
    const {
        actions: { setProp },
        background,
        padding,
        margin,
        minWidth,
        minHeight,
    } = useNode((node) => ({
        background: node.data.props.background,
        padding: node.data.props.padding,
        margin: node.data.props.margin,
        minWidth: node.data.props.minWidth,
        minHeight: node.data.props.minHeight,
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
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Padding
                </label>
                <input
                    type="range"
                    min="0"
                    max="50"
                    value={padding}
                    onChange={(e) =>
                        setProp((props: ContainerProps) => (props.padding = parseInt(e.target.value)))
                    }
                    className="mt-1 block w-full"
                />
                <span className="text-sm text-gray-500">{padding}px</span>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Margin
                </label>
                <input
                    type="range"
                    min="0"
                    max="50"
                    value={margin}
                    onChange={(e) =>
                        setProp((props: ContainerProps) => (props.margin = parseInt(e.target.value)))
                    }
                    className="mt-1 block w-full"
                />
                <span className="text-sm text-gray-500">{margin}px</span>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Min Width
                </label>
                <input
                    type="number"
                    value={minWidth}
                    onChange={(e) =>
                        setProp((props: ContainerProps) => (props.minWidth = parseInt(e.target.value)))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Min Height
                </label>
                <input
                    type="number"
                    value={minHeight}
                    onChange={(e) =>
                        setProp((props: ContainerProps) => (props.minHeight = parseInt(e.target.value)))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
        </div>
    );
};

Container.craft = {
    props: {
        background: '#ffffff',
        padding: 10,
        margin: 0,
        width: '100%',
        height: 'auto',
        minWidth: 100,
        minHeight: 50,
    },
    rules: {
        canDrag: () => true,
        canDrop: () => true,
        canMoveIn: () => true,
        canMoveOut: () => true,
    },
    related: {
        settings: ContainerSettings,
    },
    displayName: 'Container',
};
