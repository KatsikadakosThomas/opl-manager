const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const DB = require('./db')
const chalk = require('chalk')

//middleware

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(morgan('tiny'))

//prettier-ignore
require('dotenv').config({path:process.env.NODE_ENV === 'development'? '.env.development': '.env.production'})

const api = process.env.API_URL
const port = process.env.port

// //ROUTES
// //route import
const userRouter = require('./routes/users')
const sheetRouter = require('./routes/sheet')

// //routes
app.use(`${api}/users`, userRouter)
app.use(`${api}/sheet`, sheetRouter)

//database connection
DB

app.listen(port, () => {
    console.log(chalk.cyan('Conjure Portal at ') + chalk.underline.yellow(port))
})
