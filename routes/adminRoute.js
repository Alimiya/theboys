const express = require('express')
const router = express.Router()
const Controller = require('../controllers/adminController')

router.get('/', Controller.get)
router.post('/create', Controller.create)
router.post('/update/:id', Controller.update)
router.post('/delete/:id', Controller.delete)

router.get('/stats', Controller.getTotalStats)
router.get('/stats/:year/:month/:day', Controller.getStatsByDate)
router.get('/stats/:year/:month', Controller.getStatsByMonth)
router.get('/stats/:year', Controller.getStatsByYear)