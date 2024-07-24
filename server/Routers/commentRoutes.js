const express = require('express');
const comments = require('../Controllers/commentController');

const router = express.Router()

router.post('/:id/create', comments.post_comment);
router.delete('/:id/delete', comments.delete_comment);
router.put('/:id/update', comments.update_comment);
router.get('/:id', comments.get_comments);
router.put('/:id/like', comments.like_comment);

module.exports = router;