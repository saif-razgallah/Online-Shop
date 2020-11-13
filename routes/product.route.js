const router = require('express').Router() //route level not app level

const productController = require('../controllers/product.controller')

const homeRouter = require('../routes/home.route')

router.get('/',homeRouter)

router.get('/:id',productController.getProduct)

module.exports = router