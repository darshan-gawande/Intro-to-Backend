import { Router } from "express";
import { createPost } from "../controller/post.controller.js";

const router = Router();

router.route("/create").post(createPost);

export default router;