# Data Model: Dark Theme UI for Todo Application

## Entities

### Task
- **Fields**:
  - id: string (unique identifier)
  - title: string (required, 1-200 characters)
  - description: string (optional)
  - completed: boolean (default: false)
  - createdAt: Date (timestamp when created)
  - updatedAt: Date (timestamp when last updated)
  - userId: string (foreign key to User)

- **Validation Rules**:
  - title must be 1-200 characters
  - title is required
  - createdAt and updatedAt are automatically managed

- **State Transitions**:
  - pending → completed (when user marks task as complete)
  - completed → pending (when user unmarks task as complete)

### User
- **Fields**:
  - id: string (unique identifier)
  - email: string (unique, required)
  - name: string (optional)
  - createdAt: Date (timestamp when account created)
  - updatedAt: Date (timestamp when account last updated)

- **Validation Rules**:
  - email must be unique and valid email format
  - email is required

## Relationships
- User (1) → Task (many): A user can have many tasks
- Task (many) ← User (1): Each task belongs to one user

## UI State Models

### TaskFilter
- **Fields**:
  - status: enum (all, pending, completed)
  
### UIComponentState
- **Fields**:
  - isLoading: boolean
  - error: string | null
  - successMessage: string | null