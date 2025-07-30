import React from 'react';
import { useEditor } from '@craftjs/core';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

/**
 * Fixed Demo Templates Component
 * 
 * This component provides working demo templates that properly integrate with Craft.js
 */

interface FixedDemoTemplatesProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FixedDemoTemplates: React.FC<FixedDemoTemplatesProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const { actions } = useEditor();

  const loadSimpleTemplate = () => {
    // Very simple template that should work
    const simpleTemplate = {
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
        "nodes": ["text1", "button1"],
        "linkedNodes": {}
      },
      "text1": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Welcome to Your New Page!",
          "fontSize": "@typography.2xl",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "button1": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Get Started",
          "backgroundColor": "@color.primary",
          "color": "@color.background",
          "borderRadius": "@radius.md"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      }
    };

    try {
      actions.deserialize(JSON.stringify(simpleTemplate));
      onClose();
    } catch (error) {
      console.error('Error loading simple template:', error);
    }
  };

  const loadHeroTemplate = () => {
    // Hero section template
    const heroTemplate = {
      "ROOT": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.xl",
          "background": "@color.background"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["hero", "content"],
        "linkedNodes": {}
      },
      "hero": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "background": "@color.primary",
          "height": "400px",
          "flexDirection": "column",
          "justifyContent": "center",
          "alignItems": "center",
          "gap": "@spacing.md",
          "paddingTop": "@spacing.lg",
          "paddingBottom": "@spacing.lg"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["hero-title", "hero-subtitle", "hero-button"],
        "linkedNodes": {}
      },
      "hero-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Amazing Hero Section",
          "fontSize": "@typography.3xl",
          "fontWeight": "bold",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "hero-subtitle": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "This is a beautiful hero section with great design",
          "fontSize": "@typography.lg",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "hero-button": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Learn More",
          "backgroundColor": "@color.background",
          "color": "@color.primary",
          "borderRadius": "@radius.full"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["content-title", "content-text"],
        "linkedNodes": {}
      },
      "content-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "About Our Service",
          "fontSize": "@typography.2xl",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "content-text": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "We provide exceptional services with modern design and cutting-edge technology. Our team is dedicated to delivering the best solutions for your business needs.",
          "fontSize": "@typography.base",
          "color": "@color.text",
          "textAlign": "center",
          "lineHeight": "1.6"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      }
    };

    try {
      actions.deserialize(JSON.stringify(heroTemplate));
      onClose();
    } catch (error) {
      console.error('Error loading hero template:', error);
    }
  };

  const loadPortfolioTemplate = () => {
    // Portfolio template with image
    const portfolioTemplate = {
      "ROOT": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.xl",
          "background": "@color.background"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["portfolio-hero", "portfolio-about", "portfolio-contact"],
        "linkedNodes": {}
      },
      "portfolio-hero": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "background": "@color.primary",
          "height": "500px",
          "flexDirection": "column",
          "justifyContent": "center",
          "alignItems": "center",
          "gap": "@spacing.md"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["portfolio-name", "portfolio-title", "portfolio-description"],
        "linkedNodes": {}
      },
      "portfolio-name": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "John Doe",
          "fontSize": "@typography.4xl",
          "fontWeight": "bold",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "portfolio-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Creative Designer & Developer",
          "fontSize": "@typography.xl",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "portfolio-description": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Crafting beautiful digital experiences with passion and precision",
          "fontSize": "@typography.base",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "portfolio-about": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.xl",
          "alignItems": "center",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["portfolio-image", "portfolio-content"],
        "linkedNodes": {}
      },
      "portfolio-image": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
          "alt": "Profile Picture",
          "width": "400px",
          "height": "400px",
          "borderRadius": 20,
          "objectFit": "cover"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "portfolio-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.md",
          "width": "50%"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["about-title", "about-text"],
        "linkedNodes": {}
      },
      "about-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "About Me",
          "fontSize": "@typography.2xl",
          "fontWeight": "bold",
          "color": "@color.text"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "about-text": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "I'm a passionate designer and developer with over 5 years of experience creating beautiful and functional digital products. I specialize in user experience design, front-end development, and brand identity.",
          "fontSize": "@typography.base",
          "color": "@color.text",
          "lineHeight": "1.6"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "portfolio-contact": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "background": "@color.muted",
          "flexDirection": "column",
          "justifyContent": "center",
          "alignItems": "center",
          "gap": "@spacing.md",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["contact-title", "contact-description", "contact-button"],
        "linkedNodes": {}
      },
      "contact-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Let's Work Together",
          "fontSize": "@typography.2xl",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "contact-description": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Ready to bring your ideas to life? Let's discuss your next project.",
          "fontSize": "@typography.base",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "contact-button": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Get in Touch",
          "backgroundColor": "@color.primary",
          "color": "@color.background",
          "borderRadius": "@radius.md"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      }
    };

    try {
      actions.deserialize(JSON.stringify(portfolioTemplate));
      onClose();
    } catch (error) {
      console.error('Error loading portfolio template:', error);
    }
  };

  const loadEcommerceTemplate = () => {
    // E-commerce template with product showcase
    const ecommerceTemplate = {
      "ROOT": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "background": "@color.background"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["ecom-hero", "ecom-featured", "ecom-products", "ecom-cta"],
        "linkedNodes": {}
      },
      "ecom-hero": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "background": "@color.primary",
          "height": "600px",
          "flexDirection": "row",
          "alignItems": "center",
          "gap": "@spacing.xl",
          "paddingLeft": "@spacing.xl",
          "paddingRight": "@spacing.xl"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["ecom-hero-content", "ecom-hero-image"],
        "linkedNodes": {}
      },
      "ecom-hero-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "width": "50%"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["ecom-title", "ecom-subtitle", "ecom-hero-button"],
        "linkedNodes": {}
      },
      "ecom-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Premium Fashion Collection",
          "fontSize": "@typography.4xl",
          "fontWeight": "bold",
          "color": "@color.background",
          "lineHeight": "1.2"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "ecom-subtitle": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Discover our exclusive range of premium clothing and accessories. Quality meets style in every piece.",
          "fontSize": "@typography.lg",
          "color": "@color.background",
          "lineHeight": "1.6"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "ecom-hero-button": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Shop Now",
          "backgroundColor": "@color.background",
          "color": "@color.primary",
          "borderRadius": "@radius.md",
          "paddingTop": "@spacing.md",
          "paddingBottom": "@spacing.md",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "ecom-hero-image": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop",
          "alt": "Fashion Collection - Click to update image",
          "width": "500px",
          "height": "500px",
          "borderRadius": 12,
          "objectFit": "cover"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "ecom-featured": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["featured-title", "featured-products"],
        "linkedNodes": {}
      },
      "featured-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Featured Products",
          "fontSize": "@typography.3xl",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "featured-products": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.lg",
          "flexWrap": "wrap",
          "justifyContent": "center"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["product1", "product2", "product3"],
        "linkedNodes": {}
      },
      "product1": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "300px",
          "flexDirection": "column",
          "gap": "@spacing.md",
          "background": "@color.background",
          "borderRadius": "@radius.lg",
          "shadow": 2,
          "overflow": "hidden"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["product1-image", "product1-content"],
        "linkedNodes": {}
      },
      "product1-image": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
          "alt": "Premium Dress - Click to update image",
          "width": "100%",
          "height": "250px",
          "objectFit": "cover"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "product1-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.sm",
          "paddingTop": "@spacing.md",
          "paddingBottom": "@spacing.md",
          "paddingLeft": "@spacing.md",
          "paddingRight": "@spacing.md"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["product1-name", "product1-price", "product1-button"],
        "linkedNodes": {}
      },
      "product1-name": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Elegant Evening Dress",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "product1-price": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "$299.99",
          "fontSize": "@typography.xl",
          "fontWeight": "bold",
          "color": "@color.primary"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "product1-button": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Add to Cart",
          "backgroundColor": "@color.primary",
          "color": "@color.background",
          "borderRadius": "@radius.md",
          "width": "100%"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "product2": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "300px",
          "flexDirection": "column",
          "gap": "@spacing.md",
          "background": "@color.background",
          "borderRadius": "@radius.lg",
          "shadow": 2,
          "overflow": "hidden"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["product2-image", "product2-content"],
        "linkedNodes": {}
      },
      "product2-image": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
          "alt": "Sneakers - Click to update image",
          "width": "100%",
          "height": "250px",
          "objectFit": "cover"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "product2-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.sm",
          "paddingTop": "@spacing.md",
          "paddingBottom": "@spacing.md",
          "paddingLeft": "@spacing.md",
          "paddingRight": "@spacing.md"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["product2-name", "product2-price", "product2-button"],
        "linkedNodes": {}
      },
      "product2-name": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Premium Sneakers",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "product2-price": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "$159.99",
          "fontSize": "@typography.xl",
          "fontWeight": "bold",
          "color": "@color.primary"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "product2-button": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Add to Cart",
          "backgroundColor": "@color.primary",
          "color": "@color.background",
          "borderRadius": "@radius.md",
          "width": "100%"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "product3": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "300px",
          "flexDirection": "column",
          "gap": "@spacing.md",
          "background": "@color.background",
          "borderRadius": "@radius.lg",
          "shadow": 2,
          "overflow": "hidden"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["product3-image", "product3-content"],
        "linkedNodes": {}
      },
      "product3-image": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
          "alt": "Handbag - Click to update image",
          "width": "100%",
          "height": "250px",
          "objectFit": "cover"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "product3-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.sm",
          "paddingTop": "@spacing.md",
          "paddingBottom": "@spacing.md",
          "paddingLeft": "@spacing.md",
          "paddingRight": "@spacing.md"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["product3-name", "product3-price", "product3-button"],
        "linkedNodes": {}
      },
      "product3-name": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Designer Handbag",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "product3-price": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "$449.99",
          "fontSize": "@typography.xl",
          "fontWeight": "bold",
          "color": "@color.primary"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "product3-button": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Add to Cart",
          "backgroundColor": "@color.primary",
          "color": "@color.background",
          "borderRadius": "@radius.md",
          "width": "100%"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "ecom-products": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "background": "@color.muted",
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["categories-title", "categories-grid"],
        "linkedNodes": {}
      },
      "categories-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Shop by Category",
          "fontSize": "@typography.3xl",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "categories-grid": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.lg",
          "flexWrap": "wrap",
          "justifyContent": "center"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["cat1", "cat2", "cat3"],
        "linkedNodes": {}
      },
      "cat1": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "250px",
          "height": "300px",
          "position": "relative",
          "borderRadius": "@radius.lg",
          "overflow": "hidden",
          "cursor": "pointer"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["cat1-image", "cat1-overlay"],
        "linkedNodes": {}
      },
      "cat1-image": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=250&h=300&fit=crop",
          "alt": "Women's Fashion - Click to update",
          "width": "100%",
          "height": "100%",
          "objectFit": "cover"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "cat1-overlay": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "position": "absolute",
          "top": "0",
          "left": "0",
          "right": "0",
          "bottom": "0",
          "background": "rgba(0,0,0,0.4)",
          "flexDirection": "column",
          "justifyContent": "center",
          "alignItems": "center"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["cat1-title"],
        "linkedNodes": {}
      },
      "cat1-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Women's Fashion",
          "fontSize": "@typography.2xl",
          "fontWeight": "bold",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "cat2": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "250px",
          "height": "300px",
          "position": "relative",
          "borderRadius": "@radius.lg",
          "overflow": "hidden",
          "cursor": "pointer"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["cat2-image", "cat2-overlay"],
        "linkedNodes": {}
      },
      "cat2-image": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=300&fit=crop",
          "alt": "Men's Fashion - Click to update",
          "width": "100%",
          "height": "100%",
          "objectFit": "cover"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "cat2-overlay": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "position": "absolute",
          "top": "0",
          "left": "0",
          "right": "0",
          "bottom": "0",
          "background": "rgba(0,0,0,0.4)",
          "flexDirection": "column",
          "justifyContent": "center",
          "alignItems": "center"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["cat2-title"],
        "linkedNodes": {}
      },
      "cat2-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Men's Fashion",
          "fontSize": "@typography.2xl",
          "fontWeight": "bold",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "cat3": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "250px",
          "height": "300px",
          "position": "relative",
          "borderRadius": "@radius.lg",
          "overflow": "hidden",
          "cursor": "pointer"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["cat3-image", "cat3-overlay"],
        "linkedNodes": {}
      },
      "cat3-image": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=250&h=300&fit=crop",
          "alt": "Accessories - Click to update",
          "width": "100%",
          "height": "100%",
          "objectFit": "cover"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "cat3-overlay": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "position": "absolute",
          "top": "0",
          "left": "0",
          "right": "0",
          "bottom": "0",
          "background": "rgba(0,0,0,0.4)",
          "flexDirection": "column",
          "justifyContent": "center",
          "alignItems": "center"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["cat3-title"],
        "linkedNodes": {}
      },
      "cat3-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Accessories",
          "fontSize": "@typography.2xl",
          "fontWeight": "bold",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "ecom-cta": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "background": "@color.primary",
          "flexDirection": "column",
          "justifyContent": "center",
          "alignItems": "center",
          "gap": "@spacing.md",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["ecom-cta-title", "ecom-cta-subtitle", "ecom-cta-button"],
        "linkedNodes": {}
      },
      "ecom-cta-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Join Our Newsletter",
          "fontSize": "@typography.3xl",
          "fontWeight": "bold",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "ecom-cta-subtitle": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Get exclusive offers and be the first to know about new arrivals",
          "fontSize": "@typography.lg",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "ecom-cta-button": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Subscribe Now",
          "backgroundColor": "@color.background",
          "color": "@color.primary",
          "borderRadius": "@radius.md",
          "paddingTop": "@spacing.md",
          "paddingBottom": "@spacing.md",
          "paddingLeft": "@spacing.xl",
          "paddingRight": "@spacing.xl"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      }
    };

    try {
      actions.deserialize(JSON.stringify(ecommerceTemplate));
      onClose();
    } catch (error) {
      console.error('Error loading ecommerce template:', error);
    }
  };

  const loadTravelTemplate = () => {
    // Travel agency template
    const travelTemplate = {
      "ROOT": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "background": "@color.background"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["travel-hero", "travel-destinations", "travel-services", "travel-cta"],
        "linkedNodes": {}
      },
      "travel-hero": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "height": "700px",
          "position": "relative",
          "flexDirection": "column",
          "justifyContent": "center",
          "alignItems": "center",
          "gap": "@spacing.lg"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["travel-hero-bg", "travel-hero-content"],
        "linkedNodes": {}
      },
      "travel-hero-bg": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=700&fit=crop",
          "alt": "Travel Destination - Click to update background",
          "position": "absolute",
          "top": "0",
          "left": "0",
          "width": "100%",
          "height": "100%",
          "objectFit": "cover",
          "zIndex": "1"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "travel-hero-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "position": "relative",
          "zIndex": "10",
          "flexDirection": "column",
          "alignItems": "center",
          "gap": "@spacing.lg",
          "background": "rgba(0,0,0,0.5)",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl",
          "paddingLeft": "@spacing.xl",
          "paddingRight": "@spacing.xl",
          "borderRadius": "@radius.lg"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["travel-title", "travel-subtitle", "travel-hero-button"],
        "linkedNodes": {}
      },
      "travel-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Discover Amazing Destinations",
          "fontSize": "@typography.4xl",
          "fontWeight": "bold",
          "color": "@color.background",
          "textAlign": "center",
          "lineHeight": "1.2"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "travel-subtitle": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Create unforgettable memories with our expertly crafted travel experiences around the world.",
          "fontSize": "@typography.xl",
          "color": "@color.background",
          "textAlign": "center",
          "lineHeight": "1.6"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "travel-hero-button": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Explore Destinations",
          "backgroundColor": "@color.primary",
          "color": "@color.background",
          "borderRadius": "@radius.md",
          "paddingTop": "@spacing.md",
          "paddingBottom": "@spacing.md",
          "paddingLeft": "@spacing.xl",
          "paddingRight": "@spacing.xl"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "travel-destinations": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["destinations-title", "destinations-grid"],
        "linkedNodes": {}
      },
      "destinations-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Popular Destinations",
          "fontSize": "@typography.3xl",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "destinations-grid": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.lg",
          "flexWrap": "wrap",
          "justifyContent": "center"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["dest1", "dest2", "dest3"],
        "linkedNodes": {}
      },
      "dest1": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "350px",
          "flexDirection": "column",
          "background": "@color.background",
          "borderRadius": "@radius.lg",
          "shadow": 3,
          "overflow": "hidden"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["dest1-image", "dest1-content"],
        "linkedNodes": {}
      },
      "dest1-image": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=350&h=250&fit=crop",
          "alt": "Paris Travel - Click to update image",
          "width": "100%",
          "height": "250px",
          "objectFit": "cover"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "dest1-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.md",
          "paddingTop": "@spacing.lg",
          "paddingBottom": "@spacing.lg",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["dest1-name", "dest1-description", "dest1-price", "dest1-button"],
        "linkedNodes": {}
      },
      "dest1-name": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Paris, France",
          "fontSize": "@typography.xl",
          "fontWeight": "bold",
          "color": "@color.text"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "dest1-description": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Experience the city of love with its iconic landmarks, world-class museums, and charming cafes.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "lineHeight": "1.5"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "dest1-price": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "From $1,299 per person",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.primary"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "dest1-button": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "View Details",
          "backgroundColor": "@color.primary",
          "color": "@color.background",
          "borderRadius": "@radius.md",
          "width": "100%"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "dest2": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "350px",
          "flexDirection": "column",
          "background": "@color.background",
          "borderRadius": "@radius.lg",
          "shadow": 3,
          "overflow": "hidden"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["dest2-image", "dest2-content"],
        "linkedNodes": {}
      },
      "dest2-image": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=350&h=250&fit=crop",
          "alt": "Santorini Travel - Click to update image",
          "width": "100%",
          "height": "250px",
          "objectFit": "cover"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "dest2-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.md",
          "paddingTop": "@spacing.lg",
          "paddingBottom": "@spacing.lg",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["dest2-name", "dest2-description", "dest2-price", "dest2-button"],
        "linkedNodes": {}
      },
      "dest2-name": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Santorini, Greece",
          "fontSize": "@typography.xl",
          "fontWeight": "bold",
          "color": "@color.text"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "dest2-description": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Discover breathtaking sunsets, white-washed buildings, and crystal-clear waters in this Greek paradise.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "lineHeight": "1.5"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "dest2-price": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "From $899 per person",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.primary"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "dest2-button": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "View Details",
          "backgroundColor": "@color.primary",
          "color": "@color.background",
          "borderRadius": "@radius.md",
          "width": "100%"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "dest3": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "350px",
          "flexDirection": "column",
          "background": "@color.background",
          "borderRadius": "@radius.lg",
          "shadow": 3,
          "overflow": "hidden"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["dest3-image", "dest3-content"],
        "linkedNodes": {}
      },
      "dest3-image": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=350&h=250&fit=crop",
          "alt": "Bali Travel - Click to update image",
          "width": "100%",
          "height": "250px",
          "objectFit": "cover"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "dest3-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.md",
          "paddingTop": "@spacing.lg",
          "paddingBottom": "@spacing.lg",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["dest3-name", "dest3-description", "dest3-price", "dest3-button"],
        "linkedNodes": {}
      },
      "dest3-name": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Bali, Indonesia",
          "fontSize": "@typography.xl",
          "fontWeight": "bold",
          "color": "@color.text"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "dest3-description": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Immerse yourself in tropical beauty, ancient temples, and vibrant culture in this Indonesian gem.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "lineHeight": "1.5"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "dest3-price": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "From $799 per person",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.primary"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "dest3-button": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "View Details",
          "backgroundColor": "@color.primary",
          "color": "@color.background",
          "borderRadius": "@radius.md",
          "width": "100%"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "travel-services": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "background": "@color.muted",
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["services-title", "services-grid"],
        "linkedNodes": {}
      },
      "services-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Our Travel Services",
          "fontSize": "@typography.3xl",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "services-grid": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.lg",
          "flexWrap": "wrap",
          "justifyContent": "center"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["service1", "service2", "service3"],
        "linkedNodes": {}
      },
      "service1": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "300px",
          "flexDirection": "column",
          "alignItems": "center",
          "gap": "@spacing.md",
          "background": "@color.background",
          "borderRadius": "@radius.lg",
          "shadow": 2,
          "paddingTop": "@spacing.lg",
          "paddingBottom": "@spacing.lg",
          "paddingLeft": "@spacing.md",
          "paddingRight": "@spacing.md"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["service1-icon", "service1-title", "service1-description"],
        "linkedNodes": {}
      },
      "service1-icon": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=80&h=80&fit=crop",
          "alt": "Flight Booking Icon - Click to update",
          "width": "80px",
          "height": "80px",
          "borderRadius": 40,
          "objectFit": "cover"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "service1-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Flight Booking",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "service1-description": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Book flights to destinations worldwide with competitive prices and flexible options.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "textAlign": "center",
          "lineHeight": "1.5"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "service2": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "300px",
          "flexDirection": "column",
          "alignItems": "center",
          "gap": "@spacing.md",
          "background": "@color.background",
          "borderRadius": "@radius.lg",
          "shadow": 2,
          "paddingTop": "@spacing.lg",
          "paddingBottom": "@spacing.lg",
          "paddingLeft": "@spacing.md",
          "paddingRight": "@spacing.md"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["service2-icon", "service2-title", "service2-description"],
        "linkedNodes": {}
      },
      "service2-icon": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=80&h=80&fit=crop",
          "alt": "Hotel Reservation Icon - Click to update",
          "width": "80px",
          "height": "80px",
          "borderRadius": 40,
          "objectFit": "cover"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "service2-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Hotel Reservation",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "service2-description": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Find and book the perfect accommodation from luxury hotels to cozy boutique stays.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "textAlign": "center",
          "lineHeight": "1.5"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "service3": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "300px",
          "flexDirection": "column",
          "alignItems": "center",
          "gap": "@spacing.md",
          "background": "@color.background",
          "borderRadius": "@radius.lg",
          "shadow": 2,
          "paddingTop": "@spacing.lg",
          "paddingBottom": "@spacing.lg",
          "paddingLeft": "@spacing.md",
          "paddingRight": "@spacing.md"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["service3-icon", "service3-title", "service3-description"],
        "linkedNodes": {}
      },
      "service3-icon": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=80&h=80&fit=crop",
          "alt": "Tour Guide Icon - Click to update",
          "width": "80px",
          "height": "80px",
          "borderRadius": 40,
          "objectFit": "cover"
        },
        "displayName": "Image",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "service3-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Guided Tours",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "service3-description": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Expert local guides to help you discover hidden gems and cultural experiences.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "textAlign": "center",
          "lineHeight": "1.5"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "travel-cta": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "background": "@color.primary",
          "flexDirection": "column",
          "justifyContent": "center",
          "alignItems": "center",
          "gap": "@spacing.md",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["travel-cta-title", "travel-cta-subtitle", "travel-cta-button"],
        "linkedNodes": {}
      },
      "travel-cta-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Ready for Your Next Adventure?",
          "fontSize": "@typography.3xl",
          "fontWeight": "bold",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "travel-cta-subtitle": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Contact us today and let us help you plan the perfect getaway",
          "fontSize": "@typography.lg",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "travel-cta-button": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Plan My Trip",
          "backgroundColor": "@color.background",
          "color": "@color.primary",
          "borderRadius": "@radius.md",
          "paddingTop": "@spacing.md",
          "paddingBottom": "@spacing.md",
          "paddingLeft": "@spacing.xl",
          "paddingRight": "@spacing.xl"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      }
    };

    try {
      actions.deserialize(JSON.stringify(travelTemplate));
      onClose();
    } catch (error) {
      console.error('Error loading travel template:', error);
    }
  };

  const loadServiceTemplate = () => {
    // Service business template
    const serviceTemplate = {
      "ROOT": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "background": "@color.background"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["service-hero", "service-features", "service-cta"],
        "linkedNodes": {}
      },
      "service-hero": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "background": "@color.primary",
          "height": "500px",
          "flexDirection": "column",
          "justifyContent": "center",
          "alignItems": "center",
          "gap": "@spacing.md"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["service-title", "service-subtitle", "service-hero-button"],
        "linkedNodes": {}
      },
      "service-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Digital Solutions Agency",
          "fontSize": "@typography.3xl",
          "fontWeight": "bold",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "service-subtitle": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "We help businesses grow with innovative digital strategies and cutting-edge technology solutions.",
          "fontSize": "@typography.base",
          "color": "@color.background",
          "textAlign": "center",
          "lineHeight": "1.6"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "service-hero-button": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Get Started",
          "backgroundColor": "@color.background",
          "color": "@color.primary",
          "borderRadius": "@radius.md"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "service-features": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["features-title", "features-grid"],
        "linkedNodes": {}
      },
      "features-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Our Services",
          "fontSize": "@typography.2xl",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "features-grid": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.lg",
          "flexWrap": "wrap",
          "justifyContent": "center"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["feature1", "feature2", "feature3"],
        "linkedNodes": {}
      },
      "feature1": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "300px",
          "flexDirection": "column",
          "gap": "@spacing.md",
          "background": "@color.background",
          "radius": "@radius.lg",
          "shadow": 2,
          "paddingTop": "@spacing.lg",
          "paddingBottom": "@spacing.lg",
          "paddingLeft": "@spacing.md",
          "paddingRight": "@spacing.md",
          "alignItems": "center"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["feature1-title", "feature1-description"],
        "linkedNodes": {}
      },
      "feature1-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Web Development",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "feature1-description": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Custom websites and web applications built with modern technologies for optimal performance.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "textAlign": "center",
          "lineHeight": "1.5"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "feature2": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "300px",
          "flexDirection": "column",
          "gap": "@spacing.md",
          "background": "@color.background",
          "radius": "@radius.lg",
          "shadow": 2,
          "paddingTop": "@spacing.lg",
          "paddingBottom": "@spacing.lg",
          "paddingLeft": "@spacing.md",
          "paddingRight": "@spacing.md",
          "alignItems": "center"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["feature2-title", "feature2-description"],
        "linkedNodes": {}
      },
      "feature2-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Mobile Apps",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "feature2-description": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Native and cross-platform mobile applications that engage users and drive business growth.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "textAlign": "center",
          "lineHeight": "1.5"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "feature3": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "300px",
          "flexDirection": "column",
          "gap": "@spacing.md",
          "background": "@color.background",
          "radius": "@radius.lg",
          "shadow": 2,
          "paddingTop": "@spacing.lg",
          "paddingBottom": "@spacing.lg",
          "paddingLeft": "@spacing.md",
          "paddingRight": "@spacing.md",
          "alignItems": "center"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["feature3-title", "feature3-description"],
        "linkedNodes": {}
      },
      "feature3-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "UI/UX Design",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "feature3-description": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Beautiful and intuitive designs that enhance user experience and reflect your brand identity.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "textAlign": "center",
          "lineHeight": "1.5"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "service-cta": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "background": "@color.primary",
          "flexDirection": "column",
          "justifyContent": "center",
          "alignItems": "center",
          "gap": "@spacing.md",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl"
        },
        "displayName": "Container",
        "custom": {},
        "hidden": false,
        "nodes": ["cta-title", "cta-description", "cta-button"],
        "linkedNodes": {}
      },
      "cta-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Ready to Transform Your Business?",
          "fontSize": "@typography.2xl",
          "fontWeight": "bold",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "cta-description": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Let's discuss your project and create something amazing together",
          "fontSize": "@typography.base",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Text",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      },
      "cta-button": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Start Your Project",
          "backgroundColor": "@color.background",
          "color": "@color.primary",
          "borderRadius": "@radius.md"
        },
        "displayName": "Button",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
      }
    };

    try {
      actions.deserialize(JSON.stringify(serviceTemplate));
      onClose();
    } catch (error) {
      console.error('Error loading service template:', error);
    }
  };

  if (!isOpen) return null;

  const templates = [
    {
      id: 'simple',
      name: 'Simple Start', 
      description: 'A basic template with title and button to get you started quickly.',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop',
      features: ['Welcome Title', 'Call-to-Action Button', 'Clean Layout'],
      onLoad: loadSimpleTemplate
    },
    {
      id: 'hero',
      name: 'Hero Section',
      description: 'Professional hero section with title, subtitle and content area.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      features: ['Hero Banner', 'Content Section', 'Professional Layout'],
      onLoad: loadHeroTemplate
    },
    {
      id: 'portfolio',
      name: 'Portfolio Layout',
      description: 'Perfect for showcasing your work with profile section and contact area.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      features: ['Profile Image', 'About Section', 'Contact CTA'],
      onLoad: loadPortfolioTemplate
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Store',
      description: 'Complete online store with product showcase, categories and shopping features.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
      features: ['Product Grid', 'Hero Section', 'Category Cards', 'Shopping Cart'],
      onLoad: loadEcommerceTemplate
    },
    {
      id: 'travel',
      name: 'Travel Agency',
      description: 'Beautiful travel website with destinations, services and booking features.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop',
      features: ['Destination Cards', 'Hero Background', 'Service Cards', 'Booking CTA'],
      onLoad: loadTravelTemplate
    },
    {
      id: 'service',
      name: 'Service Business',
      description: 'Professional service company layout with feature cards and call-to-action.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop',
      features: ['Service Cards', 'Hero Section', 'Call-to-Action'],
      onLoad: loadServiceTemplate
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Demo Templates</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Choose from our professionally designed templates. These templates are tested and working properly with your design system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={template.onLoad}
                  className="w-full"
                >
                  Load Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FixedDemoTemplates;
