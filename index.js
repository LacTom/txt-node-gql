const express = require("express");
const bodyParser = require("body-parser");
const morganMiddleware = require("./middleware/morgan.middleware");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const passport = require("passport");
const strategies = require('./config/passport');
const error = require('./middleware/error.middleware');
const logger = require("./utils/logger");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  /* 	#swagger.tags = ['Hello!']
        #swagger.description = 'Endpoint to test API liveness' */

  res.send("Hello World!");
});

app.use(morganMiddleware);
app.use(bodyParser.json());

app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

// mount api v1 routes
app.use("/v1", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});
