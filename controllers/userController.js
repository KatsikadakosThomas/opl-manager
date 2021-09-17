const { User } = require('../models/users')
const bcrypt = require('bcryptjs')

//POST NEW USER
exports.createUser = async (req, res, next) => {
    //create user obj
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
    })
    //save obj into db
    user = await user.save()
    //if no user then error
    if (!user) return res.status(404).send('the user cant be created')
    //send user to see
    res.send(user)
}

//GET ALL USERS
exports.getUsers = async (req, res, next) => {
    //finds all users with no filter
    const userList = await User.find()

    //if userlist not exists ->send error else send users
    !userList ? res.status(500).json({ success: false }) : res.send(userList)
}
