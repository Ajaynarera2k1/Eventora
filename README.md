Eventora 🎟️

A full-stack MERN event booking platform with role-based access, 2FA OTP verification, and a real-time admin dashboard.

Eventora lets users browse and book events seamlessly while giving administrators full control over event creation, booking approvals, and payment tracking — all in one platform.
🔗 Live Demo · 📂 GitHub Repository · 📬 Postman Collection

✨ Why Eventora?
Eventora is not just a CRUD booking app. It is a complete product with real-world flows:

🔐 JWT authentication with bcrypt — no shortcuts on security
📧 Two-factor OTP verification for both registration and booking
👥 Strict role-based access — admins and users see completely different experiences
🪑 Smart seat management — overbooking is blocked at the database level
📊 Live admin analytics — pending requests, revenue, and confirmed bookings in real time
💌 Automated email notifications on booking confirmation via Nodemailer


🚀 Features
Authentication & Security

Secure signup and login with JWT and bcrypt
Mandatory email OTP to activate account on registration
Mandatory email OTP to confirm every ticket booking — prevents unauthorized bookings
OTP re-triggered on delayed or suspicious login attempts

Role-Based Access
FeatureUserAdminBrowse events✅✅Book tickets (with OTP)✅❌View personal booking dashboard✅❌Cancel own bookings✅❌Create / Edit / Delete events❌✅Confirm or reject booking requests❌✅Mark bookings as Paid / Not Paid❌✅View analytics dashboard❌✅

Admin access is strictly locked to database-flagged users — no frontend bypass possible.

Event Management

Create free and paid events with full details — description, image URL, date, category, and seating capacity
Edit and delete events from the admin dashboard
Seat availability updates in real time and validates against overbooking

Smart Booking System

Every booking (free or paid) enters a secure Pending queue
Admin manually reviews, confirms, or rejects each request
Payments are tracked and marked directly by the admin
Booking confirmation triggers an automated email to the user

Admin Analytics Dashboard

Live count of pending booking requests
Total revenue from confirmed paid bookings
Total confirmed paid clients

UI/UX

Built with React and Tailwind CSS
Micro-interactions throughout for a polished feel
Fully responsive across devices


🛠️ Tech Stack
LayerTechnologyFrontendReact, Vite, Tailwind CSSBackendNode.js, ExpressDatabaseMongoDB + MongooseAuthJWT + BcryptEmail / OTPNodemailer (Gmail App Password)Frontend DeployVercelBackend DeployRender

📁 Project Structure
Eventora/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level page components
│   │   ├── context/         # Auth context and global state
│   │   └── utils/           # API helpers and constants
│   └── vite.config.js
│
├── server/                  # Express backend
│   ├── controllers/         # Route handler logic
│   ├── middleware/           # Auth and role-check middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API route definitions
│   └── index.js             # Server entry point
│
├── Eventora_Postman_Collection.json   # Ready-to-import API collection
├── SETUP_GUIDE.md           # Detailed setup instructions
├── dfd.png                  # Data flow diagram
├── fc.png                   # Flowchart diagram
└── package.json             # Root scripts for running both client and server

⚙️ How It Works
User registers → Email OTP sent → Account activated
        ↓
User browses events → Selects event → OTP verification → Booking submitted
        ↓
Booking enters Pending queue → Admin reviews
        ↓
Admin confirms → Booking marked Paid → Confirmation email sent to user
        ↓
Admin dashboard updates — revenue and client count reflect in real time

🧑‍💻 Local Setup
Prerequisites

Node.js installed
MongoDB Atlas account (free tier works)
Gmail account with App Password enabled

1. Clone the repository
bashgit clone https://github.com/Ajaynarera2k1/Eventora.git
cd Eventora
2. Configure environment variables
Create a .env file inside the server/ folder:
envMONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
PORT=5000

Note on EMAIL_PASS: Use a Gmail App Password, not your regular password. Generate one from Google Account → Security → 2-Step Verification → App Passwords.

3. Run from root (recommended — single terminal)
bashnpm install
npm run install:all   # installs dependencies for both client and server
npm run dev           # starts both frontend and backend together
4. Run separately (two terminals)
Backend:
bashcd server
npm install --legacy-peer-deps
npm run dev
# Runs on http://localhost:5000
Frontend:
bashcd client
npm install
npm run dev
# Runs on http://localhost:5173

📜 Available Scripts (Root)
ScriptDescriptionnpm run devStarts both server and client using concurrentlynpm run install:allInstalls dependencies for server and clientnpm run dev:allInstalls all dependencies then starts both serversnpm run startRuns backend start + frontend preview

🔌 API Overview
All protected routes require a valid JWT token in the Authorization header.
Auth Routes
POST   /api/auth/register          # Register new user
POST   /api/auth/verify-otp        # Verify registration OTP
POST   /api/auth/login             # Login and receive JWT
POST   /api/auth/resend-otp        # Resend OTP
Event Routes
GET    /api/events                 # Get all events (public)
GET    /api/events/:id             # Get single event (public)
POST   /api/events                 # Create event (admin only)
PUT    /api/events/:id             # Update event (admin only)
DELETE /api/events/:id             # Delete event (admin only)
Booking Routes
POST   /api/bookings               # Submit booking request (user)
POST   /api/bookings/verify-otp    # Confirm booking with OTP (user)
GET    /api/bookings/my            # Get user's own bookings (user)
DELETE /api/bookings/:id           # Cancel booking (user)
GET    /api/bookings               # Get all bookings (admin)
PATCH  /api/bookings/:id/confirm   # Confirm booking (admin)
PATCH  /api/bookings/:id/reject    # Reject booking (admin)
PATCH  /api/bookings/:id/payment   # Mark as paid/unpaid (admin)
Dashboard Routes
GET    /api/dashboard/admin        # Admin analytics (admin only)

📬 Full API documentation available in the included Postman Collection — import Eventora_Postman_Collection.json directly into Postman.


🌐 Deployment
Frontend → Vercel

Connect your GitHub repo to Vercel
Set the root directory to client/
Add environment variable: VITE_API_URL=your-render-backend-url
Add vercel.json with SPA rewrite rules for React Router

Backend → Render

Create a new Render Web Service
Set root directory to server/
Add all environment variables from your .env
Deploy — Render auto-detects Node.js


🗺️ Roadmap

 Razorpay / payment gateway integration for online payments
 Real-time seat availability with WebSockets
 QR code ticket generation on booking confirmation
 Event search and filter by category, date, and price
 Automated test suite with Jest and React Testing Library
 Admin event analytics with charts and export


⚠️ Current Limitations

Payments are tracked manually by admin — no automated payment gateway yet
No pagination on event listings for large datasets
No formal automated test suite


👨‍💻 Author
Ajay Narera
Full Stack Developer — MERN Stack
📧 nareraajay1@gmail.com · 📍 Rajasthan, India · 🔗 GitHub
