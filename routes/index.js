const express = require('express');
const peopleRoutes = require("./peopleRoute");
const authRoutes = require("./authRoute");
const router = express.Router();

router.get('/hello', (req, res) => res.send('hello world'));

router.use('/people', peopleRoutes);
router.use("/auth", authRoutes);
module.exports = router;
