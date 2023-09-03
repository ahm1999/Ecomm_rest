const express = require("express");
const productControllers = require('../controller/productsControllers')
const {routeProtector}= require("../middlewares/routeProtection.js");
 router = express.Router();


router
.get("/:productId",productControllers.getProduct_GET)
router.
  route("/admin/addProduct")
  .post(routeProtector("admin"),productControllers.addProduct_POST)

module.exports = router ;
