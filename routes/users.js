const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

//get all users

router.get('/', userController.getUsers)

//create user
router.post('/', userController.createUser)

module.exports = router
