const express = require('express')
const bodyParser = require('body-parser');
const morganMiddleware = require("./middleware/morgan.middleware");
const routes = require("./routes");
const app = express()
const port = 3000

const logger = require("./utils/logger");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(morganMiddleware);
app.use(bodyParser.json());
// mount api v1 routes
app.use('/v1', routes);

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`)
})