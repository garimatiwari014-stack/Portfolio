import Skill from '../models/Skill.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/uploadService.js';
import { logger } from '../utils/logger.js';

export const getSkills = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category && category !== 'all' ? { category } : {};
    
    const skills = await Skill.find(query).sort({ order: 1, category: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    logger.error(`Get skills error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    logger.error(`Get skill error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    let skillData = req.body;
    
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'portfolio/skills');
      skillData.logo = uploadResult;
    }
    
    const skill = await Skill.create(skillData);
    logger.info(`Skill created: ${skill.name}`);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    logger.error(`Create skill error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    let skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    let updateData = req.body;
    
    if (req.file) {
      if (skill.logo && skill.logo.publicId) {
        await deleteFromCloudinary(skill.logo.publicId);
      }
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'portfolio/skills');
      updateData.logo = uploadResult;
    }
    
    skill = await Skill.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    logger.info(`Skill updated: ${skill.name}`);
    res.json({ success: true, data: skill });
  } catch (error) {
    logger.error(`Update skill error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    if (skill.logo && skill.logo.publicId) {
      await deleteFromCloudinary(skill.logo.publicId);
    }
    
    await skill.deleteOne();
    logger.info(`Skill deleted: ${skill.name}`);
    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    logger.error(`Delete skill error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Skill.distinct('category');
    res.json({ success: true, data: categories });
  } catch (error) {
    logger.error(`Get categories error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
