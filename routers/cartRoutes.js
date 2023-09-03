const express = require ('express')
const {routeProtector} = require('../middlewares/routeProtection')
const cartControllers = require('../controller/cartControllers.js')

router = express.Router()

router.get("/",routeProtector("User"),cartControllers.viewCart)
router.post('/:prodId',routeProtector("User"),cartControllers.addtoCart)

module.exports = router