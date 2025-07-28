import React from 'react';
import { useEditor, Element } from '@craftjs/core';
import { Container } from './Container';
import { GridContainer } from './GridContainer';
import { Text } from './Text';
import { Button } from './Button';
import { ImageComponent } from './Image';
import { Box, Type, Square, Image, Grid3X3 } from 'lucide-react';

export const Toolbox: React.FC = () => {
  const { connectors } = useEditor();

  const components = [
    {
      name: 'Container',
      icon: Box,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      description: 'Flexible layout container',
      element: <Element is={Container} canvas />,
    },
    {
      name: 'Grid Container',
      icon: Grid3X3,
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
      description: 'CSS Grid layout container',
      element: <Element is={GridContainer} canvas />,
    },
    {
      name: 'Text',
      icon: Type,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      description: 'Rich text editor',
      element: <Element is={Text} text="Hello World!" />,
    },
    {
      name: 'Button',
      icon: Square,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      description: 'Interactive button',
      element: <Element is={Button} text="Click me" />,
    },
    {
      name: 'Image',
      icon: Image,
      color: 'bg-gradient-to-r from-pink-500 to-pink-600',
      description: 'Media & visuals',
      element: <Element is={ImageComponent} canvas />,
    },
  ];

  return (
    <div className="p-4 h-screen">
      {/* Toolbox Header */}
      <p className='py-4 font-bold text-center'>Components</p>

      {/* Components Container */}
      <div className="space-y-3">
        {components.map((component) => {
          const IconComponent = component.icon;

          return (
            <div
              key={component.name}
              ref={(ref) => {
                if (ref) {
                  connectors.create(ref, component.element);
                }
              }}
              className="group relative overflow-hidden rounded-xl cursor-move transition-all duration-200 hover:scale-105 hover:shadow-lg p-4 bg-white border border-gray-100 hover:border-gray-200"
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg ${component.color} shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm group-hover:text-gray-900">
                      {component.name}
                    </h4>
                    <p className="text-xs text-gray-500 group-hover:text-gray-600">
                      {component.description}
                    </p>
                  </div>
                </div>

                {/* Drag Indicator */}
                <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 px-4 py-3 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          Drag components to canvas
        </p>
      </div>
    </div>
  );
};
