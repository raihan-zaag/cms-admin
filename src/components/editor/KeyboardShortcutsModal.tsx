import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
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
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <Keyboard className="h-5 w-5 text-blue-600" />
              <Dialog.Title className="text-lg font-semibold">
                Keyboard Shortcuts
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-sm text-gray-700">{shortcut.action}</span>
                  <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 text-gray-800 rounded border shadow-sm">
                    {shortcut.keys}
                  </kbd>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Keyboard shortcuts only work when the editor is in edit mode and not when typing in text inputs.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t bg-gray-50">
            <Dialog.Close asChild>
              <Button>
                Got it
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default KeyboardShortcutsModal;
