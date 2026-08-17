# Smart Study Buddy

A full-stack study-planning prototype that turns an exam goal into manageable tasks and tracks completion progress.

## Features

- Registration and login with JWT-based authentication
- Password hashing with bcrypt
- Creation of study goals and exam dates
- Generation of study tasks across the available study period
- Task states for planned, active and completed work
- Progress calculation based on completed tasks
- Protected frontend routes
- PostgreSQL persistence through the backend API

## Technology stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router, Axios |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL |
| Authentication | JWT, bcryptjs |

## Repository structure

```text
smart-study-buddy/
├── backend/    Express API and PostgreSQL access
├── frontend/   React client
└── docs/       Supporting project documentation
```

## Local setup

### 1. Clone the repository

```bash
git clone https://github.com/Abdelrahmanbaraka/smart-study-buddy.git
cd smart-study-buddy
```

### 2. Configure and start the backend

Create `backend/.env`:

```env
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=replace_with_a_long_random_secret
```

Then run:

```bash
cd backend
npm install
npm start
```

### 3. Start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

## Current limitations

- This is a learning project, not a production-ready study platform.
- Local PostgreSQL setup is required.
- Automated tests and a hosted demo are not included yet.
- Calendar views, notifications and AI recommendations are possible future extensions, not current features.
