const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

//get all users

router.get('/', userController.getUsers)

//create user
router.post('/register', userController.createUser)

//get user
router.get('/:id', userController.getUserById)

//login user
router.post('/login', userController.loginUser)

module.exports = router
