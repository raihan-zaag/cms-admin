import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '@/services/api';
import { convertCraftJsonToHtml } from '@/lib/convertCraftJsonToHtml';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  RotateCcw, 
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface PageData {
  id: string;
  title: string;
  slug: string;
  content: any;
  status: 'draft' | 'published';
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

export function PagePreview() {
  const { pageId } = useParams<{ pageId: string }>();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDevice, setCurrentDevice] = useState<DeviceType>('desktop');
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const loadPage = async () => {
      if (!pageId) {
        // Check if it's a temporary preview
        if (pageId?.startsWith('temp-')) {
          const tempData = sessionStorage.getItem(`preview-${pageId}`);
          if (tempData) {
            try {
              const craftJson = JSON.parse(tempData);
              setPageData({
                id: pageId,
                title: 'Preview',
                slug: 'preview',
                content: craftJson,
                status: 'draft'
              });
              setLoading(false);
              return;
            } catch (err) {
              console.error('Error parsing temp data:', err);
            }
          }
        }
        
        setError('No page ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await apiService.getPage(pageId);
        setPageData(response);
      } catch (err) {
        console.error('Error loading page:', err);
        
        // Check for temporary preview data as fallback
        if (pageId?.startsWith('temp-')) {
          const tempData = sessionStorage.getItem(`preview-${pageId}`);
          if (tempData) {
            try {
              const craftJson = JSON.parse(tempData);
              setPageData({
                id: pageId,
                title: 'Preview',
                slug: 'preview',
                content: craftJson,
                status: 'draft'
              });
              setLoading(false);
              return;
            } catch (parseErr) {
              console.error('Error parsing temp data:', parseErr);
            }
          }
        }
        
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [pageId]);

  const getDeviceStyles = () => {
    const baseStyles = 'transition-all duration-300 mx-auto bg-white shadow-xl h-[800px]';
    
    switch (currentDevice) {
      case 'mobile':
        return `${baseStyles} w-[375px] max-w-[375px] border-8 border-gray-800 rounded-[24px] overflow-hidden`;
      case 'tablet':
        return `${baseStyles} w-[768px] max-w-[768px] border-4 border-gray-600 rounded-[20px] overflow-hidden`;
      case 'desktop':
      default:
        return `${baseStyles} w-full max-w-[1580px] border border-gray-200 rounded-xl overflow-hidden`;
    }
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const zoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const resetZoom = () => setZoom(100);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts if not typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case '1':
          setCurrentDevice('desktop');
          break;
        case '2':
          setCurrentDevice('tablet');
          break;
        case '3':
          setCurrentDevice('mobile');
          break;
        case '=':
        case '+':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
        case '0':
          e.preventDefault();
          resetZoom();
          break;
        case 'r':
        case 'R':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            window.location.reload();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Preview</h2>
          <p className="text-gray-600">Please wait while we prepare your page...</p>
        </div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-md text-center">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Preview Error</h1>
            <p className="text-gray-600 mb-6">{error || 'Page not found'}</p>
            <button 
              onClick={() => window.close()} 
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Convert Craft.js JSON to HTML
  let htmlContent = '';
  try {
    if (pageData.content && typeof pageData.content === 'object') {
      htmlContent = convertCraftJsonToHtml(pageData.content);
    } else if (typeof pageData.content === 'string') {
      htmlContent = pageData.content;
    }
  } catch (err) {
    console.error('Error converting content to HTML:', err);
    htmlContent = '<div class="p-8 text-center"><h1>Error rendering page content</h1></div>';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Preview Toolbar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Title and Status */}
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">
                {pageData.title}
              </h1>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                pageData.status === 'published' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {pageData.status.charAt(0).toUpperCase() + pageData.status.slice(1)}
              </span>
            </div>

            {/* Center: Device Switcher */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentDevice('desktop')}
                className={`p-3 rounded-md transition-all duration-200 ${
                  currentDevice === 'desktop' 
                    ? 'bg-white text-blue-600 shadow-sm scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                title="Desktop View (1580px)"
              >
                <Monitor className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentDevice('tablet')}
                className={`p-3 rounded-md transition-all duration-200 ${
                  currentDevice === 'tablet' 
                    ? 'bg-white text-blue-600 shadow-sm scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentDevice('mobile')}
                className={`p-3 rounded-md transition-all duration-200 ${
                  currentDevice === 'mobile' 
                    ? 'bg-white text-blue-600 shadow-sm scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="h-5 w-5" />
              </button>
            </div>

            {/* Right: Zoom Controls and Refresh */}
            <div className="flex items-center space-x-3">
              {/* Zoom Controls */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={zoomOut}
                  disabled={zoom <= 50}
                  className="p-2 rounded text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  onClick={resetZoom}
                  className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                  title="Reset Zoom"
                >
                  {zoom}%
                </button>
                <button
                  onClick={zoomIn}
                  disabled={zoom >= 200}
                  className="p-2 rounded text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
                title="Refresh Preview"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="py-12 px-4">
        <div 
          className={getDeviceStyles()}
          style={{ 
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center'
          }}
        >
          <div 
            className="min-h-[800px] overflow-auto"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        </div>
      </div>

      {/* Device Info */}
      <div className="fixed bottom-6 left-6 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-3 rounded-lg shadow-lg border border-gray-200">
        <div className="text-sm font-medium">
          {currentDevice === 'desktop' && '🖥️ Desktop View'}
          {currentDevice === 'tablet' && '📱 Tablet View'}
          {currentDevice === 'mobile' && '📲 Mobile View'}
        </div>
        <div className="text-xs text-gray-600 mt-1">
          {currentDevice === 'desktop' && '1580px max width'}
          {currentDevice === 'tablet' && '768px width'}
          {currentDevice === 'mobile' && '375px width'}
          {' • Zoom: '}{zoom}%
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-3 rounded-lg shadow-lg border border-gray-200">
        <div className="text-sm font-medium mb-2">⌨️ Keyboard Shortcuts</div>
        <div className="text-xs text-gray-600 space-y-1">
          <div><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">1</kbd>, <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">2</kbd>, <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">3</kbd> Switch devices</div>
          <div><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">+</kbd>, <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">-</kbd> Zoom in/out</div>
          <div><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">0</kbd> Reset zoom</div>
          <div><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">R</kbd> Refresh page</div>
        </div>
      </div>
    </div>
  );
}

export default PagePreview;
