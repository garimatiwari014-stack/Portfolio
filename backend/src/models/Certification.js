import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide certification title'],
    trim: true
  },
  issuer: {
    type: String,
    required: [true, 'Please provide issuer name'],
    trim: true
  },
  issueDate: {
    type: Date,
    required: [true, 'Please provide issue date']
  },
  expiryDate: {
    type: Date
  },
  credentialId: {
    type: String,
    trim: true
  },
  credentialUrl: {
    type: String,
    trim: true
  },
  description: {
    type: String
  },
  logo: {
    url: String,
    publicId: String
  },
  certificate: {
    url: String,
    publicId: String
  },
  skills: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Certification = mongoose.model('Certification', certificationSchema);

export default Certification;
