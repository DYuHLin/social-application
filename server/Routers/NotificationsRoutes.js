const express = require('express');
const notifications = require('../Controllers/NotificationsController');

const router = express.Router()

router.delete('/:id/delete', notifications.delete_notifications);
router.get('/:id/notification', notifications.get_notifications);

module.exports = router;