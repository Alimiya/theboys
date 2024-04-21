const express = require('express')
const router = express.Router()
const Controller = require('../controllers/adminController')
const upload = require('../middlewares/multer')
const {verifyAdminToken} = require('../middlewares/verify')
const {cacheMiddleware} = require("../middlewares/cache")
const {limiter, postLimiter} = require("../middlewares/limiter")

router.get('/', limiter, Controller.get)
router.post('/create', verifyAdminToken(process.env.ADMIN_TOKEN_SECRET), postLimiter, upload.single('attraction_img'), Controller.create)
router.post('/update', verifyAdminToken(process.env.ADMIN_TOKEN_SECRET), postLimiter, upload.single('attraction_img'), Controller.update)
router.post('/delete', verifyAdminToken(process.env.ADMIN_TOKEN_SECRET), postLimiter, Controller.delete)

module.exports = router