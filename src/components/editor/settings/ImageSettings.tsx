import React, { useState } from 'react';
import { useNode } from '@craftjs/core';
import { Folder } from 'lucide-react';
import { MediaPicker } from '../MediaPicker';

interface ImageComponentProps {
    src?: string;
    alt?: string;
    width?: string;
    height?: string;
    minWidth?: number;
    minHeight?: number;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    objectPosition?: string;
    borderRadius?: number;
    opacity?: number;
    backgroundImage?: string;
    backgroundSize?: 'cover' | 'contain' | 'auto' | '100% 100%';
    backgroundPosition?: string;
    backgroundRepeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
    padding?: number;
    margin?: number;
    border?: string;
    boxShadow?: string;
    isFullWidth?: boolean;
    children?: React.ReactNode;
}

export const ImageSettings: React.FC = () => {
    const {
        actions: { setProp },
        src,
        alt,
        width,
        height,
        minWidth,
        minHeight,
        objectFit,
        objectPosition,
        borderRadius,
        opacity,
        backgroundImage,
        backgroundSize,
        backgroundPosition,
        backgroundRepeat,
        padding,
        margin,
        border,
        boxShadow,
        isFullWidth,
    } = useNode((node) => ({
        src: node.data.props.src,
        alt: node.data.props.alt,
        width: node.data.props.width,
        height: node.data.props.height,
        minWidth: node.data.props.minWidth,
        minHeight: node.data.props.minHeight,
        objectFit: node.data.props.objectFit,
        objectPosition: node.data.props.objectPosition,
        borderRadius: node.data.props.borderRadius,
        opacity: node.data.props.opacity,
        backgroundImage: node.data.props.backgroundImage,
        backgroundSize: node.data.props.backgroundSize,
        backgroundPosition: node.data.props.backgroundPosition,
        backgroundRepeat: node.data.props.backgroundRepeat,
        padding: node.data.props.padding,
        margin: node.data.props.margin,
        border: node.data.props.border,
        boxShadow: node.data.props.boxShadow,
        isFullWidth: node.data.props.isFullWidth,
    }));

    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [mediaPickerMode, setMediaPickerMode] = useState<'foreground' | 'background'>('foreground');

    const handleMediaSelect = (url: string) => {
        if (mediaPickerMode === 'background') {
            setProp((props: ImageComponentProps) => (props.backgroundImage = url));
        } else {
            setProp((props: ImageComponentProps) => (props.src = url));
        }
        setShowMediaPicker(false);
    };

    const openMediaPicker = (mode: 'foreground' | 'background') => {
        setMediaPickerMode(mode);
        setShowMediaPicker(true);
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Image Source
                </label>
                <div className="mt-1 flex gap-2">
                    <input
                        type="url"
                        value={src}
                        onChange={(e) =>
                            setProp((props: ImageComponentProps) => (props.src = e.target.value))
                        }
                        className="flex-1 rounded-md border-gray-300 shadow-sm"
                        placeholder="https://example.com/image.jpg"
                    />
                    <button
                        onClick={() => openMediaPicker('foreground')}
                        className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                    >
                        <Folder className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <MediaPicker
                isOpen={showMediaPicker}
                onSelect={handleMediaSelect}
                onClose={() => setShowMediaPicker(false)}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Alt Text
                </label>
                <input
                    type="text"
                    value={alt}
                    onChange={(e) =>
                        setProp((props: ImageComponentProps) => (props.alt = e.target.value))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    placeholder="Describe the image"
                />
            </div>

            <div>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isFullWidth}
                        onChange={(e) =>
                            setProp((props: ImageComponentProps) => (props.isFullWidth = e.target.checked))
                        }
                        className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Full Width (100%)</span>
                </label>
            </div>

            {!isFullWidth && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Width
                    </label>
                    <input
                        type="text"
                        value={width}
                        onChange={(e) =>
                            setProp((props: ImageComponentProps) => (props.width = e.target.value))
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        placeholder="300px or 50%"
                    />
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Height
                </label>
                <input
                    type="text"
                    value={height}
                    onChange={(e) =>
                        setProp((props: ImageComponentProps) => (props.height = e.target.value))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    placeholder="200px or auto"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Object Fit
                </label>
                <select
                    value={objectFit}
                    onChange={(e) =>
                        setProp((props: ImageComponentProps) => (props.objectFit = e.target.value as any))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="fill">Fill</option>
                    <option value="none">None</option>
                    <option value="scale-down">Scale Down</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Object Position
                </label>
                <select
                    value={objectPosition}
                    onChange={(e) =>
                        setProp((props: ImageComponentProps) => (props.objectPosition = e.target.value))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="top left">Top Left</option>
                    <option value="top right">Top Right</option>
                    <option value="bottom left">Bottom Left</option>
                    <option value="bottom right">Bottom Right</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Background Image
                </label>
                <div className="mt-1 flex gap-2">
                    <input
                        type="url"
                        value={backgroundImage}
                        onChange={(e) =>
                            setProp((props: ImageComponentProps) => (props.backgroundImage = e.target.value))
                        }
                        className="flex-1 rounded-md border-gray-300 shadow-sm"
                        placeholder="https://example.com/background.jpg"
                    />
                    <button
                        onClick={() => openMediaPicker('background')}
                        className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                    >
                        <Folder className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Background Size
                </label>
                <select
                    value={backgroundSize}
                    onChange={(e) =>
                        setProp((props: ImageComponentProps) => (props.backgroundSize = e.target.value as any))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="auto">Auto</option>
                    <option value="100% 100%">Stretch</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Background Position
                </label>
                <select
                    value={backgroundPosition}
                    onChange={(e) =>
                        setProp((props: ImageComponentProps) => (props.backgroundPosition = e.target.value))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="top left">Top Left</option>
                    <option value="top right">Top Right</option>
                    <option value="bottom left">Bottom Left</option>
                    <option value="bottom right">Bottom Right</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Background Repeat
                </label>
                <select
                    value={backgroundRepeat}
                    onChange={(e) =>
                        setProp((props: ImageComponentProps) => (props.backgroundRepeat = e.target.value as any))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="no-repeat">No Repeat</option>
                    <option value="repeat">Repeat</option>
                    <option value="repeat-x">Repeat X</option>
                    <option value="repeat-y">Repeat Y</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Border Radius
                </label>
                <input
                    type="range"
                    min="0"
                    max="50"
                    value={borderRadius}
                    onChange={(e) =>
                        setProp((props: ImageComponentProps) => (props.borderRadius = parseInt(e.target.value)))
                    }
                    className="mt-1 block w-full"
                />
                <span className="text-sm text-gray-500">{borderRadius}px</span>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Opacity
                </label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={opacity}
                    onChange={(e) =>
                        setProp((props: ImageComponentProps) => (props.opacity = parseFloat(e.target.value)))
                    }
                    className="mt-1 block w-full"
                />
                <span className="text-sm text-gray-500">{Math.round(opacity * 100)}%</span>
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
                        setProp((props: ImageComponentProps) => (props.padding = parseInt(e.target.value)))
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
                        setProp((props: ImageComponentProps) => (props.margin = parseInt(e.target.value)))
                    }
                    className="mt-1 block w-full"
                />
                <span className="text-sm text-gray-500">{margin}px</span>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Border (CSS)
                </label>
                <input
                    type="text"
                    value={border}
                    onChange={(e) =>
                        setProp((props: ImageComponentProps) => (props.border = e.target.value))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    placeholder="1px solid #000"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Box Shadow (CSS)
                </label>
                <input
                    type="text"
                    value={boxShadow}
                    onChange={(e) =>
                        setProp((props: ImageComponentProps) => (props.boxShadow = e.target.value))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    placeholder="0 4px 8px rgba(0,0,0,0.1)"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Min Width
                </label>
                <input
                    type="number"
                    value={minWidth}
                    onChange={(e) =>
                        setProp((props: ImageComponentProps) => (props.minWidth = parseInt(e.target.value)))
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
                        setProp((props: ImageComponentProps) => (props.minHeight = parseInt(e.target.value)))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
        </div>
    );
};
