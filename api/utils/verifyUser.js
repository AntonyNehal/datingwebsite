
import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// export const verifyToken = (req, res, next) => {
//   console.log('Cookies:', req.cookies); // Log cookies
//   console.log('Authorization Header:', req.headers['authorization']); // Log authorization header

//   const token =
//     req.cookies.access_token || 
//     req.headers['authorization']?.split(' ')[1]; // Handle Bearer token

//   if (!token) {
//     console.log('No token found in cookies or authorization header');
//     return next(errorHandler(401, 'Unauthorized')); // No token found
//   }

//   jwt.verify(token,'secretkey', (err, user) => {
//     if (err) {
//       console.error('Invalid or expired token:', err.message); // Log the error
//       return next(errorHandler(401, 'Unauthorized')); // Token invalid
//     }

//     req.user = user; // Attach user to request object
//     next(); // Continue to next middleware
//   });
// };
export const verifyToken = (req, res, next) => {
  console.log('Cookies:', req.cookies); // Check if cookies contain the token
  console.log('Authorization Header:', req.headers['authorization']); // Check the Authorization header

  const token =
    req.cookies.access_token || 
    req.headers['authorization']?.split(' ')[1]; // Extract Bearer token

  if (!token) {
    console.log('No token found in cookies or authorization header');
    return next(errorHandler(401, 'Unauthorized')); // No token found
  }

  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) {
      console.error('Invalid or expired token:', err.message); // Log error details
      return next(errorHandler(401, 'Unauthorized')); // Token invalid
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware
  });
};

