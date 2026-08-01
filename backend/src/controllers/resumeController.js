import Resume from '../models/Resume.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/uploadService.js';
import { logger } from '../utils/logger.js';

export const getActiveResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ isActive: true });
    if (!resume) return res.status(404).json({ message: 'No active resume found' });
    res.json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json({ success: true, data: resumes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a resume file' });
    }
    
    const uploadResult = await uploadToCloudinary(req.file.buffer, 'portfolio/resumes');
    
    // Deactivate all other resumes
    await Resume.updateMany({}, { isActive: false });
    
    const resume = await Resume.create({
      title: req.body.title || 'My Resume',
      file: uploadResult,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      isActive: true
    });
    
    logger.info(`Resume uploaded: ${resume.fileName}`);
    res.status(201).json({ success: true, data: resume });
  } catch (error) {
    logger.error(`Upload resume error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    
    if (resume.file && resume.file.publicId) {
      await deleteFromCloudinary(resume.file.publicId);
    }
    
    await resume.deleteOne();
    logger.info(`Resume deleted: ${resume.fileName}`);
    res.json({ success: true, message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const setActiveResume = async (req, res) => {
  try {
    await Resume.updateMany({}, { isActive: false });
    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );
    
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const incrementDownload = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    );
    
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
