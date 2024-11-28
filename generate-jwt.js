const jwt = require('jsonwebtoken');

// Secret key to sign the JWT
const secretKey = 'yourSecretKey';

// Payload data to include in the JWT
const payload = {
  userId:2,// Example user ID
   
};

// Options (e.g., expiration time)
const options = {
  expiresIn: '1h', // Token expires in 1 hour
};

// Generate the JWT
const token = jwt.sign(payload, secretKey, options);

console.log('Generated JWT Token:', token);
