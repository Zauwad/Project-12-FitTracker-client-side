
# 🏋️‍♂️ **FitTrack Pro**  

![MERN](https://img.shields.io/badge/MERN-Fullstack-blue?style=flat&logo=mongodb&logoColor=white)  
![Stripe](https://img.shields.io/badge/Payments-Stripe-purple?style=flat&logo=stripe&logoColor=white)  
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=flat&logo=mongodb&logoColor=white)  
![React](https://img.shields.io/badge/React-18.0-blue?style=flat&logo=react&logoColor=white)  
![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-success?style=flat&logo=netlify&logoColor=white)  
![Render](https://img.shields.io/badge/Backend-Render-orange?style=flat&logo=render&logoColor=white)  
![License](https://img.shields.io/badge/License-MIT-green)  
![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen)  

A full-stack **Fitness Tracker Platform** built with the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
Empowers users to track fitness progress, book trainers, join classes, and engage with a community.  
Features **role-based dashboards**, **secure payments**, and a modern UI.  

---

## 🌟 **About the Company**
We revolutionize the fitness industry by delivering technology-driven solutions that inspire healthier lifestyles.  
Our platform creates a **community-driven ecosystem** where users can track goals, book sessions, and stay motivated.

---

## 🚀 **Live Demo**
🔗 **Client:** https://fitness-tracker-d03b6.web.app
🔗 **Server:** https://fitness-tracker-server-red.vercel.app

---

## 🔐 **Admin Credentials**
Email: admin@gmail.com
Password: admin1234



---

## ✨ **Key Features**
- ✅ **Role-based Access Control** – Admin, Trainer, and Member dashboards.  
- ✅ **Stripe Payment Integration** – Secure trainer/class bookings with live payments.  
- ✅ **JWT Authentication** – Secure API access and route protection.  
- ✅ **Community Forum** – Members, trainers, and admins can create & interact with posts.  
- ✅ **Trainer Management** – Trainers manage slots; members book sessions.  
- ✅ **Dynamic Reviews & Testimonials** – Users can leave reviews dynamically shown on the homepage.  
- ✅ **Tanstack Query** – Optimized data fetching for all GET requests.  
- ✅ **Newsletter Subscription** – Public users can subscribe without logging in.  
- ✅ **Admin Analytics Dashboard** – Balance overview, transactions, and chart visualizations.  
- ✅ **Fully Responsive UI** – Seamless experience across devices.  

---

## 🛠️ **Tech Stack**
| Technology       | Usage |
|------------------|--------|
| **React.js**     | Frontend UI |
| **Tailwind CSS** | Styling |
| **Express.js**   | Backend API |
| **MongoDB Atlas**| Database |
| **Node.js**      | Server Runtime |
| **JWT**          | Authentication |
| **Stripe**       | Payment Gateway |
| **Tanstack Query** | Data Fetching |

---

## 📦 **Installation & Setup**

### 🔹 Clone the Repository
```bash
git clone https://github.com/your-username/fittrack-pro.git
cd fittrack-pro


🔹 Client Setup
cd client
npm install
npm run dev


🔹 Server Setup
cd server
npm install
npm start

🔑 Environment Variables
Server .env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key



FitTrack-Pro/
│── client/                  # React Frontend
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom hooks (useAxios, useAuth)
│   │   ├── context/         # Auth & State context
│   │   └── App.js           # Main App entry
│   └── package.json
│
│── server/                  # Express Backend
│   ├── routes/              # API routes
│   ├── models/              # MongoDB schemas
│   ├── controllers/         # Route logic
│   ├── index.js             # Server entry point
│   └── package.json
│
└── README.md



📌 Roles
👤 Member – Book trainers, join classes, leave reviews.

🏋️‍♂️ Trainer – Manage slots, track bookings, add forums.

👨‍💼 Admin – Manage trainers, classes, payments, subscribers, and analytics.



👨‍💻 Developer
Ridwanul Zawad
📧 Contact: [ridwanul.azim@g.bracu.ac.bd]
🌐 Portfolio: []



