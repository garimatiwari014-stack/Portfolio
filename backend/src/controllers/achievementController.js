import Achievement from '../models/Achievement.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/uploadService.js';
import { logger } from '../utils/logger.js';

export const getAchievements = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category && category !== 'all' ? { category } : {};
    const achievements = await Achievement.find(query).sort({ date: -1 });
    res.json({ success: true, data: achievements });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json({ message: 'Achievement not found' });
    res.json({ success: true, data: achievement });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createAchievement = async (req, res) => {
  try {
    let achievementData = req.body;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'portfolio/achievements');
      achievementData.image = uploadResult;
    }
    const achievement = await Achievement.create(achievementData);
    logger.info(`Achievement created: ${achievement.title}`);
    res.status(201).json({ success: true, data: achievement });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateAchievement = async (req, res) => {
  try {
    let achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json({ message: 'Achievement not found' });
    
    let updateData = req.body;
    if (req.file) {
      if (achievement.image && achievement.image.publicId) {
        await deleteFromCloudinary(achievement.image.publicId);
      }
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'portfolio/achievements');
      updateData.image = uploadResult;
    }
    
    achievement = await Achievement.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    res.json({ success: true, data: achievement });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json({ message: 'Achievement not found' });
    
    if (achievement.image && achievement.image.publicId) {
      await deleteFromCloudinary(achievement.image.publicId);
    }
    await achievement.deleteOne();
    res.json({ success: true, message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
