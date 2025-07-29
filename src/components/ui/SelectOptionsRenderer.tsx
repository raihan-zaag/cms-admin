import React from 'react';
import type { SelectOption } from '@/lib/designTokenOptions';

/**
 * Utility component for rendering select options
 */
export const SelectOptionsRenderer: React.FC<{
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id?: string;
}> = ({ options, value, onChange, className, id }) => {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
