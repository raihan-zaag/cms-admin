import React from 'react';
import { useNode } from '@craftjs/core';
import { Resizable } from 're-resizable';
import { Image as ImageIcon } from 'lucide-react';
import { ImageSettings } from './settings/ImageSettings';
import {
    type SpacingProps,
    getContentStyles,
    getDefaultCraftSpacing,
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
    objectFit = 'contain',
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
            actions: { setProp },
        } = useNode((state) => ({
            selected: state.events.selected,
        }));

        const contentSpacing = getContentStyles({
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
        });

        return (
            <Resizable
                size={{
                    width: isFullWidth ? '100%' : width,
                    height,
                }}
                onResizeStop={(_, __, ref) => {
                    setProp((props: ImageComponentProps) => {
                        if (!props.isFullWidth) props.width = ref.style.width;
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
                        ...contentSpacing,
                        border,
                        boxShadow,
                        borderRadius: `${borderRadius}px`,
                        opacity,
                        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                        backgroundSize,
                        backgroundPosition,
                        backgroundRepeat,
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                    }}
                >
                    {src ? (
                        <img
                            src={src}
                            alt={alt}
                            style={{
                                width: '100%',
                                height: children ? 'auto' : '100%',
                                objectFit,
                                objectPosition,
                                display: 'block',
                                flexShrink: 0,
                            }}
                            onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                            }}
                        />
                    ) : (
                        <ImagePlaceholder />
                    )}

                    {children && (
                        <div
                            style={{
                                padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
                                flex: 1,
                                minHeight: '50px',
                                position: 'relative',
                            }}
                        >
                            {children}
                        </div>
                    )}
                </div>
            </Resizable>
        );
    };

const ImagePlaceholder: React.FC = () => (
    <div
        style={{
            flex: 1,
            minHeight: '200px',
            backgroundColor: '#f3f4f6',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            padding: '1rem',
        }}
    >
        <ImageIcon className="h-12 w-12 mb-2 text-gray-400" />
        <p>No image selected</p>
        <p className="text-xs text-gray-400 mt-1">Configure image in settings panel</p>
    </div>
);

ImageComponent.craft = {
    props: {
        src: '',
        alt: 'Image',
        width: '300px',
        height: '200px',
        objectFit: 'contain',
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
