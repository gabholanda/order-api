const express = require("express");
const router = express.Router();
const orderService = require("../services/order/order.service");

router.post("/", (req, res) => {
  orderService.addOrder(req, res);
});

router.get("/", (req, res) => {
  orderService.findOne(req, res);
});
module.exports = router;
