import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '@/services/api';
import { convertCraftJsonToHtml } from '@/lib/convertCraftJsonToHtml';
import { 
  DEVICE_BREAKPOINTS, 
  ZOOM_SETTINGS, 
  PREVIEW_DIMENSIONS, 
  KEYBOARD_SHORTCUTS
} from '@/constants/devices';
import { STORAGE_KEYS } from '@/constants/layout';
import { UI_COLORS } from '@/constants/ui';
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
  const [zoom, setZoom] = useState(ZOOM_SETTINGS.DEFAULT);

  useEffect(() => {
    const loadPage = async () => {
      if (!pageId) {
        // Check if it's a temporary preview
        if (pageId?.startsWith('temp-')) {
          const tempData = sessionStorage.getItem(STORAGE_KEYS.PREVIEW_DATA(pageId));
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
          const tempData = sessionStorage.getItem(STORAGE_KEYS.PREVIEW_DATA(pageId));
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
    const baseStyles = `transition-all duration-300 mx-auto bg-white shadow-xl h-[${PREVIEW_DIMENSIONS.HEIGHT}px]`;
    
    switch (currentDevice) {
      case 'mobile': {
        const mobile = DEVICE_BREAKPOINTS.MOBILE;
        return `${baseStyles} w-[${mobile.WIDTH}px] max-w-[${mobile.MAX_WIDTH}px] border-${mobile.BORDER_WIDTH} ${mobile.BORDER_COLOR} rounded-[${mobile.BORDER_RADIUS}px] overflow-hidden`;
      }
      case 'tablet': {
        const tablet = DEVICE_BREAKPOINTS.TABLET;
        return `${baseStyles} w-[${tablet.WIDTH}px] max-w-[${tablet.MAX_WIDTH}px] border-${tablet.BORDER_WIDTH} ${tablet.BORDER_COLOR} rounded-[${tablet.BORDER_RADIUS}px] overflow-hidden`;
      }
      case 'desktop':
      default: {
        const desktop = DEVICE_BREAKPOINTS.DESKTOP;
        return `${baseStyles} w-full max-w-[${desktop.WIDTH}px] border ${desktop.BORDER_COLOR} rounded-xl overflow-hidden`;
      }
    }
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + ZOOM_SETTINGS.STEP, ZOOM_SETTINGS.MAX));
  const zoomOut = () => setZoom(prev => Math.max(prev - ZOOM_SETTINGS.STEP, ZOOM_SETTINGS.MIN));
  const resetZoom = () => setZoom(ZOOM_SETTINGS.DEFAULT);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts if not typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case KEYBOARD_SHORTCUTS.DESKTOP:
          setCurrentDevice('desktop');
          break;
        case KEYBOARD_SHORTCUTS.TABLET:
          setCurrentDevice('tablet');
          break;
        case KEYBOARD_SHORTCUTS.MOBILE:
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
        case KEYBOARD_SHORTCUTS.RESET_ZOOM:
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
      <div className={`min-h-screen flex items-center justify-center ${UI_COLORS.GRADIENTS.MAIN}`}>
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
      <div className={`min-h-screen flex items-center justify-center ${UI_COLORS.GRADIENTS.MAIN}`}>
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

  console.log('Rendered HTML content:', htmlContent);

  return (
    <div className={`min-h-screen ${UI_COLORS.GRADIENTS.MAIN}`}>
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
                  ? `${UI_COLORS.STATUS.PUBLISHED.BACKGROUND} ${UI_COLORS.STATUS.PUBLISHED.TEXT}` 
                  : `${UI_COLORS.STATUS.DRAFT.BACKGROUND} ${UI_COLORS.STATUS.DRAFT.TEXT}`
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
                title={`${DEVICE_BREAKPOINTS.DESKTOP.LABEL} (${DEVICE_BREAKPOINTS.DESKTOP.WIDTH}px)`}
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
                title={`${DEVICE_BREAKPOINTS.TABLET.LABEL} (${DEVICE_BREAKPOINTS.TABLET.WIDTH}px)`}
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
                title={`${DEVICE_BREAKPOINTS.MOBILE.LABEL} (${DEVICE_BREAKPOINTS.MOBILE.WIDTH}px)`}
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
                  disabled={zoom <= ZOOM_SETTINGS.MIN}
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
                  disabled={zoom >= ZOOM_SETTINGS.MAX}
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
            className={`min-h-[${PREVIEW_DIMENSIONS.HEIGHT}px] overflow-auto`}
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        </div>
      </div>

      {/* Device Info */}
      <div className="fixed bottom-6 left-6 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-3 rounded-lg shadow-lg border border-gray-200">
        <div className="text-sm font-medium">
          {currentDevice === 'desktop' && `${DEVICE_BREAKPOINTS.DESKTOP.ICON} ${DEVICE_BREAKPOINTS.DESKTOP.LABEL}`}
          {currentDevice === 'tablet' && `${DEVICE_BREAKPOINTS.TABLET.ICON} ${DEVICE_BREAKPOINTS.TABLET.LABEL}`}
          {currentDevice === 'mobile' && `${DEVICE_BREAKPOINTS.MOBILE.ICON} ${DEVICE_BREAKPOINTS.MOBILE.LABEL}`}
        </div>
        <div className="text-xs text-gray-600 mt-1">
          {currentDevice === 'desktop' && `${DEVICE_BREAKPOINTS.DESKTOP.WIDTH}px max width`}
          {currentDevice === 'tablet' && `${DEVICE_BREAKPOINTS.TABLET.WIDTH}px width`}
          {currentDevice === 'mobile' && `${DEVICE_BREAKPOINTS.MOBILE.WIDTH}px width`}
          {' • Zoom: '}{zoom}%
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-3 rounded-lg shadow-lg border border-gray-200">
        <div className="text-sm font-medium mb-2">⌨️ Keyboard Shortcuts</div>
        <div className="text-xs text-gray-600 space-y-1">
          <div><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{KEYBOARD_SHORTCUTS.DESKTOP}</kbd>, <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{KEYBOARD_SHORTCUTS.TABLET}</kbd>, <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{KEYBOARD_SHORTCUTS.MOBILE}</kbd> Switch devices</div>
          <div><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">+</kbd>, <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">-</kbd> Zoom in/out</div>
          <div><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{KEYBOARD_SHORTCUTS.RESET_ZOOM}</kbd> Reset zoom</div>
          <div><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">R</kbd> Refresh page</div>
        </div>
      </div>
    </div>
  );
}

export default PagePreview;
