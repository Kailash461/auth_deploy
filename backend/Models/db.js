const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_CONN


if (!mongo_url) {
  console.error("MongoDB connection string is not defined in environment variables.");
  console.log('MONGO_CONN:', process.env.MONGO_CONN);

  process.exit(1);
}

mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch((e) => {
    console.error('Error connecting to MongoDB:', e.message);
  });
