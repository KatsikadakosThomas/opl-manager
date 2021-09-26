const { User } = require('../models/users')
const bcrypt = require('bcryptjs')
const chalk = require('chalk')
const jwt = require('jsonwebtoken')

//POST NEW USER
exports.createUser = async (req, res, next) => {
    try {
        //generate salt
        await bcrypt.genSalt(12, function (err, salt) {
            //pass it to hash()
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                //create user obj
                let user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    passwordHash: hash,
                })

                //save obj into db
                user.save()

                //if no user then error
                if (!user)
                    return res.status(404).send('the user cant be created')

                //send user to see
                res.send(user)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

//GET ALL USERS
exports.getUsers = async (req, res, next) => {
    //finds all users with no filter
    const userList = await User.find()

    //if userlist not exists ->send error else send users
    !userList ? res.status(500).json({ success: false }) : res.send(userList)
}

//GET A USER
exports.getUserById = async (req, res, next) => {
    //finds all users with no filter
    const user = await User.findById(req.params.id)

    //if userlist not exists ->send error else send users
    !user ? res.status(500).json({ success: false }) : res.send(user)
}

exports.loginUser = async (req, res, next) => {
    const user = await User.find({ email: req.body.email })
    console.log(user)
    if (!!user) {
        bcrypt.compare(
            req.body.password,
            user[0].passwordHash,
            function (err, hashed) {
                if (hashed) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id,
                        },
                        process.env.TOKEN,
                        { expiresIn: '2h' }
                    )
                    console.log(token)

                    res.cookie('jwt', token)
                    res.status(200).json({
                        jwt: token,
                    })
                } else {
                    res.status(401).json({
                        data: 'Wrong password or email!',
                    })
                }
            }
        )
    } else {
        res.status(404).json({ data: 'No user found!' })
    }
}
