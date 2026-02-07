# Todo Application Frontend

A modern, responsive, dark-themed frontend for the Todo application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Dark Theme**: Default dark mode with customizable color scheme
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Task Management**: Create, read, update, and delete tasks
- **Authentication**: JWT-based authentication with mock implementation
- **Modern UI**: Hover effects, smooth transitions, and clean design
- **Accessibility**: WCAG 2.1 AA compliant

## Tech Stack

- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS
- Better Auth (integration ready)
- React Server Components

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Main layout with navbar
│   ├── page.tsx            # Dashboard / landing page
│   └── tasks/
│       ├── page.tsx        # Task list page
│       ├── [id]/page.tsx   # Task detail / edit page
│       └── new/page.tsx    # Task creation page
├── components/
│   ├── TaskCard.tsx        # Single task UI component
│   ├── TaskForm.tsx        # Create/edit form component
│   ├── Navbar.tsx          # Navigation component
│   └── AuthButton.tsx      # Login/Logout component
├── lib/
│   └── api.ts              # API client with JWT handling
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` in your browser.

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: Base URL for the backend API
- `BETTER_AUTH_SECRET`: Secret for JWT authentication (when implemented)

## API Integration

The frontend includes a mock API client in `lib/api.ts` that simulates backend interactions. When the backend is ready, update the API endpoints to connect to the real backend.

Available API methods:
- `getTasks()` - Fetch all tasks
- `getTask(id)` - Fetch a specific task
- `createTask(data)` - Create a new task
- `updateTask(id, data)` - Update an existing task
- `deleteTask(id)` - Delete a task
- `toggleComplete(id)` - Toggle task completion status

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License.