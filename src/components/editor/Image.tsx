import React, { Fragment } from 'react';
import { useNode } from '@craftjs/core';
import { Resizable } from 're-resizable';
import { Image as ImageIcon } from 'lucide-react';
import { ImageSettings } from './settings/ImageSettings';
import { 
    type SpacingProps, 
    getContentStyles,
    getDefaultCraftSpacing 
} from '../../lib/spacingUtils';

interface ImageComponentProps extends SpacingProps {
    src?: string;
    alt?: string;
    width?: string;
    height?: string;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    objectPosition?: string;
    borderRadius?: number;
    opacity?: number;
    backgroundImage?: string;
    backgroundSize?: 'cover' | 'contain' | 'auto' | '100% 100%';
    backgroundPosition?: string;
    backgroundRepeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
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
    objectFit = 'cover',
    objectPosition = 'center',
    borderRadius = 0,
    opacity = 1,
    backgroundImage = '',
    backgroundSize = 'cover',
    backgroundPosition = 'center',
    backgroundRepeat = 'no-repeat',
    border = 'none',
    boxShadow = 'none',
    isFullWidth = false,
    children,
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
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
            border: border,
            boxShadow: boxShadow,
            borderRadius: `${borderRadius}px`,
            position: 'relative' as const,
            overflow: 'hidden' as const,
            boxSizing: 'border-box' as const,
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
                    overflow: 'hidden',
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
                        ...getContentStyles({ paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft }),
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
                            padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
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
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: 0,
        opacity: 1,
        backgroundImage: '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        border: 'none',
        boxShadow: 'none',
        isFullWidth: false,
        ...getDefaultCraftSpacing(),
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