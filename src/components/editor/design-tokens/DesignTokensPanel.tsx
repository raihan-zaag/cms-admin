import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Palette, 
  Type, 
  Box, 
  Monitor, 
  Container,
  Download,
  Upload,
  RotateCcw,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';
import { useDesignTokensStore, type ThemeMode } from '@/store/design-tokens';
import { ColorTokensSection } from './ColorTokensSection';
import { TypographyTokensSection } from './TypographyTokensSection';
import { SpacingTokensSection } from './SpacingTokensSection';
import { BorderRadiusTokensSection } from './BorderRadiusTokensSection';
import { BreakpointsTokensSection } from './BreakpointsTokensSection';
import { ContainersTokensSection } from './ContainersTokensSection';

export const DesignTokensPanel: React.FC = () => {
  const { currentTheme, setTheme, exportTokens, importTokens, resetToDefaults } = useDesignTokensStore();
  const [activeTab, setActiveTab] = useState('colors');

  const handleExportTokens = () => {
    const tokens = exportTokens();
    const blob = new Blob([tokens], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design-tokens.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportTokens = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          importTokens(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const getThemeIcon = (theme: ThemeMode) => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'auto':
        return <Laptop className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'colors', label: 'Colors', icon: Palette, component: ColorTokensSection },
    { id: 'typography', label: 'Typography', icon: Type, component: TypographyTokensSection },
    { id: 'spacing', label: 'Spacing', icon: Box, component: SpacingTokensSection },
    { id: 'radius', label: 'Border Radius', icon: Box, component: BorderRadiusTokensSection },
    { id: 'breakpoints', label: 'Breakpoints', icon: Monitor, component: BreakpointsTokensSection },
    { id: 'containers', label: 'Containers', icon: Container, component: ContainersTokensSection },
  ];

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Design Tokens</CardTitle>
            <CardDescription>
              Manage your global design system tokens
            </CardDescription>
          </div>
          
          {/* Theme Switcher */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {(['light', 'dark', 'auto'] as ThemeMode[]).map((theme) => (
              <Button
                key={theme}
                variant={currentTheme === theme ? "default" : "ghost"}
                size="sm"
                onClick={() => setTheme(theme)}
                className="h-8 w-8 p-0"
                title={`Switch to ${theme} theme`}
              >
                {getThemeIcon(theme)}
              </Button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={handleExportTokens}>
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleImportTokens}>
            <Upload className="w-4 h-4 mr-1" />
            Import
          </Button>
          <Button variant="outline" size="sm" onClick={resetToDefaults}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 min-h-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-4">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-1 text-xs"
              >
                <tab.icon className="w-3 h-3" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 overflow-auto">
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0 h-full">
                <tab.component />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
