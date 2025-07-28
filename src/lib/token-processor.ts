import { useDesignTokensStore, type DesignTokens, type ThemeMode } from '@/store/design-tokens';

/**
 * Token processor utility for converting design tokens to CSS values
 */
export class TokenProcessor {
  private static instance: TokenProcessor;
  private tokens: DesignTokens;
  private currentTheme: ThemeMode;

  constructor() {
    const store = useDesignTokensStore.getState();
    this.tokens = store.tokens;
    this.currentTheme = store.currentTheme;
  }

  static getInstance(): TokenProcessor {
    if (!TokenProcessor.instance) {
      TokenProcessor.instance = new TokenProcessor();
    }
    return TokenProcessor.instance;
  }

  /**
   * Update the processor with current store state
   */
  updateState(tokens: DesignTokens, currentTheme: ThemeMode) {
    this.tokens = tokens;
    this.currentTheme = currentTheme;
  }

  /**
   * Process a token reference and return the actual CSS value
   * @param tokenRef - Token reference like '@color.primary' or '@spacing.4'
   * @returns The actual CSS value or the original string if not a token
   */
  processToken(tokenRef: string): string {
    if (!tokenRef.startsWith('@')) {
      return tokenRef;
    }

    const tokenPath = tokenRef.substring(1); // Remove @
    const parts = tokenPath.split('.');

    if (parts.length < 2) {
      return tokenRef;
    }

    const [category, ...keyParts] = parts;
    const key = keyParts.join('.');

    switch (category) {
      case 'color':
        return this.getColorToken(key);
      case 'spacing':
        return this.getSpacingToken(key);
      case 'typography':
        return this.getTypographyToken(key, keyParts);
      case 'radius':
        return this.getBorderRadiusToken(key);
      case 'breakpoint':
        return this.getBreakpointToken(key);
      case 'container':
        return this.getContainerToken(key, keyParts);
      case 'font':
        return this.getFontFamilyToken(key);
      default:
        return tokenRef;
    }
  }

  private getColorToken(key: string): string {
    const themeColors = this.currentTheme === 'dark' ? this.tokens.colors.dark : this.tokens.colors.light;
    return themeColors[key]?.value || `var(--color-${key}, currentColor)`;
  }

  private getSpacingToken(key: string): string {
    return this.tokens.spacing[key]?.value || `var(--spacing-${key}, 0)`;
  }

  private getTypographyToken(key: string, parts: string[]): string {
    if (parts.length === 1) {
      // @typography.lg - return fontSize
      return this.tokens.typography.fontSizes[key]?.fontSize || `var(--font-size-${key}, 1rem)`;
    }
    
    // @typography.lg.lineHeight
    const [sizeKey, property] = parts;
    const token = this.tokens.typography.fontSizes[sizeKey];
    
    if (!token) return `var(--font-${property}-${sizeKey}, inherit)`;
    
    switch (property) {
      case 'fontSize':
        return token.fontSize;
      case 'lineHeight':
        return token.lineHeight;
      case 'fontWeight':
        return token.fontWeight;
      case 'letterSpacing':
        return token.letterSpacing || 'normal';
      default:
        return `var(--font-${property}-${sizeKey}, inherit)`;
    }
  }

  private getBorderRadiusToken(key: string): string {
    return this.tokens.borderRadius[key]?.value || `var(--radius-${key}, 0)`;
  }

  private getBreakpointToken(key: string): string {
    return this.tokens.breakpoints[key]?.value || `var(--breakpoint-${key}, 0px)`;
  }

  private getContainerToken(key: string, parts: string[]): string {
    if (parts.length === 1) {
      // @container.lg - return maxWidth
      return this.tokens.containers[key]?.maxWidth || `var(--container-${key}, 100%)`;
    }
    
    // @container.lg.padding
    const [containerKey, property] = parts;
    const token = this.tokens.containers[containerKey];
    
    if (!token) return `var(--container-${property}-${containerKey}, auto)`;
    
    switch (property) {
      case 'maxWidth':
        return token.maxWidth;
      case 'padding':
        return token.padding;
      default:
        return `var(--container-${property}-${containerKey}, auto)`;
    }
  }

