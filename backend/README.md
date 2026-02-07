# Todo Backend API

A secure, multi-user backend for the Todo app built with FastAPI and PostgreSQL.

## Features

- FastAPI REST API
- PostgreSQL database (Neon Serverless)
- JWT authentication compatible with Better Auth
- Task ownership enforced
- Ready for frontend integration

## Tech Stack

- Python 3.11+
- FastAPI
- SQLModel (ORM)
- PostgreSQL (Neon Serverless)
- JWT (HS256, python-jose or PyJWT)
- uvicorn for dev server
- pydantic models for request/response validation

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start the development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string (Neon)
- `BETTER_AUTH_SECRET`: JWT secret shared with frontend
- `PORT`: optional, default 8000

## API Endpoints

All endpoints require a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

### Task Management

- `GET /api/users/{user_id}/tasks` - Get all tasks for the authenticated user
- `POST /api/users/{user_id}/tasks` - Create a new task
- `GET /api/users/{user_id}/tasks/{task_id}` - Get a specific task
- `PUT /api/users/{user_id}/tasks/{task_id}` - Update a task
- `DELETE /api/users/{user_id}/tasks/{task_id}` - Delete a task
- `PATCH /api/users/{user_id}/tasks/{task_id}/complete` - Toggle task completion status

## Authentication

The backend verifies JWT tokens sent by the frontend using the `BETTER_AUTH_SECRET`. All endpoints enforce user isolation by ensuring that users can only access their own tasks.

## Database Models

### Task
- `id`: int (primary key)
- `user_id`: str (indexed, foreign key to users.id from Better Auth)
- `title`: str (required, 1-200 chars)
- `description`: Optional[str]
- `completed`: bool (default False)
- `created_at`: datetime (default now)
- `updated_at`: datetime (auto-update on change)

## Error Handling

- 401 Unauthorized → invalid/missing JWT
- 404 Not Found → task not owned by user or does not exist
- 400 Bad Request → validation errors

## Running in Production

For production deployments, ensure you:
1. Use HTTPS
2. Set secure CORS origins (not wildcard *)
3. Use strong JWT secrets
4. Configure proper database connection pooling
5. Add monitoring and logging