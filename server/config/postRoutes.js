const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('./models/postModel');

// Define your API endpoint for liking/unliking posts
router.post(
  '/like/:postId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Check if the user has already liked the post
      const liked = post.likes.includes(req.user._id);

      if (liked) {
        // User has already liked the post, so unlike it
        post.likes.pull(req.user._id);
      } else {
        // User hasn't liked the post, so like it
        post.likes.push(req.user._id);
      }

      // Save the updated post with like changes
      await post.save();

      res.json({ likes: post.likes });
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;