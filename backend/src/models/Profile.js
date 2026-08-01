import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide full name'],
    trim: true
  },
  tagline: {
    type: String,
    trim: true
  },
  bio: {
    type: String
  },
  roles: [{
    type: String
  }],
  profileImage: {
    url: String,
    publicId: String
  },
  email: {
    type: String,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String
  },
  location: {
    city: String,
    state: String,
    country: String
  },
  education: [{
    degree: String,
    institution: String,
    field: String,
    startDate: Date,
    endDate: Date,
    current: Boolean,
    grade: String,
    description: String
  }],
  stats: {
    leetcodeProblems: {
      type: Number,
      default: 0
    },
    projects: {
      type: Number,
      default: 0
    },
    internships: {
      type: Number,
      default: 0
    },
    hackathons: {
      type: Number,
      default: 0
    },
    yearsOfExperience: {
      type: Number,
      default: 0
    }
  },
  socialLinks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SocialLink'
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
