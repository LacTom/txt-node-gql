const express = require("express");
const bodyParser = require("body-parser");
const morganMiddleware = require("./middleware/morgan.middleware");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const passport = require("passport");
const strategies = require("./config/passport");
const error = require("./middleware/error.middleware");
const logger = require("./utils/logger");
const gqlSchema = require("./routes/gql/gqlSchema");
const gqlResolver = require("./routes/gql/gqlResolver");
const cors = require("cors");
const http = require("http");
const { json } = require("body-parser");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const app = express();
const port = 3000;
const httpServer = http.createServer(app);
const apolloServer = new ApolloServer({
  debug: true,
  typeDefs: gqlSchema,
  resolvers: gqlResolver,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
  await apolloServer.start();
  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );
  app.get("/", (req, res) => {
    // 	#swagger.tags = ['Hello!']
       //   #swagger.description = 'Endpoint to test API liveness' 
  
    res.send("Hello World!");
  });
  
  app.use(morganMiddleware);
  app.use(bodyParser.json());
  
  app.use(passport.initialize());
  passport.use("jwt", strategies.jwt);
  
  // mount api v1 routes
  app.use("/v1", routes);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  
  app.use(error.converter);
  app.use(error.notFound);
  app.use(error.handler);
  httpServer.listen({ port }, () => {
    logger.info(`server ready on port ${port}`);
  });

})();
