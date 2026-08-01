import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: [true, 'Please provide platform name'],
    enum: ['GitHub', 'LinkedIn', 'LeetCode', 'Twitter', 'Instagram', 'Facebook', 'YouTube', 'Medium', 'Dev.to', 'Other']
  },
  url: {
    type: String,
    required: [true, 'Please provide URL'],
    trim: true
  },
  username: {
    type: String,
    trim: true
  },
  icon: {
    type: String
  },
  stats: {
    followers: Number,
    repositories: Number,
    problemsSolved: Number,
    rating: Number,
    rank: String
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const SocialLink = mongoose.model('SocialLink', socialLinkSchema);

export default SocialLink;
