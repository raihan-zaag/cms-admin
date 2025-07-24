import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: 'Ctrl/Cmd + Z', action: 'Undo last action' },
    { keys: 'Ctrl/Cmd + Y', action: 'Redo last undone action' },
    { keys: 'Ctrl/Cmd + Shift + Z', action: 'Redo (alternative)' },
    { keys: 'Ctrl/Cmd + C', action: 'Copy selected element' },
    { keys: 'Ctrl/Cmd + V', action: 'Paste copied element' },
    { keys: 'Ctrl/Cmd + D', action: 'Duplicate selected element' },
    { keys: 'Delete / Backspace', action: 'Delete selected element' },
    { keys: 'Ctrl/Cmd + ↑', action: 'Move element up' },
    { keys: 'Ctrl/Cmd + ↓', action: 'Move element down' },
    { keys: 'Escape', action: 'Close modal/dialog' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-sm text-gray-600">{shortcut.action}</span>
                <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 rounded border">
                  {shortcut.keys}
                </kbd>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> Keyboard shortcuts only work when the editor is in edit mode and not when typing in text inputs.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyboardShortcutsModal;
