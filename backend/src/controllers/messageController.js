import Message from '../models/Message.js';
import { sendContactNotification, sendAutoReply } from '../utils/email.js';
import { logger } from '../utils/logger.js';

export const getMessages = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status && status !== 'all' ? { status } : {};
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Message.countDocuments(query);
    
    res.json({
      success: true,
      data: messages,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    
    // Mark as read
    if (!message.read) {
      message.read = true;
      message.readAt = new Date();
      message.status = 'Read';
      await message.save();
    }
    
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createMessage = async (req, res) => {
  try {
    const messageData = req.body;
    const message = await Message.create(messageData);
    
    // Send email notifications
    await sendContactNotification(messageData);
    await sendAutoReply(messageData.email, messageData.name);
    
    logger.info(`New message from: ${messageData.email}`);
    res.status(201).json({ success: true, message: 'Message sent successfully', data: message });
  } catch (error) {
    logger.error(`Create message error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    
    await message.deleteOne();
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const total = await Message.countDocuments();
    const newMessages = await Message.countDocuments({ status: 'New' });
    const readMessages = await Message.countDocuments({ status: 'Read' });
    const repliedMessages = await Message.countDocuments({ status: 'Replied' });
    
    res.json({
      success: true,
      data: {
        total,
        new: newMessages,
        read: readMessages,
        replied: repliedMessages
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
