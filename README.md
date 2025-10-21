Resume System - Backend
Overview
Node.js + Express backend for the Resume System trial task. Features:

User auth (JWT)
Resume CRUD and auto-summary generator
Projects & Experiences (create and attach to resume)
Integration webhook (external platforms push achievements)
Simple verification workflow (request & complete)
Email mock to simulate notifications
Requirements
Node 18+ or Docker & Docker Compose
MongoDB (local or via docker)
Setup (local)
Clone repo
Copy .env -> .env and update values
npm install
npm run dev
Setup (docker)
Copy .env.example -> .env (update if needed)
docker-compose up --build
API Endpoints (examples)
Auth
POST /api/auth/register body: { name, email, password }
POST /api/auth/login body: { email, password } returns: { token }
Header for protected routes: Authorization: Bearer <token>

Profile
GET /api/users/me
PUT /api/users/me
POST /api/users/invite-verifier
Resume
GET /api/resumes/ -> get or create resume for user
PUT /api/resumes/ -> update resume (body)
POST /api/resumes/project -> add project
POST /api/resumes/experience -> add experience
POST /api/resumes/generate-summary -> generate auto summary
Integrations
POST /api/integrations/webhook/achievement body: { userEmail, type, title, description, source }
Verification
POST /api/verification/request body: { entityType, entityId }
PUT /api/verification/:id/complete body: { status: 'verified'|'rejected'|'pending', notes }
