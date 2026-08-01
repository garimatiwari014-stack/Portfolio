import Profile from '../models/Profile.js';
import SocialLink from '../models/SocialLink.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/uploadService.js';
import { logger } from '../utils/logger.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne().populate('socialLinks');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createOrUpdateProfile = async (req, res) => {
  try {
    let profileData = req.body;
    
    if (req.file) {
      const existingProfile = await Profile.findOne();
      if (existingProfile && existingProfile.profileImage && existingProfile.profileImage.publicId) {
        await deleteFromCloudinary(existingProfile.profileImage.publicId);
      }
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'portfolio/profile');
      profileData.profileImage = uploadResult;
    }
    
    let profile = await Profile.findOne();
    
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, profileData, { new: true, runValidators: true });
      logger.info('Profile updated');
    } else {
      profile = await Profile.create(profileData);
      logger.info('Profile created');
    }
    
    res.json({ success: true, data: profile });
  } catch (error) {
    logger.error(`Profile error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getSocialLinks = async (req, res) => {
  try {
    const socialLinks = await SocialLink.find({ isVisible: true }).sort({ order: 1 });
    res.json({ success: true, data: socialLinks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createSocialLink = async (req, res) => {
  try {
    const socialLink = await SocialLink.create(req.body);
    logger.info(`Social link created: ${socialLink.platform}`);
    res.status(201).json({ success: true, data: socialLink });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateSocialLink = async (req, res) => {
  try {
    const socialLink = await SocialLink.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!socialLink) return res.status(404).json({ message: 'Social link not found' });
    res.json({ success: true, data: socialLink });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteSocialLink = async (req, res) => {
  try {
    const socialLink = await SocialLink.findById(req.params.id);
    if (!socialLink) return res.status(404).json({ message: 'Social link not found' });
    await socialLink.deleteOne();
    res.json({ success: true, message: 'Social link deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
