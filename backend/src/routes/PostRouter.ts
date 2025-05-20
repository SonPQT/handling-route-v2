import express, { Request, Response } from "express";
import Post from "../db/postModel";

const router = express.Router();

// Create new post
router.post("/post", async (req: Request, res: Response) => {
  const post = new Post(req.body);
  try {
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all posts
router.get("/posts", async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Get single post by slug
router.get("/post/:slug", async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    res.send(post);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Update post by slug
router.patch("/post/:slug", async (req: Request, res: Response) => {
  try {
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    if (post) {
      await post.save();
      res.send(post);
    } else {
      res.status(404).send("Post wasn't found");
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Delete post by slug
router.delete("/post/:slug", async (req: Request, res: Response) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });
    if (!post) {
      return res.status(404).send("Post wasn't found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;