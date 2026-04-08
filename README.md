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

❓ Expected Interview Questions & Answers

🔐 Authentication & Security
Q: What is 2FA and how did you implement it?

"Two-Factor Authentication adds a second verification step beyond password. In Eventora I implemented it using email OTP. During registration, after filling the form, an OTP is generated on the backend, stored temporarily, and emailed to the user. The account is only activated after OTP verification. The same flow is repeated for every booking — this prevents someone from booking tickets even if they somehow have access to another person's account."

Q: How do you store and validate OTPs?

"OTPs are generated using Math.random(), stored in the user or booking document in MongoDB with a timestamp, and verified by comparing the submitted OTP with the stored one. I also check expiry — OTPs expire after a set time to prevent replay attacks."

Q: How does role-based access control work?

"When a user registers, their role is stored in MongoDB as either user or admin. Admin accounts are only created directly in the database — there's no public API to become an admin. Every protected route passes through two middlewares: first the Auth middleware verifies the JWT token, then a Role middleware checks if req.user.role === 'admin'. If not, a 403 Forbidden response is returned."

Q: Can a user manipulate their role from the frontend?

"No. The role is stored in the database and embedded in the JWT token at login time. The JWT is signed with a secret key — if someone tampers with the token payload, the signature verification fails. Even if someone modifies localStorage, the backend always re-verifies the token on every request."

Q: Why did you use JWT instead of sessions?

"JWT is stateless — the server doesn't store any session data. The token itself contains the user's ID and role, signed with a secret. This makes the backend scalable since any server instance can verify the token without a shared session store. It also works well with React SPAs where the token is stored in localStorage."

Q: How does bcrypt work?

"Bcrypt is a one-way hashing algorithm designed specifically for passwords. It adds a random salt before hashing, which means the same password produces a different hash every time — preventing rainbow table attacks. During login, bcrypt.compare() hashes the input and compares it with the stored hash. The original password is never stored or retrievable."


📅 Booking System
Q: Why does every booking go through a pending queue?

"In real event management, organizers need control over who attends. A pending queue lets admins verify bookings, manage capacity manually, handle special requests, and prevent spam bookings. It mirrors how real ticketing platforms like BookMyShow work for certain event types."

Q: How do you prevent overbooking?

"When a booking is submitted, the backend queries MongoDB to count all confirmed bookings for that event and compares it against event.capacity. If the count has reached capacity, the booking is rejected immediately with an error. This check happens at the database level — not just the frontend — so it cannot be bypassed."

Q: What happens if two users book the last seat simultaneously?

"This is a race condition. Currently I handle it with a database-level check on every booking request. A more robust solution would be MongoDB transactions or optimistic locking — which I've listed in the roadmap. For the current scale it works reliably."

Q: Why do you require OTP for every booking and not just registration?

"To prevent unauthorized bookings. If someone's account is compromised or if they share their login, OTP ensures only the actual email owner can confirm a booking. It's an extra layer of protection, especially important for paid events."


👥 Role-Based Access
Q: How is the admin dashboard different from the user dashboard?

"Users see their personal bookings, event listings, and can cancel their own bookings. Admins see a completely different interface — all bookings across all users, pending requests to approve or reject, payment status management, event CRUD controls, and an analytics panel showing revenue, pending count, and confirmed clients. The routing and API endpoints are completely separate."

Q: What if someone tries to access an admin API endpoint directly?

"Every admin route is protected by two middlewares — the Auth middleware verifies the JWT token, and the Role middleware checks req.user.role === 'admin'. If either check fails, the request is rejected with a 401 or 403 error before reaching the controller. There is no way to bypass this from the frontend."


📧 Email & OTP
Q: How did you implement email sending?

"I used Nodemailer with Gmail as the SMTP service. Gmail requires an App Password — a 16-character password generated from Google Account security settings — instead of the actual Gmail password. The transporter is configured with the Gmail service, email, and app password from environment variables. I send HTML emails for OTPs and booking confirmations."

Q: What if the OTP email fails to send?

"Currently the API returns an error if email sending fails. A production improvement would be to use a message queue like Bull to retry failed emails automatically, and use a dedicated email service like SendGrid instead of Gmail for better deliverability and reliability."

