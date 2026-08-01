# Portfolio Backend API

Express.js backend with MongoDB, JWT authentication, and Cloudinary integration.

## Features

- 🔐 JWT Authentication with refresh tokens
- 📧 Email notifications (Nodemailer)
- ☁️ Image/file uploads (Cloudinary)
- 🛡️ Security (Helmet, CORS, Rate Limiting)
- 📝 Request validation
- 🪵 Logging (Winston)
- ⚡ RESTful API design

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_app_password
```

## Running

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Projects (Public: GET, Admin: POST/PUT/DELETE)
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)

### Skills (Public: GET, Admin: POST/PUT/DELETE)
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill (Admin)

### Experience (Public: GET, Admin: POST/PUT/DELETE)
- `GET /api/experiences` - Get all experiences
- `POST /api/experiences` - Create experience (Admin)

### Achievements (Public: GET, Admin: POST/PUT/DELETE)
- `GET /api/achievements` - Get all achievements
- `POST /api/achievements` - Create achievement (Admin)

### Certifications (Public: GET, Admin: POST/PUT/DELETE)
- `GET /api/certifications` - Get all certifications
- `POST /api/certifications` - Create certification (Admin)

### Messages
- `POST /api/messages` - Send message (Public)
- `GET /api/messages` - Get all messages (Admin)
- `GET /api/messages/:id` - Get single message (Admin)
- `DELETE /api/messages/:id` - Delete message (Admin)

### Resume
- `GET /api/resume/active` - Get active resume (Public)
- `POST /api/resume/upload` - Upload resume (Admin)
- `DELETE /api/resume/:id` - Delete resume (Admin)

### Profile
- `GET /api/profile` - Get profile (Public)
- `POST /api/profile` - Create/Update profile (Admin)
- `GET /api/profile/social-links` - Get social links (Public)

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   └── services/        # Business logic
├── logs/                # Log files
├── .env                 # Environment variables
├── server.js            # Entry point
└── package.json
```

## Creating Admin User

Run this script to create an admin user:

```javascript
// createAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  await User.create({
    name: 'Admin',
    email: 'admin@portfolio.com',
    password: hashedPassword,
    role: 'admin',
    isActive: true
  });
  console.log('Admin created!');
  process.exit();
};

createAdmin();
```

Run: `node createAdmin.js`

## Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Refresh tokens for session management
- Rate limiting on sensitive endpoints
- Helmet for security headers
- CORS configured
- Input validation

## License

MIT
