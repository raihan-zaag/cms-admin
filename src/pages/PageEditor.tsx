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
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <TopBar/>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-[250px_1fr_300px]  h-[calc(100vh-191px)] overflow-hidden">
        <Toolbox />

        <div className="h-full w-full">
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Canvas</h3>
          </div>

          <div className="h-full bg-white">
            <Frame>
              <Element
                is={Container}
                canvas
                background="#ddebf0"
                padding={20}
                width="100%"
                height="600px"
                minWidth={200}
                minHeight={200}
              >
              </Element>
            </Frame>
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

