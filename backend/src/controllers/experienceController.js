import Experience from '../models/Experience.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/uploadService.js';
import { logger } from '../utils/logger.js';

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.json({ success: true, data: experiences });
  } catch (error) {
    logger.error(`Get experiences error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    let experienceData = req.body;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'portfolio/experiences');
      experienceData.logo = uploadResult;
    }
    const experience = await Experience.create(experienceData);
    logger.info(`Experience created: ${experience.company}`);
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    let experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    
    let updateData = req.body;
    if (req.file) {
      if (experience.logo && experience.logo.publicId) {
        await deleteFromCloudinary(experience.logo.publicId);
      }
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'portfolio/experiences');
      updateData.logo = uploadResult;
    }
    
    experience = await Experience.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    
    if (experience.logo && experience.logo.publicId) {
      await deleteFromCloudinary(experience.logo.publicId);
    }
    await experience.deleteOne();
    res.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
