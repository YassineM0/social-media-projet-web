const asyncHandler = require("express-async-handler");
const {addPostValidation, Post, updatePostValidation} = require("../models/Post.js"); 
const { User } = require("../models/user.js");
const mongoose = require("mongoose");
const fs = require('fs');


/** 
 * @desc    Get all Posts
 * @route   /api/posts
 * @method  GET
 * @access  Public
 */
const getFeedPosts = asyncHandler( async (req,res) => {
    const posts = await Post.find().populate({path :"userId", select: "_id lastName firstName profilePicture occupation"}).populate({
        path: 'comments',
        populate: {
            path: 'userId',
            select : "-password -email -dateOfBirth -bioContent -location -friends -backgroundPicture"
        }
    }).sort({ createdAt: -1 })
    res.status(200).json(posts);
    }
)

/** 
 * @desc    Get post by usersId
 * @route   /api/posts/:userId
 * @method  GET
 * @access  Private (only admin & user himself)
 */
const getUserPosts = asyncHandler( async (req,res) => {
    const userId = req.params.userId;
    const post = await Post.find({userId}).populate({path :"userId", select: "_id lastName firstName profilePicture occupation"}).populate({
        path: 'comments',
        populate: {
            path: 'userId',
            select : "-password -email -dateOfBirth -bioContent -location -friends -backgroundPicture"
        }
    }).sort({ createdAt: -1 })
    if (post){
        res.status(200).json(post)
    } else (
        res.status(404).json({message : "Post Not Found"})
    )
} )

/** 
 * @desc    Creat new Post
 * @route   /api/posts/
 * @method  POST
 * @access  Private (only admin & user himself)
 */
const addPost = asyncHandler( async (req,res) => {
    const {error} = addPostValidation(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }
    let user = await User.findById(req.body.userId);
    if (!user){
        return res.status(404).json({ message : "user not found"});
    }
    if ( !req.file && !req.body.description ){
        res.status(400).json({ message : " Post description or post image require!! " })
    }
    var Data, ContentType

    if (req.file){
        try {
            Data = await fs.promises.readFile(req.file.path);
            ContentType = req.file.mimetype;
            req.file = req.file.path; 
        } catch (err) {
        console.error(err);
        return res.status(500).send('Error reading image file');
        }
    } else {
        Data = null;
        ContentType = ""
    }
    const post = new Post ({
        userId : req.body.userId,
        description : req.body.description,
        postPicture : { 
            data : Data, 
            contentType : ContentType,
        },
        likes: {},
    });
    const result = await post.save();
    res.status(201).json(result);
    }
)

/** 
 * @desc    like post by its id
 * @route   /api/posts/:postId/:userId
 * @method  PATCH
 * @access  Private (only admin & user himself)
 */
const likePost = asyncHandler( async (req,res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate("userId")
    const postOwner = await User.findById(post.userId);
    const likerId =req.params.userId;
    const liker = await User.findById(likerId);
    const isLiked = post.likes.get(likerId);
    console.log(postId);
    console.log(post.userId);
    console.log(likerId);
    if (post && postOwner && liker){
        if (isLiked) {
            post.likes.delete(likerId);
            await post.save();
            res.status(200).json({message : `${liker.firstName} ${liker.lastName} has unliked ${postOwner.firstName} ${postOwner.lastName} is post`})
        } else {
            post.likes.set(likerId, true);
            await post.save();
            res.status(200).json({message : `${liker.firstName} ${liker.lastName} has liked ${postOwner.firstName} ${postOwner.lastName} is post`})
        }
    } else if (!post){
        res.status(404).json({message : "Post Not Found"})
    } else if (!postOwner){
        res.status(404).json({message : "PostOwner Not Found"})
    } else if (!liker){
        res.status(404).json({message : "liker Not Found"})
    }

} )

/** 
 * @desc    comment post by its id
 * @route   /api/posts/:postId/:userId/comment
 * @method  POST
 * @access  Private (only admin & user himself)
 */
const commentPost = asyncHandler( async (req,res) => {
    const {postId,userId} = req.params;
    
    const comment = req.body.comment;
    // Validate input
    if (!comment) {
        return res.status(400).json({ message: 'Comment text is required' });
    }

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    //const commentId = new mongoose.Types.ObjectId();

    const newComment = {
        userId,
        text : comment,
        createdAt: new Date()
    };
    // post.comments.set(commentId, newComment)
    // await post.save();

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: newComment } },
        { new: true }
    )
    res.status(201).json(updatedPost);
    //res.status(201).json({ message: 'Comment added', comment: { id: commentId, ...newComment } });
} )

/** 
 * @desc    Delete comment by its id
 * @route   /api/posts/:postId/:commentId
 * @method  DELETE
 * @access  Private (only admin & user himself)
 */
const deleteComment = asyncHandler( async (req,res) => {
    const {postId,commentId} = req.params;
    // Find the post by ID
    const post = await Post.findById(postId);
    // Find the comment by ID
    const comment = post.comments.id(commentId)
    if (!post) {
        return res.status(404).json({ message: 'post not found' });
    }
    if (comment){
        post.comments.remove(commentId)
    } else {
        return res.status(404).json({ message: 'comment not found' });
    }
    await post.save();
    res.status(201).json({ message: 'Comment deleted'});
})


/** 
 * @desc    Update comment by its id
 * @route   /api/posts/:postId/:commentId
 * @method  PUT
 * @access  Private (only admin & user himself)
 */
const updateComment = asyncHandler( async (req,res) => {
    const {postId, commentId} = req.params
    const newComment = req.body.text
    const post = await Post.findById(postId)
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    // Validate input
    if (!newComment) {
        return res.status(400).json({ message: 'Comment sould not be empty!' });
    }
    const oldComment = post.comments.id(commentId)
    if (oldComment){
        oldComment.text = newComment;
        //post.comments.set(commentId, oldComment);
    } else {
        return res.status(404).json({ message: 'comment not found' });
    }
    await post.save();
    res.status(201).json({ message: 'Comment updated'});
})

/** 
 * @desc    Delete Post by postId
 * @route   /api/posts/:postId
 * @method  Delete
 * @access  Private (only admin & user himself)
 */
const deletePostByPostId = asyncHandler( async (req,res) => {
    const post = await Post.findById(req.params.postId).populate("userId")
    if (post){
        const postOwner=post.userId;
        await Post.findByIdAndDelete(req.params.postId)
        res.status(200).json({message:`${postOwner.lastName} Post has been Deleted` })
    } else (
        res.status(404).json({message : "post Not Found"})
    )
} )

/** 
 * @desc    Update Post by postId
 * @route   /api/posts/:postId
 * @method  PUT
 * @access  Private
 */
const updatePostByPostId = asyncHandler( async (req,res) => {
    const post = await Post.findById(req.params.postId)
    if (!post){
        res.status(404).json({message : "Post Not Found"})
    } 

    const {error} = updatePostValidation(req.body);
    if (error){
        res.status(400).json({message : error.details[0].message});
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
        $set : {
            description : req.body.description,
        }
    },{new : true}).populate("userId")
    res.status(200).json(updatedPost);
    } 
)

module.exports = {
    addPost,
    getFeedPosts,
    getUserPosts,
    likePost,
    deletePostByPostId,
    updatePostByPostId,
    commentPost,
    updateComment,
    deleteComment
}