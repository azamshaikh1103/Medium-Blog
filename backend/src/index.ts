import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.post("/api/v1/user/signup", (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  return c.text("Hey there");
});

app.get("/", (c) => {
  return c.text("Welcome to homepage");
});

app.post("/api/v1/user/signin", (c) => {
  return c.text("Hey there");
});

app.post("/api/v1/blog", (c) => {
  return c.text("Hey there");
});

app.put("/api/v1/blog", (c) => {
  return c.text("Hey there");
});

app.get("/api/v1/blog", (c) => {
  return c.text("Hey there");
});

app.get("/api/v1/blogbulk", (c) => {
  return c.text("Hey there");
});

export default app;
