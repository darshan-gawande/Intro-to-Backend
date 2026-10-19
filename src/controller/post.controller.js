import { Post } from "../models/post.model.js";

// create a post
const createPost = async ( req, res ) => {
    try {
        const { name, description, number } = req.body;

        if( !name || !description || !number ) {
            return res.status(404).json({ 
                message: " All fields are Required! "
            })
        };
        const post = await Post.create({ name, description, number });

        return res.status(201).json({
            message: "Post created successfully ", post
        })
    } catch (error) {
        return res.status(501).json({ 
            message: "Internal Server Error", error
        })
    }
}

export { createPost };