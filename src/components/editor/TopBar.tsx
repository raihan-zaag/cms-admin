import { convertCraftJsonToHtml } from "@/lib/convertCraftJsonToHtml";
import { downloadHtmlFile, generateFullHtmlDocument } from "@/lib/utils";
import { logger } from "@/lib/logger";
import { useEditor } from "@craftjs/core";
import { useLayoutStore } from "@/store/layout";
import { useState, useEffect } from "react";
import LayoutManager from "./LayoutManager";
import SaveModal from "./SaveModal";
import KeyboardShortcutsModal from "./KeyboardShortcutsModal";
import { 
  Eye, 
  Undo2, 
  Redo2, 
  Save, 
  FolderOpen,
  Download,
  Keyboard
} from "lucide-react";

/**
 * TopBar Component
 * 
 * Provides the main toolbar for the page editor with the following features:
 * - Undo/Redo functionality
 * - Save and load layouts
 * - Export to HTML
 * - Preview mode
 * - Keyboard shortcuts modal
 * 
 * @returns {JSX.Element} The top bar component
 */
const TopBar = () => {
  const { enabled, actions, query, nodes } = useEditor((state) => ({
    enabled: state.options.enabled,
    nodes: state.nodes, // Track nodes to detect changes
  }));
  
  const { 
    addToHistory, 
    undo, 
    redo, 
    canUndo: storeCanUndo, 
    canRedo: storeCanRedo 
  } = useLayoutStore();
  
  const [showLayoutManager, setShowLayoutManager] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  // Auto-save to history when nodes change
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    
    if (enabled && Object.keys(nodes).length > 0) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        try {
          const serializedData = query.serialize();
          const craftJson = JSON.parse(serializedData);
          addToHistory(craftJson);
          logger.debug('State saved to history, nodes count:', Object.keys(nodes).length);
        } catch (error) {
          logger.error('Error saving to history:', error);
        }
      }, 1000); // Debounce for 1 second
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [enabled, addToHistory, query, nodes]); // Include nodes in dependencies to track changes

  const handleUndo = () => {
    logger.debug('Undo clicked, can undo:', storeCanUndo());
    if (storeCanUndo()) {
      const previousState = undo();
      logger.debug('Previous state retrieved:', previousState);
      if (previousState) {
        try {
          actions.deserialize(JSON.stringify(previousState.craftJson));
          logger.debug('Successfully deserialized previous state');
        } catch (error) {
          logger.error('Error deserializing previous state:', error);
        }
      }
    }
  };

  const handleRedo = () => {
    logger.debug('Redo clicked, can redo:', storeCanRedo());
    if (storeCanRedo()) {
      const nextState = redo();
      logger.debug('Next state retrieved:', nextState);
      if (nextState) {
        try {
          actions.deserialize(JSON.stringify(nextState.craftJson));
          logger.debug('Successfully deserialized next state');
        } catch (error) {
          logger.error('Error deserializing next state:', error);
        }
      }
    }
  };

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const handlePreview = () => {
    // For now, we'll use a temporary ID. In a real app, you'd save the current state first
    // and get the actual page ID from the save operation
    const tempId = 'temp-' + Date.now();
    
    // Open preview in new tab with the current editor state
    const json = query.serialize();
    logger.debug('Previewing state:', json);
    
    // Store the current state temporarily (in a real app, you'd save to database)
    sessionStorage.setItem(`preview-${tempId}`, json);
    
    // Open preview route in new tab
    window.open(`/preview/${tempId}`, '_blank');
  };

  const handleExport = () => {
    const json = query.serialize();
    const parsedJson = JSON.parse(json);
    const htmlOutput = convertCraftJsonToHtml(parsedJson);
    const fullHtml = generateFullHtmlDocument(htmlOutput);
    downloadHtmlFile('page.html', fullHtml);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">
          Page Builder
        </h1>
        
        <div className="flex items-center space-x-2">
          {/* Undo/Redo Controls */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-1">
            <button
              onClick={handleUndo}
              disabled={!storeCanUndo()}
              className="p-2 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Undo"
            >
              <Undo2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={!storeCanRedo()}
              className="p-2 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Redo"
            >
              <Redo2 className="h-4 w-4" />
            </button>
          </div>

          {/* Preview Button */}
          <button
            onClick={handlePreview}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>

          {/* Layout Manager Button */}
          <button
            onClick={() => setShowLayoutManager(true)}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors flex items-center gap-2"
          >
            <FolderOpen className="h-4 w-4" />
            Layouts
          </button>

          {/* Help Button */}
          <button
            onClick={() => setShowKeyboardShortcuts(true)}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
            title="Keyboard Shortcuts"
          >
            <Keyboard className="h-4 w-4" />
          </button>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </button>

          {/* Edit Mode Toggle */}
          <button
            onClick={() => {
              actions.setOptions((options) => (options.enabled = !enabled));
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            {enabled ? 'Finish Editing' : 'Edit'}
          </button>

          {/* Save Button */}
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
            Save
          </button>
        </div>
      </div>

      {/* Modals */}
      <LayoutManager isOpen={showLayoutManager} onClose={() => setShowLayoutManager(false)} />
      <SaveModal isOpen={showSaveModal} onClose={() => setShowSaveModal(false)} />
      <KeyboardShortcutsModal 
        isOpen={showKeyboardShortcuts} 
        onClose={() => setShowKeyboardShortcuts(false)} 
      />
    </>
  );
};

export default TopBar;