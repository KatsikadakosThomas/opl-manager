const mongoose = require('mongoose')
const chalk = require('chalk')
const error = chalk.bold.red

//different env file for diffrent production enviroments to change env you export NODE_ENV=production to check node then process.env.NODE_ENV
const nodeEnv = process.env.NODE_ENV.trim()

//prettier-ignore
require('dotenv').config({path: nodeEnv === 'development' ?  '.env.development':'.env.production'})

const uri = process.env.CONNECTION_STRING

var DB = mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'OPL',
    })
    .then(() => {
        console.log(chalk.underline('Database connected'))
    })
    .catch((err) => {
        console.log(error(err))
    })

module.exports = DB
