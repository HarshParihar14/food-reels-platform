const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.log("❌ DB Error:", err);
    process.exit(1);
  }
}

module.exports = connectDB;