Q: How long are OTPs valid?

"OTPs have a time-based expiry stored alongside them in the database. If the user submits an OTP after expiry, the backend rejects it and they need to request a new one. This prevents OTP reuse attacks."


🗄️ Database
Q: How did you design the data models?

"I have three main models:

User — stores name, email, hashed password, role, OTP, verified status
Event — stores title, description, date, category, capacity, price, image URL
Booking — stores references to user and event, status (pending/confirmed/rejected), payment status, OTP for booking verification"


Q: How does the admin analytics work?

"I use MongoDB aggregation pipelines. For revenue, I use $match to filter confirmed and paid bookings, then $lookup to join with the events collection, then $group to sum the ticket prices. For pending count, a simple countDocuments with a pending status filter. All three metrics are fetched in a single dashboard API call."

Q: Why MongoDB over SQL for this project?

"Event data is flexible — different events can have different attributes. MongoDB's document model handles this naturally without schema migrations. Also, the project is JavaScript throughout — MongoDB's JSON-like documents integrate seamlessly with Node.js and React."


⚛️ Frontend
Q: Why React with Vite instead of Create React App?

"Vite is significantly faster than CRA for both development startup and hot module replacement. It uses native ES modules in development and Rollup for production builds. For a modern React project, Vite is the better choice."

Q: How did you manage global auth state?

"I used React's Context API with a custom AuthContext. After login, the JWT token is stored in localStorage and the decoded user object is stored in context. Every component that needs auth state consumes the context. On page refresh, the context re-reads from localStorage to restore the session."

Q: Why Tailwind CSS?

"Tailwind's utility-first approach lets me style components directly in JSX without switching between files. It's highly consistent, produces smaller CSS bundles in production via purging, and the responsive utilities make mobile-first design straightforward."


🚀 Deployment
Q: How is the project deployed?

"It's a monorepo with separate client and server folders. The React frontend is deployed on Vercel — it auto-detects Vite and builds the project. The Express backend is deployed on Render as a Node.js web service. The frontend communicates with the backend via the VITE_API_URL environment variable pointing to the Render URL."

Q: How do you handle React Router on Vercel?

"React Router handles routing on the client side — but when you refresh a page like /events/123, Vercel tries to find a server file at that path and returns a 404. I added a vercel.json file with a rewrite rule that redirects all routes to index.html, letting React Router handle the routing."

Q: What environment variables does the project use?

"Backend: MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS, PORT. Frontend: VITE_API_URL pointing to the Render backend URL. All are stored in .env files locally and configured in Vercel/Render dashboards for production."


🌐 General
Q: What is CORS and why do you need it?

"CORS is a browser security policy that blocks requests from one origin to another. Since my frontend on Vercel (eventora.vercel.app) makes requests to my backend on Render (eventora.onrender.com), they are different origins. I configured the CORS middleware on Express to allow requests from the Vercel domain."

Q: What would you improve if you had more time?

"Several things from the roadmap:

Integrate Razorpay for actual online payments instead of manual tracking
Add WebSockets for real-time seat availability updates
Generate QR code tickets on booking confirmation
Add search and filter for events by category, date, price
Write automated tests with Jest and React Testing Library
Add pagination for large event listings"


Q: How is Eventora different from ShareKit?

"They solve different problems. ShareKit is a file storage and sharing platform — focused on file handling, cloud storage, and payment-based storage upgrades. Eventora is an event booking platform — focused on role-based access, 2FA security, booking workflows, and admin management. Together they show my ability to build different types of full-stack applications."


🎯 Tips for the Interview

Emphasize the 2FA flow — it's the most unique feature and shows security awareness
Highlight role-based access — explain it's enforced at the database AND API level
Mention the pending queue — it shows you thought about real-world admin workflows
Be ready to draw the booking flow — interviewers love flowcharts
Know the difference between your two projects — ShareKit vs Eventora shows range


🔗 Quick Reference

Live URL: https://eventora.vercel.app (frontend)
GitHub: https://github.com/Ajaynarera2k1/Eventora
Stack: React, Vite, Tailwind, Node.js, Express, MongoDB, JWT, Nodemailer
Key Features: 2FA OTP, Role-based access, Booking queue, Admin analytics
