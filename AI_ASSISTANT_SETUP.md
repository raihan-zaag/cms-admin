# AI Assistant Integration Setup Guide

## 🚀 Quick Setup

### 1. Get Your Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key" in the left sidebar
4. Click "Create API Key" 
5. Select "Create API key in new project" (or use existing)
6. Copy the API key

### 2. Add API Key to Environment
Replace `your_gemini_api_key_here` in the `.env` file with your actual API key:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Test the Integration
1. Start your development server: `npm run dev`
2. Open the page editor
3. Look for the new **"AI Assistant"** button in the top bar (indigo colored)
4. Click on any Text component to see the **"AI Generate"** button appear

## ✨ Features Added

### 1. Chat Assistant (TopBar) - ENHANCED ✨
- **Button**: "AI Assistant" (indigo color with MessageCircle icon)
- **Functionality**: 
  - Write natural language prompts to ADD components to your existing page
  - Generates CraftJS components and adds them to the ROOT container
  - Preserves existing content - only adds new components
  - Real-time conversation interface

**Example Prompts:**
- ✅ "Add a hero section with title and button"
- ✅ "Add a contact form with email and message fields"  
- ✅ "Add a product card with image and description"
- ✅ "Add a testimonial section with quote and author"

**Key Improvement**: Now ADDS to your existing page instead of replacing everything!

### 2. Content Generation (Text Component) - FOCUSED ✨
- **Button**: "AI Generate" (appears when text component is selected)
- **Functionality**:
  - Generate text content ONLY for the selected text component
  - Context-aware suggestions
  - Replaces ONLY that specific text element
  - Multiple example prompts provided

**Example Prompts:**
- ✅ "Write a compelling headline for a tech startup"
- ✅ "Create a professional bio for a designer"
- ✅ "Generate a product description for a mobile app"
- ✅ "Write engaging call-to-action text"
- ✅ "Create a testimonial quote"

**Key Improvement**: Now targets ONLY the selected text component, not the whole page!

## 🔧 Technical Details

### Files Created/Modified:
- ✅ `src/services/gemini.ts` - Gemini API integration
- ✅ `src/components/editor/ChatAssistant.tsx` - Full chat interface
- ✅ `src/components/editor/AIContentGenerator.tsx` - Text content generator
- ✅ `src/components/editor/TopBar.tsx` - Added AI Assistant button
- ✅ `src/components/editor/Text.tsx` - Added AI Generate button
- ✅ `.env` - Added Gemini API key placeholder

### Dependencies Installed:
- ✅ `@google/generative-ai` - Official Gemini SDK

## 🎯 Usage Examples

### Chat Assistant Usage:
1. Click "AI Assistant" in top bar
2. Type: "Add a testimonial section with quote and author"
3. The AI will generate new components and ADD them to your existing page (preserves current content)

### Content Generation Usage:
1. Select any Text component (click on it)
2. Click "AI Generate" button that appears in top-right
3. Type: "Write a catchy product tagline"
4. Generated text replaces ONLY that specific text component

## 🛠️ Customization Options

### Modify AI Prompts:
Edit `src/services/gemini.ts` to customize:
- System prompts for better CraftJS generation
- Content generation styles
- Response formatting

### Styling:
- Chat Assistant: Modify `src/components/editor/ChatAssistant.tsx`
- Content Generator: Modify `src/components/editor/AIContentGenerator.tsx`

## 🚨 Important Notes

1. **API Key Security**: Never commit your actual API key to version control
2. **Rate Limits**: Gemini free tier has limits (1,500 requests/day)
3. **Error Handling**: Both components include comprehensive error handling
4. **Offline Mode**: Features require internet connection

## 🔍 Troubleshooting

### Common Issues:

1. **"API Key not set" error**
   - Check your `.env` file has the correct API key
   - Restart your dev server after adding the key

2. **"Failed to generate" error**
   - Check your internet connection
   - Verify API key is valid
   - Check browser console for detailed errors

3. **Generated layout doesn't apply**
   - CraftJS structure might be incompatible
   - Check console for deserialization errors
   - Try simpler prompts

### Testing API Key:
```bash
# Test your API key works
curl -H "Content-Type: application/json" \
     -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' \
     -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY"
```

## 🎉 You're Ready!

Your AI-powered page builder is now ready! The integration provides:
- **Smart Layout Generation**: Natural language to CraftJS conversion
- **Content Creation**: AI-generated text for components
- **Real-time Updates**: Instant application to the editor
- **User-friendly Interface**: Clean chat and generation UI

Enjoy building pages with AI assistance! 🚀
