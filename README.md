# 🧰 Multi-Tenant CMS – Admin Panel (React + Craft.js)

This is the **Admin Portal** for the Multi-Tenant CMS built with **React**, **Craft.js**, **Tailwind CSS**, and **ShadCN UI**. It allows tenants to manage their content visually via a drag-and-drop builder, manage media files, and publish SEO-optimized pages.

## ✅ Completed Features

### 🔐 Authentication System
- **JWT-based login and registration** using React Hook Form and Zod validation
- **Token storage in localStorage** with Zustand state management
- **Protected route system** with role-based access (Admin, Editor, Viewer)
- **Automatic token refresh** and logout on 401 errors

### 🎨 Visual Page Builder (Craft.js)
- **Drag-and-drop page builder** with custom components:
  - **HeroSection** - Editable title, subtitle, background image, and CTA button
  - **TextBlock** - Customizable text with font size, alignment, and color
  - **ImageBlock** - Responsive images with size controls
- **Real-time preview mode** toggle
- **Component settings panel** for property editing
- **JSON serialization** for saving page data to backend

### 🖼️ Media Manager
- **File upload with drag & drop** support
- **Grid and list view modes** for media library
- **File preview** for images and documents
- **Search and filter** functionality
- **File deletion** with confirmation dialogs
- **Support for multiple file types** (images, videos, PDFs, documents)

### 📄 Pages Management
- **Pages list with pagination** (10 items per page)
- **Search functionality** by page title
- **Status filtering** (All, Published, Draft)
- **Sort by creation/modification date**
- **CRUD operations** (Create, Read, Update, Delete)
- **Status badges** (Published/Draft) with color coding

### 🧾 Zustand Store
- **Centralized auth state management**
- **localStorage persistence** for user session
- **Automatic state hydration** on app load
- **Type-safe user data** with role management

### 🎯 Tech Stack

| Tool              | Purpose                                  |
|-------------------|------------------------------------------|
| React 19          | SPA framework                            |
| TypeScript        | Type safety                              |
| Craft.js          | Visual page builder                      |
| Tailwind CSS      | Utility-first styling                    |
| ShadCN UI         | Component system (Radix + Tailwind)     |
| React Router v6   | Client-side routing                      |
| React Hook Form   | Form handling                            |
| Zod               | Schema validation                        |
| Zustand           | Lightweight state management             |
| Axios             | HTTP client with interceptors            |
| Lucide React      | Icon library                             |
| Vite              | Build tool and dev server                |

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx           # JWT login with validation
│   │   ├── RegisterForm.tsx        # User registration form
│   │   └── ProtectedRoute.tsx      # Route protection HOC
│   ├── craft/
│   │   ├── HeroSection.tsx         # Craft.js hero component
│   │   ├── TextBlock.tsx           # Craft.js text component
│   │   └── ImageBlock.tsx          # Craft.js image component
│   ├── layout/
│   │   └── DashboardLayout.tsx     # Main dashboard layout
│   └── ui/                         # ShadCN UI components
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── label.tsx
│       └── badge.tsx
├── pages/
│   ├── Dashboard.tsx               # Overview with stats
│   ├── PageEditor.tsx              # Craft.js visual builder
│   ├── PagesList.tsx               # Pages management
│   └── MediaManager.tsx            # File upload & management
├── services/
│   └── api.ts                      # Axios service layer
├── store/
│   └── auth.ts                     # Zustand auth store
├── lib/
│   └── utils.ts                    # Utility functions
├── App.tsx                         # Main app with routing
└── main.tsx                        # App entry point
```

## � Setup Instructions

### 1️⃣ Prerequisites
- Node.js v18+
- npm or pnpm
- Backend (NestJS API) running at `http://localhost:4000`

### 2️⃣ Installation
```bash
git clone <repo-url>
cd cms-admin-tenant
npm install
```

### 3️⃣ Environment Variables
Create a `.env` file in the root:
```env
VITE_API_BASE_URL=http://localhost:4000
```

### 4️⃣ Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5174/`

## � API Integration

The application expects the following NestJS API endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Pages
- `GET /pages` - List pages with pagination and filters
- `POST /pages` - Create new page
- `PUT /pages/:id` - Update page
- `DELETE /pages/:id` - Delete page

### Media
- `POST /media/upload` - Upload file
- `GET /media` - List media files
- `DELETE /media/:id` - Delete media file

## 🧪 Key Features Implemented

### ✅ React Login Form (React Hook Form + Zod)
- Email/password validation
- JWT token handling
- Error display
- Automatic redirect on success

### ✅ Protected Route System
- Role-based access control
- Automatic redirects for unauthenticated users
- Permission hierarchy (Admin > Editor > Viewer)

### ✅ Craft.js Visual Builder
- Custom HeroSection with editable properties
- Drag-and-drop components
- Real-time preview mode
- JSON serialization for backend storage

### ✅ Media Manager
- File upload with progress
- Grid/list view toggle
- Search and filtering
- Image preview
- File deletion

### ✅ Pages List with Pagination
- Server-side pagination
- Search functionality
- Status filtering
- CRUD operations

### ✅ Zustand Auth Store
- Persistent user state
- Token management
- Role-based rendering

## 🎨 UI System

- **Built with ShadCN UI** components
- **Tailwind CSS** for styling
- **Responsive design** with mobile support
- **Dark mode ready** (CSS variables configured)
- **Accessible components** using Radix UI primitives

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Type Checking
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## 🌟 Next Steps

To complete the CMS, you would need to:

1. **Backend Integration** - Set up the NestJS API with the expected endpoints
2. **Database Models** - Create User, Page, and Media models
3. **File Storage** - Configure multer for file uploads
4. **Authentication** - Implement JWT strategy in NestJS
5. **Testing** - Add unit and integration tests
6. **Deployment** - Configure CI/CD pipeline

## 📝 Notes

- The application uses React 19 without StrictMode for better Craft.js compatibility
- TypeScript is configured with strict mode for type safety
- All components are fully typed with proper interfaces
- Error handling is implemented for all API calls
- The UI is responsive and works on all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.