# Chat with PDF

A modern web application that allows users to upload PDF documents and have intelligent conversations about their content using AI. Built with Next.js, Node.js, and integrated with Clerk for authentication.

## 🚀 Features

- **PDF Upload & Processing**: Upload PDF documents and extract text content
- **AI-Powered Chat**: Ask questions about your PDF content and get intelligent responses
- **Document References**: See which parts of the PDF were used to generate responses
- **User Authentication**: Secure authentication with Clerk
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **Real-time Chat**: Interactive chat interface with typing indicators
- **Document Management**: View document information and manage uploaded files

## 🏗️ Project Structure

```
chat-with-pdf/
├── client/                 # Next.js frontend application
│   ├── app/               # Next.js app directory
│   │   ├── layout.tsx     # Root layout with authentication
│   │   ├── page.tsx       # Main chat interface
│   │   ├── globals.css    # Global styles
│   │   ├── sign-in/       # Authentication pages
│   │   └── sign-up/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Shadcn/ui components
│   │   ├── chat-interface.tsx
│   │   ├── chat-message.tsx
│   │   ├── pdf-upload.tsx
│   │   ├── header.tsx
│   │   └── document-info.tsx
│   ├── types/            # TypeScript type definitions
│   │   ├── chat.ts       # Message and document types
│   │   └── index.ts
│   ├── lib/              # Utility functions
│   ├── middleware.ts     # Clerk authentication middleware
│   └── package.json
├── server/               # Node.js backend
│   ├── index.js         # Express server setup
│   ├── worker.js        # PDF processing worker
│   ├── uploads/         # Uploaded PDF storage
│   └── package.json
├── docker-compose.yml   # Docker configuration
└── README.md
```

## 🛠️ Tech Stack

### Frontend (Client)
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI component library
- **Clerk** - Authentication and user management
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Backend (Server)
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PDF Processing** - Text extraction from PDFs
- **AI Integration** - Chat completion API

### Development & Deployment
- **Docker** - Containerization
- **pnpm** - Package manager
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📋 Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Docker (optional, for containerized deployment)
- Clerk account for authentication

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd chat-with-pdf
```

### 2. Install Dependencies

```bash
# Install client dependencies
cd client
pnpm install

# Install server dependencies
cd ../server
pnpm install
```

### 3. Environment Setup

#### Client Environment (client/.env.local)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

#### Server Environment (server/.env)
```env
PORT=8000
# Add your AI service API keys here
# Add database connection strings if applicable
```

### 4. Run the Development Servers

#### Terminal 1 - Backend Server
```bash
cd server
pnpm dev
# Server runs on http://localhost:8000
```

#### Terminal 2 - Frontend Client
```bash
cd client
pnpm dev
# Client runs on http://localhost:3000
```

### 5. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

## 🔧 Configuration

### Clerk Authentication Setup

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable and secret keys
4. Add the keys to your environment variables
5. Configure sign-in/sign-up URLs in Clerk dashboard

### PDF Processing Configuration

The server handles PDF uploads and text extraction. Configure upload limits and processing options in `server/index.js`.

## 📡 API Endpoints

### Server Endpoints

- `POST /upload/pdf` - Upload and process PDF files
- `GET /chat?message=<query>` - Send chat messages and get AI responses

### Authentication Flow

1. Users are redirected to `/sign-in` if not authenticated
2. Clerk handles the authentication process
3. Authenticated users can access the main chat interface
4. Middleware protects all routes except sign-in/sign-up

## 🎨 UI Components

### Main Components

- **PDFUpload** - Drag & drop PDF upload interface
- **ChatInterface** - Real-time chat with typing indicators
- **ChatMessage** - Individual message display with document references
- **DocumentInfo** - PDF file information panel
- **Header** - Navigation with user authentication

### UI Library

Built with Shadcn/ui components:
- Button, Card, Input, Textarea
- Tooltip, Sonner (toasts)
- Custom styling with Tailwind CSS

## 🔒 Security Features

- **Authentication**: Clerk-based user authentication
- **Route Protection**: Middleware protects authenticated routes
- **File Upload Security**: PDF file type validation
- **XSS Protection**: Safe HTML rendering for AI responses

## 🧪 Development

### Code Structure

- **Types**: Centralized in `/types` folder for consistency
- **Components**: Modular, reusable React components
- **State Management**: React hooks for local state
- **Styling**: Tailwind CSS with custom design system

### Key Features Implementation

1. **PDF Upload**: Drag & drop with progress indicators
2. **Chat System**: Real-time messaging with document context
3. **AI Integration**: Contextual responses based on PDF content
4. **Document References**: Show source material for AI responses

## 🚀 Deployment

### Vercel (Recommended for Client)

```bash
cd client
pnpm build
# Deploy to Vercel
```

### Server Deployment

- Deploy to your preferred Node.js hosting platform
- Set environment variables
- Configure file upload storage
- Set up SSL certificates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

1. **Clerk Authentication Errors**
   - Verify environment variables are set correctly
   - Check Clerk dashboard configuration
   - Ensure middleware is properly configured

2. **PDF Upload Issues**
   - Check file size limits
   - Verify server upload directory permissions
   - Ensure PDF file type validation

3. **Chat Not Working**
   - Verify server is running on port 8000
   - Check API endpoint connectivity
   - Verify AI service configuration

### Development Tips

- Use browser dev tools to debug client-side issues
- Check server logs for backend errors
- Verify environment variables are loaded correctly
- Test with different PDF file types and sizes

## 📞 Support

For support and questions:
- Open an issue on GitHub
- Check the documentation
- Review troubleshooting section

---

Built with ❤️ using Next.js, Node.js, and modern web technologies.
