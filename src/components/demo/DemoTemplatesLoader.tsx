import React, { useState } from 'react';
import { useEditor } from '@craftjs/core';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  PortfolioTemplate, 
  EcommerceTemplate, 
  TravelTemplate, 
  ServiceTemplate 
} from './DemoTemplatesFixed';

/**
 * Demo Templates Loader Component
 * 
 * Provides a user interface to load pre-built demo templates
 * into the page editor. Includes templates for:
 * - Portfolio
 * - E-commerce
 * - Travel Agency  
 * - Service/Business
 */

interface DemoTemplate {
  id: string;
  name: string;
  description: string;
  category: 'business' | 'portfolio' | 'ecommerce' | 'travel';
  features: string[];
  component: React.ComponentType;
  preview: string;
}

const demoTemplates: DemoTemplate[] = [
  {
    id: 'portfolio',
    name: 'Portfolio Website',
    description: 'Perfect for designers, developers, and creative professionals',
    category: 'portfolio',
    features: ['Hero section', 'About section', 'Project gallery', 'Contact form'],
    component: PortfolioTemplate,
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'Modern online store with product catalog and shopping features',
    category: 'ecommerce',
    features: ['Product grid', 'Hero banner', 'Navigation', 'Newsletter signup'],
    component: EcommerceTemplate,
    preview: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop'
  },
  {
    id: 'travel',
    name: 'Travel Agency',
    description: 'Showcase destinations and travel packages with stunning visuals',
    category: 'travel',
    features: ['Destination gallery', 'Services overview', 'Hero with background', 'Contact CTA'],
    component: TravelTemplate,
    preview: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop'
  },
  {
    id: 'service',
    name: 'Service Business',
    description: 'Professional service company with testimonials and stats',
    category: 'business',
    features: ['Service cards', 'Statistics', 'Testimonials', 'Call-to-action'],
    component: ServiceTemplate,
    preview: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop'
  }
];

interface DemoTemplatesLoaderProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoTemplatesLoader: React.FC<DemoTemplatesLoaderProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const { actions } = useEditor();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadTemplate = async (template: DemoTemplate) => {
    setLoading(true);
    setSelectedTemplate(template.id);
    
