# YHealth API Reference

## Base URL

```
http://localhost:8090/api
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": { },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  },
  "timestamp": "2024-12-17T10:30:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ],
  "timestamp": "2024-12-17T10:30:00.000Z"
}
```

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer <access_token>
```

Or as a cookie:
```http
Cookie: access_token=<access_token>
```

---

## Health Check Endpoints

### GET /health
Get server health status.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-12-17T10:30:00.000Z",
    "uptime": 3600,
    "version": "1.0.0"
  }
}
```

### GET /health/live
Kubernetes liveness probe.

**Response:** `200 OK`

### GET /health/ready
Kubernetes readiness probe (checks database).

**Response:** `200 OK` or `503 Service Unavailable`

---

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "profile": {
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "profile": {
        "firstName": "John",
        "lastName": "Doe"
      }
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { },
    "tokens": {
      "accessToken": "...",
      "refreshToken": "..."
    }
  }
}
```

### POST /auth/social
Authenticate via social provider.

**Request Body:**
```json
{
  "provider": "google",
  "idToken": "google-id-token-here"
}
```

**Response:** `200 OK`

### GET /auth/me
Get current authenticated user. **Protected**

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "profile": { },
      "onboardingStatus": "in_progress",
      "onboardingStep": 2
    }
  }
}
```

### POST /auth/consent
Record user consents. **Protected**

**Request Body:**
```json
{
  "terms": true,
  "privacy": true,
  "marketing": false,
  "whatsapp": true
}
```

**Response:** `200 OK`

### POST /auth/whatsapp/enroll
Start WhatsApp enrollment. **Protected**

**Request Body:**
```json
{
  "phoneNumber": "+1234567890"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Verification code sent"
}
```

### POST /auth/whatsapp/verify
Verify WhatsApp SMS code. **Protected**

**Request Body:**
```json
{
  "code": "123456"
}
```

**Response:** `200 OK`

### POST /auth/refresh
Refresh access token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "accessToken": "new-access-token",
    "refreshToken": "new-refresh-token"
  }
}
```

### POST /auth/logout
Logout user. **Protected**

**Response:** `200 OK`

---

## Assessment Endpoints

### GET /assessment/goal-categories
Get available goal categories.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "weight_management",
        "name": "Weight Management",
        "description": "Goals related to weight loss or gain",
        "icon": "scale"
      }
    ]
  }
}
```

### POST /assessment/goals
Create a new goal. **Protected**

**Request Body:**
```json
{
  "title": "Lose 10 pounds",
  "description": "Lose weight through exercise and diet",
  "category": "weight_management",
  "type": "primary",
  "targetValue": 10,
  "unit": "pounds",
  "targetDate": "2025-06-01",
  "milestones": [
    {
      "title": "Lose first 5 pounds",
      "targetValue": 5,
      "targetDate": "2025-03-01"
    }
  ]
}
```

**Response:** `201 Created`

### GET /assessment/goals
Get user's goals. **Protected**

**Query Parameters:**
- `status` - Filter by status (active, completed, paused)
- `type` - Filter by type (primary, secondary)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "goals": [
      {
        "id": "507f1f77bcf86cd799439011",
        "title": "Lose 10 pounds",
        "category": "weight_management",
        "status": "active",
        "progress": 30
      }
    ]
  }
}
```

### GET /assessment/goals/:goalId
Get specific goal. **Protected**

**Response:** `200 OK`

### PATCH /assessment/goals/:goalId
Update a goal. **Protected**

**Request Body:**
```json
{
  "currentValue": 3,
  "status": "active"
}
```

**Response:** `200 OK`

### POST /assessment/goals/:goalId/primary
Set goal as primary. **Protected**

**Response:** `200 OK`

### POST /assessment/quick/start
Start quick assessment. **Protected**

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "assessment": {
      "id": "507f1f77bcf86cd799439011",
      "type": "quick",
      "status": "in_progress",
      "questions": [
        {
          "id": "activity_level",
          "question": "How would you describe your current activity level?",
          "type": "single_choice",
          "options": ["Sedentary", "Light", "Moderate", "Active", "Very Active"]
        }
      ]
    }
  }
}
```

