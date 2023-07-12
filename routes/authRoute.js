const express = require('express');
const controller = require("../controllers/authController");
const router = express.Router();

router
  .route('/')
  .get(controller.create)

module.exports = router;