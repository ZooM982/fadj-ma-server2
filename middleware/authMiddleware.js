const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'];  

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);  
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};
module.exports = authenticateUser;
