Eventora — Interview Guide 🎯

📌 Project Introduction (Say This First)

"I built Eventora — a full-stack MERN event booking platform with role-based access control, two-factor OTP verification, and a real-time admin dashboard. It's not just a basic CRUD app — it has real-world flows like OTP-based booking confirmation, smart seat management to prevent overbooking, and a complete admin workflow for reviewing and approving bookings."


🧠 Project Overview to Explain
What does Eventora do?

Users can browse events and book tickets with OTP verification
Every booking enters a pending queue — admin reviews and approves/rejects
Admin can create, edit, delete events and manage all bookings
2FA OTP on both registration AND booking — double security layer
Real-time analytics dashboard for admin — revenue, pending requests, confirmed clients
Automated email notifications on booking confirmation
Seat management — overbooking blocked at database level

Why did you build it?

"I wanted to build something beyond a basic CRUD app. Eventora gave me experience with role-based access control, OTP-based 2FA, admin workflows, and real-world booking flows — things you actually encounter in production applications."


🛠️ Tech Stack Explanation
Frontend

React + Vite — Component-based UI with fast development server
Tailwind CSS — Utility-first CSS for responsive design
Context API — Global auth state management
Axios — HTTP requests to backend API
Vercel — Frontend deployment with SPA routing support

Backend

Node.js + Express.js — REST API server
ES Modules — Modern import/export syntax
JWT — Stateless authentication
Bcrypt — Password hashing
Nodemailer + Gmail — OTP and notification emails
Render — Backend deployment

Database

MongoDB Atlas — Cloud NoSQL database
Mongoose — Schema definition, validation, and queries


🔑 Key Technical Concepts to Explain
1. Registration Flow
User fills signup form →
Backend generates OTP → OTP emailed to user →
User enters OTP → Account activated →
JWT token issued → User logged in
2. Booking Flow with 2FA
User selects event → Clicks Book →
Backend checks seat availability →
OTP generated and emailed →
User enters OTP → Booking submitted →
Booking enters Pending queue →
Admin reviews → Confirms or Rejects →
Confirmation email sent to user
3. Role-Based Access Control
Every protected route has Auth middleware (verifies JWT) +
Role middleware (checks req.user.role === 'admin') →
If user tries admin route → 403 Forbidden
Admin flag is set only at database level — no frontend bypass
4. Seat Management
When booking submitted →
MongoDB checks current confirmed bookings count →
Compared against event.capacity →
If full → booking rejected immediately →
Prevents race conditions / overbooking
5. Admin Analytics
MongoDB aggregation pipelines →
Count pending bookings →
Sum revenue from confirmed + paid bookings →
Count confirmed paid clients →
All returned in single dashboard API call

🔗 Quick Reference

Live URL: https://eventora.vercel.app (frontend)
GitHub: https://github.com/Ajaynarera2k1/Eventora
Stack: React, Vite, Tailwind, Node.js, Express, MongoDB, JWT, Nodemailer
Key Features: 2FA OTP, Role-based access, Booking queue, Admin analytics
