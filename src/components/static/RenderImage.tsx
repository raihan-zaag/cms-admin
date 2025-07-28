import React from 'react';

interface RenderImageProps {
  children?: React.ReactNode;
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  objectFit?: string;
  objectPosition?: string;
  borderRadius?: number;
  opacity?: number;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  border?: string;
  boxShadow?: string;
  isFullWidth?: boolean;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const RenderImage: React.FC<RenderImageProps> = ({
  children,
  src,
  alt = '',
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
  objectPosition = 'center',
  borderRadius = 0,
  opacity = 1,
  backgroundImage,
  backgroundSize = 'cover',
  backgroundPosition = 'center',
  backgroundRepeat = 'no-repeat',
  border = 'none',
  boxShadow = 'none',
  isFullWidth = false,
  paddingTop = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
}) => {
  const paddingValue = `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;
  const marginValue = `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`;

  // If we have a backgroundImage, render as a div with background
  if (backgroundImage) {
    return (
      <div
        style={{
          width: isFullWidth ? '100%' : width,
          height,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize,
          backgroundPosition,
          backgroundRepeat,
          borderRadius: `${borderRadius}px`,
          opacity,
          border,
          boxShadow,
          padding: paddingValue,
          margin: marginValue,
          position: 'relative',
        }}
      >
        {children}
      </div>
    );
  }

  // If we have an src, render as img tag
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{
          width: isFullWidth ? '100%' : width,
          height,
          objectFit: objectFit as any,
          objectPosition,
          borderRadius: `${borderRadius}px`,
          opacity,
          border,
          boxShadow,
          padding: paddingValue,
          margin: marginValue,
        }}
      />
    );
  }

  // Fallback - render empty div
  return (
    <div
      style={{
        width: isFullWidth ? '100%' : width,
        height,
        borderRadius: `${borderRadius}px`,
        opacity,
        border,
        boxShadow,
        padding: paddingValue,
        margin: marginValue,
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
      }}
    >
      {children || alt || 'No Image'}
    </div>
  );
};
