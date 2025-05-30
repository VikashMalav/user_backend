const express = require('express');
const { createUser, userList, deleteUser, updateUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', userList);
router.post('/create', createUser);
router.delete('/delete/:id',deleteUser)
router.put('/update/:id',updateUser)
module.exports = router;
