# GigFlow 🚀 | Modern Freelance Marketplace

**GigFlow** is a full-featured, real-time freelance marketplace platform designed to connect clients with talented freelancers. Built with the **MERN Stack** (MongoDB, Express, React, Node.js) and powered by **Socket.io** for instant interactions, it offers a seamless experience for posting, bidding, and managing gigs.

---

## 🌟 Key Features

### 👤 User Authentication & Security
- **Secure Auth**: JWT-based authentication with **HTTP-Only cookies** for enhanced security.
- **Protected Routes**: Robust client-side and server-side route protection.
- **Dynamic Profiles**: Personalized dashboards for both clients and freelancers.

### 💼 Gig Management System
- **Public Browse**: Explore available gigs with real-time search and filtering.
- **Post & Manage**: Clients can easily post new gigs, edit details, and manage their listings.
- **Interactive Details**: Detailed gig views with budget, deadline, and required skills.

### 💰 Real-time Bidding Engine
- **Instant Bidding**: Freelancers can place competitive bids on open gigs instantly.
- **Bid Management**: Clients can review all incoming bids and hire the best candidate with a single click.
- **Status Updates**: Real-time status transitions (Open, In Progress, Completed).

### 🔔 Real-time Notifications (Socket.io)
- **Instant Alerts**: Receive immediate notifications when a new bid is placed.
- **Hiring Updates**: Freelancers get notified instantly when they are hired for a gig.
- **Live Interaction**: Powered by **WebSockets** for a low-latency user experience.

### 🎨 Modern UI/UX
- **Dark Mode Support**: Seamless theme switching using **Shadcn UI** and **Tailwind CSS**.
- **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop devices.
- **Interactive Animations**: Smooth transitions and hover effects for a premium feel.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Type Safety)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Real-time**: [Socket.io-client](https://socket.io/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JSON Web Token (JWT)](https://jwt.io/) & [Cookie-Parser](https://www.npmjs.com/package/cookie-parser)
- **Real-time**: [Socket.io](https://socket.io/)
- **Security**: [CORS](https://www.npmjs.com/package/cors) & [Bcryptjs](https://www.npmjs.com/package/bcryptjs)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Atlas or Local)
- **npm** or **yarn**

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nizam-321/gigflow.git
   cd gigflow
   ```

2. **Backend Configuration**:
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` folder:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_super_secret_key
     CLIENT_URL=http://localhost:5173
     NODE_ENV=development
     ```
   - Start the backend:
     ```bash
     npm run dev
     ```

3. **Frontend Configuration**:
   ```bash
   cd ../frontend
   npm install
   ```
   - Create a `.env` file in the `frontend` folder:
     ```env
     VITE_API_URL=http://localhost:5000/api
     VITE_SOCKET_URL=http://localhost:5000
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```

---

## ⚡ Performance Optimization

To ensure a high-quality user experience, GigFlow implements several performance-driven techniques:

- **Optimized Build Tooling**: Powered by **Vite**, providing nearly instant server starts and lightning-fast HMR during development.
- **Efficient State Management**: Uses **Redux Toolkit** to manage application state globally, reducing prop-drilling and unnecessary component re-renders.
- **Lazy Styling**: Utility-first CSS via **Tailwind CSS** ensures only the styles used in the project are included in the final bundle, minimizing file size.
- **Real-time Efficiency**: **Socket.io** is configured with manual connection triggers (after login) to prevent wasted resources and redundant handshakes.
- **Asset Optimization**: High-performance icons from **Lucide React** are imported individually to leverage tree-shaking.
- **Production-Ready Builds**: Pre-configured TypeScript build pipeline (`tsc`) ensures code is minified and optimized for production environments.

---

## 🔍 SEO & Optimization
- **Meta Tags**: Optimized title and description for search engines.
- **Open Graph**: Social media preview optimization (OG Tags).
- **Performance**: Lightweight builds with Vite for fast loading times.

## 📄 License
This project is licensed under the **MIT License**.

---
**Developed with ❤️ by [Nizam]**
