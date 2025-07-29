import { useDesignTokenOptions, type SelectOption } from './designTokenOptions';

/**
 * Specialized hook for Craft.js component settings
 * Provides pre-configured option combinations commonly used in editor components
 */
export const useCraftDesignTokenOptions = () => {
  const {
    fontFamilyOptions,
    colorOptions,
    spacingOptions,
    borderRadiusOptions,
    containerOptions,
    typographyOptions,
    fontWeightOptions,
    textAlignOptions,
    displayOptions,
    flexDirectionOptions,
    flexWrapOptions,
    justifyContentOptions,
    alignItemsOptions,
    colorOptionsWithTransparency,
  } = useDesignTokenOptions();

  // Enhanced spacing options with 'auto' option for margins
  const spacingWithAutoOptions: SelectOption[] = [
    { value: 'auto', label: 'Auto', description: 'Automatic spacing' },
    ...spacingOptions
  ];

  // Width and height options combining containers and spacing
  const sizeOptions: SelectOption[] = [
    { value: 'auto', label: 'Auto', description: 'Automatic size' },
    { value: '100%', label: 'Full Width/Height (100%)', description: 'Full container size' },
    { value: 'fit-content', label: 'Fit Content', description: 'Size to content' },
    { value: 'min-content', label: 'Min Content', description: 'Minimum required size' },
    { value: 'max-content', label: 'Max Content', description: 'Maximum content size' },
    ...containerOptions,
    ...spacingOptions.filter(option => 
      ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(option.value.split('.').pop() || '')
    )
  ];

  // Button-specific options
  const buttonOptions = {
    backgrounds: colorOptionsWithTransparency,
    textColors: colorOptions,
    borders: borderRadiusOptions,
    sizes: typographyOptions,
    weights: fontWeightOptions,
    spacing: spacingOptions,
  };

  // Text-specific options
  const textOptions = {
    colors: colorOptions,
    backgrounds: colorOptionsWithTransparency,
    fonts: fontFamilyOptions,
    sizes: typographyOptions,
    weights: fontWeightOptions,
    alignment: textAlignOptions,
    spacing: spacingOptions,
  };

  // Container-specific options
  const containerCraftOptions = {
    backgrounds: colorOptionsWithTransparency,
    borders: borderRadiusOptions,
    display: displayOptions,
    flexDirection: flexDirectionOptions,
    flexWrap: flexWrapOptions,
    justifyContent: justifyContentOptions,
    alignItems: alignItemsOptions,
    spacing: spacingOptions,
    padding: spacingOptions,
    margin: spacingWithAutoOptions,
    sizes: sizeOptions,
    maxWidth: containerOptions,
  };

  // Image-specific options
  const imageOptions = {
    borders: borderRadiusOptions,
    spacing: spacingOptions,
    sizes: sizeOptions,
  };

  return {
    // Base options
    fontFamilyOptions,
    colorOptions,
    spacingOptions,
    borderRadiusOptions,
    containerOptions,
    typographyOptions,
    fontWeightOptions,
    textAlignOptions,
    displayOptions,
    flexDirectionOptions,
    flexWrapOptions,
    justifyContentOptions,
    alignItemsOptions,
    colorOptionsWithTransparency,
    spacingWithAutoOptions,
    sizeOptions,
    
    // Component-specific option groups
    buttonOptions,
    textOptions,
    containerCraftOptions,
    imageOptions,
  };
};

/**
 * Helper function to create design token select components for Craft.js settings
 */
export const createDesignTokenSelect = (
  options: SelectOption[],
  value: string | undefined,
  onChange: (value: string) => void,
  defaultValue?: string
) => ({
  options,
  value: value || defaultValue || '',
  onChange,
  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
});

/**
 * Common design token patterns for Craft.js components
 */
export const craftTokenPatterns = {
  // Color patterns
  isColorToken: (value: string) => value.startsWith('@color.'),
  isSpacingToken: (value: string) => value.startsWith('@spacing.'),
  isTypographyToken: (value: string) => value.startsWith('@typography.'),
  isBorderRadiusToken: (value: string) => value.startsWith('@radius.'),
  isContainerToken: (value: string) => value.startsWith('@container.'),
  isFontToken: (value: string) => value.startsWith('@font.'),
  
  // Value extractors
  extractTokenType: (tokenValue: string) => {
    if (!tokenValue.startsWith('@')) return null;
    return tokenValue.split('.')[0].substring(1);
  },
  
  extractTokenName: (tokenValue: string) => {
    if (!tokenValue.startsWith('@')) return null;
    return tokenValue.split('.').slice(1).join('.');
  },
};
