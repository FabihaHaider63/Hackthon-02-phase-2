# Quickstart Guide: Dark Theme Todo Frontend

## Prerequisites
- Node.js 18+ installed
- Access to the backend API (assumed running at http://localhost:8000)

## Setup Instructions

### 1. Clone and Navigate
```bash
# If you're continuing from the planning phase, you're already in the right directory
cd C:\projects\Hackathon-2-phase-2
```

### 2. Create the Frontend Project
```bash
# Create a new Next.js app with TypeScript and Tailwind CSS
npx create-next-app@latest frontend --typescript --tailwind --eslint
cd frontend
```

### 3. Install Additional Dependencies
```bash
npm install @types/node @types/react @types/react-dom
npm install better-auth axios
# Optional: If using React Query for state management
npm install @tanstack/react-query
```

### 4. Configure Environment Variables
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
BETTER_AUTH_SECRET=your-jwt-secret-here
```

### 5. Project Structure
After setup, your project structure should look like:
```
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── lib/
│   └── api.ts
├── .env.local
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

### 6. Next Steps
1. Implement the API client in `lib/api.ts`
2. Create the components (TaskCard, TaskForm, Navbar, AuthButton)
3. Build the pages (tasks list, task detail/edit)
4. Apply the dark theme styling with Tailwind CSS
5. Integrate Better Auth for authentication
6. Test the application

### 7. Run the Application
```bash
npm run dev
```

The application will be available at http://localhost:3000