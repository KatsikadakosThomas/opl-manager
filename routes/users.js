const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const isLoggedIn = require('../helpers/isLoggedIn')

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });



//get all users

router.get('/', isLoggedIn, userController.getUsers)

//create user
router.post('/register', userController.createUser)

//get user
router.get('/:id', isLoggedIn, userController.getUserById)

//login user
router.post('/login', userController.loginUser)

}

