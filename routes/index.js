const express = require('express');
const peopleRoutes = require("./peopleRoute");
const sqlLiteRoutes = require("./sqlLiteRoute");
const router = express.Router();

router.get('/hello', (req, res) => res.send('hello world'));

router.use('/people', peopleRoutes);
router.use('/sql', sqlLiteRoutes);
module.exports = router;
