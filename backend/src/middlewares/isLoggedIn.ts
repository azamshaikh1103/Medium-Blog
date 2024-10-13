import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  console.log("Token :", token);

  if (!token) return res.status(401).json({ error: "You need to login first" });

  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const decodedToken = verify(token, JWT_SECRET) as { id: number };

    if (decodedToken.id) {
      // req.user = decodedToken;
      return next();
    }
    return res.status(401).json({ error: "Invalid token" });
    // decodedToken.id;
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
