# Scoreboard API Module

## Overview
This module provides APIs and real-time capabilities for managing and updating a live scoreboard. The scoreboard displays the top 10 users' scores and updates dynamically as users perform actions. 

## Features

1. **API Endpoints**
   - Update user score securely.
   - Retrieve top 10 scores for the scoreboard.
2. **Real-Time Updates**
   - Notify connected clients of scoreboard changes using WebSocket (e.g., via `Socket.IO`).
3. **Security**
   - Prevent unauthorised score updates with user authentication and action validation.

## File Structure

```
project-root/
├── src/
│   ├── controllers/
│   │   └── scoreController.ts
│   ├── services/
│   │   └── scoreService.ts
│   ├── models/
│   │   └── scoreModel.ts
│   ├── routes/
│   │   └── scoreRoutes.ts
│   ├── middlewares/
│   │   └── authMiddleware.ts
│   ├── utils/
│   │   └── socketManager.ts
│   └── app.ts
└── README.md
```

## API Documentation

### Endpoints

#### 1. Update Score
**POST** `/api/score/update`

**Request Headers**:
- `Authorization`: Bearer token (JWT for user authentication)

**Request Body**:
```json
{
  "userId": "string",
  "actionId": "string"
}
```

**Response**:
- `200 OK`: Score updated successfully
  ```json
  {
    "message": "Score updated",
    "newScore": 12345
  }
  ```
- `400 Bad Request`: Invalid request payload
- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Action validation failed

#### 2. Get Top Scores
**GET** `/api/score/top`

**Response**:
- `200 OK`: Returns the top 10 scores
  ```json
  [
    { "userId": "user1", "score": 9876 },
    { "userId": "user2", "score": 8765 },
    ...
  ]
  ```

### Real-Time Updates
- **Socket Event**: `scoreboard:update`
  - Emitted whenever the scoreboard changes.
  - Payload: 
    ```json
    [
      { "userId": "user1", "score": 9876 },
      { "userId": "user2", "score": 8765 },
      ...
    ]
    ```

## Implementation Details

### Authentication
Use JWT tokens for verifying API requests. Include a middleware to authenticate users before allowing score updates.

### Action Validation
Validate `actionId` server-side to ensure the action is legitimate. Use a separate service or database for maintaining valid action records.

### Database Schema
#### `users` Table
| Field         | Type         | Description        |
|---------------|--------------|--------------------|
| `id`          | UUID         | Primary key        |
| `username`    | VARCHAR(255) | User's username    |
| `score`       | INT          | User's current score |

#### `actions` Table
| Field         | Type         | Description             |
|---------------|--------------|-------------------------|
| `id`          | UUID         | Primary key             |
| `user_id`     | UUID         | Associated user         |
| `action_type` | VARCHAR(255) | Type of user action     |
| `created_at`  | TIMESTAMP    | Action completion time  |

### Suggested Libraries
- **Authentication**: `jsonwebtoken`
- **Real-Time Communication**: `socket.io`
- **Database ORM**: `TypeORM` or `Prisma`
- **Validation**: `zod` or `joi`

## Improvements & Suggestions
1. Add rate limiting to the `/api/score/update` endpoint to prevent spamming.
2. Encrypt sensitive data like user IDs.
3. Introduce an admin interface to monitor scoreboard activity and identify suspicious patterns.
4. Consider caching the top 10 scores in memory (e.g., using Redis) for faster retrieval.

## Testing

### Unit Tests
1. Test score update logic with valid and invalid inputs.
2. Verify real-time updates trigger correctly on score changes.

### Integration Tests
1. Ensure `/api/score/top` returns accurate data.
2. Simulate multiple users updating scores and validate real-time synchronization.

### Load Testing
Use tools like `k6` or `JMeter` to ensure the API and WebSocket connection can handle high traffic.