    try {
      // Clear the current editor state
      actions.clearEvents();
      
      // Note: In a real implementation, you would need to serialize the template component
      // and convert it to Craft.js JSON format. For now, we'll provide a basic structure.
      
      // This is a simplified approach - in practice you'd want to create a proper
      // serialization system for your templates
      const templateData = generateTemplateData(template.id);
      
      // Load the template data into the editor
      actions.deserialize(JSON.stringify(templateData));
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error loading template:', error);
    } finally {
      setLoading(false);
      setSelectedTemplate(null);
    }
  };

  // Generate basic template data structure for Craft.js
  const generateTemplateData = (templateId: string) => {
    // This is a simplified template structure - you would expand this based on your needs
    const baseStructure = {
      "ROOT": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "background": "@color.background",
          "paddingTop": "@spacing.lg",
          "paddingBottom": "@spacing.lg"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      }
    };

    // Add template-specific content based on the template ID
    switch (templateId) {
      case 'portfolio':
        return {
          ...baseStructure,
          "ROOT": {
            ...baseStructure.ROOT,
            "nodes": ["hero", "about", "projects", "contact"]
          },
          "hero": {
            "type": { "resolvedName": "Container" },
            "isCanvas": false,
            "props": {
              "background": "@color.primary",
              "height": "500px",
              "flexDirection": "column",
              "justifyContent": "center",
              "alignItems": "center",
              "gap": "@spacing.md"
            },
            "displayName": "Hero Section",
            "nodes": ["hero-title", "hero-subtitle", "hero-description", "hero-button"],
            "linkedNodes": {}
          },
          "hero-title": {
            "type": { "resolvedName": "Text" },
            "isCanvas": false,
            "props": {
              "text": "John Doe",
              "fontSize": "@typography.4xl",
              "fontWeight": "bold",
              "color": "@color.background",
              "textAlign": "center"
            },
            "displayName": "Hero Title",
            "nodes": [],
            "linkedNodes": {}
          },
          "hero-subtitle": {
            "type": { "resolvedName": "Text" },
            "isCanvas": false,
            "props": {
              "text": "Creative Designer & Developer",
              "fontSize": "@typography.xl",
              "color": "@color.background",
              "textAlign": "center"
            },
            "displayName": "Hero Subtitle",
            "nodes": [],
            "linkedNodes": {}
          },
          "hero-description": {
            "type": { "resolvedName": "Text" },
            "isCanvas": false,
            "props": {
              "text": "Crafting beautiful digital experiences with passion and precision",
              "fontSize": "@typography.base",
              "color": "@color.background",
              "textAlign": "center"
            },
            "displayName": "Hero Description",
            "nodes": [],
            "linkedNodes": {}
          },
          "hero-button": {
            "type": { "resolvedName": "Button" },
            "isCanvas": false,
            "props": {
              "text": "View My Work",
              "backgroundColor": "@color.background",
              "color": "@color.primary",
              "borderRadius": "@radius.full"
            },
            "displayName": "Hero Button",
            "nodes": [],
            "linkedNodes": {}
          }
        };
      
      case 'ecommerce':
        return {
          ...baseStructure,
          "ROOT": {
            ...baseStructure.ROOT,
            "nodes": ["header", "hero-banner", "products", "newsletter"]
          },
          "header": {
            "type": { "resolvedName": "Container" },
            "isCanvas": false,
            "props": {
              "flexDirection": "row",
              "justifyContent": "space-between",
              "alignItems": "center",
              "paddingTop": "@spacing.md",
              "paddingBottom": "@spacing.md",
              "shadow": 1
            },
            "displayName": "Header",
            "nodes": ["logo", "nav"],
            "linkedNodes": {}
          },
          "logo": {
            "type": { "resolvedName": "Text" },
            "isCanvas": false,
            "props": {
              "text": "StyleStore",
              "fontSize": "@typography.xl",
              "fontWeight": "bold",
              "color": "@color.primary"
            },
            "displayName": "Logo",
            "nodes": [],
            "linkedNodes": {}
          }
        };
      
      case 'travel':
        return {
          ...baseStructure,
          "ROOT": {
            ...baseStructure.ROOT,
            "nodes": ["travel-hero", "destinations", "services", "contact"]
          },
          "travel-hero": {
            "type": { "resolvedName": "Container" },
            "isCanvas": false,
            "props": {
              "height": "600px",
              "flexDirection": "column",
              "justifyContent": "center",
              "alignItems": "center",
              "background": "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop')"
            },
            "displayName": "Travel Hero",
            "nodes": ["travel-title"],
            "linkedNodes": {}
          },
          "travel-title": {
            "type": { "resolvedName": "Text" },
            "isCanvas": false,
            "props": {
              "text": "Wanderlust Adventures",
              "fontSize": "@typography.4xl",
              "fontWeight": "bold",
              "color": "@color.background",
              "textAlign": "center"
            },
            "displayName": "Travel Title",
            "nodes": [],
            "linkedNodes": {}
          }
        };
      
      case 'service':
        return {
          ...baseStructure,
          "ROOT": {
            ...baseStructure.ROOT,
            "nodes": ["service-hero", "services", "stats", "testimonials", "cta"]
          },
          "service-hero": {
            "type": { "resolvedName": "Container" },
            "isCanvas": false,
            "props": {
              "background": "@color.primary",
              "height": "500px",
              "flexDirection": "row",
              "alignItems": "center",
              "gap": "@spacing.xl"
            },
            "displayName": "Service Hero",
            "nodes": ["service-title"],
            "linkedNodes": {}
          },
          "service-title": {
            "type": { "resolvedName": "Text" },
            "isCanvas": false,
            "props": {
              "text": "Digital Solutions Agency",
              "fontSize": "@typography.3xl",
              "fontWeight": "bold",
              "color": "@color.background"
            },
            "displayName": "Service Title",
            "nodes": [],
            "linkedNodes": {}
          }
        };
      
      default:
        return baseStructure;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Demo Templates</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Choose from our professionally designed templates to get started quickly. 
          Each template includes all the components and styling you need.
        </p>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
            <TabsTrigger value="travel">Travel</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {demoTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onLoad={loadTemplate}
                  loading={loading && selectedTemplate === template.id}
                />
              ))}
            </div>
          </TabsContent>

          {['portfolio', 'ecommerce', 'travel', 'business'].map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {demoTemplates
                  .filter((template) => template.category === category)
                  .map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onLoad={loadTemplate}
                      loading={loading && selectedTemplate === template.id}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

interface TemplateCardProps {
  template: DemoTemplate;
  onLoad: (template: DemoTemplate) => void;
  loading: boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onLoad, loading }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img
          src={template.preview}
          alt={template.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{template.name}</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {template.category}
          </Badge>
        </div>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
          <div className="flex flex-wrap gap-1">
            {template.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        <Button
          onClick={() => onLoad(template)}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Loading...' : 'Load Template'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DemoTemplatesLoader;
