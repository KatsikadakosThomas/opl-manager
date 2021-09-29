const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const DB = require('./db')
const chalk = require('chalk')
const isLoggedIn = require('./helpers/isLoggedIn')
const errorHandler = require('./helpers/errorHandler')

//middleware

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(errorHandler)

//prettier-ignore
require('dotenv').config({path:process.env.NODE_ENV === 'development'? '.env.development': '.env.production'})

const port = process.env.port

// //ROUTES
// //route import
const userRouter = require('./routes/users')
const sheetRouter = require('./routes/sheet')

// //routes
app.use(`/api/user`, userRouter)
app.use(`/api/sheet`, sheetRouter)

//database connection
DB

app.listen(port, () => {
    console.log(chalk.cyan('Conjure Portal at ') + chalk.underline.yellow(port))
})
