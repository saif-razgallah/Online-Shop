const router = require('express').Router() //route level not app level

const homeController = require('../controllers/home.controller')

router.get('/',homeController.getHome)

module.exports = router