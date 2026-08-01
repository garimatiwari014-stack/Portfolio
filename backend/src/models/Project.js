import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description']
  },
  longDescription: {
    type: String
  },
  image: {
    url: String,
    publicId: String
  },
  technologies: [{
    type: String,
    trim: true
  }],
  features: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['Web Development', 'Mobile Development', 'AI/ML', 'Full Stack', 'Backend', 'Frontend', 'Other'],
    default: 'Web Development'
  },
  githubLink: {
    type: String,
    trim: true
  },
  liveDemo: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Completed', 'In Progress', 'Planned'],
    default: 'Completed'
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for search
projectSchema.index({ title: 'text', description: 'text' });

const Project = mongoose.model('Project', projectSchema);

export default Project;
