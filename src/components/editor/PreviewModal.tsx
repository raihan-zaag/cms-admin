import React, { useState, useRef, useEffect } from 'react';
import { useEditor } from '@craftjs/core';
import { convertCraftJsonToHtml } from '@/lib/convertCraftJsonToHtml';
import { generateFullHtmlDocument } from '@/lib/utils';
import { Eye, Code, Download, ExternalLink, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose }) => {
  const { query } = useEditor();
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const previewRef = useRef<HTMLIFrameElement>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const craftJson = JSON.parse(query.serialize());
  const htmlContent = convertCraftJsonToHtml(craftJson);
  const fullHtmlDocument = generateFullHtmlDocument(htmlContent);

  const deviceDimensions = {
    desktop: { width: '100%', height: '600px' },
    tablet: { width: '768px', height: '600px' },
    mobile: { width: '375px', height: '600px' },
  };

  const handleDownload = () => {
    const blob = new Blob([fullHtmlDocument], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page-preview.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(fullHtmlDocument);
    // You might want to add a toast notification here
  };

  const handleOpenInNewTab = () => {
    const blob = new Blob([fullHtmlDocument], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[90vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <CardTitle className="text-xl">Page Preview</CardTitle>
          
          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1 rounded text-sm flex items-center gap-2 ${
                  viewMode === 'preview' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="h-4 w-4" />
                Preview
              </button>
              <button
                onClick={() => setViewMode('code')}
                className={`px-3 py-1 rounded text-sm flex items-center gap-2 ${
                  viewMode === 'code' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Code className="h-4 w-4" />
                Code
              </button>
            </div>

            {/* Device Toggle - Only show in preview mode */}
            {viewMode === 'preview' && (
              <div className="flex bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setDevice('desktop')}
                  className={`px-3 py-1 rounded text-sm ${
                    device === 'desktop' 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Desktop
                </button>
                <button
                  onClick={() => setDevice('tablet')}
                  className={`px-3 py-1 rounded text-sm ${
                    device === 'tablet' 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Tablet
                </button>
                <button
                  onClick={() => setDevice('mobile')}
                  className={`px-3 py-1 rounded text-sm ${
                    device === 'mobile' 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Mobile
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <Button variant="outline" size="sm" onClick={handleCopyCode}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Code
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleOpenInNewTab}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in Tab
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            
            <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
              Close
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0">
          {viewMode === 'preview' ? (
            <div className="h-full flex items-center justify-center bg-gray-50">
              <div 
                className="bg-white shadow-lg border"
                style={{
                  width: deviceDimensions[device].width,
                  height: deviceDimensions[device].height,
                  maxWidth: '100%',
                  resize: device === 'desktop' ? 'both' : 'none',
                  overflow: 'auto',
                }}
              >
                <iframe
                  ref={previewRef}
                  srcDoc={fullHtmlDocument}
                  className="w-full h-full border-0"
                  title="Page Preview"
                />
              </div>
            </div>
          ) : (
            <div className="h-full p-4">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-md h-full overflow-auto text-sm">
                <code>{fullHtmlDocument}</code>
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewModal;
