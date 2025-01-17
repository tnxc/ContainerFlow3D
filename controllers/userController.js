const express = require('express');
const { updateUser } = require('./controllers/userController');
const router = express.Router();

router.put('/update-user/:email', updateUser);

module.exports = router;