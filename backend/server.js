require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/connectdb');
const authRoutes = require('./routes/auth.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // allow JSON parsing from incoming requests : req.body
app.use(cookieParser()); // allow us to parse incoming cookies

app.use('/api/auth', authRoutes);
app.listen(3000, () => {
  connectDB();
  console.log('Server is running on port ' + PORT);

});


