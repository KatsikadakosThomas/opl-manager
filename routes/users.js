const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const isLoggedIn = require('../helpers/isLoggedIn')

//get all users

router.get('/', isLoggedIn, userController.getUsers)

//create user
router.post('/register', userController.createUser)

//get user
router.get('/:id', userController.getUserById)

//login user
router.post('/login', userController.loginUser)

module.exports = router
