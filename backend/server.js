require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/connectdb');
const authRoutes = require('./routes/auth.route');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;

// CORS setup
//origin server to react 
//credential TRUE so we can send cookies and request
app.use(cors({origin: "http://localhost:5173", credentials: true}))

// Middleware
app.use(express.json()); // allow JSON parsing from incoming requests : req.body
app.use(cookieParser()); // allow us to parse incoming cookies

app.use('/api/auth', authRoutes);
app.listen(3000, () => {
  connectDB();
  console.log('Server is running on port ' + PORT);

});


