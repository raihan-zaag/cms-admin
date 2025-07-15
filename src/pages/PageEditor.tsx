import React from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import { Toolbox } from '../components/editor/Toolbox';
import { SettingsPanel } from '../components/editor/SettingsPanel';
import { LayersPanel } from '../components/editor/LayersPanel';
import { Container } from '../components/editor/Container';
import { Text } from '../components/editor/Text';
import { Button } from '../components/editor/Button';

export const PageEditor: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100">
      <Editor
        resolver={{
          Container,
          Text,
          Button,
        }}
      >
        <div className="h-full">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">
                Page Builder
              </h1>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                  Preview
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex h-full">
            {/* Left sidebar - Toolbox */}
            <Toolbox />

            {/* Center - Canvas */}
            <div className="flex-1 p-4">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-full">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700">Canvas</h3>
                </div>
                
                <div className="h-full  bg-gray-50 relative overflow-auto p-4">
                  <Frame>
                    <Element 
                      is={Container} 
                      canvas 
                      background="#ddebf0"
                      padding={20}
                      width="100%"
                      height="800px"
                      minWidth={200}
                      minHeight={200}
                    >
                      
                    </Element>
                  </Frame>
                </div>
              </div>
            </div>

            {/* Right sidebar - Layers and Settings */}
            <div className="flex">
              <LayersPanel />
              <SettingsPanel />
            </div>
          </div>
        </div>
      </Editor>
    </div>
  );
};

