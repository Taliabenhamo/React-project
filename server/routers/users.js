const express = require('express');
const users = require('../controllers/users');
const router = express.Router();
const auth = require('../middleware/auth');
const cards = require('../controllers/cards');

const _ = require('lodash');

router.post('/login', users.login);
router.post('/signup', users.signup);
router.get('/me',auth, users.myDetails);
router.get('/cards', auth, users.myCards);
router.patch('/:id',auth, users.editUser);


module.exports = router;
