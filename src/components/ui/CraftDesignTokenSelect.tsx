import React from 'react';
import { SelectOptionsRenderer } from './SelectOptionsRenderer';
import type { SelectOption } from '@/lib/designTokenOptions';
import { craftTokenPatterns } from '@/lib/craftDesignTokenOptions';

interface CraftSelectProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  options: SelectOption[];
  useDesignTokens?: boolean;
  colorInput?: boolean;
  rangeInput?: boolean;
  rangeMin?: number;
  rangeMax?: number;
  rangeStep?: number;
  textInput?: boolean;
  placeholder?: string;
  description?: string;
  id?: string;
}

/**
 * Enhanced select component for Craft.js settings with design token support
 * Automatically switches between design token select and native inputs based on useDesignTokens flag
 */
export const CraftDesignTokenSelect: React.FC<CraftSelectProps> = ({
  label,
  value,
  onChange,
  options,
  useDesignTokens = true,
  colorInput = false,
  rangeInput = false,
  rangeMin = 0,
  rangeMax = 100,
  rangeStep = 1,
  textInput = false,
  placeholder,
  description,
  id,
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  
  // Show color preview for color tokens
  const showColorPreview = colorInput && value && craftTokenPatterns.isColorToken(value);
  
  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
        {label} 
        {useDesignTokens && <span className="text-gray-500 text-xs ml-1">(Design Token)</span>}
        {showColorPreview && (
          <span 
            className="inline-block w-4 h-4 rounded ml-2 border border-gray-300"
            style={{ backgroundColor: value }}
            title={`Color: ${value}`}
          />
        )}
      </label>
      
      {useDesignTokens ? (
        <SelectOptionsRenderer
          id={inputId}
          options={options}
          value={value || ''}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      ) : (
        <>
          {colorInput && (
            <input
              id={inputId}
              type="color"
              value={value && value.startsWith('#') ? value : '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          )}
          
          {rangeInput && (
            <div className="space-y-2">
              <input
                id={inputId}
                type="range"
                min={rangeMin}
                max={rangeMax}
                step={rangeStep}
                value={typeof value === 'string' ? parseFloat(value) || rangeMin : (value || rangeMin)}
                onChange={(e) => onChange(e.target.value)}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-center">
                {value || rangeMin}
              </div>
            </div>
          )}
          
          {textInput && (
            <input
              id={inputId}
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          )}
          
          {!colorInput && !rangeInput && !textInput && (
            <input
              id={inputId}
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || 'Enter value...'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          )}
        </>
      )}
      
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
      
      {useDesignTokens && value && value.startsWith('@') && (
        <div className="text-xs text-blue-600 mt-1">
          <span className="font-medium">Token:</span> {value}
          {options.find(opt => opt.value === value)?.description && (
            <span className="text-gray-500 ml-2">
              • {options.find(opt => opt.value === value)?.description}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Simple toggle for enabling/disabling design tokens in Craft.js components
 */
export const DesignTokenToggle: React.FC<{
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
}> = ({ enabled, onChange, label = "Use Design Tokens" }) => {
  return (
    <div className="mb-4">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </label>
      <p className="text-xs text-gray-500 mt-1">
        {enabled 
          ? "Using design system tokens for consistent styling" 
          : "Using custom values independent of design system"
        }
      </p>
    </div>
  );
};
