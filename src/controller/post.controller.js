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

// get all the posts
const getPost = async ( req, res ) => {
    try {
        const posts = await Post.find();
        return res.status(201).json(posts);   
    } catch (error) {
        return res.status(501).json({ 
        message: "Internal Server Error", error
    })
}
};

// update the posts
const updatePost = async ( req, res ) => {
    try {
        // check if the body is empty
        if(Object.keys(req.body) === 0) {
            return res.status(401).json({
                message: "No data is available for the update"
            })
        }

        const post = await Post.findByIdAndUpdate( req.params.id, req.body, {new: true});

        if(!post) {
            return res.status(404).json({
                message:"post not found"
            })
        };

        return res.status(200).json({
            message: "Post Updated Successfully", post
        })
    } catch (error) {
            return res.status(501).json({ 
            message: "Internal Server Error", error
        
    })
}
}

// delete the posts
const deletePost = async ( req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if(!deletedPost) {
            return res.status(404).json({ 
                message: "post not found"
            })
        };

        return res.status(200).json({
            message: "Post Deleted Successfully"
        });

    } catch (error) {
        return res.status(501).json({ 
        message: "Internal Server Error", error
    })
}
}

export { createPost, getPost, updatePost, deletePost }