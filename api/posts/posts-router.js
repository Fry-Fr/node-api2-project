// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

router.get('/', async (req,res) => {
    const posts = await Posts.find();
    res.status(200).json(posts);
});

router.get('/:id', async (req,res) => {
    const { id } = req.params;
    
    await Posts.findById(id)
        .then(post => {
            post
            ? res.status(200).json(post)
            : res.status(404).json({message: "The post with the specified ID does not exist"})
        })
        .catch(err => res.status(500).json({}))
});

router.get('/:id/comments', async (req,res) => {
    const { id } = req.params;
    const pid = await Posts.findById(id)

    !pid
    ? res.status(404).json({ message: "The post with the specified ID does not exist" })
    : await Posts.findPostComments(id)
        .then(comments => {
            comments
            ? res.status(200).json(comments)
            : res.status(204)
        })
        .catch(err => res.status(500).json({message: "The comments information could not be retrieved"}))
});

router.post('/', async (req,res) => {
    const newPost = req.body;

    !newPost.title || !newPost.contents
    ? res.status(400).json({message: "Please provide title and contents for the post" })
    : await Posts.insert(newPost)
        .then(async post => {
            const id = JSON.stringify(post.id)
            const newPost = await Posts.findById(id)
            newPost
            ? res.status(201).json(newPost)
            : res.status(404).json({message: "There was an error getting the new post."})
        })
        .catch(err => res.status(500).json({message: "There was an error while saving the post to the database"}))
});

router.put('/:id', async (req,res) => {
    const { id } = req.params;
    const updtPost = req.body;

    !updtPost.title || !updtPost.contents
    ? res.status(400).json({ message: "Please provide title and contents for the post" })
    : await Posts.update(id, updtPost)
        .then(async post => {
            const getPost = await Posts.findById(id)
            post
            ? res.status(200).json(getPost)
            : res.status(404).json({ message: "The post with the specified ID does not exist" })
        })
        .catch(err => res.status(500).json({ message: "The post information could not be modified" }))
});

router.delete('/:id', async (req,res) => {
    const { id } = req.params; 
    const delPost = await Posts.findById(id);

    await Posts.remove(id)
        .then(removed => {
            removed
            ? res.status(200).json(delPost)
            : res.status(404).json({ message: "The post with the specified ID does not exist" })
        })
        .catch(err => res.status(500).json({ message: "The post could not be removed" }))
});

module.exports = router;