const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pulasa_auth';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }
};

const testMongoDBConnection = async () => {
  try {
    const connection = mongoose.connection;
    if (connection.readyState === 1) {
      console.log('✅ MongoDB connection is healthy');
      return true;
    } else {
      console.log('❌ MongoDB connection is not ready');
      return false;
    }
  } catch (error) {
    console.error('❌ MongoDB connection test failed:', error);
    return false;
  }
};

module.exports = {
  connectMongoDB,
  testMongoDBConnection
};
