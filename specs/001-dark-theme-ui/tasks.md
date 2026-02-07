# Implementation Tasks: Dark Theme UI for Todo Application

**Feature**: Dark Theme UI for Todo Application
**Branch**: 001-dark-theme-ui
**Generated**: 2026-02-06
**Input**: Design artifacts from `/specs/001-dark-theme-ui/`

## Implementation Strategy

**MVP Approach**: Implement User Story 1 (dark theme foundation) first, then incrementally add functionality for other user stories. Each user story should be independently testable and deliver value.

**Phases**:
- Phase 1: Project setup and foundational elements
- Phase 2: Core UI components and dark theme implementation
- Phase 3: User Story 1 - Dark themed interface
- Phase 4: User Story 2 - Interactive task cards
- Phase 5: User Story 3 - Forms and buttons with dark theme
- Phase 6: User Story 4 - Responsive design
- Phase 7: Polish and cross-cutting concerns

## Phase 1: Project Setup

**Goal**: Initialize the Next.js project with TypeScript, Tailwind CSS, and required dependencies.

**Independent Test**: Project can be created and runs without errors.

- [X] T001 Create Next.js project with TypeScript and Tailwind CSS
- [X] T002 Install additional dependencies (better-auth, axios, @types packages)
- [X] T003 Configure environment variables (NEXT_PUBLIC_API_BASE_URL, BETTER_AUTH_SECRET)
- [X] T004 Set up basic project structure per plan.md
- [X] T005 Configure Tailwind CSS for dark mode

## Phase 2: Foundational Elements

**Goal**: Implement foundational components and API client that will be used across all user stories.

**Independent Test**: API client can connect to backend and foundational components render correctly.

- [X] T006 [P] Create API client in `/lib/api.ts` with JWT handling
- [X] T007 [P] Create Navbar component with auth buttons
- [X] T008 [P] Create AuthButton component for login/logout
- [X] T009 [P] Configure global styles and dark theme in globals.css
- [X] T010 [P] Set up Tailwind configuration with dark theme colors

## Phase 3: User Story 1 - Dark Themed Interface (P1)

**Goal**: Implement the foundational dark-themed interface with proper layout and styling.

**Independent Test**: The application loads with a dark theme as default, featuring the specified color palette, typography, and layout. The navbar is visible at the top with proper branding and authentication controls.

