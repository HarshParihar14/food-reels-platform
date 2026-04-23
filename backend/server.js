// start server 
require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

const startServer = async () => {
  try {
    await connectDB();   
    console.log("✅ MongoDB connected");

    app.listen(3000, () => {
      console.log("🚀 Server running on port 3000");
    });

  } catch (err) {
    console.log("❌ Failed to start server:", err);
  }
};

startServer();
// cd
// app.listen(3000,()=>{ 
//     console.log("server is running on port 3000");
//});