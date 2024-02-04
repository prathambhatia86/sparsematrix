const jwt = require('jsonwebtoken');
const secretKey = 'buildforbharat';

const verifyToken = (req, res, next) => {
console.log(req.headers);
  const token = req.headers.authorization;
  if (!token) {
    return res.redirect('/');
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; 
    console.log(decoded);
    next(); 
  } catch (error) {
    return res.redirect('/');
  }
};

module.exports = verifyToken;
