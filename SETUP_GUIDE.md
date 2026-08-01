# 🚀 Complete Setup Guide - Step by Step

## Hindi Instructions (आसान हिंदी में)

### Step 1: Dependencies Install karein

```bash
# Backend folder mein jaayein
cd backend
npm install

# Frontend folder mein jaayein  
cd ../frontend
npm install
```

### Step 2: MongoDB Atlas Setup

1. **MongoDB Atlas Account banayein:**
   - https://www.mongodb.com/cloud/atlas par jaayein
   - Sign Up karein (Free)
   - Email verify karein

2. **Cluster Create karein:**
   - "Create a New Cluster" click karein
   - Free Tier (M0) select karein
   - Region select karein (closest to you)
   - Cluster Name: portfolio-cluster
   - "Create Cluster" click karein (2-3 minutes lagega)

3. **Database User banayein:**
   - Left sidebar mein "Database Access" click karein
   - "Add New Database User" click karein
   - Username: portfolioadmin
   - Password: strong password (save kar lein)
   - Role: "Read and write to any database"
   - "Add User" click karein

4. **Network Access Setup:**
   - Left sidebar mein "Network Access" click karein
   - "Add IP Address" click karein
   - "Allow Access from Anywhere" select karein (0.0.0.0/0)
   - "Confirm" click karein

5. **Connection String lein:**
   - "Database" section mein jaayein
   - "Connect" button click karein
   - "Connect your application" select karein
   - Connection string copy karein
   - Looks like: `mongodb+srv://portfolioadmin:<password>@cluster...`
   - `<password>` ko apne actual password se replace karein

### Step 3: Cloudinary Setup (Image Upload ke liye)

1. **Cloudinary Account:**
   - https://cloudinary.com par jaayein
   - Sign Up karein (Free)
   - Email verify karein

2. **Credentials lein:**
   - Dashboard par jaayein
   - Cloud Name, API Key, API Secret dikhega
   - Yeh teen values note kar lein

### Step 4: Gmail App Password (Email ke liye)

1. **Gmail Settings:**
   - Google Account settings mein jaayein
   - Security → 2-Step Verification enable karein
   - Security → App Passwords par click karein
   
2. **App Password Generate karein:**
   - Select app: Mail
   - Select device: Other (Custom name)
   - Name: Portfolio App
   - "Generate" click karein
   - 16-digit password mil jayega (save kar lein)

### Step 5: Environment Variables Setup

#### Backend .env file:

```bash
cd backend
# .env file banayein aur niche ki values add karein
```

```env
NODE_ENV=development
PORT=5000

# MongoDB URI (Step 2 se)
MONGODB_URI=mongodb+srv://portfolioadmin:YOUR_PASSWORD@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT Secrets (random strong strings)
JWT_SECRET=mySecretKey12345!@#$%
JWT_REFRESH_SECRET=myRefreshSecretKey67890!@#$%
JWT_EXPIRE=1h
JWT_REFRESH_EXPIRE=7d

# Cloudinary (Step 3 se)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Gmail (Step 4 se)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_digit_app_password
EMAIL_FROM=noreply@portfolio.com

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

#### Frontend .env file:

```bash
cd frontend
# .env file banayein
```

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=My Portfolio
```

### Step 6: Admin User Create karein

Backend folder mein ek file banayein: `createAdmin.js`

```javascript
// backend/createAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
      isActive: Boolean
    }));

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@portfolio.com' });
    if (existingAdmin) {
      console.log('Admin already exists!');
      process.exit(0);
    }

    // Create admin
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    await User.create({
      name: 'Admin',
      email: 'admin@portfolio.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });

    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@portfolio.com');
    console.log('Password: Admin@123');
    console.log('⚠️ Please change password after first login');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();
```

Is file ko run karein:
```bash
cd backend
node createAdmin.js
```

### Step 7: Application Run karein

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Backend run hoga: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Frontend run hoga: http://localhost:5173

### Step 8: Admin Login karein

1. Browser mein jaayein: http://localhost:5173/admin/login
2. Login credentials:
   - Email: `admin@portfolio.com`
   - Password: `Admin@123`
3. Login ke baad dashboard dikhega

### Step 9: Content Add karein

Admin Dashboard se:
1. **Profile Setup:**
   - Settings → Profile Info
   - Name, bio, tagline add karein
   - Profile image upload karein

2. **Projects Add karein:**
   - Projects → Add New
   - Title, description, technologies add karein
   - Project image upload karein
   - GitHub link, live demo add karein

3. **Skills Add karein:**
   - Skills → Add New
   - Skill name, category select karein
   - Proficiency percentage set karein

4. **Resume Upload karein:**
   - Resume section → Upload
   - PDF file select karein

### Troubleshooting

**Problem: MongoDB connection fail**
- Check internet connection
- Verify MongoDB URI correct hai
- Check IP address whitelist mein hai (0.0.0.0/0)

**Problem: Images upload nahi ho rahe**
- Cloudinary credentials check karein
- Internet connection check karein

**Problem: Emails send nahi ho rahe**
- Gmail App Password correct hai confirm karein
- 2-Factor Authentication enabled hai
- Less secure app access OFF hona chahiye

**Problem: Admin login nahi ho raha**
- createAdmin.js properly run hua ya nahi check karein
- MongoDB mein user exist karta hai ya nahi check karein

### Important Commands

```bash
# Backend start (development)
cd backend
npm run dev

# Frontend start (development)
cd frontend
npm run dev

# Frontend build (production)
cd frontend
npm run build

# Install new package (backend)
cd backend
npm install package-name

# Install new package (frontend)
cd frontend
npm install package-name
```

### Next Steps

1. ✅ Complete profile setup
2. ✅ Add 3-4 projects
3. ✅ Add skills with logos
4. ✅ Add experience/education
5. ✅ Upload resume
6. ✅ Test contact form
7. ✅ Customize colors/theme
8. ✅ Deploy to Vercel/Render

### Production Deployment

**Frontend (Vercel):**
1. Push code to GitHub
2. Vercel.com par jaayein
3. "Import Project" → GitHub repository select karein
4. Root Directory: `frontend`
5. Environment Variables add karein
6. Deploy

**Backend (Render):**
1. Render.com par jaayein
2. "New Web Service"
3. GitHub repository connect karein
4. Build Command: `cd backend && npm install`
5. Start Command: `cd backend && npm start`
6. Environment Variables add karein
7. Deploy

---

**Koi problem ho toh project ke GitHub issues mein post karein! 🚀**
