import React from 'react';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export const KeyboardShortcutsHandler: React.FC = () => {
  useKeyboardShortcuts();
  return null; // This component doesn't render anything
};

export default KeyboardShortcutsHandler;
