const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

module.exports = (req, res, next) => {
    //get authorization header
    // const authHeader = req.get('authorization')

    //the auth header is in the form of BEARER "token" where token is the encoded info
    // so we split bearer from token  and with [1] select the second part
    // const token = authHeader && authHeader.split(' ')[1]
     

    const token =req.headers["x-access-token"];
    //check if user has a token
    if (token == null) return res.status(401).send('no token')

    //verify is token has our secret
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.sendStatus(403)
        console.log(decoded)
        req.user = decoded
        next()
    })
}