  private getFontFamilyToken(key: string): string {
    switch (key) {
      case 'primary':
        return this.tokens.typography.fontFamily.primary;
      case 'secondary':
        return this.tokens.typography.fontFamily.secondary;
      case 'mono':
        return this.tokens.typography.fontFamily.mono;
      default:
        return `var(--font-family-${key}, inherit)`;
    }
  }

  /**
   * Process multiple token references in a string
   * @param input - String that may contain multiple token references
   * @returns String with all token references replaced
   */
  processMultipleTokens(input: string): string {
    const tokenRegex = /@[\w.-]+/g;
    return input.replace(tokenRegex, (match) => this.processToken(match));
  }

  /**
   * Process CSS-like object with token references
   * @param styles - Object with CSS properties that may contain token references
   * @returns Object with token references replaced with actual values
   */
  processStyleObject(styles: Record<string, any>): Record<string, any> {
    const processed: Record<string, any> = {};
    
    for (const [property, value] of Object.entries(styles)) {
      if (typeof value === 'string') {
        processed[property] = this.processMultipleTokens(value);
      } else {
        processed[property] = value;
      }
    }
    
    return processed;
  }

  /**
   * Generate CSS custom properties for all tokens
   * @returns CSS string with custom properties
   */
  generateCSSCustomProperties(): string {
    const css: string[] = [':root {'];

    // Color tokens
    const themeColors = this.currentTheme === 'dark' ? this.tokens.colors.dark : this.tokens.colors.light;
    Object.entries(themeColors).forEach(([key, token]) => {
      css.push(`  --color-${key}: ${token.value};`);
    });

    // Spacing tokens
    Object.entries(this.tokens.spacing).forEach(([key, token]) => {
      css.push(`  --spacing-${key}: ${token.value};`);
    });

    // Typography tokens
    Object.entries(this.tokens.typography.fontSizes).forEach(([key, token]) => {
      css.push(`  --font-size-${key}: ${token.fontSize};`);
      css.push(`  --font-line-height-${key}: ${token.lineHeight};`);
      css.push(`  --font-weight-${key}: ${token.fontWeight};`);
      if (token.letterSpacing) {
        css.push(`  --font-letter-spacing-${key}: ${token.letterSpacing};`);
      }
    });

    // Border radius tokens
    Object.entries(this.tokens.borderRadius).forEach(([key, token]) => {
      css.push(`  --radius-${key}: ${token.value};`);
    });

    // Breakpoint tokens
    Object.entries(this.tokens.breakpoints).forEach(([key, token]) => {
      css.push(`  --breakpoint-${key}: ${token.value};`);
    });

    // Container tokens
    Object.entries(this.tokens.containers).forEach(([key, token]) => {
      css.push(`  --container-${key}: ${token.maxWidth};`);
      css.push(`  --container-padding-${key}: ${token.padding};`);
    });

    // Font family tokens
    css.push(`  --font-family-primary: ${this.tokens.typography.fontFamily.primary};`);
    css.push(`  --font-family-secondary: ${this.tokens.typography.fontFamily.secondary};`);
    css.push(`  --font-family-mono: ${this.tokens.typography.fontFamily.mono};`);

    css.push('}');
    return css.join('\n');
  }
}

// Hook for using token processor in React components
export const useTokenProcessor = () => {
  const store = useDesignTokensStore();
  
  // Update the processor instance when store changes
  const processor = TokenProcessor.getInstance();
  processor.updateState(store.tokens, store.currentTheme);
  
  return {
    processToken: (tokenRef: string) => processor.processToken(tokenRef),
    processMultipleTokens: (input: string) => processor.processMultipleTokens(input),
    processStyleObject: (styles: Record<string, any>) => processor.processStyleObject(styles),
    generateCSS: () => processor.generateCSSCustomProperties()
  };
};