### POST /assessment/quick/:assessmentId/submit
Submit quick assessment answers. **Protected**

**Request Body:**
```json
{
  "responses": [
    {
      "questionId": "activity_level",
      "answer": "Moderate"
    }
  ]
}
```

**Response:** `200 OK`

### POST /assessment/deep/start
Start deep (AI) assessment. **Protected**

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "assessment": {
      "id": "507f1f77bcf86cd799439011",
      "type": "deep",
      "status": "in_progress",
      "initialMessage": "Hello! I'm here to learn more about your health goals..."
    }
  }
}
```

### POST /assessment/deep/:assessmentId/message
Send message in deep assessment. **Protected**

**Request Body:**
```json
{
  "message": "I want to focus on improving my sleep quality"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "aiResponse": "That's a great goal! Can you tell me more about your current sleep patterns?",
    "extractedTopics": ["sleep"]
  }
}
```

### POST /assessment/deep/:assessmentId/complete
Complete deep assessment. **Protected**

**Response:** `200 OK`

### POST /assessment/switch-mode
Switch assessment mode. **Protected**

**Request Body:**
```json
{
  "assessmentId": "507f1f77bcf86cd799439011",
  "newMode": "deep"
}
```

**Response:** `200 OK`

---

## Integration Endpoints

### GET /integrations/available
Get available integrations.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "integrations": [
      {
        "provider": "whoop",
        "name": "WHOOP",
        "description": "Connect your WHOOP band",
        "dataTypes": ["sleep", "recovery", "strain"],
        "icon": "whoop-icon"
      }
    ]
  }
}
```

### GET /integrations
Get user's connected integrations. **Protected**

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "integrations": [
      {
        "provider": "whoop",
        "status": "connected",
        "lastSyncAt": "2024-12-17T10:30:00.000Z",
        "dataTypes": ["sleep", "recovery"]
      }
    ]
  }
}
```

### POST /integrations/oauth/initiate
Start OAuth flow. **Protected**

**Request Body:**
```json
{
  "provider": "whoop"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "authorizationUrl": "https://api.whoop.com/oauth/authorize?..."
  }
}
```

### POST /integrations/oauth/complete
Complete OAuth flow. **Protected**

**Request Body:**
```json
{
  "provider": "whoop",
  "code": "authorization-code",
  "state": "state-parameter"
}
```

**Response:** `200 OK`

### GET /integrations/sync/status
Get sync dashboard. **Protected**

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "syncStatus": [
      {
        "provider": "whoop",
        "status": "idle",
        "lastSyncAt": "2024-12-17T10:30:00.000Z",
        "recordsSynced": 150,
        "errors": null
      }
    ]
  }
}
```

### POST /integrations/:provider/sync
Trigger manual sync. **Protected**

**Response:** `200 OK`

### DELETE /integrations/:provider
Disconnect integration. **Protected**

**Response:** `200 OK`

### PATCH /integrations/golden-source
Set data source priority. **Protected**

**Request Body:**
```json
{
  "priority": ["whoop", "fitbit", "oura"]
}
```

**Response:** `200 OK`

---

## Preferences Endpoints

### GET /preferences
Get all user preferences. **Protected**

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "preferences": {
      "notifications": {
        "email": { "enabled": true, "frequency": "daily" },
        "push": { "enabled": true },
        "whatsapp": { "enabled": false }
      },
      "coaching": {
        "style": "supportive",
        "intensity": "moderate"
      },
      "display": {
        "theme": "system",
        "language": "en",
        "timezone": "America/New_York",
        "units": "imperial"
      }
    }
  }
}
```

### PATCH /preferences
Update all preferences. **Protected**

**Request Body:**
```json
{
  "notifications": { },
  "coaching": { },
  "display": { }
}
```

**Response:** `200 OK`

### PATCH /preferences/notifications
Update notification settings. **Protected**

**Request Body:**
```json
{
  "email": {
    "enabled": true,
    "frequency": "weekly"
  },
  "push": {
    "enabled": false
  }
}
```

**Response:** `200 OK`

### PATCH /preferences/coaching
Update coaching preferences. **Protected**

**Request Body:**
```json
{
  "style": "direct",
  "intensity": "intensive"
}
```

**Response:** `200 OK`

### GET /preferences/coaching/styles
Get available coaching styles.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "styles": [
      {
        "id": "supportive",
        "name": "Supportive",
        "description": "Encouraging and empathetic approach"
      },
      {
        "id": "direct",
        "name": "Direct",
        "description": "Straightforward, no-nonsense feedback"
      }
    ],
    "intensities": [
      {
        "id": "gentle",
        "name": "Gentle",
        "description": "1-2 check-ins per week"
      }
    ]
  }
}
```

