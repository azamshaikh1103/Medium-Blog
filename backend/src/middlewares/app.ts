import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import authRouter from "../routes/auth";
import profileRouter from "../routes/profile";
import blogRouter from "../routes/blog";
import bookmarkRouter from "../routes/bookmark";

export const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/bookmark", bookmarkRouter);
