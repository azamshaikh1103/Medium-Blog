import { Router } from "express";
import { verify } from "jsonwebtoken";

import { isLoggedIn } from "../middlewares/isLoggedIn";
import prisma from "../db";

const profileRouter = Router();

profileRouter.post("/create", isLoggedIn, async (req, res) => {
  const body = req.body;
  if (!body.name || !body.shortBio || !body.about)
    return res.status(400).json("Incomplete data");

  //Remove this filler code
  const token = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const decodedToken = verify(token, JWT_SECRET) as { id: number };
  //till here (get userId from the middleware instead)

  const userId = decodedToken.id;

  try {
    const profileData = await prisma.profile.create({
      data: {
        name: body.name,
        profilePic: body.profilePic,
        shortBio: body.shortBio,
        about: body.about,
        user: {
          connect: { id: userId },
        },
      },
    });

    if (!profileData)
      return res.status(400).json({ error: "Failed to upload data" });
    return res.status(200).json(profileData);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "catch error" });
  }
});

profileRouter.put("/update", isLoggedIn, async (req, res) => {
  const body = req.body;
  if (!body.name || !body.shortBio || !body.about)
    return res.status(400).json("Incomplete data");

  //Remove this filler code
  const token = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const decodedToken = verify(token, JWT_SECRET) as { id: number };
  //till here (get userId from the middleware instead)

  const userId = decodedToken.id;

  try {
    const updateProfile = await prisma.profile.update({
      where: { userId: userId },
      data: {
        name: body.name,
        profilePic: body.profilePic,
        shortBio: body.shortBio,
        about: body.about,
      },
    });

    if (!updateProfile)
      return res.status(400).json({ error: "Failed to upload data" });
    return res.status(200).json(updateProfile);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "catch error" });
  }
});

profileRouter.post("/read", async (req, res) => {
  const body = req.body;
  try {
    const profile = await prisma.profile.findFirst({
      where: { id: body.id },
    });

    if (!profile)
      return res.status(400).json({ error: "No profile available" });
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "catch error" });
  }
});

profileRouter.delete("/delete", isLoggedIn, async (req, res) => {
  //Remove this filler code
  const token = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const decodedToken = verify(token, JWT_SECRET) as { id: number };
  //till here (get userId from the middleware instead)

  const userId = decodedToken.id;

  const profile = await prisma.profile.findFirst({
    where: { userId: userId },
  });

  if (!profile)
    return res.status(400).json({ error: "User not having profile" });

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.bookmark.deleteMany({
        where: { userId: profile.id },
      });
      await prisma.follows.deleteMany({
        where: {
          OR: [{ followeeId: profile.id }, { followerId: profile.id }],
        },
      });
      await prisma.blog.deleteMany({
        where: { authorId: profile.id },
      });
      await prisma.profile.delete({
        where: { userId: userId },
      });
      await prisma.user.delete({
        where: { id: userId },
      });
    });

    return res.status(200).json("Account successfully deleted");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "catch error" });
  }
});

profileRouter.get("/list", async (req, res) => {
  const profiles = await prisma.profile.findMany();
  if (!profiles) return res.status(400).json({ error: "No profiles" });
  res.status(200).json(profiles);
});

profileRouter.post("/follow", isLoggedIn, async (req, res) => {
  //Remove this filler code
  const token = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const decodedToken = verify(token, JWT_SECRET) as { id: number };
  //till here (get userId from the middleware instead)

  const userId = decodedToken.id;
  const body = req.body;

  try {
    const followerProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    const followeeProfile = await prisma.profile.findUnique({
      where: { id: body.id },
    });

    if (!followeeProfile || !followerProfile) {
      return res.status(400).json({ error: "Profiles not found" });
    }

    if (followeeProfile.id === followerProfile.id) {
      return res.status(400).json({ error: "Cannot follow own account" });
    }

    await prisma.follows.create({
      data: {
        followerId: followerProfile.id,
        followeeId: followeeProfile.id,
      },
    });

    console.log("Successfully followed");

    return res.status(200).json({ success: "Succressfully followed" });
  } catch (error) {
    return res.status(400).json({ error: "catch error" });
  }
});

export default profileRouter;
