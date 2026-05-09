# 🚀 Webify.ai  
### AI-Powered Website Builder SaaS (MERN Stack)

> Build and deploy full websites in seconds using AI — no coding required.

---

## 🌐 Project Overview

**Webify.ai** is a production-ready SaaS platform that allows users to generate fully functional, responsive websites using AI and deploy them instantly with a single click.

This project solves the problem of time-consuming manual website creation by providing a direct prompt-to-deployment pipeline. It follows real-world SaaS architecture including authentication, payments, credit system, and scalable deployment.

Users simply describe their idea, and the platform generates a complete, multi-page website automatically, making it ideal for creators, startups, and developers.

---

## 🔥 Key Features

- 🤖 **AI Website Generation**  
  Describe your idea → AI builds the responsive, multi-page website instantly

- 🚀 **One-Click Deployment**  
  Deploy generated websites live instantly with custom slugs

- 💰 **Credit-Based System**  
  Users spend credits for each generation and can purchase more via dashboard

- 💳 **Secure Payments**  
  Razorpay Checkout + secure server-side verification integration

- 🎞 **Premium UI/UX**  
  Smooth animations using Framer Motion with modern, minimal design

- 🔐 **Authentication System**  
  Secure login/signup with protected SPA routes

- 📊 **Dashboard**
  Manage, preview, and deploy all generated websites in one place

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React.js + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide-React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)

### Payments
- **Gateway:** Razorpay (Checkout + verify)

### Deployment
- **Frontend & Backend:** Render
- **Database:** MongoDB Atlas

---

## 📁 Folder Structure

```bash
Webify.ai/
│
├── client/                 # React frontend
│   ├── public/             # Static assets and redirects
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main SPA views (Dashboard, Editor, etc.)
│   │   ├── redux/          # Redux Toolkit store slices
│   │   ├── hooks/          # Custom React hooks
│   │   └── App.jsx         # App routing
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── config/             # DB & API configurations
│   ├── controllers/        # Business logic (auth, website, payment)
│   ├── middlewares/        # Custom Express middlewares (isAuth)
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express API routers
│   ├── utils/              # Helper functions
│   └── index.js            # Entry point
│
└── README.md
```

---

## ⚙️ Setup Guide

Follow these steps to run Webify.ai locally.

### 1. Clone the repository
```bash
git clone https://github.com/Hrithik-05-Roshan/webify-ai.git
cd webify-ai
```

### 2. Install dependencies

Open two terminal windows/tabs.

**Frontend:**
```bash
cd client
npm install
```

**Backend:**
```bash
cd server
npm install
```

---

### 3. Environment Variables

Create a `.env` file in the `server` folder with the following keys:

```env
# Server
PORT=5000
CLIENT_URL=http://localhost:5173
FRONTEND_URL=http://localhost:5173

# Database
MONGO_URI=your_mongodb_uri

# Authentication
JWT_SECRET=your_jwt_secret

# AI
OPENROUTER_API_KEY=your_openrouter_api_key

# Payments
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret_key
```

Create a `.env` file in the `client` folder with the following keys:
```env
VITE_SERVER_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

---

### 4. Run the application

**Start Backend (Terminal 1):**
```bash
cd server
npm run dev
```

**Start Frontend (Terminal 2):**
```bash
cd client
npm run dev
```

The application should now be running at `http://localhost:5173`.

---

## 📖 API Documentation

The backend exposes several RESTful endpoints:

- **Auth:** `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`
- **User:** `/api/user/me`
- **Website:**
  - `POST /api/website/generate` - Generate new website via AI
  - `GET /api/website/get-all` - Get user's websites
  - `POST /api/website/deploy/:id` - Deploy a website
  - `GET /api/website/get-by-slug/:slug` - Fetch deployed site content
- **Payment:**
  - `POST /api/payment/order` - Create Razorpay order
  - `POST /api/payment/verify` - Verify payment and add credits

---

## 🤝 Contribution Guide

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
