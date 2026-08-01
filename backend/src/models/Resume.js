import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'My Resume'
  },
  file: {
    url: {
      type: String,
      required: [true, 'Please provide resume URL']
    },
    publicId: String
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number
  },
  version: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  downloads: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
