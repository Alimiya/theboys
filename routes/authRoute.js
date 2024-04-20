const express = require('express')
const router = express.Router()
const Controller = require('../controllers/authController')
const {authLimiter} = require("../middlewares/limiter")

router.post('/login', authLimiter, Controller.login)
router.post('/logout', Controller.logout)

module.exports = router