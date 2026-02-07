<!-- SYNC IMPACT REPORT: v0.1.0 → v1.0.0 -->
<!-- Modified principles: All new principles added for Next.js frontend project -->
<!-- Added sections: Tech Stack, Environment Variables, Project Structure -->
<!-- Templates requiring updates: None yet -->
<!-- Deferred items: Ratification date marked as TODO -->

# Hackathon Todo Phase II Constitution

## Core Principles

### I. Modern Frontend Architecture
All features must utilize Next.js 16+ with App Router for optimal performance and developer experience. Components must be reusable, well-documented, and follow React best practices. Strict TypeScript usage is required for all code to ensure type safety and maintainability.

### II. Responsive Design
All UI elements must be mobile-responsive using Tailwind CSS utility classes. Design must work seamlessly across desktop, tablet, and mobile devices. All components should follow accessibility standards (WCAG 2.1 AA).

### III. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced. Unit tests for all components, integration tests for API interactions, and end-to-end tests for critical user flows.

### IV. Secure Authentication
Authentication must be handled exclusively through Better Auth with JWT tokens. All API requests must include proper authorization headers. Session management must follow security best practices with secure token storage and automatic refresh mechanisms.

### V. API Integration
All backend communication must be done through the FastAPI backend APIs. Proper error handling for network requests, timeouts, and retries must be implemented. API client must centralize all HTTP requests with consistent error handling.

### VI. Component Modularity
UI must be built with reusable, modular components. Each component should have a single responsibility and be easily testable. Component props must be properly typed with TypeScript interfaces.

## Tech Stack Requirements

Technology stack is fixed as follows:
- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS
- Better Auth for authentication
- React Query or SWR for API data fetching
- Fetch / Axios for API calls

Deviation from this stack requires explicit approval and documented justification.

## Project Structure and Environment

Environment variables must be properly configured:
- NEXT_PUBLIC_API_BASE_URL = http://localhost:8000 (or production API)
- BETTER_AUTH_SECRET = JWT shared secret (used by Better Auth plugin)

Project structure must follow the specified organization:
- /app
  - layout.tsx         # Main layout
  - page.tsx           # Landing / Dashboard page
  - /tasks
    - page.tsx         # Task list page
    - [id]/page.tsx    # Task detail / edit page
- /components
  - TaskCard.tsx       # Single task UI
  - TaskForm.tsx       # Create / edit form
  - Navbar.tsx
  - AuthButton.tsx     # Login / Logout
- /lib
  - api.ts             # API client (attaches JWT token)
- /styles
  - globals.css
  - tailwind.config.js

## Development Workflow

Code reviews are mandatory for all pull requests. At least one team member must approve changes before merging. All code must pass linting, type checking, and tests before merging. Breaking changes to the API contract must be coordinated with backend team.

## Governance

This constitution governs all development activities for the Hackathon Todo Phase II frontend project. All team members must comply with these principles. Amendments require team discussion and consensus before implementation.

Version: 1.0.0 | Ratified: TODO(RATIFICATION_DATE) | Last Amended: 2026-02-06
