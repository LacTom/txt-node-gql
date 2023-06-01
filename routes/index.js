const express = require('express');
const peopleRoutes = require("./peopleRoute");
const router = express.Router();

router.get('/hello', (req, res) => res.send('hello world'));

router.use('/docs', express.static('./docs'));

router.use('/people', peopleRoutes);
module.exports = router;
