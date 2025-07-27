import React from 'react';
import { Editor, Frame, Element,  } from '@craftjs/core';
import { Toolbox } from '../components/editor/Toolbox';
import { SettingsPanel } from '../components/editor/SettingsPanel';
import { LayersPanel } from '../components/editor/LayersPanel';
import { Container } from '../components/editor/Container';
import { Text } from '../components/editor/Text';
import { Button } from '../components/editor/Button';
import { ImageComponent } from '../components/editor/Image';
import TopBar from '@/components/editor/TopBar';
import KeyboardShortcutsHandler from '@/components/editor/KeyboardShortcutsHandler';

export const PageEditor: React.FC = () => {
 
  return (
    <Editor
      resolver={{
        Container,
        Text,
        Button,
        ImageComponent,
      }}
    >
      {/* Enable keyboard shortcuts inside Editor context */}
      <KeyboardShortcutsHandler />
      
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <TopBar/>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-[250px_1fr_300px] h-[calc(100vh-191px)]">
        <Toolbox />

        <div className="flex flex-col h-full">
          {/* Canvas Header */}
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Canvas</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Keyboard shortcuts: Ctrl+Z (Undo), Ctrl+Y (Redo), Del (Delete)
                </p>
              </div>
            </div>
          </div>

          {/* Canvas Content - Single scroll area */}
          <div className="flex-1 bg-white overflow-auto">
            <div className="min-h-full p-4">
              <Frame>
                <Element
                  is={Container}
                  canvas
                  background="#ddebf0"
                  padding={['0', '0', '0', '0']}
                  margin={['0', '0', '0', '0']}
                  width="100%"
                  height="auto"
                >
                </Element>
              </Frame>
            </div>
          </div>
        </div>

        <div className="space-y-4 overflow-y-auto">
          <LayersPanel />
          <SettingsPanel />
        </div>
      </div>
    </Editor>
  );
};

