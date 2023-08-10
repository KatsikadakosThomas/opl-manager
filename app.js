const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require('morgan')
const DB = require('./db')
const chalk = require('chalk')
const isLoggedIn = require('./helpers/isLoggedIn')
const errorHandler = require('./helpers/errorHandler')
const compression = require("compression");
const passport = require("passport");
const { default: helmet } = require("helmet");
require("./config/passport.js");

//middleware

app.use(
    cors({
        origin: ['http://localhost:8080', 'http://localhost:3000'],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
)

app.use(compression());
app.use(morgan(":date[clf] :remote-addr :method :status  :url :response-time"));

app.use(passport.initialize());

app.use(helmet());
app.options('*', cors())
app.use(express.json())

app.use(errorHandler)
app.disable('x-powered-by')
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

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


app.listen(port, function (err) {
    if (err) {
      console.log(err);
    } else {
        console.log(chalk.cyan('Conjure Portal at ') + chalk.underline.yellow(port))
    }
  });