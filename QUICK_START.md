# ⚡ Quick Start Guide (5 Minutes)

## Step 1: Install Dependencies (2 min)

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## Step 2: Setup Environment Files (2 min)

### Backend: `backend/.env`
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=mySecretKey123
JWT_REFRESH_SECRET=myRefreshKey456
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173
```

### Frontend: `frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

## Step 3: Create Admin User (1 min)

Create `backend/createAdmin.js`:

```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    isActive: Boolean
  }));

  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  
  await User.create({
    name: 'Admin',
    email: 'admin@portfolio.com',
    password: hashedPassword,
    role: 'admin',
    isActive: true
  });

  console.log('✅ Admin created!');
  console.log('Email: admin@portfolio.com');
  console.log('Password: Admin@123');
  process.exit();
};

createAdmin();
```

Run:
```bash
cd backend
node createAdmin.js
```

## Step 4: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 5: Login & Setup

1. Open: http://localhost:5173/admin/login
2. Login with:
   - Email: `admin@portfolio.com`
   - Password: `Admin@123`
3. Start adding your content!

---

## What You Need:

### 1. MongoDB Atlas (Free)
- Go to: https://www.mongodb.com/cloud/atlas
- Sign up
- Create cluster
- Get connection string
- Add to `MONGODB_URI`

### 2. Cloudinary (Free)
- Go to: https://cloudinary.com
- Sign up
- Get Cloud Name, API Key, API Secret
- Add to `.env`

### 3. Gmail App Password (Free)
- Enable 2-Factor Auth on Gmail
- Generate App Password
- Add to `EMAIL_PASSWORD`

---

## Common Issues:

**MongoDB connection failed?**
- Check internet connection
- Verify connection string
- Add IP 0.0.0.0/0 in Network Access

**Can't login?**
- Make sure createAdmin.js ran successfully
- Check MongoDB for user

**Images not uploading?**
- Verify Cloudinary credentials
- Check internet connection

---

**Full detailed guide: See `SETUP_GUIDE.md`**
