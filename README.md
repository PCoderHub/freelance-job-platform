# Freelance Job Marketplace – MERN Stack

[Live Demo](https://freelance-job-platform-ui.onrender.com)

A full-stack freelance job marketplace web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). The platform enables clients to post jobs, freelancers to apply and communicate in real time, and secure payments using Stripe, with admin moderation and audit-safe data handling.

---

## 🚀 Features

### 👤 User Roles

- **Client** – Post jobs, hire freelancers, chat, and make payments
- **Freelancer** – Apply to jobs, chat with clients, receive payments, and get reviews
- **Admin** – Manage users, jobs, and monitor platform activity

---

### 💼 Job Management

- Job posting, editing, and soft deletion
- Proposal submission and hiring flow
- Job completion tracking

---

### 💬 Real-Time Chat

- One-to-one chat between client and freelancer
- Implemented using **Socket.IO**
- Messages persist in the database
- Auto-scroll and real-time updates

---

### 💳 Payments (Stripe)

- Secure **Stripe PaymentIntent** integration
- Client-to-freelancer direct payments
- Automatic transaction recording in database
- Transaction history for:
  - Clients
  - Freelancers
  - Admin

---

### ⭐ Reviews & Ratings

- Clients can leave reviews after job completion
- Average ratings calculated and displayed in Dashboard
- Review verification tied to completed jobs

---

### 🛠 Admin Dashboard

- Activate / deactivate user accounts
- Soft delete jobs
- View users, jobs, and payment transactions

---

### 🗑 Soft Delete Strategy

- Jobs are soft-deleted using status flags
- Ensures:
  - Payment data integrity
  - Audit trail preservation
  - No crashes due to missing references

---

## 🧑‍💻 Tech Stack

### Frontend

- React
- Material UI (MUI)
- Tailwind CSS
- Socket.IO Client
- Stripe.js

### Backend

- Node.js
- Express.js
- MongoDB & Mongoose
- Socket.IO
- Stripe API
- JWT Authentication

### Other Tools

- Git & GitHub
- RESTful APIs
- Postman
