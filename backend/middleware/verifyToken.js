require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
     if(!token){
            return res.status(401).json({
               success:false,
               message: "Unauthorized, Invalid token" 
            })
        }
    try {
        
       const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({
               success:false,
               message: "Unauthorized, Invalid token" 
            })
        }

       req.userId = decoded.userId
       next();
    } catch (error) {
        console.log("Error", error)

    }
}
module.exports = verifyToken;