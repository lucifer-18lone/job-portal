# Full-Stack Job Listing Portal

A complete Job Listing Portal built with React, Node.js, Express, and PostgreSQL.

## Features
- **Role-Based Access**: Specialized views for Job Seekers (search/apply) and Employers (post/manage).
- **JWT Auth**: Secure login and registration with hashed passwords.
- **Real-Time Notifications**: Instant status update alerts via Socket.io.
- **Job Search**: Filter by location, job type, and keywords.
- **Responsive Management**: Employers can post, edit, and track job applications.

## Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

## Installation

1.  **Clone the project**
    `git clone https://github.com/username/job-listing-portal.git`
    `cd job-listing-portal`

2.  **Database Setup**
    - Create a PostgreSQL database named `jobportal`.
    - Run the commands in `backend/schema.sql` to create the tables.

3.  **Backend Configuration**
    - Navigate to `backend/`
    - Create a `.env` file based on `.env.example`.
    - Install dependencies:
        `npm install`
    - Start the server:
        `npm run dev`

4.  **Frontend Configuration**
    - Navigate to `frontend/`
    - Create a `.env` file:
        `REACT_APP_API_URL=http://localhost:5000`
    - Install dependencies:
        `npm install`
    - Start the React app:
        `npm start`

## Deployment

### Backend (Render)
1. Connect your GitHub repository to Render.
2. Set Build Command: `cd backend && npm install`
3. Set Start Command: `cd backend && node server.js`
4. Add Environment Variables from `.env`.

### Frontend (Vercel)
1. Import the project into Vercel.
2. Set the root directory to `frontend`.
3. Add Environment Variable `REACT_APP_API_URL`.

## Project Structure
- `backend/`: Express server, database logic, and API routes.
- `frontend/`: React application, components, and state management.
- `.github/workflows/`: CI/CD automation scripts.

## Troubleshooting
- **Database Connection Error**: Ensure your PostgreSQL service is running and the `DATABASE_URL` in `.env` is correct.
- **Socket Connection Failure**: Ensure the `FRONTEND_URL` in backend `.env` matches the URL where your React app is running.
