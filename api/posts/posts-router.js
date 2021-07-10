// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

router.get('/', async (req,res) => {
    const posts = await Posts.find();
    res.status(200).json(posts);
});

module.exports = router;