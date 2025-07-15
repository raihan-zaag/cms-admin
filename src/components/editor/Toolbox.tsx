import React from 'react';
import { useEditor, Element } from '@craftjs/core';
import { Container } from './Container';
import { Text } from './Text';
import { Button } from './Button';

export const Toolbox: React.FC = () => {
  const { connectors } = useEditor();

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Components</h3>
      <div className="space-y-2">
        <div
          ref={(ref) => {
            if (ref) {
              connectors.create(ref, <Element is={Container} canvas />);
            }
          }}
          className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm font-medium text-gray-700">Container</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Resizable container for other elements
          </p>
        </div>

        <div
          ref={(ref) => {
            if (ref) {
              connectors.create(ref, <Text text="Hello World!" />);
            }
          }}
          className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm font-medium text-gray-700">Text</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Editable text element
          </p>
        </div>

        <div
          ref={(ref) => {
            if (ref) {
              connectors.create(ref, <Button text="Click me" />);
            }
          }}
          className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm font-medium text-gray-700">Button</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Interactive button element
          </p>
        </div>
      </div>
    </div>
  );
};
