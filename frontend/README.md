# Geo Development Demo - Frontend

Modern React frontend for managing real estate development projects and tasks. Built with TypeScript, Tailwind CSS, and React Query for a professional user experience.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: React Query for server state
- **Routing**: React Router for navigation
- **HTTP Client**: Axios for API communication
- **UI Components**: Custom components with Tailwind CSS

## Quick Setup

### Prerequisites
- Node.js 18+ and npm
- Backend server running (see backend README)
- Git for cloning the repository

### 1. Environment Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### 2. Environment Configuration
```bash
# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env
```

**Configuration Options:**
- `VITE_API_URL`: Backend API base URL
- Default: `http://localhost:8000` (local development)
- For production: Set to your deployed backend URL

### 3. Start Development Server
```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 4. Access the Application
- **Development**: http://localhost:5173
- **Production Preview**: http://localhost:4173 (after `npm run preview`)

## Features

### Project Management
- **Create Projects**: Add new development projects with name and description
- **View Projects**: Clean, responsive table showing all projects
- **Project Details**: Click to view project information and manage tasks

### Task Management
- **Add Tasks**: Create tasks within projects with title and notes
- **Task List**: Organized display of project tasks with timestamps
- **Status Indicators**: Visual indicators for task status

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Professional styling with Tailwind CSS
- **Real-time Updates**: React Query for efficient data fetching and caching
- **Navigation**: Intuitive routing between projects and tasks

## Project Structure

```
frontend/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ProjectForm.tsx  # Create new projects
│   │   ├── ProjectTable.tsx # Display projects list
│   │   ├── TaskForm.tsx     # Create new tasks
│   │   └── TaskList.tsx     # Display tasks list
│   ├── pages/               # Main page components
│   │   ├── Home.tsx         # Projects overview page
│   │   └── ProjectDetail.tsx # Individual project page
│   ├── lib/                 # Utilities and API client
│   │   └── api.ts           # Axios client and API functions
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles and Tailwind imports
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
└── README.md                # This file
```

## Configuration

### Environment Variables
- `VITE_API_URL`: Backend API base URL
- Must be prefixed with `VITE_` for Vite to expose them

### Tailwind CSS
- Custom color palette with Geo Development branding
- Responsive breakpoints for mobile-first design
- Utility classes for consistent spacing and typography

### TypeScript
- Strict type checking enabled
- Interface definitions for all API data
- Type-safe component props and state

## Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18+
```

#### API Connection Issues
- Ensure backend server is running on the correct port
- Check `VITE_API_URL` in your `.env` file
- Verify CORS settings in backend
- Check browser console for network errors

#### Styling Issues
```bash
# Rebuild Tailwind CSS
npm run build:css

# Check Tailwind configuration
npx tailwindcss --help
```

#### Port Conflicts
```bash
# Check what's using port 5173
lsof -i :5173
# Kill the process if needed
kill -9 <PID>
```

### Development Tips
- Use React Developer Tools for debugging
- Check browser console for JavaScript errors
- Use Network tab to debug API calls
- Enable React Query DevTools for state debugging

## Development

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Component-based architecture

### Adding New Features
1. Create components in `src/components/`
2. Add pages in `src/pages/`
3. Update API functions in `src/lib/api.ts`
4. Add routing in `src/App.tsx`
5. Update this README with new features

### Testing
```bash
# Install test dependencies (when implemented)
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

## Deployment

### Build for Production
```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

### Deployment Options
- **Vercel**: Drag and drop `dist` folder
- **Netlify**: Connect repository for auto-deploy
- **AWS S3**: Upload `dist` folder to S3 bucket
- **GitHub Pages**: Deploy from `dist` folder

### Environment Configuration
```bash
# Production .env
VITE_API_URL=https://your-backend-domain.com
```

## Dependencies

### Core Dependencies
- `react>=18.0.0` - UI framework
- `react-dom>=18.0.0` - DOM rendering
- `react-router-dom>=6.0.0` - Client-side routing
- `@tanstack/react-query>=4.0.0` - Server state management

### Development Dependencies
- `@types/react>=18.0.0` - TypeScript types
- `@types/react-dom>=18.0.0` - DOM types
- `typescript>=5.0.0` - Type checking
- `vite>=4.0.0` - Build tool

### Styling
- `tailwindcss>=3.0.0` - Utility-first CSS framework
- `autoprefixer>=10.0.0` - CSS vendor prefixes
- `postcss>=8.0.0` - CSS processing

### HTTP Client
- `axios>=1.0.0` - HTTP client for API calls

## UI Components

### ProjectForm
- Input validation for project creation
- Responsive form layout
- Error handling and loading states

### ProjectTable
- Sortable project list
- Responsive table design
- Click navigation to project details

### TaskForm
- Task creation within projects
- Form validation and submission
- Cancel and submit actions

### TaskList
- Organized task display
- Status indicators
- Responsive card layout

## Security Considerations

- Input validation on frontend and backend
- CORS properly configured
- No sensitive data in client-side code
- Environment variables for configuration

## Contributing

This is a demo project, but if you find any issues or have suggestions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for demonstration purposes. Feel free to use it as a reference for your own projects.

---

**Ready to create amazing user experiences? Start the development server and build your first project!**
