import React, { useState } from 'react';
import { useGlobalDesignTokens } from '@/hooks/useGlobalDesignTokens';
import { useDesignTokenOptions } from '@/lib/designTokenOptions';
import { SelectOptionsRenderer } from '@/components/ui/SelectOptionsRenderer';
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
  Download,
  Upload,
  HelpCircle
} from 'lucide-react';

export const GlobalDesignTokensPanel: React.FC = () => {
  const { globalSettings, updateGlobalSettings, resetGlobalSettings } = useGlobalDesignTokens();
  const {
    fontFamilyOptions,
    colorOptions,
    spacingOptions,
    borderRadiusOptions,
    containerOptions,
    layoutDirectionOptions,
    justifyContentOptions,
    alignItemsOptions
  } = useDesignTokenOptions();
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
                <SelectOptionsRenderer
                  id="primaryFont"
                  options={fontFamilyOptions}
                  value={globalSettings.fontFamily.primary}
                  onChange={(value) =>
                    updateGlobalSettings({
                      fontFamily: { 
                        ...globalSettings.fontFamily, 
                        primary: value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Default font family for all text elements</p>
              </div>

              <div>
                <Label htmlFor="secondaryFont">Secondary Font Family</Label>
                <SelectOptionsRenderer
                  id="secondaryFont"
                  options={fontFamilyOptions}
                  value={globalSettings.fontFamily.secondary}
                  onChange={(value) =>
                    updateGlobalSettings({
                      fontFamily: { 
                        ...globalSettings.fontFamily, 
                        secondary: value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
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
                  <SelectOptionsRenderer
                    id="backgroundColor"
                    options={colorOptions}
                    value={globalSettings.colors.background}
                    onChange={(value) =>
                      updateGlobalSettings({
                        colors: { 
                          ...globalSettings.colors, 
                          background: value 
                        }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="textColor">Text Color</Label>
                  <SelectOptionsRenderer
                    id="textColor"
                    options={colorOptions}
                    value={globalSettings.colors.text}
                    onChange={(value) =>
                      updateGlobalSettings({
                        colors: { 
                          ...globalSettings.colors, 
                          text: value 
                        }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <SelectOptionsRenderer
                    id="primaryColor"
                    options={colorOptions}
                    value={globalSettings.colors.primary}
                    onChange={(value) =>
                      updateGlobalSettings({
                        colors: { 
                          ...globalSettings.colors, 
                          primary: value 
                        }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="borderColor">Border Color</Label>
                  <SelectOptionsRenderer
                    id="borderColor"
                    options={colorOptions}
                    value={globalSettings.colors.border}
                    onChange={(value) =>
                      updateGlobalSettings({
                        colors: { 
                          ...globalSettings.colors, 
                          border: value 
                        }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
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
                <SelectOptionsRenderer
                  id="flexDirection"
                  options={layoutDirectionOptions}
                  value={globalSettings.layout.flexDirection}
                  onChange={(value) =>
                    updateGlobalSettings({
                      layout: { 
                        ...globalSettings.layout, 
                        flexDirection: value as 'row' | 'column'
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Default layout direction for the root container</p>
              </div>

              <div>
                <Label htmlFor="justifyContent">Justify Content</Label>
                <SelectOptionsRenderer
                  id="justifyContent"
                  options={justifyContentOptions}
                  value={globalSettings.layout.justifyContent}
                  onChange={(value) =>
                    updateGlobalSettings({
                      layout: { 
                        ...globalSettings.layout, 
                        justifyContent: value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-1">How components are distributed along the main axis</p>
              </div>

              <div>
                <Label htmlFor="alignItems">Align Items</Label>
                <SelectOptionsRenderer
                  id="alignItems"
                  options={alignItemsOptions}
                  value={globalSettings.layout.alignItems}
                  onChange={(value) =>
                    updateGlobalSettings({
                      layout: { 
                        ...globalSettings.layout, 
                        alignItems: value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-1">How components are aligned along the cross axis</p>
              </div>

              <div>
                <Label htmlFor="gap">Gap</Label>
                <SelectOptionsRenderer
                  id="gap"
                  options={spacingOptions}
                  value={globalSettings.layout.gap}
                  onChange={(value) =>
                    updateGlobalSettings({
                      layout: { 
                        ...globalSettings.layout, 
                        gap: value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Gap between child components</p>
              </div>

              <div>
                <Label htmlFor="gapX">Column Gap (Horizontal)</Label>
                <SelectOptionsRenderer
                  id="gapX"
                  options={[
                    { value: '', label: 'Use main gap', description: 'Inherit from main gap setting' },
                    ...spacingOptions
                  ]}
                  value={globalSettings.layout.gapX || ''}
                  onChange={(value) =>
                    updateGlobalSettings({
                      layout: { 
                        ...globalSettings.layout, 
                        gapX: value || undefined
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Horizontal gap between components (overrides main gap)</p>
              </div>

              <div>
                <Label htmlFor="gapY">Row Gap (Vertical)</Label>
                <SelectOptionsRenderer
                  id="gapY"
                  options={[
                    { value: '', label: 'Use main gap', description: 'Inherit from main gap setting' },
                    ...spacingOptions
                  ]}
                  value={globalSettings.layout.gapY || ''}
                  onChange={(value) =>
                    updateGlobalSettings({
                      layout: { 
                        ...globalSettings.layout, 
                        gapY: value || undefined
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
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
                <SelectOptionsRenderer
                  id="maxWidth"
                  options={containerOptions}
                  value={globalSettings.container.maxWidth}
                  onChange={(value) =>
                    updateGlobalSettings({
                      container: { 
                        ...globalSettings.container, 
                        maxWidth: value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Maximum width for the root container</p>
              </div>

              <div>
                <Label htmlFor="padding">Padding</Label>
                <SelectOptionsRenderer
                  id="padding"
                  options={spacingOptions}
                  value={globalSettings.container.padding}
                  onChange={(value) =>
                    updateGlobalSettings({
                      container: { 
                        ...globalSettings.container, 
                        padding: value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Internal padding for the root container</p>
              </div>

              <div>
                <Label htmlFor="paddingX">Horizontal Padding (Left/Right)</Label>
                <SelectOptionsRenderer
                  id="paddingX"
                  options={[
                    { value: '', label: 'Use main padding', description: 'Inherit from main padding setting' },
                    ...spacingOptions
                  ]}
                  value={globalSettings.container.paddingX || ''}
                  onChange={(value) =>
                    updateGlobalSettings({
                      container: { 
                        ...globalSettings.container, 
                        paddingX: value || undefined
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Horizontal padding only (overrides main padding)</p>
              </div>

              <div>
                <Label htmlFor="paddingY">Vertical Padding (Top/Bottom)</Label>
                <SelectOptionsRenderer
                  id="paddingY"
                  options={[
                    { value: '', label: 'Use main padding', description: 'Inherit from main padding setting' },
                    ...spacingOptions
                  ]}
                  value={globalSettings.container.paddingY || ''}
                  onChange={(value) =>
                    updateGlobalSettings({
                      container: { 
                        ...globalSettings.container, 
                        paddingY: value || undefined
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Vertical padding only (overrides main padding)</p>
              </div>

              <div>
                <Label htmlFor="borderRadius">Border Radius</Label>
                <SelectOptionsRenderer
                  id="borderRadius"
                  options={borderRadiusOptions}
                  value={globalSettings.container.borderRadius}
                  onChange={(value) =>
                    updateGlobalSettings({
                      container: { 
                        ...globalSettings.container, 
                        borderRadius: value 
                      }
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
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
