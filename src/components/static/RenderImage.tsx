import React from 'react';

interface RenderImageProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  objectFit?: string;
  borderRadius?: number;
}

export const RenderImage: React.FC<RenderImageProps> = ({
  src,
  alt = '',
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
  borderRadius = 0,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width,
        height,
        objectFit,
        borderRadius,
      }}
    />
  );
};
