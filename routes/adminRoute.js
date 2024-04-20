const express = require('express')
const router = express.Router()
const Controller = require('../controllers/adminController')
const upload = require('../middlewares/multer')
const {verifyAdminToken} = require('../middlewares/verify')

router.get('/', verifyAdminToken(process.env.ADMIN_TOKEN_SECRET), Controller.get)
router.post('/create', upload.single('attraction_img'), Controller.create)
router.post('/update', upload.single('attraction_img'), Controller.update)
router.post('/delete', Controller.delete)

router.get('/stats', Controller.getTotalStats)
router.get('/stats/:year/:month/:day', Controller.getStatsByDate)
router.get('/stats/:year/:month', Controller.getStatsByMonth)
router.get('/stats/:year', Controller.getStatsByYear)

module.exports = router