import React from 'react';
import { useNode } from '@craftjs/core';
import { Image as ImageIcon } from 'lucide-react';
import { useDesignTokensStore } from '@/store/design-tokens';
import { getContentStyles, getDefaultCraftSpacing, type SpacingProps } from '@/lib/spacingUtils';
import { Resizer } from '@/components/common/Resizer';
import { ImageSettings } from '../settings';


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
            selected,
        } = useNode((state) => ({
            selected: state.events.selected,
        }));

        // Subscribe to design token changes to trigger re-renders
        useDesignTokensStore();

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

        const imageContainerStyle: React.CSSProperties = {
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
        };

        const resizerStyle: React.CSSProperties = {
            border: selected ? '2px dashed #3b82f6' : '2px solid #e5e7eb',
            borderRadius: '4px',
            overflow: 'hidden',
        };

        return (
            <Resizer
                propKey={{ width: 'width', height: 'height' }}
                style={resizerStyle}
            >
                <div style={imageContainerStyle}>
                    {/* Render image if src is provided */}
                    {src && (
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
                    )}

                    {/* Show placeholder only when no src AND no children */}
                    {!src && !children && (
                        <ImagePlaceholder hasBackgroundImage={!!backgroundImage} />
                    )}

                    {/* Render children if present */}
                    {children && (
                        <div
                            style={{
                                padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
                                flex: 1,
                                minHeight: src ? '50px' : '200px',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                height: src ? 'auto' : '100%',
                            }}
                        >
                            {children}
                        </div>
                    )}
                </div>
            </Resizer>
        );
    };

const ImagePlaceholder: React.FC<{ hasBackgroundImage?: boolean }> = ({ hasBackgroundImage = false }) => (
    <div
        style={{
            flex: 1,
            minHeight: '200px',
            backgroundColor: hasBackgroundImage ? 'rgba(0,0,0,0.3)' : '#f3f4f6',
            color: hasBackgroundImage ? '#ffffff' : '#6b7280',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            padding: '1rem',
            textShadow: hasBackgroundImage ? '1px 1px 2px rgba(0,0,0,0.8)' : 'none',
            backdropFilter: hasBackgroundImage ? 'blur(1px)' : 'none',
        }}
    >
        <ImageIcon className={`h-12 w-12 mb-2 ${hasBackgroundImage ? 'text-white' : 'text-gray-400'}`} />
        <p style={{ fontWeight: hasBackgroundImage ? '500' : 'normal' }}>
            {hasBackgroundImage ? 'Background image set' : 'No image selected'}
        </p>
        <p className={`text-xs mt-1 ${hasBackgroundImage ? 'text-gray-100' : 'text-gray-400'}`}>
            {hasBackgroundImage ? 'Add foreground image or content' : 'Configure image in settings panel'}
        </p>
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
