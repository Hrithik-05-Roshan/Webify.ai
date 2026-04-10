# 🚀 Webify.ai  
### AI-Powered Website Builder SaaS (MERN Stack)

> Build and deploy full websites in seconds using AI — no coding required.

---

## 🌐 Project Description

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
  Razorpay Checkout + Webhooks integration  

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
- Razorpay (Checkout + Webhooks)  

### Deployment
- Render  

---

## 📁 Project Structure

```bash
Webify.ai/
│
├── client/            # React frontend
│   ├── components/
│   ├── pages/
│   ├── animations/
│   └── utils/
│
├── server/            # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── services/
│
├── config/
├── .env
└── README.md
```

---

## ⚙️ Installation & Setup

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
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

VITE_FIREBASE_API_KEY=your_firebase_api_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret

CLIENT_URL=http://localhost:3000
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
npm start
```

---

## 🧠 How It Works

1. User signs up / logs in  
2. Buys credits  
3. Enters website idea  
4. AI generates website  
5. Deploy instantly  

---

## 📦 Deployment

- Frontend → Render  
- Backend → Render  
- Database → MongoDB Atlas  

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
