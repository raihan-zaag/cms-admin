import React, { Fragment } from 'react';
import { useNode } from '@craftjs/core';
import { Resizable } from 're-resizable';
import { Image as ImageIcon } from 'lucide-react';
import { ImageSettings } from './settings/ImageSettings';

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

export const ImageComponent: React.FC<ImageComponentProps> & {
    craft?: {
        props: ImageComponentProps;
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
} = ({
    src = '',
    alt = 'Image',
    width = '300px',
    height = '200px',
    minWidth = 50,
    minHeight = 50,
    objectFit = 'cover',
    objectPosition = 'center',
    borderRadius = 0,
    opacity = 1,
    backgroundImage = '',
    backgroundSize = 'cover',
    backgroundPosition = 'center',
    backgroundRepeat = 'no-repeat',
    padding = 0,
    margin = 0,
    border = 'none',
    boxShadow = 'none',
    isFullWidth = false,
    children,
}) => {
        const {
            connectors: { connect, drag },
            selected,
            actions: { setProp }
        } = useNode((state) => ({
            selected: state.events.selected,
            dragged: state.events.dragged,
        }));

        const containerStyle = {
            width: '100%',
            height: '100%',
            margin: `${margin}px`,
            padding: `${padding}px`,
            border: border,
            boxShadow: boxShadow,
            borderRadius: `${borderRadius}px`,
            position: 'relative' as const,
            overflow: 'hidden' as const,
        };

        const imageStyle = {
            width: '100%',
            height: '100%',
            objectFit: objectFit,
            objectPosition: objectPosition,
            display: 'block',
        };

        return (
            <Resizable
                size={{
                    width: isFullWidth ? '100%' : width,
                    height: height,
                }}
                onResizeStop={(_, __, ref) => {
                    setProp((props: ImageComponentProps) => {
                        if (!props.isFullWidth) {
                            props.width = ref.style.width;
                        }
                        props.height = ref.style.height;
                    });
                }}
                minWidth={minWidth}
                minHeight={minHeight}
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
                    border: selected ? '2px dashed #3b82f6' : '2px solid #e5e7eb',
                    borderRadius: '4px',
                }}
                enable={{
                    left: !isFullWidth,
                    right: !isFullWidth,
                    top: true,
                    bottom: true,
                    topLeft: !isFullWidth,
                    topRight: !isFullWidth,
                    bottomLeft: !isFullWidth,
                    bottomRight: !isFullWidth,
                }}
            >
                <div
                    ref={(ref) => {
                        if (ref) {
                            connect(drag(ref));
                        }
                    }}
                    style={{
                        ...containerStyle,
                        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                        backgroundSize: backgroundSize,
                        backgroundPosition: backgroundPosition,
                        backgroundRepeat: backgroundRepeat,
                        opacity: opacity,
                        minHeight: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Image section - only show if there's an image or no children */}
                    {(src || !children) && (
                        <div style={{ 
                            flex: children && src ? '0 0 auto' : '1',
                            position: 'relative',
                            minHeight: children && src ? '120px' : '200px',
                        }}>
                            {src ? (
                                <img
                                    src={src}
                                    alt={alt}
                                    style={{
                                        ...imageStyle,
                                        height: children ? '120px' : '100%',
                                        minHeight: children ? '120px' : '200px',
                                    }}
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        minHeight: '200px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: backgroundImage ? 'transparent' : '#f3f4f6',
                                        color: '#6b7280',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }}
                                >
                                    <ImagePlaceholder />
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* Children section */}
                    {children && (
                        <div style={{ 
                            padding: '10px',
                            flex: '1',
                            position: 'relative',
                            minHeight: '50px',
                        }}>
                            {children}
                        </div>
                    )}
                </div>
            </Resizable>
        );
    };


const ImagePlaceholder: React.FC = () => {
    return (
        <Fragment>
            <ImageIcon className="h-12 w-12 mb-2 text-gray-400" />
            <p className="text-center">
                No image selected
            </p>
            <p className="text-xs text-gray-400 mt-1">
                Configure image in settings panel
            </p>
        </Fragment>
    )
}

ImageComponent.craft = {
    props: {
        src: '',
        alt: 'Image',
        width: '300px',
        height: '200px',
        minWidth: 50,
        minHeight: 50,
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: 0,
        opacity: 1,
        backgroundImage: '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: 0,
        margin: 0,
        border: 'none',
        boxShadow: 'none',
        isFullWidth: false,
    },
    rules: {
        canDrag: () => true,
        canDrop: () => true,
        canMoveIn: () => true,
        canMoveOut: () => true,
    },
    related: {
        settings: ImageSettings,
    },
    displayName: 'ImageComponent',
};


// TODO: Put another component here that uses this ImageComponent is stretch example