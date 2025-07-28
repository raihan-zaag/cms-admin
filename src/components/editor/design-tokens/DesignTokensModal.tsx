import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Palette } from 'lucide-react';
import { DesignTokensPanel } from './DesignTokensPanel';

export const DesignTokensModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button - Fixed Position */}
      <div className="fixed left-4 bottom-4 z-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-blue-600 hover:bg-blue-700"
              title="Open Design Tokens"
            >
              <Palette className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-white">
            <DialogHeader className="px-6 py-4 border-b bg-white">
              <DialogTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Design Tokens System
              </DialogTitle>
            </DialogHeader>
            
            <div className="h-[calc(90vh-80px)] overflow-hidden bg-white">
              <DesignTokensPanel />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
