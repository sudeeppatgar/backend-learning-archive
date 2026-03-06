import expressAsyncHandler from "express-async-handler";
import jwt from "jsoonwebtoken";

export const validateToken = expressAsyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        const err = new Error("invalid token");
        err.statusCode = 401;
        next(err);
      }
      req.user = decoded;
      next();
    });
    if (!token) {
      const err = new Error("user is unauthorized");
      err.statusCode = 401;
      next(err);
    }
  }
});
