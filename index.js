const express = require('express')
const bodyParser = require('body-parser');
const routes = require("./routes");
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(bodyParser.json());
// mount api v1 routes
app.use('/v1', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})