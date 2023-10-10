const express = require("express");
const { routeProtector } = require("../middlewares/routeProtection");
const adminControllers = require("../controller/adminControllers.js");

const router= express.Router()


router.route("/orders")
.get(routeProtector("admin"),adminControllers.allOrders)

router.route("/orders/count")
.get(routeProtector("admin"),adminControllers.orderCount)

router.route("/orders/:orderid")
.get(routeProtector("admin"),adminControllers.orderbyId)

router.route("/graph")
.get(routeProtector("admin"),adminControllers.getGraphData_GET)

module.exports= router