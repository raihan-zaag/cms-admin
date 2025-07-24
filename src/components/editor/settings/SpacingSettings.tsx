import React from 'react';
import { useNode } from '@craftjs/core';

interface SpacingProps {
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    [key: string]: any;
}

export const SpacingSettings: React.FC = () => {
    const {
        actions: { setProp },
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
    } = useNode((node) => ({
        paddingTop: node.data.props.paddingTop,
        paddingRight: node.data.props.paddingRight,
        paddingBottom: node.data.props.paddingBottom,
        paddingLeft: node.data.props.paddingLeft,
        marginTop: node.data.props.marginTop,
        marginRight: node.data.props.marginRight,
        marginBottom: node.data.props.marginBottom,
        marginLeft: node.data.props.marginLeft,
    }));

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Padding
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-xs font-medium text-gray-600">Top</label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={paddingTop || 0}
                            onChange={(e) =>
                                setProp((props: SpacingProps) => (props.paddingTop = parseInt(e.target.value)))
                            }
                            className="mt-1 block w-full"
                        />
                        <span className="text-xs text-gray-500">{paddingTop || 0}px</span>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600">Right</label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={paddingRight || 0}
                            onChange={(e) =>
                                setProp((props: SpacingProps) => (props.paddingRight = parseInt(e.target.value)))
                            }
                            className="mt-1 block w-full"
                        />
                        <span className="text-xs text-gray-500">{paddingRight || 0}px</span>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600">Bottom</label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={paddingBottom || 0}
                            onChange={(e) =>
                                setProp((props: SpacingProps) => (props.paddingBottom = parseInt(e.target.value)))
                            }
                            className="mt-1 block w-full"
                        />
                        <span className="text-xs text-gray-500">{paddingBottom || 0}px</span>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600">Left</label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={paddingLeft || 0}
                            onChange={(e) =>
                                setProp((props: SpacingProps) => (props.paddingLeft = parseInt(e.target.value)))
                            }
                            className="mt-1 block w-full"
                        />
                        <span className="text-xs text-gray-500">{paddingLeft || 0}px</span>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Margin
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-xs font-medium text-gray-600">Top</label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={marginTop || 0}
                            onChange={(e) =>
                                setProp((props: SpacingProps) => (props.marginTop = parseInt(e.target.value)))
                            }
                            className="mt-1 block w-full"
                        />
                        <span className="text-xs text-gray-500">{marginTop || 0}px</span>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600">Right</label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={marginRight || 0}
                            onChange={(e) =>
                                setProp((props: SpacingProps) => (props.marginRight = parseInt(e.target.value)))
                            }
                            className="mt-1 block w-full"
                        />
                        <span className="text-xs text-gray-500">{marginRight || 0}px</span>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600">Bottom</label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={marginBottom || 0}
                            onChange={(e) =>
                                setProp((props: SpacingProps) => (props.marginBottom = parseInt(e.target.value)))
                            }
                            className="mt-1 block w-full"
                        />
                        <span className="text-xs text-gray-500">{marginBottom || 0}px</span>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600">Left</label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={marginLeft || 0}
                            onChange={(e) =>
                                setProp((props: SpacingProps) => (props.marginLeft = parseInt(e.target.value)))
                            }
                            className="mt-1 block w-full"
                        />
                        <span className="text-xs text-gray-500">{marginLeft || 0}px</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