- [X] T011 [US1] Create main layout with dark theme background (bg-gray-900)
- [X] T012 [US1] Implement top-fixed navbar with proper styling (height ~60px, shadow)
- [X] T013 [US1] Create landing/dashboard page with centered content (max-width ~1200px)
- [X] T014 [US1] Apply dark theme typography (System UI/Inter/Poppins, white headings, gray-200 body text)
- [X] T015 [US1] Test dark theme loading with proper background color (#121212 or bg-gray-900)

## Phase 4: User Story 2 - Interactive Task Cards (P2)

**Goal**: Implement task cards with hover effects and visual feedback for completed tasks.

**Independent Test**: Individual task cards display with the specified dark theme styling, and when hovering over them, they change appearance as defined in the requirements.

- [X] T016 [US2] Create TaskCard component with dark box styling (bg-gray-800, rounded-lg, shadow-md)
- [X] T017 [US2] Implement hover effects for TaskCard (bg-gray-700, deepened shadow)
- [X] T018 [US2] Add smooth transitions (150-200ms, ease-in-out) to TaskCard
- [X] T019 [US2] Implement completed task styling (opacity-70, line-through)
- [X] T020 [US2] Add buttons to TaskCard (Edit, Delete, Toggle Complete) with proper styling
- [X] T021 [US2] Test hover effects and completed task appearance

## Phase 5: User Story 3 - Forms and Buttons (P3)

**Goal**: Implement forms and buttons that follow the dark theme with proper hover and click feedback.

**Independent Test**: Form inputs and buttons throughout the application follow the dark theme guidelines with appropriate styling and interactive feedback.

- [X] T022 [US3] Create TaskForm component with dark styling (bg-gray-700 inputs, white text, rounded)
- [X] T023 [US3] Implement form validation (title required, 1-200 chars)
- [X] T024 [US3] Add primary buttons with accent color (bg-indigo-600) and hover effect (bg-indigo-500)
- [X] T025 [US3] Implement button hover effects (color lightening, scale 1.05)
- [X] T026 [US3] Implement button click feedback (scale 0.95)
- [X] T027 [US3] Add error state styling (border-red-500) and shake animation
- [X] T028 [US3] Test form validation and button interactions

## Phase 6: User Story 4 - Responsive Design (P2)

**Goal**: Ensure the dark theme works properly across different device sizes with responsive layout.

**Independent Test**: The application layout adapts to different screen sizes while maintaining the dark theme and visual elements.

- [X] T029 [US4] Implement responsive task card layout (full width on mobile, 2-3 columns on desktop)
- [X] T030 [US4] Ensure buttons have minimum 40px height for touch devices
- [X] T031 [US4] Test mobile-first approach with Tailwind responsive classes
- [X] T032 [US4] Implement responsive navbar (hamburger menu if needed)
- [X] T033 [US4] Test responsive behavior across device sizes
- [X] T034 [US4] Verify touch targets meet accessibility requirements (≥40px)

## Phase 7: Task Pages Implementation

**Goal**: Create the task-related pages that integrate all components and implement the required functionality.

- [X] T035 [P] Create /tasks page to display task list with TaskCard components
- [X] T036 [P] Implement API integration in /tasks page (fetch tasks via api client)
- [X] T037 [P] Create /tasks/[id] page for task detail/edit
- [X] T038 [P] Create /tasks/new page for task creation
- [X] T039 [P] Implement task CRUD operations (create, update, delete, toggle complete)
- [X] T040 [P] Add loading indicators and error handling to task pages
- [X] T041 [P] Implement optional task filtering (all/pending/completed)

## Phase 8: Polish & Cross-Cutting Concerns

**Goal**: Add finishing touches, error handling, and success feedback to complete the implementation.

- [X] T042 Add success feedback (toast notifications or green check animations)
- [X] T043 Implement proper error handling and user feedback
- [X] T044 Add accessibility features (WCAG 2.1 AA compliance)
- [X] T045 Optimize performance (ensure <200ms for UI interactions)
- [X] T046 Conduct final testing of all user stories
- [X] T047 Document any remaining setup or configuration steps

## Phase 9: Backend Implementation

**Goal**: Create a secure, multi-user backend for the Todo app with FastAPI, PostgreSQL, and JWT authentication.

- [X] T048 Create backend directory structure
- [X] T049 Implement FastAPI application with CORS middleware
- [X] T050 Create SQLModel models for Task entity
- [X] T051 Implement JWT authentication with Better Auth compatibility
- [X] T052 Create Pydantic schemas for request/response validation
- [X] T053 Implement CRUD operations for tasks
- [X] T054 Create API endpoints with proper authentication and user isolation
- [X] T055 Set up database connection with PostgreSQL
- [X] T056 Add error handling for authentication and authorization
- [X] T057 Create requirements.txt with all dependencies
- [X] T058 Create documentation and setup instructions

## Dependencies

**User Story Order**:
- US1 (P1) → Foundation for all other stories
- US2 (P2) → Depends on US1 (needs dark theme foundation)
- US3 (P3) → Depends on US1 (needs dark theme foundation)
- US4 (P2) → Depends on US1, US2, US3 (applies to all components)

**Critical Path**: T001 → T006-T010 → T011 → T016 → T022 → T029 → T035-T041 → T042-T047

## Parallel Execution Opportunities

**Within User Stories**:
- US2: T016-T020 can be developed in parallel with other components
- US3: T022-T028 can be developed in parallel with other components
- US4: T029-T034 can be developed in parallel with other components

**Across User Stories**:
- Components (Navbar, TaskCard, TaskForm) can be developed in parallel
- API client (T006) can be developed in parallel with UI components
- Pages (T035-T041) can be developed in parallel after components are ready