require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const connectDB = require('./database/connectdb');
const authRoutes = require('./routes/auth.route');

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS setup
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

// Serve static files from React frontend app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  // Handle React routing, return all requests to React app
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });

}

app.listen(PORT, () => {
  connectDB();
  console.log('Server is running on port ' + PORT);
});
