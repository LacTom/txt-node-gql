const express = require("express");
const peopleRoutes = require("./peopleRoute");
const sqlLiteRoutes = require("./sqlLiteRoute");
const noSqlLiteRoutes = require("./noSqlLiteRoute");
const authRoutes = require("./auth");
const router = express.Router();

router.get("/hello", (req, res) => res.send("hello world"));

router.use("/mock", peopleRoutes);
router.use("/sql", sqlLiteRoutes);
router.use("/nosql", noSqlLiteRoutes);
router.use("/auth", authRoutes);

module.exports = router;
