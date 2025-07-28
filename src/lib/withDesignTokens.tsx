import React from 'react';
import { useTheme } from '@/hooks/useTheme';

// Higher-order component to wrap Craft.js components with design token support
export function withDesignTokens<P extends Record<string, any>>(
  WrappedComponent: React.ComponentType<P>
) {
  const WithDesignTokensComponent = React.forwardRef<any, P>((props, ref) => {
    const { processStyleObject, processToken } = useTheme();

    // Process any style-related props that might contain design tokens
    const processedProps = React.useMemo(() => {
      const processed = { ...props } as any;

      // Common style properties that might contain tokens
      const styleProps = [
        'backgroundColor', 'background',
        'color', 'textColor',
        'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
        'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
        'borderRadius',
        'fontSize', 'fontFamily', 'fontWeight', 'lineHeight',
        'borderColor', 'borderWidth',
        'boxShadow', 'shadow',
        'width', 'height', 'maxWidth', 'minWidth'
      ];

      // Process each style prop if it contains a token reference
      styleProps.forEach(prop => {
        if (processed[prop] && typeof processed[prop] === 'string' && processed[prop].startsWith('@')) {
          processed[prop] = processToken(processed[prop]);
        }
      });

      // If there's a 'style' prop, process it as an object
      if (processed.style && typeof processed.style === 'object') {
        processed.style = processStyleObject(processed.style);
      }

      return processed;
    }, [props, processStyleObject, processToken]);

    return <WrappedComponent {...processedProps as P} ref={ref} />;
  });

  WithDesignTokensComponent.displayName = `withDesignTokens(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithDesignTokensComponent;
}

// Hook for components to use design tokens directly
export const useDesignTokensInComponent = () => {
  const { processToken, processStyleObject } = useTheme();

  const getTokenValue = (tokenRef: string) => {
    return processToken(tokenRef);
  };

  const applyTokensToStyle = (styles: Record<string, any>) => {
    return processStyleObject(styles);
  };

  const createTokenizedStyle = (styleDefinition: Record<string, string>) => {
    return processStyleObject(styleDefinition);
  };

  return {
    getTokenValue,
    applyTokensToStyle,
    createTokenizedStyle,
    processToken,
    processStyleObject
  };
};
