import React, { useState } from 'react';
import { useGlobalDesignTokens } from '@/hooks/useGlobalDesignTokens';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GlobalDesignTokensUsageGuide } from './design-tokens/GlobalDesignTokensUsageGuide';
import { 
  Settings, 
  RefreshCw, 
  Palette, 
  Type, 
  Layout, 
  Container,
  Move,
  Download,
  Upload,
  HelpCircle
} from 'lucide-react';

export const GlobalDesignTokensPanel: React.FC = () => {
  const { globalSettings, updateGlobalSettings, resetGlobalSettings } = useGlobalDesignTokens();
  const [activeTab, setActiveTab] = useState('typography');

  const exportSettings = () => {
    const settingsJson = JSON.stringify(globalSettings, null, 2);
    const blob = new Blob([settingsJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'global-design-tokens.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          updateGlobalSettings(importedSettings);
        } catch (error) {
          console.error('Failed to import settings:', error);
          alert('Failed to import settings. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Global Design Token Settings
          </CardTitle>
          <p className="text-sm text-gray-600">
            Configure global design tokens that apply to the root container and cascade to all components.
          </p>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetGlobalSettings}
            className="flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            Reset All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportSettings}
            className="flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            Export
          </Button>
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={importSettings}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Upload className="w-3 h-3" />
              Import
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="typography" className="flex items-center gap-1">
            <Type className="w-3 h-3" />
            <span className="hidden sm:inline">Typography</span>
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-1">
            <Palette className="w-3 h-3" />
            <span className="hidden sm:inline">Colors</span>
          </TabsTrigger>
          <TabsTrigger value="spacing" className="flex items-center gap-1">
            <Move className="w-3 h-3" />
            <span className="hidden sm:inline">Spacing</span>
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-1">
            <Layout className="w-3 h-3" />
            <span className="hidden sm:inline">Layout</span>
          </TabsTrigger>
          <TabsTrigger value="container" className="flex items-center gap-1">
            <Container className="w-3 h-3" />
            <span className="hidden sm:inline">Container</span>
          </TabsTrigger>
          <TabsTrigger value="guide" className="flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            <span className="hidden sm:inline">Guide</span>
          </TabsTrigger>
        </TabsList>

        {/* Typography Tab */}
        <TabsContent value="typography">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Type className="w-4 h-4" />
                Global Typography Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="primaryFont">Primary Font Family</Label>
                <select
                  id="primaryFont"
                  value={globalSettings.fontFamily.primary}
                  onChange={(e) =>
                    updateGlobalSettings({
                      fontFamily: { 
                        ...globalSettings.fontFamily, 
                        primary: e.target.value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="@font.primary">Primary Font (@font.primary)</option>
                  <option value="@font.secondary">Secondary Font (@font.secondary)</option>
                  <option value="@font.mono">Mono Font (@font.mono)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Default font family for all text elements</p>
              </div>

              <div>
                <Label htmlFor="secondaryFont">Secondary Font Family</Label>
                <select
                  id="secondaryFont"
                  value={globalSettings.fontFamily.secondary}
                  onChange={(e) =>
                    updateGlobalSettings({
                      fontFamily: { 
                        ...globalSettings.fontFamily, 
                        secondary: e.target.value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="@font.primary">Primary Font (@font.primary)</option>
                  <option value="@font.secondary">Secondary Font (@font.secondary)</option>
                  <option value="@font.mono">Mono Font (@font.mono)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Secondary font family for headings and special text</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Colors Tab */}
        <TabsContent value="colors">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Global Color Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <select
                    id="backgroundColor"
                    value={globalSettings.colors.background}
                    onChange={(e) =>
                      updateGlobalSettings({
                        colors: { 
                          ...globalSettings.colors, 
                          background: e.target.value 
                        }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option value="@color.background">Background (@color.background)</option>
                    <option value="@color.surface">Surface (@color.surface)</option>
                    <option value="@color.primary">Primary (@color.primary)</option>
                    <option value="@color.secondary">Secondary (@color.secondary)</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="textColor">Text Color</Label>
                  <select
                    id="textColor"
                    value={globalSettings.colors.text}
                    onChange={(e) =>
                      updateGlobalSettings({
                        colors: { 
                          ...globalSettings.colors, 
                          text: e.target.value 
                        }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option value="@color.text">Text (@color.text)</option>
                    <option value="@color.textMuted">Text Muted (@color.textMuted)</option>
                    <option value="@color.primary">Primary (@color.primary)</option>
                    <option value="@color.secondary">Secondary (@color.secondary)</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <select
                    id="primaryColor"
                    value={globalSettings.colors.primary}
                    onChange={(e) =>
                      updateGlobalSettings({
                        colors: { 
                          ...globalSettings.colors, 
                          primary: e.target.value 
                        }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option value="@color.primary">Primary (@color.primary)</option>
                    <option value="@color.secondary">Secondary (@color.secondary)</option>
                    <option value="@color.background">Background (@color.background)</option>
                    <option value="@color.surface">Surface (@color.surface)</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="borderColor">Border Color</Label>
                  <select
                    id="borderColor"
                    value={globalSettings.colors.border}
                    onChange={(e) =>
                      updateGlobalSettings({
                        colors: { 
                          ...globalSettings.colors, 
                          border: e.target.value 
                        }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option value="@color.border">Border (@color.border)</option>
                    <option value="@color.text">Text (@color.text)</option>
                    <option value="@color.textMuted">Text Muted (@color.textMuted)</option>
                    <option value="@color.primary">Primary (@color.primary)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Spacing Tab */}
        <TabsContent value="spacing">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Move className="w-4 h-4" />
                Global Spacing Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="containerPadding">Container Padding</Label>
                <select
                  id="containerPadding"
                  value={globalSettings.spacing.containerPadding}
                  onChange={(e) =>
                    updateGlobalSettings({
                      spacing: { 
                        ...globalSettings.spacing, 
                        containerPadding: e.target.value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="@spacing.sm">Small (8px)</option>
                  <option value="@spacing.md">Medium (16px)</option>
                  <option value="@spacing.lg">Large (24px)</option>
                  <option value="@spacing.xl">Extra Large (32px)</option>
                  <option value="@spacing.2xl">2X Large (40px)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Default padding for the root container</p>
              </div>

              <div>
                <Label htmlFor="componentGap">Component Gap</Label>
                <select
                  id="componentGap"
                  value={globalSettings.spacing.componentGap}
                  onChange={(e) =>
                    updateGlobalSettings({
                      spacing: { 
                        ...globalSettings.spacing, 
                        componentGap: e.target.value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="@spacing.xs">Extra Small (4px)</option>
                  <option value="@spacing.sm">Small (8px)</option>
                  <option value="@spacing.md">Medium (16px)</option>
                  <option value="@spacing.lg">Large (24px)</option>
                  <option value="@spacing.xl">Extra Large (32px)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Default gap between components</p>
              </div>

              <div>
                <Label htmlFor="sectionSpacing">Section Spacing</Label>
                <select
                  id="sectionSpacing"
                  value={globalSettings.spacing.sectionSpacing}
                  onChange={(e) =>
                    updateGlobalSettings({
                      spacing: { 
                        ...globalSettings.spacing, 
                        sectionSpacing: e.target.value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="@spacing.md">Medium (16px)</option>
                  <option value="@spacing.lg">Large (24px)</option>
                  <option value="@spacing.xl">Extra Large (32px)</option>
                  <option value="@spacing.2xl">2X Large (40px)</option>
                  <option value="@spacing.3xl">3X Large (48px)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Default spacing between major sections</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Global Layout Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="flexDirection">Layout Direction</Label>
                <select
                  id="flexDirection"
                  value={globalSettings.layout.flexDirection}
                  onChange={(e) =>
                    updateGlobalSettings({
                      layout: { 
                        ...globalSettings.layout, 
                        flexDirection: e.target.value as 'row' | 'column'
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="column">Column (Vertical)</option>
                  <option value="row">Row (Horizontal)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Default layout direction for the root container</p>
              </div>

              <div>
                <Label htmlFor="justifyContent">Justify Content</Label>
                <select
                  id="justifyContent"
                  value={globalSettings.layout.justifyContent}
                  onChange={(e) =>
                    updateGlobalSettings({
                      layout: { 
                        ...globalSettings.layout, 
                        justifyContent: e.target.value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="flex-start">Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">End</option>
                  <option value="space-between">Space Between</option>
                  <option value="space-around">Space Around</option>
                  <option value="space-evenly">Space Evenly</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">How components are distributed along the main axis</p>
              </div>

              <div>
                <Label htmlFor="alignItems">Align Items</Label>
                <select
                  id="alignItems"
                  value={globalSettings.layout.alignItems}
                  onChange={(e) =>
                    updateGlobalSettings({
                      layout: { 
                        ...globalSettings.layout, 
                        alignItems: e.target.value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="stretch">Stretch</option>
                  <option value="flex-start">Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">End</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">How components are aligned along the cross axis</p>
              </div>

              <div>
                <Label htmlFor="gap">Gap</Label>
                <select
                  id="gap"
                  value={globalSettings.layout.gap}
                  onChange={(e) =>
                    updateGlobalSettings({
                      layout: { 
                        ...globalSettings.layout, 
                        gap: e.target.value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="@spacing.none">None (0px)</option>
                  <option value="@spacing.xs">Extra Small (4px)</option>
                  <option value="@spacing.sm">Small (8px)</option>
                  <option value="@spacing.md">Medium (16px)</option>
                  <option value="@spacing.lg">Large (24px)</option>
                  <option value="@spacing.xl">Extra Large (32px)</option>
                  <option value="@spacing.2xl">2X Large (40px)</option>
                  <option value="@spacing.3xl">3X Large (48px)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Gap between child components</p>
              </div>

              <div>
                <Label htmlFor="gapX">Column Gap (Horizontal)</Label>
                <select
                  id="gapX"
                  value={globalSettings.layout.gapX || ''}
                  onChange={(e) =>
                    updateGlobalSettings({
                      layout: { 
                        ...globalSettings.layout, 
                        gapX: e.target.value || undefined
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="">Use main gap</option>
                  <option value="@spacing.none">None (0px)</option>
                  <option value="@spacing.xs">Extra Small (4px)</option>
                  <option value="@spacing.sm">Small (8px)</option>
                  <option value="@spacing.md">Medium (16px)</option>
                  <option value="@spacing.lg">Large (24px)</option>
                  <option value="@spacing.xl">Extra Large (32px)</option>
                  <option value="@spacing.2xl">2X Large (40px)</option>
                  <option value="@spacing.3xl">3X Large (48px)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Horizontal gap between components (overrides main gap)</p>
              </div>

              <div>
                <Label htmlFor="gapY">Row Gap (Vertical)</Label>
                <select
                  id="gapY"
                  value={globalSettings.layout.gapY || ''}
                  onChange={(e) =>
                    updateGlobalSettings({
                      layout: { 
                        ...globalSettings.layout, 
                        gapY: e.target.value || undefined
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="">Use main gap</option>
                  <option value="@spacing.none">None (0px)</option>
                  <option value="@spacing.xs">Extra Small (4px)</option>
                  <option value="@spacing.sm">Small (8px)</option>
                  <option value="@spacing.md">Medium (16px)</option>
                  <option value="@spacing.lg">Large (24px)</option>
                  <option value="@spacing.xl">Extra Large (32px)</option>
                  <option value="@spacing.2xl">2X Large (40px)</option>
                  <option value="@spacing.3xl">3X Large (48px)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Vertical gap between components (overrides main gap)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Container Tab */}
        <TabsContent value="container">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Container className="w-4 h-4" />
                Global Container Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="maxWidth">Maximum Width</Label>
                <select
                  id="maxWidth"
                  value={globalSettings.container.maxWidth}
                  onChange={(e) =>
                    updateGlobalSettings({
                      container: { 
                        ...globalSettings.container, 
                        maxWidth: e.target.value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="@container.sm">Small (640px)</option>
                  <option value="@container.md">Medium (768px)</option>
                  <option value="@container.lg">Large (1024px)</option>
                  <option value="@container.xl">Extra Large (1280px)</option>
                  <option value="@container.2xl">2X Large (1400px)</option>
                  <option value="@container.full">Full Width</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Maximum width for the root container</p>
              </div>

              <div>
                <Label htmlFor="padding">Padding</Label>
                <select
                  id="padding"
                  value={globalSettings.container.padding}
                  onChange={(e) =>
                    updateGlobalSettings({
                      container: { 
                        ...globalSettings.container, 
                        padding: e.target.value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="@spacing.none">None (0px)</option>
                  <option value="@spacing.xs">Extra Small (4px)</option>
                  <option value="@spacing.sm">Small (8px)</option>
                  <option value="@spacing.md">Medium (16px)</option>
                  <option value="@spacing.lg">Large (24px)</option>
                  <option value="@spacing.xl">Extra Large (32px)</option>
                  <option value="@spacing.2xl">2X Large (40px)</option>
                  <option value="@spacing.3xl">3X Large (48px)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Internal padding for the root container</p>
              </div>

              <div>
                <Label htmlFor="paddingX">Horizontal Padding (Left/Right)</Label>
                <select
                  id="paddingX"
                  value={globalSettings.container.paddingX || ''}
                  onChange={(e) =>
                    updateGlobalSettings({
                      container: { 
                        ...globalSettings.container, 
                        paddingX: e.target.value || undefined
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="">Use main padding</option>
                  <option value="@spacing.none">None (0px)</option>
                  <option value="@spacing.xs">Extra Small (4px)</option>
                  <option value="@spacing.sm">Small (8px)</option>
                  <option value="@spacing.md">Medium (16px)</option>
                  <option value="@spacing.lg">Large (24px)</option>
                  <option value="@spacing.xl">Extra Large (32px)</option>
                  <option value="@spacing.2xl">2X Large (40px)</option>
                  <option value="@spacing.3xl">3X Large (48px)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Horizontal padding only (overrides main padding)</p>
              </div>

              <div>
                <Label htmlFor="paddingY">Vertical Padding (Top/Bottom)</Label>
                <select
                  id="paddingY"
                  value={globalSettings.container.paddingY || ''}
                  onChange={(e) =>
                    updateGlobalSettings({
                      container: { 
                        ...globalSettings.container, 
                        paddingY: e.target.value || undefined
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="">Use main padding</option>
                  <option value="@spacing.none">None (0px)</option>
                  <option value="@spacing.xs">Extra Small (4px)</option>
                  <option value="@spacing.sm">Small (8px)</option>
                  <option value="@spacing.md">Medium (16px)</option>
                  <option value="@spacing.lg">Large (24px)</option>
                  <option value="@spacing.xl">Extra Large (32px)</option>
                  <option value="@spacing.2xl">2X Large (40px)</option>
                  <option value="@spacing.3xl">3X Large (48px)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Vertical padding only (overrides main padding)</p>
              </div>

              <div>
                <Label htmlFor="borderRadius">Border Radius</Label>
                <select
                  id="borderRadius"
                  value={globalSettings.container.borderRadius}
                  onChange={(e) =>
                    updateGlobalSettings({
                      container: { 
                        ...globalSettings.container, 
                        borderRadius: e.target.value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="@radius.none">None (0px)</option>
                  <option value="@radius.sm">Small (2px)</option>
                  <option value="@radius.md">Medium (6px)</option>
                  <option value="@radius.lg">Large (8px)</option>
                  <option value="@radius.xl">Extra Large (12px)</option>
                  <option value="@radius.full">Full (9999px)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Border radius for the root container</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Guide Tab */}
        <TabsContent value="guide">
          <GlobalDesignTokensUsageGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
};
