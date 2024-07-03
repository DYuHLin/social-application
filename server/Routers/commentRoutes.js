const express = require('express');
const comments = require('../Controllers/commentController');

const router = express.Router()

router.post('/:idcreate', comments.post_comment);
router.delete('/:id/delete', comments.delete_comment);
router.put('/:id/update', comments.update_comment);
router.get('/:id', comments.get_comments);

module.exports = router;