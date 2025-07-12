# AI Document Dashboard

A modern, responsive document management dashboard built with Next.js 13+, featuring AI-powered document generation, real-time search, filtering, and a beautiful dark/light theme toggle.

## 🌐 Live Demo

**Deployed on Vercel**: [https://slideo-assignment.vercel.app/](https://slideo-assignment.vercel.app/)

## Features

### ✅ **Core Functionality**

- **Document Management**: Create, view, and organize documents
- **AI-Powered Generation**: Generate documents using AI prompts
- **Real-time Search**: Instant search across all documents
- **Advanced Filtering**: Filter by type, category, and date range
- **Document Preview**: Full-screen modal preview with metadata
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### ✅ **User Interface**

- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Interactive Cards**: Hover effects and visual feedback
- **Collapsible Sidebar**: Space-efficient filtering interface
- **Loading States**: Skeleton loading and progress indicators
- **Error Handling**: Graceful error states and user feedback

### ✅ **Document Types & Categories**

- **Types**: Document, Slide, Spreadsheet
- **Categories**: Business, Personal, Academic
- **AI-Generated**: Special badges for AI-created content
- **Tags System**: Automatic tag generation and organization

### ✅ **Advanced Features**

- **Date Range Filtering**: Quick presets (7 days, 30 days, 1 year)
- **Local Storage**: Persistent user preferences and settings
- **Keyboard Navigation**: ESC to close modals, keyboard shortcuts
- **Accessibility**: ARIA labels, focus management, screen reader support

## Tech Stack

### **Frontend Framework**

- **Next.js 13+**: App Router, Server Components, TypeScript
- **React 18**: Hooks, Context API, Suspense
- **TypeScript**: Type safety and better developer experience

### **Styling & UI**

- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **Class Variance Authority**: Type-safe component variants

### **State Management**

- **React Hooks**: useState, useEffect, useContext
- **Custom Hooks**: useDocuments, useTheme, useLocalStorage
- **Context API**: ThemeProvider for global state

### **Development Tools**

- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **TypeScript**: Static type checking

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd document-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Project Structure

```
document-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── documents/     # Mock API endpoints
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main dashboard page
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── layout/           # Layout components
│   │   └── forms/            # Form components
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions
├── public/                   # Static assets
└── package.json             # Dependencies and scripts
```

## API Endpoints

### Mock API (Built-in)

- `GET /api/documents` - Fetch all documents
- `POST /api/documents` - Create new AI-generated document

### Request Format

```json
{
  "title": "Document Title",
  "type": "document|slide|spreadsheet",
  "category": "business|personal|academic",
  "prompt": "AI generation prompt"
}
```

## Architecture Decisions

### **Theme System**

- **Context-based**: Using React Context for global theme state
- **Persistent**: Local storage for user preferences
- **Inline Styles**: Custom shadow effects and color management
- **No CSS Variables**: Simplified approach for better compatibility

### **Component Architecture**

- **Atomic Design**: Reusable UI components with variants
- **Custom Hooks**: Separation of logic from presentation
- **Type Safety**: Full TypeScript implementation
- **Accessibility**: ARIA labels and keyboard navigation

### **State Management**

- **Local State**: useState for component-specific state
- **Context API**: Global theme and user preferences
- **Custom Hooks**: Encapsulated business logic
- **No External Libraries**: Minimal dependencies

### **Performance Optimizations**

- **Server Components**: Next.js 13+ App Router
- **Lazy Loading**: Dynamic imports for modals
- **Memoization**: React.memo for expensive components
- **Efficient Re-renders**: Optimized state updates

### **Styling Strategy**

- **Tailwind CSS**: Utility-first approach
- **Inline Styles**: For theme-dependent properties
- **Component Variants**: Type-safe styling with CVA
- **Responsive Design**: Mobile-first approach
