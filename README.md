# Mental Health Backend API

Production-ready Node.js, Express.js, and MongoDB backend for a mental health web app. The project includes JWT auth, role-based access, mood tracking, meditation bookmarks, therapist discovery, appointment booking, security middleware, validation, pagination, and seed data.

## Folder Structure

```text
.
|-- server.js
|-- package.json
|-- .env.example
|-- sample-data.json
`-- src
    |-- app.js
    |-- config
    |   `-- db.js
    |-- controllers
    |   |-- appointment.controller.js
    |   |-- auth.controller.js
    |   |-- meditation.controller.js
    |   |-- mood.controller.js
    |   |-- therapist.controller.js
    |   `-- user.controller.js
    |-- data
    |   |-- meditations.json
    |   |-- seed.js
    |   `-- therapists.json
    |-- middleware
    |   |-- auth.middleware.js
    |   |-- error.middleware.js
    |   |-- notFound.middleware.js
    |   |-- sanitize.middleware.js
    |   `-- validate.middleware.js
    |-- models
    |   |-- Appointment.js
    |   |-- Meditation.js
    |   |-- Mood.js
    |   |-- Therapist.js
    |   `-- User.js
    |-- routes
    |   |-- appointment.routes.js
    |   |-- auth.routes.js
    |   |-- meditation.routes.js
    |   |-- mood.routes.js
    |   |-- therapist.routes.js
    |   `-- user.routes.js
    |-- utils
    |   |-- apiError.js
    |   |-- asyncHandler.js
    |   |-- generateToken.js
    |   |-- moodAnalytics.js
    |   `-- pagination.js
    `-- validators
        |-- appointment.validator.js
        |-- auth.validator.js
        |-- meditation.validator.js
        |-- mood.validator.js
        |-- therapist.validator.js
        `-- user.validator.js
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB Atlas connection string and JWT secret.

4. Seed meditation and therapist data:

```bash
npm run seed
```

5. Start the server:

```bash
npm run dev
```

## Security & Production Notes

- `helmet` for secure headers
- `express-rate-limit` for API throttling
- `express-validator` for request validation
- `express-mongo-sanitize` plus HTML sanitization for NoSQL/XSS protection
- `dotenv` for environment configuration
- `cors` enabled for frontend integration
- Render-ready via `PORT` and `MONGO_URL`

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### User

- `GET /api/users/me`
- `PUT /api/users/me`

### Mood Tracking

- `POST /api/moods`
- `GET /api/moods`
- `GET /api/moods/:id`
- `PUT /api/moods/:id`
- `DELETE /api/moods/:id`
- `GET /api/moods/analytics`

Query params:
- `startDate`, `endDate`
- `page`, `limit`

### Guided Meditation

- `GET /api/meditations`
- `POST /api/meditations/:id/bookmark`

Query params:
- `category`
- `page`, `limit`

### Therapists

- `GET /api/therapists`

Query params:
- `specialization`
- `search`
- `page`, `limit`

### Appointments

- `POST /api/appointments`
- `GET /api/appointments`
- `PATCH /api/appointments/:id/cancel`
- `PATCH /api/appointments/:id/status`

Query params:
- `status`
- `page`, `limit`

## Example Payloads

### Register

```json
{
  "name": "Ava Brown",
  "email": "ava@example.com",
  "password": "Password123",
  "age": 27,
  "gender": "female",
  "role": "user",
  "bio": "Working on better daily routines.",
  "mentalHealthGoals": ["sleep consistency", "lower stress"]
}
```

### Create Mood

```json
{
  "mood": "happy",
  "note": "Felt productive after journaling.",
  "date": "2026-03-24T08:30:00.000Z"
}
```

### Book Appointment

```json
{
  "therapistId": "replace-with-valid-therapist-id",
  "slotStart": "2026-03-25T10:00:00.000Z",
  "notes": "Looking for support with stress management."
}
```

## Deployment on Render

1. Create a new Web Service and connect the repository.
2. Set the build command to `npm install`.
3. Set the start command to `npm start`.
4. Add environment variables from `.env.example`.
5. Use MongoDB Atlas for `MONGO_URL`.

## Notes

- Roles available: `user`, `therapist`, `admin`
- Mood analytics return average mood score, dominant mood, and timeline trends
- Appointment double booking is prevented with a uniqueness constraint and pre-check logic
- `sample-data.json` includes sample request payloads for quick testing
