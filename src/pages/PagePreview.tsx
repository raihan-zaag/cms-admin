import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '@/services/api';
import { convertCraftJsonToHtml } from '@/lib/convertCraftJsonToHtml';
import { logger } from '@/lib/logger';
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
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      if (!pageId) {
        // Check if it's a temporary preview
        if (pageId?.startsWith('temp-')) {
          const tempData = sessionStorage.getItem(STORAGE_KEYS.PREVIEW_DATA(pageId));
          if (tempData) {
            try {
              const previewData = JSON.parse(tempData);
              
              // Handle new format with craft JSON and global design tokens
              let craftJson;
              if (previewData.craftJson) {
                // New format: { craftJson: {...}, globalDesignTokens: {...} }
                craftJson = previewData.craftJson;
              } else {
                // Old format: direct craft JSON
                craftJson = previewData;
              }
              
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
              const previewData = JSON.parse(tempData);
              
              // Handle new format with craft JSON and global design tokens
              let craftJson;
              if (previewData.craftJson) {
                // New format: { craftJson: {...}, globalDesignTokens: {...} }
                craftJson = previewData.craftJson;
              } else {
                // Old format: direct craft JSON
                craftJson = previewData;
              }
              
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
    const baseStyle: React.CSSProperties = {
      transition: 'all 0.3s',
      margin: '0 auto',
      backgroundColor: 'white',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      minHeight: `${PREVIEW_DIMENSIONS.HEIGHT}px`, // Changed from height to minHeight
      overflow: 'visible', // Changed from hidden to visible
      position: 'relative',
    };

    switch (currentDevice) {
      case 'mobile': {
        const mobile = DEVICE_BREAKPOINTS.MOBILE;
        return {
          ...baseStyle,
          width: `${mobile.WIDTH}px`,
          maxWidth: `${mobile.MAX_WIDTH}px`,
          // borderWidth: `${mobile.BORDER_WIDTH}px`,
          // borderColor: '#e5e7eb', // gray-800
          // borderStyle: 'solid',
          // borderRadius: `${mobile.BORDER_RADIUS}px`,
        };
      }
      case 'tablet': {
        const tablet = DEVICE_BREAKPOINTS.TABLET;
        return {
          ...baseStyle,
          width: `${tablet.WIDTH}px`,
          // maxWidth: `${tablet.MAX_WIDTH}px`,
          // borderWidth: `${tablet.BORDER_WIDTH}px`,
          // borderColor: '#e5e7eb', // gray-600
          // borderStyle: 'solid',
          // borderRadius: `${tablet.BORDER_RADIUS}px`,
        };
      }
      case 'desktop':
      default: {
        const desktop = DEVICE_BREAKPOINTS.DESKTOP;
        return {
          ...baseStyle,
          width: '100%',
          maxWidth: `${desktop.WIDTH}px`,
          // borderWidth: '1px',
          // borderColor: '#e5e7eb', // gray-200
          // borderStyle: 'solid',
          // borderRadius: '12px',
        };
      }
    }
  };

  // Helper function to get current device info
  const getCurrentDeviceInfo = () => {
    switch (currentDevice) {
      case 'mobile': {
        const mobile = DEVICE_BREAKPOINTS.MOBILE;
        return {
          ...mobile,
          currentWidth: `${mobile.WIDTH}px`,
          containerMaxWidth: `${mobile.MAX_WIDTH}px`,
          aspectRatio: (mobile.WIDTH / PREVIEW_DIMENSIONS.HEIGHT).toFixed(2),
        };
      }
      case 'tablet': {
        const tablet = DEVICE_BREAKPOINTS.TABLET;
        return {
          ...tablet,
          currentWidth: `${tablet.WIDTH}px`,
          containerMaxWidth: `${tablet.MAX_WIDTH}px`,
          aspectRatio: (tablet.WIDTH / PREVIEW_DIMENSIONS.HEIGHT).toFixed(2),
        };
      }
      case 'desktop':
      default: {
        const desktop = DEVICE_BREAKPOINTS.DESKTOP;
        return {
          ...desktop,
          currentWidth: 'responsive',
          containerMaxWidth: `${desktop.WIDTH}px`,
          aspectRatio: (desktop.WIDTH / PREVIEW_DIMENSIONS.HEIGHT).toFixed(2),
        };
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
        case 'i':
        case 'I':
          e.preventDefault();
          setShowInfo(prev => !prev);
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
      // Check if we have global design tokens in session storage for temp previews
      let globalDesignTokens = null;
      if (pageId?.startsWith('temp-')) {
        const tempData = sessionStorage.getItem(STORAGE_KEYS.PREVIEW_DATA(pageId));
        if (tempData) {
          try {
            const previewData = JSON.parse(tempData);
            globalDesignTokens = previewData.globalDesignTokens;
          } catch (parseError) {
            console.log('No global design tokens found in preview data:', parseError);
          }
        }
      }
      
      htmlContent = convertCraftJsonToHtml(pageData.content, globalDesignTokens);
    } else if (typeof pageData.content === 'string') {
      htmlContent = pageData.content;
    }
  } catch (err) {
    console.error('Error converting content to HTML:', err);
    htmlContent = '<div class="p-8 text-center"><h1>Error rendering page content</h1></div>';
  }

  logger.debug('Rendered HTML content:', htmlContent);

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
                title={`${DEVICE_BREAKPOINTS.DESKTOP.LABEL} (${DEVICE_BREAKPOINTS.DESKTOP.WIDTH}px max)`}
              >
                <Monitor className="h-5 w-5" />
                {currentDevice === 'desktop' && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></span>
                )}
              </button>
              <button
                onClick={() => setCurrentDevice('tablet')}
                className={`p-3 rounded-md transition-all duration-200 relative ${
                  currentDevice === 'tablet' 
                    ? 'bg-white text-blue-600 shadow-sm scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                title={`${DEVICE_BREAKPOINTS.TABLET.LABEL} (${DEVICE_BREAKPOINTS.TABLET.WIDTH}px)`}
              >
                <Tablet className="h-5 w-5" />
                {currentDevice === 'tablet' && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></span>
                )}
              </button>
              <button
                onClick={() => setCurrentDevice('mobile')}
                className={`p-3 rounded-md transition-all duration-200 relative ${
                  currentDevice === 'mobile' 
                    ? 'bg-white text-blue-600 shadow-sm scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                title={`${DEVICE_BREAKPOINTS.MOBILE.LABEL} (${DEVICE_BREAKPOINTS.MOBILE.WIDTH}px)`}
              >
                <Smartphone className="h-5 w-5" />
                {currentDevice === 'mobile' && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></span>
                )}
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

              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
                title={showInfo ? "Hide Info Panels" : "Show Info Panels"}
              >
                {showInfo ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.12 14.12l1.415 1.415" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="py-12 px-4">
        <div 
          style={{ 
            ...getDeviceStyles(),
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center'
          }}
        >
          <div className="w-full">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        </div>
      </div>

      {/* Device Info */}
      {showInfo && (
        <div className="fixed bottom-6 left-6 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-3 rounded-lg shadow-lg border border-gray-200 min-w-[200px] transition-all duration-300">
          <div className="text-sm font-medium mb-2">
            {getCurrentDeviceInfo().ICON} {getCurrentDeviceInfo().LABEL}
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Current Width:</span>
              <span className="font-mono">{getCurrentDeviceInfo().currentWidth}</span>
            </div>
            <div className="flex justify-between">
              <span>Container Width:</span>
              <span className="font-mono">{getCurrentDeviceInfo().containerMaxWidth}</span>
            </div>
            <div className="flex justify-between">
              <span>Height:</span>
              <span className="font-mono">{PREVIEW_DIMENSIONS.HEIGHT}px</span>
            </div>
            <div className="flex justify-between">
              <span>Aspect Ratio:</span>
              <span className="font-mono">{getCurrentDeviceInfo().aspectRatio}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-1 mt-2">
              <span>Zoom:</span>
              <span className="font-mono text-blue-600">{zoom}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      {showInfo && (
        <div className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-3 rounded-lg shadow-lg border border-gray-200 max-w-[280px] transition-all duration-300">
          <div className="text-sm font-medium mb-2">⌨️ Shortcuts</div>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between items-center">
              <span>Devices:</span>
              <div className="flex gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{KEYBOARD_SHORTCUTS.DESKTOP}</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{KEYBOARD_SHORTCUTS.TABLET}</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{KEYBOARD_SHORTCUTS.MOBILE}</kbd>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Zoom:</span>
              <div className="flex gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">+</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">-</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{KEYBOARD_SHORTCUTS.RESET_ZOOM}</kbd>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Refresh:</span>
              <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">R</kbd>
            </div>
            <div className="flex justify-between items-center">
              <span>Toggle Info:</span>
              <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">I</kbd>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PagePreview;
