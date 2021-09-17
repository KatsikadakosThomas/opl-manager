const { Sheet } = require('../models/sheet')
const express = require('express')
const router = express.Router()
const sheetController = require('../controllers/sheetController')

router.post('/', sheetController.createSheet)

module.exports = router
