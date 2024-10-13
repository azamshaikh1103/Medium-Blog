import { z } from "zod";
import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import prisma from "../db";
import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const authRouter = Router();

const userSigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password should be atleast 8 characters"),
});

authRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ error: "provide email" });

  if (!password) return res.status(400).json({ error: "provide password" });

  try {
    const { success } = userSigninSchema.safeParse({
      email: email,
      password: password,
    });
    if (!success)
      return res.status(400).json({ error: "Provide proper credentials" });

    const hashPass = await hash(password, 7);
    console.log(hashPass);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashPass,
      },
    });
    if (user) return res.status(200).json(user);
    return res.status(400).json({ error: "Failded adding user" });
  } catch (error) {
    console.log(`its a catch error : ${error}`);
    return res.status(500).json({ error: "Somethings wrong with credentials" });
  }
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ error: "Please provide an email" });

  if (!password)
    return res.status(400).json({ error: "Please provide a password" });

  try {
    const { success } = userSigninSchema.safeParse({
      email: email,
      password: password,
    });
    if (!success)
      return res.status(400).json({ error: "Provide proper credentials" });

    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) return res.status(400).json({ error: "User not registered" });

    const checkPass = await compare(password, user.password);
    if (!checkPass) return res.status(400).json("Incorrect password");

    const JWT_SECRET = process.env.JWT_SECRET as string;
    const token = sign(user, JWT_SECRET, { expiresIn: "7d" });

    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Successfully signed in" });
  } catch (error) {
    console.log(`its a catch error : ${error}`);
    return res.status(500).json({ error: "Use proper credentials" });
  }
});

authRouter.get("/seeme", isLoggedIn, async (req, res) => {
  //Remove this filler code
  const token = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const decodedToken = verify(token, JWT_SECRET) as { id: number };
  //till here (get userId from the middleware instead)

  const userId = decodedToken.id;
  // const userId = req.user.id;
  if (!userId) return res.status(400).json({ error: "User not logged in" });

  const user = await prisma.profile.findFirst({
    where: { userId: userId },
  });

  if (!userId) return res.status(400).json({ error: "User not logged in" });

  return res.status(200).json(user);
});

export default authRouter;
