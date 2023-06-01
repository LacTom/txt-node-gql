const express = require("express");
const bodyParser = require("body-parser");
const morganMiddleware = require("./middleware/morgan.middleware");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

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
// mount api v1 routes
app.use("/v1", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});
