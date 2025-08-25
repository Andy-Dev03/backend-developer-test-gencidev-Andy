# Documentation API

## Endpoint - Auth:

## 1. POST /api/auth/register

Description:

- Register User

Request:

- body (example):

```json
{
  "username": "Andy",
  "email": "andy@gmail.com",
  "password": "12345"
}
```

_Response (201 - Created)_

```json
{
  "statusCode": 201,
  "message": "Registered successfully",
  "data": {
    "id": 1,
    "username": "Andy",
    "email": "andy@gmail.com"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "error": {
    "message": [
      "Username is required"
    ]
  }
}
OR WITH MANY VALIDATION
{
  "statusCode": 400,
  "error": {
    "message": [
      "Username is required",
      "Email is required",
      "Invalid email format",
      "Password is required",
      "Password must be at least 5 characters long"
    ]
  }
}
```

&nbsp;

## 2. POST /api/auth/login

Description:

- Login User

Request:

- body (example):

```json
{
  "email": "andy@gmail.com",
  "password": "12345"
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJpZCI6MSwidXNlcm5hbWUiOiJBbmR5IiwiaWF0IjoxNzU2MDk5NjY4LCJleHAiOjE3NTYxNDI4Njh9.
    3Ndqpc9v2nHJmuTrfcdJ_Fk1wLzDzZzHXPQoaUHOlwm"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "error": {
    "message": {
      "Email is required"
    },
    // "OR"
    "message": {
      "Password is required"
    },
    // "OR"
    "message": {
      "Invalid email format"
    }
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "error": {
    "message": "Invalid email or password"
  }
}
```

&nbsp;

## 3. POST /api/notes

Description:

- Create Note

Request:

- headers :

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- body (example):

```json
{
  "title": "Testing",
  "content": "This just for testing post"
}
```

_Response (201 - Created)_

```json
{
  "statusCode": 201,
  "message": "Note created successfully",
  "data": {
    "id": 1,
    "title": "Testing",
    "content": "This just for testing post",
    "UserId": 1,
    "updatedAt": "2025-08-24T15:40:15.134Z",
    "createdAt": "2025-08-24T15:40:15.134Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "error": {
    "message": [
      "Title is required"
    ]
  }
}
OR WITH MANY VALIDATION
{
  "statusCode": 400,
  "error": {
    "message": [
      "Title is required",
      "Content is required"
    ]
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access token is invalid"
  }
}
```

&nbsp;

## 4. GET /api/notes

Description:

- Get all Notes

Request:

- headers :

```json
{
  "Authorization": "Bearer <your access token>"
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": "Notes fetched successfully",
  "totalData": 2,
  "data": [
    {
      "id": 1,
      "title": "Testing",
      "content": "This just for testing post",
      "UserId": 1,
      "createdAt": "2025-08-24T15:40:15.134Z",
      "updatedAt": "2025-08-24T15:40:15.134Z"
    },
    {
      "id": 2,
      "title": "Testing 2",
      "content": "This just for testing post 2",
      "UserId": 1,
      "createdAt": "2025-08-24T15:40:48.239Z",
      "updatedAt": "2025-08-24T15:40:48.239Z"
    },
    ...
  ]
}
```

&nbsp;

## 5. GET /api/notes/:id

Description:

- Get note by ID

Request:

- headers :

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": "Note fetched successfully",
  "data": {
    "id": 1,
    "title": "Testing",
    "content": "This just for testing post",
    "UserId": 1,
    "createdAt": "2025-08-24T15:40:15.134Z",
    "updatedAt": "2025-08-24T15:40:15.134Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "statusCode": 404,
  "error": {
    "message": "Note not found"
  }
}
```

&nbsp;

## 6. PUT /api/notes/:id

Description:

- Update Note

Request:

- headers :

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body (example):

```json
{
  "title": "Testing (Update)",
  "content": "This just for testing post (Update)"
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": "Note updated successfully",
  "data": {
    "id": 1,
    "title": "Testing (Update)",
    "content": "This just for testing post (Update)",
    "UserId": 1,
    "createdAt": "2025-08-24T15:40:15.134Z",
    "updatedAt": "2025-08-24T15:41:49.014Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "error": {
    "message": [
      "Title is required"
    ]
  }
}
OR WITH MANY VALIDATION
{
  "statusCode": 400,
  "error": {
    "message": [
      "Title is required",
      "Content is required"
    ]
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access token is invalid"
  }
}
```

_Response (403 - Forbidden)_

```json
{
  "statusCode": 403,
  "error": {
    "message": "You are not authorized to access this note"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "statusCode": 404,
  "error": {
    "message": "Note not found"
  }
}
```

&nbsp;

## 7. DELETE /api/notes/:id

Description:

- Delete Note

Request:

- headers :

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": "Note deleted successfully"
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access token is invalid"
  }
}
```

_Response (403 - Forbidden)_

```json
{
  "statusCode": 403,
  "error": {
    "message": "You are not authorized to access this note"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "statusCode": 404,
  "error": {
    "message": "Note not found"
  }
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "error": {
    "message": "Access token is required"
  }
}
OR
{
  "statusCode": 401,
  "error": {
    "message": "Your token is expired"
  }
}
```

_Response (500 - Internal Server Error)_

```json
{
  "statusCode": 500,
  "error": {
    "message": "Internal server error"
  }
}
```
