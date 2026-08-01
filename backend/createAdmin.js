import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const createAdmin = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully!\n');

    // Create a simple User model
    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
      isActive: Boolean,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }));

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@portfolio.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('📧 Email: admin@portfolio.com');
      console.log('🔑 Password: Admin@123\n');
      process.exit(0);
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    // Create admin user
    console.log('👤 Creating admin user...');
    await User.create({
      name: 'Admin',
      email: 'admin@portfolio.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });

    console.log('\n✅ Admin user created successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:    admin@portfolio.com');
    console.log('🔑 Password: Admin@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('⚠️  IMPORTANT: Change password after first login!\n');
    console.log('🌐 Login at: http://localhost:5173/admin/login\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating admin user:');
    console.error(error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 TIP: Make sure MongoDB is running!');
      console.log('   - If using MongoDB Atlas, check your connection string in .env');
      console.log('   - If using local MongoDB, start the MongoDB service\n');
    }
    
    process.exit(1);
  }
};

console.log('\n🚀 Portfolio Admin User Creator\n');
createAdmin();
