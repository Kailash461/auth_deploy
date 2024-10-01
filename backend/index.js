require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const router = require('./Routes/AuthRouter');
const router2 = require('./Routes/ProductRouter');

app.use(cors());
app.use(express.json()); // This replaces the need for bodyParser


require('./Models/db');

app.use('/auth', router); // Corrected path
app.use('/products',router2);

const PORT = process.env.PORT;

app.get('/ping', (req, res) => {
  res.json({
    msg:" chal rha hu   "
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});