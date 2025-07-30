import React from 'react';
import { useEditor } from '@craftjs/core';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

/**
 * Simple Demo Templates Component
 * 
 * Provides quick access to load demo page templates directly into the editor.
 * Each template showcases different use cases and design patterns.
 */

interface SimpleDemoTemplatesProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimpleDemoTemplates: React.FC<SimpleDemoTemplatesProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const { actions } = useEditor();

  const loadPortfolioTemplate = () => {
    const portfolioData = {
      "ROOT": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.xl",
          "background": "@color.background"
        },
        "displayName": "Root Container",
        "custom": {},
        "hidden": false,
        "nodes": ["hero", "about", "projects", "contact"],
        "linkedNodes": {}
      },
      "hero": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "background": "@color.primary",
          "height": "500px",
          "flexDirection": "column",
          "justifyContent": "center",
          "alignItems": "center",
          "gap": "@spacing.md",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl"
        },
        "displayName": "Hero Section",
        "nodes": ["hero-title", "hero-subtitle", "hero-desc", "hero-btn"],
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
      "hero-desc": {
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
      "hero-btn": {
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
      },
      "about": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.xl",
          "alignItems": "center",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl"
        },
        "displayName": "About Section",
        "nodes": ["about-image", "about-content"],
        "linkedNodes": {}
      },
      "about-image": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
          "alt": "Profile Picture",
          "width": "100%",
          "height": "400px",
          "borderRadius": 20,
          "objectFit": "cover"
        },
        "displayName": "Profile Image",
        "nodes": [],
        "linkedNodes": {}
      },
      "about-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.md"
        },
        "displayName": "About Content",
        "nodes": ["about-title", "about-text", "about-btn"],
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
        "displayName": "About Title",
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
        "displayName": "About Text",
        "nodes": [],
        "linkedNodes": {}
      },
      "about-btn": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Download Resume",
          "backgroundColor": "@color.secondary",
          "color": "@color.background",
          "borderRadius": "@radius.md"
        },
        "displayName": "About Button",
        "nodes": [],
        "linkedNodes": {}
      },
      "projects": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg"
        },
        "displayName": "Projects Section",
        "nodes": ["projects-title", "projects-grid"],
        "linkedNodes": {}
      },
      "projects-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Featured Projects",
          "fontSize": "@typography.2xl",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Projects Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "projects-grid": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.lg",
          "flexWrap": "wrap"
        },
        "displayName": "Projects Grid",
        "nodes": ["project1", "project2", "project3"],
        "linkedNodes": {}
      },
      "project1": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "30%",
          "flexDirection": "column",
          "gap": "@spacing.sm"
        },
        "displayName": "Project 1",
        "nodes": ["proj1-img", "proj1-title", "proj1-desc"],
        "linkedNodes": {}
      },
      "proj1-img": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
          "alt": "E-commerce Website",
          "width": "100%",
          "height": "200px",
          "borderRadius": 10,
          "objectFit": "cover"
        },
        "displayName": "Project 1 Image",
        "nodes": [],
        "linkedNodes": {}
      },
      "proj1-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "E-commerce Platform",
          "fontSize": "@typography.lg",
          "fontWeight": "semibold",
          "color": "@color.text"
        },
        "displayName": "Project 1 Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "proj1-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Modern online store with seamless user experience",
          "fontSize": "@typography.sm",
          "color": "@color.muted"
        },
        "displayName": "Project 1 Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "project2": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "30%",
          "flexDirection": "column",
          "gap": "@spacing.sm"
        },
        "displayName": "Project 2",
        "nodes": ["proj2-img", "proj2-title", "proj2-desc"],
        "linkedNodes": {}
      },
      "proj2-img": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
          "alt": "Mobile App",
          "width": "100%",
          "height": "200px",
          "borderRadius": 10,
          "objectFit": "cover"
        },
        "displayName": "Project 2 Image",
        "nodes": [],
        "linkedNodes": {}
      },
      "proj2-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Mobile Banking App",
          "fontSize": "@typography.lg",
          "fontWeight": "semibold",
          "color": "@color.text"
        },
        "displayName": "Project 2 Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "proj2-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Secure and intuitive financial management",
          "fontSize": "@typography.sm",
          "color": "@color.muted"
        },
        "displayName": "Project 2 Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "project3": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "30%",
          "flexDirection": "column",
          "gap": "@spacing.sm"
        },
        "displayName": "Project 3",
        "nodes": ["proj3-img", "proj3-title", "proj3-desc"],
        "linkedNodes": {}
      },
      "proj3-img": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop",
          "alt": "Brand Identity",
          "width": "100%",
          "height": "200px",
          "borderRadius": 10,
          "objectFit": "cover"
        },
        "displayName": "Project 3 Image",
        "nodes": [],
        "linkedNodes": {}
      },
      "proj3-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Brand Identity Design",
          "fontSize": "@typography.lg",
          "fontWeight": "semibold",
          "color": "@color.text"
        },
        "displayName": "Project 3 Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "proj3-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Complete visual identity for tech startup",
          "fontSize": "@typography.sm",
          "color": "@color.muted"
        },
        "displayName": "Project 3 Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "contact": {
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
        "displayName": "Contact Section",
        "nodes": ["contact-title", "contact-desc", "contact-buttons"],
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
        "displayName": "Contact Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "contact-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Ready to bring your ideas to life? Let's discuss your next project.",
          "fontSize": "@typography.base",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Contact Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "contact-buttons": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.md"
        },
        "displayName": "Contact Buttons",
        "nodes": ["contact-btn1", "contact-btn2"],
        "linkedNodes": {}
      },
      "contact-btn1": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Get in Touch",
          "backgroundColor": "@color.primary",
          "color": "@color.background",
          "borderRadius": "@radius.md"
        },
        "displayName": "Contact Button 1",
        "nodes": [],
        "linkedNodes": {}
      },
      "contact-btn2": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "View LinkedIn",
          "backgroundColor": "@color.secondary",
          "color": "@color.background",
          "borderRadius": "@radius.md"
        },
        "displayName": "Contact Button 2",
        "nodes": [],
        "linkedNodes": {}
      }
    };

    actions.deserialize(JSON.stringify(portfolioData));
    onClose();
  };

  const loadEcommerceTemplate = () => {
    const ecommerceData = {
      "ROOT": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "background": "@color.background"
        },
        "displayName": "Root Container",
        "nodes": ["header", "hero", "products"],
        "linkedNodes": {}
      },
      "header": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "justifyContent": "space-between",
          "alignItems": "center",
          "paddingTop": "@spacing.md",
          "paddingBottom": "@spacing.md",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg",
          "shadow": 1
        },
        "displayName": "Header",
        "nodes": ["logo", "cart-btn"],
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
      },
      "cart-btn": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Cart (0)",
          "backgroundColor": "@color.primary",
          "color": "@color.background",
          "borderRadius": "@radius.md"
        },
        "displayName": "Cart Button",
        "nodes": [],
        "linkedNodes": {}
      },
      "hero": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "background": "@color.primary",
          "height": "400px",
          "flexDirection": "row",
          "alignItems": "center",
          "gap": "@spacing.xl",
          "paddingLeft": "@spacing.xl",
          "paddingRight": "@spacing.xl"
        },
        "displayName": "Hero Banner",
        "nodes": ["hero-content", "hero-image"],
        "linkedNodes": {}
      },
      "hero-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "50%",
          "flexDirection": "column",
          "gap": "@spacing.md"
        },
        "displayName": "Hero Content",
        "nodes": ["hero-title", "hero-desc", "hero-btn"],
        "linkedNodes": {}
      },
      "hero-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Summer Collection 2024",
          "fontSize": "@typography.3xl",
          "fontWeight": "bold",
          "color": "@color.background"
        },
        "displayName": "Hero Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "hero-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Discover the latest trends in fashion with our exclusive summer collection. Quality meets style.",
          "fontSize": "@typography.base",
          "color": "@color.background",
          "lineHeight": "1.6"
        },
        "displayName": "Hero Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "hero-btn": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Shop Now",
          "backgroundColor": "@color.background",
          "color": "@color.primary",
          "borderRadius": "@radius.md"
        },
        "displayName": "Hero Button",
        "nodes": [],
        "linkedNodes": {}
      },
      "hero-image": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=400&fit=crop",
          "alt": "Summer Fashion",
          "width": "100%",
          "height": "350px",
          "borderRadius": 15,
          "objectFit": "cover"
        },
        "displayName": "Hero Image",
        "nodes": [],
        "linkedNodes": {}
      },
      "products": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg"
        },
        "displayName": "Products Section",
        "nodes": ["products-title", "products-grid"],
        "linkedNodes": {}
      },
      "products-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Featured Products",
          "fontSize": "@typography.2xl",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Products Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "products-grid": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.lg",
          "flexWrap": "wrap",
          "justifyContent": "center"
        },
        "displayName": "Products Grid",
        "nodes": ["product1", "product2"],
        "linkedNodes": {}
      },
      "product1": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "22%",
          "flexDirection": "column",
          "gap": "@spacing.sm",
          "background": "@color.background",
          "radius": "@radius.lg",
          "shadow": 2,
          "paddingBottom": "@spacing.md"
        },
        "displayName": "Product 1",
        "nodes": ["prod1-img", "prod1-content"],
        "linkedNodes": {}
      },
      "prod1-img": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=300&fit=crop",
          "alt": "Summer Dress",
          "width": "100%",
          "height": "250px",
          "borderRadius": 10,
          "objectFit": "cover"
        },
        "displayName": "Product 1 Image",
        "nodes": [],
        "linkedNodes": {}
      },
      "prod1-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "paddingLeft": "@spacing.md",
          "paddingRight": "@spacing.md",
          "flexDirection": "column",
          "gap": "@spacing.xs"
        },
        "displayName": "Product 1 Content",
        "nodes": ["prod1-title", "prod1-price", "prod1-btn"],
        "linkedNodes": {}
      },
      "prod1-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Elegant Summer Dress",
          "fontSize": "@typography.base",
          "fontWeight": "semibold",
          "color": "@color.text"
        },
        "displayName": "Product 1 Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "prod1-price": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "$89.99",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.primary"
        },
        "displayName": "Product 1 Price",
        "nodes": [],
        "linkedNodes": {}
      },
      "prod1-btn": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Add to Cart",
          "backgroundColor": "@color.secondary",
          "color": "@color.background",
          "borderRadius": "@radius.sm"
        },
        "displayName": "Product 1 Button",
        "nodes": [],
        "linkedNodes": {}
      },
      "product2": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "22%",
          "flexDirection": "column",
          "gap": "@spacing.sm",
          "background": "@color.background",
          "radius": "@radius.lg",
          "shadow": 2,
          "paddingBottom": "@spacing.md"
        },
        "displayName": "Product 2",
        "nodes": ["prod2-img", "prod2-content"],
        "linkedNodes": {}
      },
      "prod2-img": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop",
          "alt": "Casual Shirt",
          "width": "100%",
          "height": "250px",
          "borderRadius": 10,
          "objectFit": "cover"
        },
        "displayName": "Product 2 Image",
        "nodes": [],
        "linkedNodes": {}
      },
      "prod2-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "paddingLeft": "@spacing.md",
          "paddingRight": "@spacing.md",
          "flexDirection": "column",
          "gap": "@spacing.xs"
        },
        "displayName": "Product 2 Content",
        "nodes": ["prod2-title", "prod2-price", "prod2-btn"],
        "linkedNodes": {}
      },
      "prod2-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Premium Cotton Shirt",
          "fontSize": "@typography.base",
          "fontWeight": "semibold",
          "color": "@color.text"
        },
        "displayName": "Product 2 Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "prod2-price": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "$65.99",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.primary"
        },
        "displayName": "Product 2 Price",
        "nodes": [],
        "linkedNodes": {}
      },
      "prod2-btn": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Add to Cart",
          "backgroundColor": "@color.secondary",
          "color": "@color.background",
          "borderRadius": "@radius.sm"
        },
        "displayName": "Product 2 Button",
        "nodes": [],
        "linkedNodes": {}
      }
    };

    actions.deserialize(JSON.stringify(ecommerceData));
    onClose();
  };

  const loadServiceTemplate = () => {
    const serviceData = {
      "ROOT": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "background": "@color.background"
        },
        "displayName": "Root Container",
        "nodes": ["service-hero", "services", "cta"],
        "linkedNodes": {}
      },
      "service-hero": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "background": "@color.primary",
          "height": "500px",
          "flexDirection": "row",
          "alignItems": "center",
          "gap": "@spacing.xl",
          "paddingLeft": "@spacing.xl",
          "paddingRight": "@spacing.xl"
        },
        "displayName": "Service Hero",
        "nodes": ["service-hero-content", "service-hero-image"],
        "linkedNodes": {}
      },
      "service-hero-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "50%",
          "flexDirection": "column",
          "gap": "@spacing.md"
        },
        "displayName": "Service Hero Content",
        "nodes": ["service-title", "service-desc", "service-buttons"],
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
      },
      "service-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "We help businesses grow with innovative digital strategies and cutting-edge technology solutions.",
          "fontSize": "@typography.base",
          "color": "@color.background",
          "lineHeight": "1.6"
        },
        "displayName": "Service Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "service-buttons": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.sm"
        },
        "displayName": "Service Buttons",
        "nodes": ["service-btn1", "service-btn2"],
        "linkedNodes": {}
      },
      "service-btn1": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Get Started",
          "backgroundColor": "@color.background",
          "color": "@color.primary",
          "borderRadius": "@radius.md"
        },
        "displayName": "Service Button 1",
        "nodes": [],
        "linkedNodes": {}
      },
      "service-btn2": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "View Portfolio",
          "backgroundColor": "@color.secondary",
          "color": "@color.background",
          "borderRadius": "@radius.md"
        },
        "displayName": "Service Button 2",
        "nodes": [],
        "linkedNodes": {}
      },
      "service-hero-image": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop",
          "alt": "Team Collaboration",
          "width": "100%",
          "height": "400px",
          "borderRadius": 15,
          "objectFit": "cover"
        },
        "displayName": "Service Hero Image",
        "nodes": [],
        "linkedNodes": {}
      },
      "services": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg",
          "paddingTop": "@spacing.xl"
        },
        "displayName": "Services Section",
        "nodes": ["services-title", "services-grid"],
        "linkedNodes": {}
      },
      "services-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Our Services",
          "fontSize": "@typography.2xl",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Services Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "services-grid": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.lg",
          "flexWrap": "wrap"
        },
        "displayName": "Services Grid",
        "nodes": ["service1", "service2", "service3"],
        "linkedNodes": {}
      },
      "service1": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "30%",
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
        "displayName": "Service 1",
        "nodes": ["service1-icon", "service1-title", "service1-desc", "service1-btn"],
        "linkedNodes": {}
      },
      "service1-icon": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "100px",
          "height": "100px",
          "background": "@color.primary",
          "radius": "@radius.full",
          "justifyContent": "center",
          "alignItems": "center"
        },
        "displayName": "Service 1 Icon",
        "nodes": ["service1-emoji"],
        "linkedNodes": {}
      },
      "service1-emoji": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "💻",
          "fontSize": "@typography.3xl"
        },
        "displayName": "Service 1 Emoji",
        "nodes": [],
        "linkedNodes": {}
      },
      "service1-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Web Development",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Service 1 Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "service1-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "textAlign": "center",
          "lineHeight": "1.5"
        },
        "displayName": "Service 1 Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "service1-btn": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Learn More",
          "backgroundColor": "@color.secondary",
          "color": "@color.background",
          "borderRadius": "@radius.sm"
        },
        "displayName": "Service 1 Button",
        "nodes": [],
        "linkedNodes": {}
      },
      "service2": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "30%",
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
        "displayName": "Service 2",
        "nodes": ["service2-icon", "service2-title", "service2-desc", "service2-btn"],
        "linkedNodes": {}
      },
      "service2-icon": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "100px",
          "height": "100px",
          "background": "@color.secondary",
          "radius": "@radius.full",
          "justifyContent": "center",
          "alignItems": "center"
        },
        "displayName": "Service 2 Icon",
        "nodes": ["service2-emoji"],
        "linkedNodes": {}
      },
      "service2-emoji": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "📱",
          "fontSize": "@typography.3xl"
        },
        "displayName": "Service 2 Emoji",
        "nodes": [],
        "linkedNodes": {}
      },
      "service2-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Mobile Apps",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Service 2 Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "service2-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Native and cross-platform mobile applications that engage users and drive business growth.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "textAlign": "center",
          "lineHeight": "1.5"
        },
        "displayName": "Service 2 Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "service2-btn": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Learn More",
          "backgroundColor": "@color.secondary",
          "color": "@color.background",
          "borderRadius": "@radius.sm"
        },
        "displayName": "Service 2 Button",
        "nodes": [],
        "linkedNodes": {}
      },
      "service3": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "30%",
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
        "displayName": "Service 3",
        "nodes": ["service3-icon", "service3-title", "service3-desc", "service3-btn"],
        "linkedNodes": {}
      },
      "service3-icon": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "100px",
          "height": "100px",
          "background": "@color.primary",
          "radius": "@radius.full",
          "justifyContent": "center",
          "alignItems": "center"
        },
        "displayName": "Service 3 Icon",
        "nodes": ["service3-emoji"],
        "linkedNodes": {}
      },
      "service3-emoji": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "🎨",
          "fontSize": "@typography.3xl"
        },
        "displayName": "Service 3 Emoji",
        "nodes": [],
        "linkedNodes": {}
      },
      "service3-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "UI/UX Design",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Service 3 Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "service3-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Beautiful and intuitive designs that enhance user experience and reflect your brand identity.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "textAlign": "center",
          "lineHeight": "1.5"
        },
        "displayName": "Service 3 Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "service3-btn": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Learn More",
          "backgroundColor": "@color.secondary",
          "color": "@color.background",
          "borderRadius": "@radius.sm"
        },
        "displayName": "Service 3 Button",
        "nodes": [],
        "linkedNodes": {}
      },
      "cta": {
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
        "displayName": "CTA Section",
        "nodes": ["cta-title", "cta-desc", "cta-buttons"],
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
        "displayName": "CTA Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "cta-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Let's discuss your project and create something amazing together",
          "fontSize": "@typography.base",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "CTA Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "cta-buttons": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.md"
        },
        "displayName": "CTA Buttons",
        "nodes": ["cta-btn1", "cta-btn2"],
        "linkedNodes": {}
      },
      "cta-btn1": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Start Your Project",
          "backgroundColor": "@color.background",
          "color": "@color.primary",
          "borderRadius": "@radius.md"
        },
        "displayName": "CTA Button 1",
        "nodes": [],
        "linkedNodes": {}
      },
      "cta-btn2": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Schedule Consultation",
          "backgroundColor": "@color.secondary",
          "color": "@color.background",
          "borderRadius": "@radius.md"
        },
        "displayName": "CTA Button 2",
        "nodes": [],
        "linkedNodes": {}
      }
    };

    actions.deserialize(JSON.stringify(serviceData));
    onClose();
  };

  const loadTravelTemplate = () => {
    const travelData = {
      "ROOT": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "background": "@color.background"
        },
        "displayName": "Root Container",
        "nodes": ["travel-hero", "destinations", "contact"],
        "linkedNodes": {}
      },
      "travel-hero": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "height": "600px",
          "flexDirection": "column",
          "justifyContent": "center",
          "alignItems": "center",
          "gap": "@spacing.lg",
          "background": "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))"
        },
        "displayName": "Travel Hero",
        "nodes": ["travel-hero-content"],
        "linkedNodes": {}
      },
      "travel-hero-content": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "background": "rgba(0,0,0,0.5)",
          "flexDirection": "column",
          "alignItems": "center",
          "gap": "@spacing.md",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg",
          "radius": "@radius.lg"
        },
        "displayName": "Travel Hero Content",
        "nodes": ["travel-title", "travel-subtitle", "travel-desc", "travel-buttons"],
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
      },
      "travel-subtitle": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Discover Amazing Places Around the World",
          "fontSize": "@typography.xl",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Travel Subtitle",
        "nodes": [],
        "linkedNodes": {}
      },
      "travel-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Create unforgettable memories with our carefully curated travel experiences",
          "fontSize": "@typography.base",
          "color": "@color.background",
          "textAlign": "center"
        },
        "displayName": "Travel Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "travel-buttons": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.md"
        },
        "displayName": "Travel Buttons",
        "nodes": ["travel-btn1", "travel-btn2"],
        "linkedNodes": {}
      },
      "travel-btn1": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Explore Destinations",
          "backgroundColor": "@color.primary",
          "color": "@color.background",
          "borderRadius": "@radius.md"
        },
        "displayName": "Travel Button 1",
        "nodes": [],
        "linkedNodes": {}
      },
      "travel-btn2": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Plan Your Trip",
          "backgroundColor": "@color.secondary",
          "color": "@color.background",
          "borderRadius": "@radius.md"
        },
        "displayName": "Travel Button 2",
        "nodes": [],
        "linkedNodes": {}
      },
      "destinations": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "gap": "@spacing.lg",
          "paddingLeft": "@spacing.lg",
          "paddingRight": "@spacing.lg"
        },
        "displayName": "Destinations Section",
        "nodes": ["destinations-title", "destinations-grid"],
        "linkedNodes": {}
      },
      "destinations-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Popular Destinations",
          "fontSize": "@typography.2xl",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Destinations Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "destinations-grid": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.lg",
          "flexWrap": "wrap"
        },
        "displayName": "Destinations Grid", 
        "nodes": ["dest1", "dest2", "dest3"],
        "linkedNodes": {}
      },
      "dest1": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "30%",
          "flexDirection": "column",
          "gap": "@spacing.sm"
        },
        "displayName": "Destination 1",
        "nodes": ["dest1-img", "dest1-title", "dest1-desc", "dest1-price", "dest1-btn"],
        "linkedNodes": {}
      },
      "dest1-img": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop",
          "alt": "Santorini, Greece",
          "width": "100%",
          "height": "250px",
          "borderRadius": 15,
          "objectFit": "cover"
        },
        "displayName": "Destination 1 Image",
        "nodes": [],
        "linkedNodes": {}
      },
      "dest1-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Santorini, Greece",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text"
        },
        "displayName": "Destination 1 Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "dest1-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Experience the magic of white-washed buildings and stunning sunsets in this Greek paradise.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "lineHeight": "1.5"
        },
        "displayName": "Destination 1 Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "dest1-price": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Starting from $1,299",
          "fontSize": "@typography.base",
          "fontWeight": "semibold",
          "color": "@color.primary"
        },
        "displayName": "Destination 1 Price",
        "nodes": [],
        "linkedNodes": {}
      },
      "dest1-btn": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "View Details",
          "backgroundColor": "@color.secondary",
          "color": "@color.background",
          "borderRadius": "@radius.sm"
        },
        "displayName": "Destination 1 Button",
        "nodes": [],
        "linkedNodes": {}
      },
      "dest2": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "30%",
          "flexDirection": "column",
          "gap": "@spacing.sm"
        },
        "displayName": "Destination 2",
        "nodes": ["dest2-img", "dest2-title", "dest2-desc", "dest2-price", "dest2-btn"],
        "linkedNodes": {}
      },
      "dest2-img": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
          "alt": "Bali, Indonesia",
          "width": "100%",
          "height": "250px",
          "borderRadius": 15,
          "objectFit": "cover"
        },
        "displayName": "Destination 2 Image",
        "nodes": [],
        "linkedNodes": {}
      },
      "dest2-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Bali, Indonesia",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text"
        },
        "displayName": "Destination 2 Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "dest2-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Immerse yourself in tropical beauty, rich culture, and pristine beaches.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "lineHeight": "1.5"
        },
        "displayName": "Destination 2 Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "dest2-price": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Starting from $899",
          "fontSize": "@typography.base",
          "fontWeight": "semibold",
          "color": "@color.primary"
        },
        "displayName": "Destination 2 Price",
        "nodes": [],
        "linkedNodes": {}
      },
      "dest2-btn": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "View Details",
          "backgroundColor": "@color.secondary",
          "color": "@color.background",
          "borderRadius": "@radius.sm"
        },
        "displayName": "Destination 2 Button",
        "nodes": [],
        "linkedNodes": {}
      },
      "dest3": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "width": "30%",
          "flexDirection": "column",
          "gap": "@spacing.sm"
        },
        "displayName": "Destination 3",
        "nodes": ["dest3-img", "dest3-title", "dest3-desc", "dest3-price", "dest3-btn"],
        "linkedNodes": {}
      },
      "dest3-img": {
        "type": { "resolvedName": "ImageComponent" },
        "isCanvas": false,
        "props": {
          "src": "https://images.unsplash.com/photo-1502780402662-acc01917871e?w=400&h=300&fit=crop",
          "alt": "Tokyo, Japan",
          "width": "100%",
          "height": "250px",
          "borderRadius": 15,
          "objectFit": "cover"
        },
        "displayName": "Destination 3 Image",
        "nodes": [],
        "linkedNodes": {}
      },
      "dest3-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Tokyo, Japan",
          "fontSize": "@typography.lg",
          "fontWeight": "bold",
          "color": "@color.text"
        },
        "displayName": "Destination 3 Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "dest3-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Discover the perfect blend of traditional culture and modern innovation.",
          "fontSize": "@typography.sm",
          "color": "@color.muted",
          "lineHeight": "1.5"
        },
        "displayName": "Destination 3 Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "dest3-price": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Starting from $1,599",
          "fontSize": "@typography.base",
          "fontWeight": "semibold",
          "color": "@color.primary"
        },
        "displayName": "Destination 3 Price",
        "nodes": [],
        "linkedNodes": {}
      },
      "dest3-btn": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "View Details",
          "backgroundColor": "@color.secondary",
          "color": "@color.background",
          "borderRadius": "@radius.sm"
        },
        "displayName": "Destination 3 Button",
        "nodes": [],
        "linkedNodes": {}
      },
      "contact": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "column",
          "justifyContent": "center",
          "alignItems": "center",
          "gap": "@spacing.md",
          "paddingTop": "@spacing.xl",
          "paddingBottom": "@spacing.xl"
        },
        "displayName": "Contact Section",
        "nodes": ["contact-title", "contact-desc", "contact-buttons"],
        "linkedNodes": {}
      },
      "contact-title": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Ready for Your Next Adventure?",
          "fontSize": "@typography.2xl",
          "fontWeight": "bold",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Contact Title",
        "nodes": [],
        "linkedNodes": {}
      },
      "contact-desc": {
        "type": { "resolvedName": "Text" },
        "isCanvas": false,
        "props": {
          "text": "Contact our travel experts to start planning your dream vacation today",
          "fontSize": "@typography.base",
          "color": "@color.text",
          "textAlign": "center"
        },
        "displayName": "Contact Description",
        "nodes": [],
        "linkedNodes": {}
      },
      "contact-buttons": {
        "type": { "resolvedName": "Container" },
        "isCanvas": true,
        "props": {
          "flexDirection": "row",
          "gap": "@spacing.md"
        },
        "displayName": "Contact Buttons",
        "nodes": ["contact-btn1", "contact-btn2"],
        "linkedNodes": {}
      },
      "contact-btn1": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Get Quote",
          "backgroundColor": "@color.primary",
          "color": "@color.background",
          "borderRadius": "@radius.md"
        },
        "displayName": "Contact Button 1",
        "nodes": [],
        "linkedNodes": {}
      },
      "contact-btn2": {
        "type": { "resolvedName": "Button" },
        "isCanvas": false,
        "props": {
          "text": "Call Us Now",
          "backgroundColor": "@color.secondary",
          "color": "@color.background",
          "borderRadius": "@radius.md"
        },
        "displayName": "Contact Button 2",
        "nodes": [],
        "linkedNodes": {}
      }
    };

    actions.deserialize(JSON.stringify(travelData));
    onClose();
  };

  if (!isOpen) return null;

  const templates = [
    {
      id: 'portfolio',
      name: 'Portfolio Website',
      description: 'Perfect for designers, developers, and creative professionals. Includes hero section, about, projects gallery, and contact.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      features: ['Hero Section', 'About Me', 'Projects Gallery', 'Contact Form'],
      onLoad: loadPortfolioTemplate
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Store',
      description: 'Modern online store layout with product showcase, header navigation, and shopping features.',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop',
      features: ['Header Navigation', 'Hero Banner', 'Product Grid', 'Cart Button'],
      onLoad: loadEcommerceTemplate
    },
    {
      id: 'travel',
      name: 'Travel Agency',
      description: 'Showcase destinations and travel packages with stunning visuals and booking features.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop',
      features: ['Hero Background', 'Destinations Grid', 'Pricing', 'Contact CTA'],
      onLoad: loadTravelTemplate
    },
    {
      id: 'service',
      name: 'Service Business',
      description: 'Professional service company layout with services showcase, team info, and call-to-action.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop',
      features: ['Service Cards', 'Hero Section', 'Call-to-Action', 'Team Image'],
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
          Choose from our professionally designed templates to get started quickly. 
          Each template uses your existing design tokens and components.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
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

export default SimpleDemoTemplates;
