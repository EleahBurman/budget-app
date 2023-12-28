import asyncHandler from 'express-async-handler';
import jsonwebtoken from 'jsonwebtoken';

export const validateTokenHandler = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
      console.log(token, "is there a problem with token?")
      jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error('Not authorized, token failed');
        } else {
          req.user = decoded.user;
          next();
        }
      });

      if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  });