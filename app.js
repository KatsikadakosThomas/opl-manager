const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const DB = require('./db')

//middleware

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(morgan('tiny'))

require('dotenv').config({
    path:
        process.env.NODE_ENV === 'development'
            ? '.env.development'
            : '.env.production',
})
const api = process.env.API_URL

// //ROUTES
// //route import
const usersRouter = require('./routes/users')
const sheetRouter = require('./routes/sheet')
// //routes
app.use(`${api}/users`, usersRouter)
app.use(`${api}/sheet`, sheetRouter)

//database connection
DB

app.listen(3000, () => {
    console.log('I listen someone in door 3000')
})
