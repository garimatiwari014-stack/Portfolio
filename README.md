# 🚀 Premium Portfolio Website

Ek modern, production-ready portfolio website with complete admin dashboard for content management. Built with MERN Stack (MongoDB, Express.js, React.js, Node.js).

## ✨ Features

### Frontend
- ⚡ React.js with Vite for blazing fast performance
- 🎨 Tailwind CSS for beautiful, responsive UI
- 🌓 Dark/Light theme toggle
- ✨ Framer Motion animations
- 📱 Fully responsive design
- 🔍 SEO optimized
- ⚛️ Modern UI components

### Backend
- 🔐 JWT Authentication with refresh tokens
- 🛡️ Secure admin routes
- 📧 Email notifications (Nodemailer)
- ☁️ Image uploads (Cloudinary)
- 🔒 Rate limiting & security headers (Helmet)
- 📝 Request validation
- 🪵 Logging system (Winston)

### Admin Dashboard
Dynamically manage:
- 📊 Projects
- 🛠️ Skills
- 💼 Experience
- 🏆 Achievements
- 📜 Certifications
- 📧 Messages
- 📄 Resume
- 🔗 Social Links
- 👤 Profile Info

## 📁 Project Structure

```
PORTFOLIO/
├── backend/               # Node.js + Express backend
│   ├── src/
│   │   ├── config/       # Database & Cloudinary config
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, validation, etc.
│   │   ├── utils/        # Helper functions
│   │   └── services/     # Business logic
│   ├── .env.example      # Environment variables template
│   ├── package.json
│   └── server.js
│
├── frontend/             # React.js frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Context providers
│   │   ├── hooks/       # Custom hooks
│   │   ├── utils/       # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example     # Environment variables template
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary account (for image uploads)
- Gmail account (for email notifications)

### Step 1: Clone & Install

```bash
# Clone the repository
cd PORTFOLIO

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Environment Variables

#### Backend (.env)
```bash
cd backend
copy .env.example .env
```

Edit `backend/.env`:
```env
NODE_ENV=development
PORT=5000

# MongoDB Connection (Get from MongoDB Atlas)
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/portfolio

# JWT Secrets (Generate strong random strings)
JWT_SECRET=your_very_strong_secret_key_here
JWT_REFRESH_SECRET=your_very_strong_refresh_secret_key_here
JWT_EXPIRE=1h
JWT_REFRESH_EXPIRE=7d

# Cloudinary (Get from cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Gmail App Password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=noreply@yourportfolio.com

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)
```bash
cd frontend
copy .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=My Portfolio
```

### Step 3: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster
4. Create database user
5. Get connection string
6. Add to `MONGODB_URI` in backend `.env`

### Step 4: Setup Cloudinary

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Get Cloud Name, API Key, API Secret from dashboard
4. Add to backend `.env`

### Step 5: Setup Gmail for Emails

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App Passwords
3. Use App Password in `EMAIL_PASSWORD`

### Step 6: Create Admin User

Since this is first time setup, you need to manually create an admin user in MongoDB:

```javascript
// Connect to MongoDB and run:
db.users.insertOne({
  name: "Admin",
  email: "admin@example.com",
  password: "$2a$10$...", // Use bcrypt to hash password
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

OR create a temporary script in backend:

```javascript
// backend/scripts/createAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const hashedPassword = await bcrypt.hash('your_password', 10);
  
  await User.create({
    name: 'Admin',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin',
    isActive: true
  });
  
  console.log('Admin created successfully');
  process.exit();
};

createAdmin();
```

Run: `node scripts/createAdmin.js`

## 🚀 Running the Application

### Development Mode

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Backend: http://localhost:5000
Frontend: http://localhost:5173

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Build files will be in frontend/dist
```

## 📝 API Endpoints

### Public Endpoints
```
GET  /api/projects          - Get all projects
GET  /api/skills            - Get all skills
GET  /api/experiences       - Get all experiences
GET  /api/achievements      - Get all achievements
GET  /api/certifications    - Get all certifications
GET  /api/profile           - Get profile
GET  /api/profile/social-links - Get social links
GET  /api/resume/active     - Get active resume
POST /api/messages          - Send contact message
```

### Protected Admin Endpoints
```
POST   /api/auth/login      - Admin login
GET    /api/auth/me         - Get current user
POST   /api/auth/logout     - Logout
POST   /api/projects        - Create project
PUT    /api/projects/:id    - Update project
DELETE /api/projects/:id    - Delete project
... (similar for other resources)
```

## 🎨 Customization

### Update Profile Info
1. Login to admin dashboard: `/admin/login`
2. Go to Settings
3. Update profile information
4. Upload profile image

### Add Projects/Skills/Experience
1. Navigate to respective section in admin dashboard
2. Click "Add New"
3. Fill form and upload images
4. Save

### Change Colors/Theme
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

## 📦 Deployment

### Backend - Render.com

1. Push code to GitHub
2. Go to [Render](https://render.com)
3. Create New → Web Service
4. Connect GitHub repository
5. Set Build Command: `cd backend && npm install`
6. Set Start Command: `cd backend && npm start`
7. Add environment variables from `.env`
8. Deploy

### Frontend - Vercel

1. Go to [Vercel](https://vercel.com)
2. Import Git Repository
3. Framework: Vite
4. Root Directory: `frontend`
5. Add environment variable: `VITE_API_URL=https://your-backend-url.com/api`
6. Deploy

## 🔐 Security Best Practices

- ✅ Never commit `.env` files
- ✅ Use strong JWT secrets
- ✅ Enable CORS only for your frontend domain in production
- ✅ Keep dependencies updated
- ✅ Use HTTPS in production
- ✅ Rate limit sensitive endpoints
- ✅ Sanitize user inputs

## 📧 Support

Issues? Questions?
- Create an issue on GitHub
- Email: your_email@example.com

## 📄 License

MIT License - feel free to use this for your portfolio!

## 🙏 Credits

Built with ❤️ using MERN Stack

---

**Happy Coding! 🚀**
