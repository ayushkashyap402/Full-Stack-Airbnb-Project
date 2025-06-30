# 🏡 Airbnb Clone - Full Stack MERN Project

A full-stack **Airbnb-style web application** where users can list properties, search locations, book stays, and manage personal bookings. Built using the powerful **MERN stack**: React, Express.js, Node.js, and MongoDB — with full authentication, CRUD functionality, and responsive UI.

![Airbnb Clone Banner](https://user-images.githubusercontent.com/your-image.png) <!-- Replace with actual banner/screenshot -->

---

## 📌 Table of Contents

- [📌 Table of Contents](#-table-of-contents)
- [🚀 Features](#-features)
- [🎯 Project Motivation](#-project-motivation)
- [📷 Demo](#-demo)
- [🧰 Tech Stack](#-tech-stack)
- [🏗️ Project Structure](#️-project-structure)
- [📦 Installation & Setup](#-installation--setup)
- [🔑 .env Configuration](#-env-configuration)
- [💡 What I Learned](#-what-i-learned)
- [⚙️ Future Enhancements](#️-future-enhancements)
- [🛡️ License](#️-license)
- [🙋‍♂️ About Me](#-about-me)

---

## 🚀 Features

- ✅ User Registration & Login with JWT
- ✅ Add, Edit, and Delete Property Listings
- ✅ Book listings based on availability
- ✅ Search by location, guest count, and dates
- ✅ Upload multiple images using Cloudinary
- ✅ Fully responsive for desktop & mobile
- ✅ User dashboard to manage listings and bookings
- ✅ Protected routes & role-based actions

---

## 🎯 Project Motivation

The goal of this project was to create a **real-world, scalable full-stack application** from scratch — applying frontend and backend development principles, database integration, and user authentication with session management.

This clone mimics the **core functionality of Airbnb**, giving me the opportunity to explore how booking systems work, build API endpoints, manage complex UI state in React, and deploy a MERN application end-to-end.

---

## 📷 Demo

- **Frontend Live Demo**: [https://airbnb-clone-ayush.netlify.app](https://your-frontend-url.com)
- **Backend API**: [https://airbnb-api-ayush.onrender.com](https://your-backend-url.com)

*(Replace with your actual deployed links and screenshots)*

---

## 🧰 Tech Stack

### 🖥️ Frontend

- React.js (with Hooks and Router)
- Tailwind CSS
- Axios
- React-Date-Picker

### 🛠️ Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary SDK
- JSON Web Tokens (JWT)
- Bcrypt for password encryption
- Multer for image upload handling

### ⚙️ Tools & Platforms

- Vercel (Frontend Hosting)
- Render/Railway (Backend Hosting)
- MongoDB Atlas (Database)
- Postman (API Testing)
- Git & GitHub

---

## 🏗️ Project Structure



---

## 📦 Installation & Setup

### 🔧 Backend

bash
cd server
npm install
touch .env
npm run dev

#.env Configuration
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
