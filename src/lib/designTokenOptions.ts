import { useDesignTokensStore } from '@/store/design-tokens';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

/**
 * Generate select options from design tokens store
 */
export const useDesignTokenOptions = () => {
  const { tokens, currentTheme } = useDesignTokensStore();

  // Font family options
  const fontFamilyOptions: SelectOption[] = [
    {
      value: '@font.primary',
      label: 'Primary Font',
      description: tokens.typography.fontFamily.primary
    },
    {
      value: '@font.secondary',
      label: 'Secondary Font',
      description: tokens.typography.fontFamily.secondary
    },
    {
      value: '@font.mono',
      label: 'Mono Font',
      description: tokens.typography.fontFamily.mono
    }
  ];

  // Color options - dynamically generated from current theme
  const themeColors = currentTheme === 'auto' ? tokens.colors.light : tokens.colors[currentTheme];
  const colorOptions: SelectOption[] = Object.entries(themeColors).map(([key, token]) => ({
    value: `@color.${key}`,
    label: `${token.name}`,
    description: token.value
  }));

  // Spacing options - dynamically generated
  const spacingOptions: SelectOption[] = Object.entries(tokens.spacing).map(([key, token]) => ({
    value: `@spacing.${key}`,
    label: `${token.name} (${token.px}px)`,
    description: token.value
  }));

  // Border radius options - dynamically generated
  const borderRadiusOptions: SelectOption[] = Object.entries(tokens.borderRadius).map(([key, token]) => ({
    value: `@radius.${key}`,
    label: `${token.name}`,
    description: token.value
  }));

  // Container options - dynamically generated
  const containerOptions: SelectOption[] = Object.entries(tokens.containers).map(([key, token]) => ({
    value: `@container.${key}`,
    label: `${token.name} (${token.maxWidth})`,
    description: `Max width: ${token.maxWidth}, Padding: ${token.padding}`
  }));

  // Layout direction options
  const layoutDirectionOptions: SelectOption[] = [
    {
      value: 'column',
      label: 'Column (Vertical)',
      description: 'Stack components vertically'
    },
    {
      value: 'row',
      label: 'Row (Horizontal)',
      description: 'Arrange components horizontally'
    }
  ];

  // Justify content options
  const justifyContentOptions: SelectOption[] = [
    {
      value: 'flex-start',
      label: 'Start',
      description: 'Align to start of container'
    },
    {
      value: 'center',
      label: 'Center',
      description: 'Center in container'
    },
    {
      value: 'flex-end',
      label: 'End',
      description: 'Align to end of container'
    },
    {
      value: 'space-between',
      label: 'Space Between',
      description: 'Equal space between items'
    },
    {
      value: 'space-around',
      label: 'Space Around',
      description: 'Equal space around items'
    },
    {
      value: 'space-evenly',
      label: 'Space Evenly',
      description: 'Equal space everywhere'
    }
  ];

  // Align items options
  const alignItemsOptions: SelectOption[] = [
    {
      value: 'stretch',
      label: 'Stretch',
      description: 'Stretch to fill cross axis'
    },
    {
      value: 'flex-start',
      label: 'Start',
      description: 'Align to start of cross axis'
    },
    {
      value: 'center',
      label: 'Center',
      description: 'Center on cross axis'
    },
    {
      value: 'flex-end',
      label: 'End',
      description: 'Align to end of cross axis'
    }
  ];

  // Typography/Font size options - dynamically generated
  const typographyOptions: SelectOption[] = Object.entries(tokens.typography.fontSizes).map(([key, token]) => ({
    value: `@typography.${key}`,
    label: `${token.name} (${token.fontSize})`,
    description: `Size: ${token.fontSize}, Line Height: ${token.lineHeight}, Weight: ${token.fontWeight}`
  }));

  // Font weight options
  const fontWeightOptions: SelectOption[] = [
    { value: 'normal', label: 'Normal (400)', description: 'Regular font weight' },
    { value: 'medium', label: 'Medium (500)', description: 'Medium font weight' },
    { value: 'semibold', label: 'Semi Bold (600)', description: 'Semi bold font weight' },
    { value: 'bold', label: 'Bold (700)', description: 'Bold font weight' },
    { value: 'extrabold', label: 'Extra Bold (800)', description: 'Extra bold font weight' },
  ];

  // Text alignment options
  const textAlignOptions: SelectOption[] = [
    { value: 'left', label: 'Left', description: 'Align text to the left' },
    { value: 'center', label: 'Center', description: 'Center align text' },
    { value: 'right', label: 'Right', description: 'Align text to the right' },
    { value: 'justify', label: 'Justify', description: 'Justify text alignment' },
  ];

  // Display options for containers
  const displayOptions: SelectOption[] = [
    { value: 'block', label: 'Block', description: 'Block level element' },
    { value: 'flex', label: 'Flex', description: 'Flexbox container' },
    { value: 'grid', label: 'Grid', description: 'CSS Grid container' },
    { value: 'inline-block', label: 'Inline Block', description: 'Inline block element' },
  ];

  // Flex direction options
  const flexDirectionOptions: SelectOption[] = [
    { value: 'row', label: 'Row', description: 'Horizontal layout' },
    { value: 'column', label: 'Column', description: 'Vertical layout' },
    { value: 'row-reverse', label: 'Row Reverse', description: 'Horizontal layout (reversed)' },
    { value: 'column-reverse', label: 'Column Reverse', description: 'Vertical layout (reversed)' },
  ];

  // Flex wrap options
  const flexWrapOptions: SelectOption[] = [
    { value: 'nowrap', label: 'No Wrap', description: 'Items stay on one line' },
    { value: 'wrap', label: 'Wrap', description: 'Items wrap to new lines' },
    { value: 'wrap-reverse', label: 'Wrap Reverse', description: 'Items wrap to new lines (reversed)' },
  ];

  // Enhanced color options with transparency
  const colorOptionsWithTransparency: SelectOption[] = [
    { value: 'transparent', label: 'Transparent', description: 'Fully transparent' },
    ...colorOptions
  ];

  return {
    fontFamilyOptions,
    colorOptions,
    spacingOptions,
    borderRadiusOptions,
    containerOptions,
    layoutDirectionOptions,
    justifyContentOptions,
    alignItemsOptions,
    // New options for Craft.js components
    typographyOptions,
    fontWeightOptions,
    textAlignOptions,
    displayOptions,
    flexDirectionOptions,
    flexWrapOptions,
    colorOptionsWithTransparency,
  };
};
