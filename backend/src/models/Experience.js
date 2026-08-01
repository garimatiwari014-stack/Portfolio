import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Please provide role/position'],
    trim: true
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Freelance', 'Contract'],
    default: 'Full-time'
  },
  location: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide start date']
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  },
  responsibilities: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
  logo: {
    url: String,
    publicId: String
  },
  companyWebsite: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
