const express = require("express");
const peopleRoutes = require("./peopleRoute");
const sqlLiteRoutes = require("./sqlLiteRoute");
const noSqlLiteRoutes = require("./noSqlLiteRoute");
const router = express.Router();

router.get("/hello", (req, res) => res.send("hello world"));

router.use("/mock", peopleRoutes);
router.use("/sql", sqlLiteRoutes);
router.use("/nosql", noSqlLiteRoutes);

module.exports = router;
