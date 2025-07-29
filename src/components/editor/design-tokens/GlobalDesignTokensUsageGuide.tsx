import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Lightbulb, Code } from 'lucide-react';

export const GlobalDesignTokensUsageGuide: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            How Global Design Tokens Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-800">Root Container System</p>
                <p className="text-blue-700 mt-1">
                  The global design token system applies default settings to your root container, 
                  which then cascade to all child components automatically.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Key Benefits:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Consistent typography across all text components</li>
              <li>Unified color scheme that changes globally</li>
              <li>Standardized spacing and layout patterns</li>
              <li>Easy theme switching (light/dark modes)</li>
              <li>Centralized design system management</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">How It Works:</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-600">
              <li>Configure global settings in the tabs above</li>
              <li>The root container applies these as defaults</li>
              <li>All child components inherit these settings</li>
              <li>Individual components can override if needed</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Code className="w-4 h-4" />
            Design Token Reference
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-gray-50 p-3 rounded font-mono text-xs space-y-2">
            <div>
              <div className="text-gray-600 mb-1">// Typography tokens:</div>
              <div><span className="text-blue-600">@typography.primary</span> - Primary font family</div>
              <div><span className="text-blue-600">@typography.secondary</span> - Secondary font family</div>
            </div>
            
            <div>
              <div className="text-gray-600 mb-1">// Color tokens:</div>
              <div><span className="text-green-600">@color.background</span> - Background color</div>
              <div><span className="text-green-600">@color.text</span> - Text color</div>
              <div><span className="text-green-600">@color.primary</span> - Primary brand color</div>
            </div>
            
            <div>
              <div className="text-gray-600 mb-1">// Spacing tokens:</div>
              <div><span className="text-purple-600">@spacing.sm</span> - Small spacing (8px)</div>
              <div><span className="text-purple-600">@spacing.md</span> - Medium spacing (16px)</div>
              <div><span className="text-purple-600">@spacing.lg</span> - Large spacing (24px)</div>
            </div>
            
            <div>
              <div className="text-gray-600 mb-1">// Container tokens:</div>
              <div><span className="text-orange-600">@container.lg</span> - Large container (1024px)</div>
              <div><span className="text-orange-600">@container.xl</span> - Extra large (1280px)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p>Start with typography and colors to establish your brand foundation</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <p>Use the container max width to control your layout boundaries</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
            <p>Export your settings to reuse across different projects</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
            <p>Individual components can still override global settings when needed</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
