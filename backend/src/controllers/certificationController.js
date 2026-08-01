import Certification from '../models/Certification.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/uploadService.js';
import { logger } from '../utils/logger.js';

export const getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ issueDate: -1 });
    res.json({ success: true, data: certifications });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getCertification = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) return res.status(404).json({ message: 'Certification not found' });
    res.json({ success: true, data: certification });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createCertification = async (req, res) => {
  try {
    let certificationData = req.body;
    if (req.files) {
      if (req.files.logo) {
        const logoResult = await uploadToCloudinary(req.files.logo[0].buffer, 'portfolio/certifications/logos');
        certificationData.logo = logoResult;
      }
      if (req.files.certificate) {
        const certResult = await uploadToCloudinary(req.files.certificate[0].buffer, 'portfolio/certifications/files');
        certificationData.certificate = certResult;
      }
    }
    const certification = await Certification.create(certificationData);
    logger.info(`Certification created: ${certification.title}`);
    res.status(201).json({ success: true, data: certification });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateCertification = async (req, res) => {
  try {
    let certification = await Certification.findById(req.params.id);
    if (!certification) return res.status(404).json({ message: 'Certification not found' });
    
    let updateData = req.body;
    if (req.files) {
      if (req.files.logo) {
        if (certification.logo && certification.logo.publicId) {
          await deleteFromCloudinary(certification.logo.publicId);
        }
        const logoResult = await uploadToCloudinary(req.files.logo[0].buffer, 'portfolio/certifications/logos');
        updateData.logo = logoResult;
      }
      if (req.files.certificate) {
        if (certification.certificate && certification.certificate.publicId) {
          await deleteFromCloudinary(certification.certificate.publicId);
        }
        const certResult = await uploadToCloudinary(req.files.certificate[0].buffer, 'portfolio/certifications/files');
        updateData.certificate = certResult;
      }
    }
    
    certification = await Certification.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    res.json({ success: true, data: certification });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) return res.status(404).json({ message: 'Certification not found' });
    
    if (certification.logo && certification.logo.publicId) {
      await deleteFromCloudinary(certification.logo.publicId);
    }
    if (certification.certificate && certification.certificate.publicId) {
      await deleteFromCloudinary(certification.certificate.publicId);
    }
    await certification.deleteOne();
    res.json({ success: true, message: 'Certification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
