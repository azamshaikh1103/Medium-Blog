import { Router } from "express";
import prisma from "../db";
import { decode, verify } from "jsonwebtoken";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const blogRouter = Router();

blogRouter.post("/create", isLoggedIn, async (req, res) => {
  //Remove this filler code
  const token = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const decodedToken = verify(token, JWT_SECRET) as { id: number };
  //till here (get userId from the middleware instead)

  const userId = decodedToken.id;
  const body = req.body;

  if (!body.headline || !body.content)
    return res.status(400).json({ error: "There is no data to publish" });

  const profile = await prisma.profile.findFirst({
    where: { userId },
  });

  if (!profile)
    return res.status(400).json({ error: "You need to create profile first" });

  try {
    const postBlog = await prisma.blog.create({
      data: {
        headline: body.headline,
        shortDesc: body.shortDesc,
        content: body.content,
        published: body.published,
        author: {
          connect: { id: profile.id },
        },
      },
    });

    if (!postBlog)
      return res.status(400).json({ error: "Failed to publish blog" });

    return res.status(200).json(postBlog);
  } catch (error) {
    return res.status(400).json({ error: "Catch error" });
  }
});

blogRouter.put("/update", isLoggedIn, async (req, res) => {
  //Remove this filler code
  const token = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const decodedToken = verify(token, JWT_SECRET) as { id: number };
  //till here (get userId from the middleware instead)

  const userId = decodedToken.id;
  const body = req.body;
  const profile = await prisma.profile.findFirst({
    where: { userId },
  });

  if (!profile)
    return res.status(400).json({ error: "You need to create profile first" });

  try {
    const existingBlog = await prisma.blog.findFirst({
      where: {
        id: body.id,
        authorId: profile.id,
      },
    });

    if (!existingBlog)
      return res.status(400).json({ error: "This blog is not present" });

    const postBlog = await prisma.blog.update({
      where: {
        id: existingBlog.id,
      },
      data: {
        headline: body.headline,
        shortDesc: body.shortDesc,
        content: body.content,
        published: body.published,
      },
    });

    if (!postBlog)
      return res.status(400).json({ error: "Failed to publish blog" });

    return res.status(200).json(postBlog);
  } catch (error) {
    return res.status(400).json({ error: "Catch error" });
  }
});

blogRouter.delete("/delete", isLoggedIn, async (req, res) => {
  //Remove this filler code
  const token = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const decodedToken = verify(token, JWT_SECRET) as { id: number };
  //till here (get userId from the middleware instead)

  const userId = decodedToken.id;
  const body = req.body;
  const profile = await prisma.profile.findFirst({
    where: { userId },
  });

  if (!profile)
    return res.status(400).json({ error: "You need to create profile first" });

  try {
    const existingBlog = await prisma.blog.findFirst({
      where: {
        id: body.id,
        authorId: profile.id,
      },
    });

    if (!existingBlog)
      return res.status(400).json({ error: "This blog is not present" });

    const deleteBlog = await prisma.blog.delete({
      where: { id: existingBlog.id },
    });

    return res.status(200).json("Blog deleted successfully");
  } catch (error) {
    return res.status(400).json("Failed to delete blog");
  }
});

blogRouter.post("/read", async (req, res) => {
  const body = req.body;

  const blog = await prisma.blog.findFirst({
    where: { id: body.id },
  });

  if (!blog) return res.status(400).json({ error: "Blog is not available" });
  return res.status(200).json(blog);
});

blogRouter.post("/readfrom", async (req, res) => {
  const body = req.body;

  const blog = await prisma.blog.findMany({
    where: { authorId: body.id },
  });

  if (!blog) return res.status(400).json({ error: "Blog is not available" });
  return res.status(200).json(blog);
});

blogRouter.get("/readAll", async (req, res) => {
  const blog = await prisma.blog.findMany({
    where: { published: true },
  });

  if (!blog) return res.status(400).json({ error: "Blog is not available" });
  return res.status(200).json(blog);
});

export default blogRouter;
