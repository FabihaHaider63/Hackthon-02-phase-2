# API Contracts: Todo Application Frontend

## Overview
The frontend communicates with the backend API using JWT-authenticated requests. All endpoints require an Authorization header with the format "Bearer {jwt_token}".

## Authentication
The frontend uses Better Auth to manage user sessions and JWT tokens.

## Endpoints

### Tasks Management

#### GET /api/tasks
**Description**: Retrieve all tasks for the authenticated user
**Headers**: 
- Authorization: Bearer {jwt_token}
**Response**:
```json
{
  "tasks": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "completed": "boolean",
      "createdAt": "ISODateString",
      "updatedAt": "ISODateString",
      "userId": "string"
    }
  ]
}
```

#### GET /api/tasks/{id}
**Description**: Retrieve a specific task by ID
**Headers**: 
- Authorization: Bearer {jwt_token}
**Response**:
```json
{
  "task": {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "createdAt": "ISODateString",
    "updatedAt": "ISODateString",
    "userId": "string"
  }
}
```

#### POST /api/tasks
**Description**: Create a new task
**Headers**: 
- Authorization: Bearer {jwt_token}
- Content-Type: application/json
**Request Body**:
```json
{
  "title": "string (required, 1-200 chars)",
  "description": "string (optional)"
}
```
**Response**:
```json
{
  "task": {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "createdAt": "ISODateString",
    "updatedAt": "ISODateString",
    "userId": "string"
  }
}
```

#### PUT /api/tasks/{id}
**Description**: Update an existing task
**Headers**: 
- Authorization: Bearer {jwt_token}
- Content-Type: application/json
**Request Body**:
```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "completed": "boolean (optional)"
}
```
**Response**:
```json
{
  "task": {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "createdAt": "ISODateString",
    "updatedAt": "ISODateString",
    "userId": "string"
  }
}
```

#### DELETE /api/tasks/{id}
**Description**: Delete a task
**Headers**: 
- Authorization: Bearer {jwt_token}
**Response**: 204 No Content

#### PATCH /api/tasks/{id}/toggle-complete
**Description**: Toggle the completed status of a task
**Headers**: 
- Authorization: Bearer {jwt_token}
**Response**:
```json
{
  "task": {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "createdAt": "ISODateString",
    "updatedAt": "ISODateString",
    "userId": "string"
  }
}
```