### PATCH /preferences/display
Update display settings. **Protected**

**Request Body:**
```json
{
  "theme": "dark",
  "language": "es",
  "timezone": "Europe/London",
  "units": "metric"
}
```

**Response:** `200 OK`

### PATCH /preferences/privacy
Update privacy settings. **Protected**

**Request Body:**
```json
{
  "dataSharing": false,
  "analytics": true
}
```

**Response:** `200 OK`

### PATCH /preferences/integrations
Update integration preferences. **Protected**

**Request Body:**
```json
{
  "autoSync": true,
  "syncFrequency": "hourly"
}
```

**Response:** `200 OK`

---

## Plan Endpoints

### POST /plans/generate
Generate plan preview. **Protected**

**Request Body:**
```json
{
  "goalIds": ["507f1f77bcf86cd799439011"]
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "preview": {
      "name": "Weight Loss Journey",
      "duration": "12 weeks",
      "weeklyFocus": [
        {
          "week": 1,
          "theme": "Foundation",
          "description": "Building healthy habits"
        }
      ],
      "suggestedActivities": [
        {
          "name": "Morning Walk",
          "type": "exercise",
          "duration": 30,
          "frequency": "daily"
        }
      ]
    }
  }
}
```

### GET /plans
Get all user plans. **Protected**

**Query Parameters:**
- `status` - Filter by status (draft, active, completed)

**Response:** `200 OK`

### POST /plans
Create a plan. **Protected**

**Request Body:**
```json
{
  "name": "My Health Plan",
  "goals": ["507f1f77bcf86cd799439011"],
  "activities": [
    {
      "name": "Morning Walk",
      "type": "exercise",
      "scheduledDays": [1, 2, 3, 4, 5],
      "scheduledTime": "07:00",
      "duration": 30
    }
  ]
}
```

**Response:** `201 Created`

### GET /plans/today
Get today's activities. **Protected**

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "date": "2024-12-17",
    "activities": [
      {
        "id": "activity-1",
        "name": "Morning Walk",
        "scheduledTime": "07:00",
        "completed": false,
        "type": "exercise"
      }
    ],
    "progress": {
      "completed": 2,
      "total": 5
    }
  }
}
```

### GET /plans/:planId
Get specific plan. **Protected**

**Response:** `200 OK`

### POST /plans/:planId/activate
Activate a plan. **Protected**

**Response:** `200 OK`

### PATCH /plans/:planId/activities/:activityId
Update an activity. **Protected**

**Request Body:**
```json
{
  "scheduledTime": "08:00",
  "duration": 45
}
```

**Response:** `200 OK`

### POST /plans/:planId/activities/:activityId/log
Log activity completion. **Protected**

**Request Body:**
```json
{
  "completed": true,
  "notes": "Felt great!",
  "actualDuration": 35
}
```

**Response:** `200 OK`

### POST /plans/complete-onboarding
Complete onboarding flow. **Protected**

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Onboarding completed successfully",
  "data": {
    "user": {
      "onboardingStatus": "completed"
    }
  }
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation failed |
| 429 | Too Many Requests - Rate limited |
| 500 | Internal Server Error |

---

## Rate Limiting

Default limits:
- 100 requests per 15 minutes per IP
- Authenticated users: 200 requests per 15 minutes

Rate limit headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1702809600
```

---

*API Reference v1.0*
*Last Updated: December 2024*
