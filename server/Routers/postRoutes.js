const express = require('express');
const posts = require('../Controllers/postController');

const router = express.Router()

router.get('/', posts.get_posts)
router.get('/:id', posts.get_single_post)
router.post('/create', posts.create_post)
router.put('/:id/update', posts.update_posts)
router.delete('/:id/delete', posts.delete_posts)

module.exports = router;