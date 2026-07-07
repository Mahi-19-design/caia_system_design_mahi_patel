# 🚀 CAIA System Design Platform

A modern, full-stack platform designed to help developers master **System Design**, **Backend Architecture**, **Frontend Patterns**, and **DevOps**.

Built with a clean **MVC backend** and a highly interactive **React frontend**, this project demonstrates how to build scalable, maintainable, and production-ready applications.

---

## 📖 Description

The **CAIA Platform** is a comprehensive educational system that goes beyond static learning. It provides an immersive experience with:

* 📚 Structured learning roadmaps
* 🔍 Advanced search & filtering
* 🤝 Community-driven interactions
* 📊 Real-time analytics

The application follows a **full-stack architecture**:

### 🖥️ Frontend

A responsive React application built using Vite, featuring dynamic UI components and real-time interactions.

### ⚙️ Backend

A scalable Node.js + Express API connected to MongoDB Atlas, using MVC architecture and advanced aggregation logic.

---

## ✨ Key Features

### 🎨 Modern UI/UX

* Fully responsive design (desktop + mobile)
* Smooth animations and micro-interactions
* Clean and intuitive interface

### 🗺️ Learning & Discovery

* Interactive learning roadmaps
* Category-based exploration
* Tag, difficulty, and concept filtering
* Trending & popularity engine

### 🤝 Community Features

* Upvote / downvote system
* Personal markdown notes
* Bookmark important concepts

### 📊 Analytics Dashboard

* Total concepts tracking
* Category insights
* Backend performance metrics

---

## 📁 Project Structure

```
caia_system_design/
│
├── frontend/             # React + Vite Application
│   ├── src/
│   │   ├── components/   # UI Components
│   │   ├── pages/        # Dashboard, Explore, Roadmaps
│   │   ├── App.jsx       # Routing
│   │   └── api.js        # API logic
│   └── .env
│
└── backend/              # Node.js + Express API
    ├── src/
    │   ├── controllers/  # Business logic
    │   ├── models/       # Mongoose schemas
    │   ├── routers/      # Routes
    │   └── config/       # DB config
    ├── app.js
    └── server.js
```

---

## ⚙️ Tech Stack

### Frontend

* React 18
* Vite
* React Router DOM
* Vanilla CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* CORS & Dotenv

---

## 🚀 Getting Started

### Prerequisites

* Node.js installed

---

### 1️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/system_design
```

Run server:

```bash
npm run dev
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Run frontend:

```bash
npm run dev
```

---

### 🌐 Run App

Open:

```
http://localhost:5173
```

---

## 🌍 Deployment

* **Backend:** https://caia-system-design-mahi-patel.onrender.com/
* **Frontend:** https://caia-system-design-mahi-patel-r3un.vercel.app/
* **API Docs:** https://documenter.getpostman.com/view/50840755/2sBXwntsUA

---

## 📌 Sample Concept Entry

Below is an example of how data is structured inside the system:

```json
{
  "prompt": "Design a system that implements Horizontal vs vertical scaling for a large-scale application. Consider Foundations - Scalability requirements and constraints.",
  "response": "# Designing a Scalable System: Horizontal vs. Vertical Scaling\n\n## Introduction\nScalability is a crucial aspect of large-scale applications.\n\n## Foundations\n- Performance Requirements\n- Availability & Reliability\n- Cost Constraints\n- Future Growth\n\n## Horizontal Scaling\n- Add more machines\n- Load balancing\n- Distributed systems\n\n## Vertical Scaling\n- Upgrade CPU/RAM\n- Simpler but limited\n\n## Conclusion\nHybrid scaling is often the best approach."
,
  "metadata": {
    "category": "Foundations",
    "subcategory": "Scalability",
    "concept": "Horizontal vs vertical scaling",
    "question_type": "design",
    "generated_at": "2025-08-20T17:49:57.932316"
  }
}
```

---

## 🧠 Concepts Covered

* MVC Architecture
* Optimistic UI Updates
* MongoDB Aggregations
* Dynamic Routing
* System Design Principles
* Scalability (Horizontal vs Vertical)
* Backend Architecture (Monolith & Microservices)

---

## 💡 Highlights

* Clean **monorepo structure**
* Production-ready backend architecture
* Real-world system design implementation
* Strong focus on scalability & performance

---

## 🙌 Author

Developed as a showcase of:

* 💻 Full-Stack Development
* 🎨 UI/UX Engineering
* ⚙️ Backend Architecture
* 🚀 System Design Thinking

---
