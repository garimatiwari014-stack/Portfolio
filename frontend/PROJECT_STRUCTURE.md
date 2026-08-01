# Portfolio Website - Complete Structure

## Frontend Structure
```
frontend/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── manifest.json
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ScrollProgress.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── ParticleBackground.jsx
│   │   │   └── TypewriterText.jsx
│   │   ├── about/
│   │   │   ├── AboutIntro.jsx
│   │   │   ├── EducationTimeline.jsx
│   │   │   ├── ExperienceTimeline.jsx
│   │   │   └── StatsCards.jsx
│   │   ├── skills/
│   │   │   ├── SkillCard.jsx
│   │   │   └── SkillFilter.jsx
│   │   ├── projects/
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectFilter.jsx
│   │   │   └── ProjectDetail.jsx
│   │   ├── admin/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── DashboardStats.jsx
│   │   │   └── DataTable.jsx
│   │   └── contact/
│   │       ├── ContactForm.jsx
│   │       └── GoogleMap.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Achievements.jsx
│   │   ├── Certifications.jsx
│   │   ├── CodingProfiles.jsx
│   │   ├── Resume.jsx
│   │   ├── Contact.jsx
│   │   ├── NotFound.jsx
│   │   └── admin/
│   │       ├── Login.jsx
│   │       ├── Dashboard.jsx
│   │       ├── ManageProjects.jsx
│   │       ├── ManageSkills.jsx
│   │       ├── ManageExperience.jsx
│   │       ├── ManageAchievements.jsx
│   │       ├── ManageCertifications.jsx
│   │       ├── ManageMessages.jsx
│   │       └── Settings.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useTheme.js
│   │   └── useScrollProgress.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── utils/
│   │   ├── api.js
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── styles/
│   │   └── animations.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Backend Structure
```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── skillController.js
│   │   ├── experienceController.js
│   │   ├── achievementController.js
│   │   ├── certificationController.js
│   │   ├── messageController.js
│   │   ├── resumeController.js
│   │   └── profileController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   ├── Experience.js
│   │   ├── Achievement.js
│   │   ├── Certification.js
│   │   ├── Message.js
│   │   ├── Resume.js
│   │   ├── SocialLink.js
│   │   └── Profile.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── skillRoutes.js
│   │   ├── experienceRoutes.js
│   │   ├── achievementRoutes.js
│   │   ├── certificationRoutes.js
│   │   ├── messageRoutes.js
│   │   ├── resumeRoutes.js
│   │   └── profileRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validate.js
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   └── upload.js
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── email.js
│   │   └── logger.js
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── services/
│   │   ├── emailService.js
│   │   └── uploadService.js
│   └── app.js
├── uploads/
├── .env
├── package.json
└── server.js
```
