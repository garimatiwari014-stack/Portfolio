import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide achievement title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide achievement description']
  },
  category: {
    type: String,
    enum: ['Hackathon', 'Competition', 'Award', 'Recognition', 'Other'],
    default: 'Other'
  },
  date: {
    type: Date,
    required: [true, 'Please provide achievement date']
  },
  organization: {
    type: String,
    trim: true
  },
  position: {
    type: String,
    trim: true
  },
  image: {
    url: String,
    publicId: String
  },
  certificateLink: {
    type: String,
    trim: true
  },
  tags: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement;
