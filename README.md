# 🚀 Webify.ai  
### AI-Powered Website Builder SaaS (MERN Stack)

> Build and deploy full websites in seconds using AI — no coding required.

---

## 🌐 Project Overview

**Webify.ai** is a production-ready SaaS platform that allows users to generate fully functional websites using AI and deploy them instantly with a single click.

This is not a basic project — it follows real-world SaaS architecture including authentication, payments, credit system, and scalable deployment.

Users simply describe their idea, and the platform generates a complete website automatically, making it ideal for creators, startups, and developers.

---

## 🔥 Features

- 🤖 **AI Website Generation**  
  Describe your idea → AI builds the website instantly  

- 🚀 **One-Click Deployment**  
  Deploy generated websites live instantly  

- 💰 **Credit-Based System**  
  Users spend credits for each generation  

- 💳 **Secure Payments**  
  Razorpay Checkout + verification integration  

- 🎞 **Premium UI/UX**  
  Smooth animations using Framer Motion  

- 🔐 **Authentication System**  
  Secure login/signup with protected routes  

- ☁️ **Production Deployment**  
  Hosted on Render (Frontend + Backend)  

---

## 🛠 Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- Framer Motion 
- Lucid-React icons 

### Backend
- Node.js  
- Express.js  
- MongoDB  

### Payments
- Razorpay (Checkout + verify)  

### Deployment
- Render  

---

## 📁 Project Structure

```bash
Webify.ai/
│
├── client/            # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── utils/
│   └── public/
│
├── server/            # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── services/
│
├── .env
└── README.md
```

---

## ⚙️ Setup Guide

### 1. Clone the repository
```bash
git clone https://github.com/Hrithik-05-Roshan/webify-ai.git
cd webify-ai
```

### 2. Install dependencies

#### Client
```bash
cd client
npm install
```

#### Server
```bash
cd server
npm install
```

---

### 3. Environment Variables

Create a `.env` file in the server folder:

```env
PORT=5000
FRONTEND_URL=your_deployed_frontend_url # Fallback provided in codebase
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret_key
```

Create a `.env` file in the client folder:

```env
VITE_SERVER_URL=your_deployed_server_url
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

---

### 4. Run the project

#### Start backend
```bash
cd server
npm run dev
```

#### Start frontend
```bash
cd client
npm run dev
```

---

## 🧠 How It Works

1. User signs up / logs in  
2. Buys credits  
3. Enters website idea  
4. AI generates website  
5. Deploy instantly  

---

## 📦 Deployment (Render)

- **Frontend (Static Site)** → Deploy `client` folder to Render.
  - **SPA Routing Fix**: Render does not natively support SPA fallbacks via `_redirects`. To fix 404s on refresh or direct URL access (like `/dashboard`), you must add a rewrite rule in the Render Dashboard:
    - Go to **Redirects/Rewrites** settings for your static site on Render.
    - Add a new rule:
      - **Source**: `/*`
      - **Destination**: `/index.html`
      - **Action**: `Rewrite`
- **Backend (Web Service)** → Deploy `server` folder to Render.
- **Database** → MongoDB Atlas.

---

## 🚀 Future Improvements

- Custom domain support  
- Template marketplace  
- Team collaboration  
- Advanced AI customization  
- Analytics dashboard  

---

## 🧑‍💻 Author

**Hrithik Burnwal**

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
