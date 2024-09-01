import cookieParser from "cookie-parser";
import express from "express";
import authRouter from "../routes/auth";
import profileRouter from "../routes/profile";
import blogRouter from "../routes/blog";
import bookmarkRouter from "../routes/bookmark";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/bookmark", bookmarkRouter);
