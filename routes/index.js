const express = require('express');
const { graphqlHTTP } = require("express-graphql")
const peopleRoutes = require("./peopleRoute");
const sqlLiteRoutes = require("./sqlLiteRoute");
const noSqlLiteRoutes = require("./noSqlLiteRoute");
const gqlSchema = require("./gql/gqlSchema");
const gqlResolver = require("./gql/gqlResolver");
const router = express.Router();

router.get('/hello', (req, res) => res.send('hello world'));

router.use('/mock', peopleRoutes);
router.use('/sql', sqlLiteRoutes);
router.use('/nosql', noSqlLiteRoutes);

router.use(
    "/graphql",
    graphqlHTTP({
      schema: gqlSchema,
      rootValue: gqlResolver,
      graphiql: true,
    })
  )

module.exports = router;
