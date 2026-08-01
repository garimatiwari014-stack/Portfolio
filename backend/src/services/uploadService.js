import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

// Upload image to Cloudinary
export const uploadToCloudinary = async (fileBuffer, folder = 'portfolio') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        transformation: [
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id
          });
        }
      }
    );

    // Convert buffer to stream and pipe to cloudinary
    const readableStream = Readable.from(fileBuffer);
    readableStream.pipe(uploadStream);
  });
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Failed to delete file: ${error.message}`);
  }
};

// Upload multiple images
export const uploadMultipleToCloudinary = async (files, folder = 'portfolio') => {
  const uploadPromises = files.map(file => uploadToCloudinary(file.buffer, folder));
  return await Promise.all(uploadPromises);
};
