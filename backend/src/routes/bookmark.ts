import prisma from "../db";
import Router from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { verify } from "jsonwebtoken";

const bookmarkRouter = Router();

bookmarkRouter.post("/", isLoggedIn, async (req, res) => {
  //Remove this filler code
  const token = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const decodedToken = verify(token, JWT_SECRET) as { id: number };
  //till here (get userId from the middleware instead)

  const userId = decodedToken.id;
  const body = req.body;

  try {
    const userProfile = await prisma.profile.findFirst({
      where: { userId },
    });

    if (!userProfile)
      return res.status(400).json({ errror: "You need to have profile" });

    const existingBlog = await prisma.blog.findFirst({
      where: { id: body.id },
    });

    if (!existingBlog)
      return res.status(400).json({ error: "Blog is not available" });

    const existingBookmark = await prisma.bookmark.findFirst({
      where: { userId: userProfile.id, blogId: body.id },
    });

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: { id: existingBookmark.id },
      });
      return res.status(200).json("Bookmark removed");
    }

    await prisma.bookmark.create({
      data: {
        userId: userProfile.id,
        blogId: body.id,
      },
    });
    return res.status(200).json("Bookmark added");
  } catch (error) {
    return res.status(400).json({ error: "catch error" });
  }
});

bookmarkRouter.get("/blogs", isLoggedIn, async (req, res) => {
  //Remove this filler code
  const token = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const decodedToken = verify(token, JWT_SECRET) as { id: number };
  //till here (get userId from the middleware instead)

  const userId = decodedToken.id;

  const userProfile = await prisma.profile.findFirst({
    where: { userId },
  });

  if (!userProfile)
    return res.status(400).json({ error: "You need to have a profile" });

  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: userProfile.id },
      include: {
        blog: true,
      },
    });

    const bookmarkedBlogs = bookmarks.map((bookmark) => bookmark.blog);

    res.status(200).json(bookmarkedBlogs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default bookmarkRouter;
