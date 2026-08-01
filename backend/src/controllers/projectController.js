import Project from '../models/Project.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/uploadService.js';
import { logger } from '../utils/logger.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const { category, search, featured, page = 1, limit = 10 } = req.query;

    const query = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Filter by featured
    if (featured === 'true') {
      query.featured = true;
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      data: projects,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    logger.error(`Get projects error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    logger.error(`Get project error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req, res) => {
  try {
    let projectData = req.body;

    // Handle image upload
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'portfolio/projects');
      projectData.image = uploadResult;
    }

    const project = await Project.create(projectData);

    logger.info(`Project created: ${project.title}`);

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    logger.error(`Create project error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    let updateData = req.body;

    // Handle new image upload
    if (req.file) {
      // Delete old image if exists
      if (project.image && project.image.publicId) {
        await deleteFromCloudinary(project.image.publicId);
      }
      
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'portfolio/projects');
      updateData.image = uploadResult;
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    logger.info(`Project updated: ${project.title}`);

    res.json({ success: true, data: project });
  } catch (error) {
    logger.error(`Update project error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete image from cloudinary
    if (project.image && project.image.publicId) {
      await deleteFromCloudinary(project.image.publicId);
    }

    await project.deleteOne();

    logger.info(`Project deleted: ${project.title}`);

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    logger.error(`Delete project error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get project categories
// @route   GET /api/projects/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Project.distinct('category');
    res.json({ success: true, data: categories });
  } catch (error) {
    logger.error(`Get categories error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
