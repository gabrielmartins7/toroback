const express = require('express');
const app = express();
const db = require('./config/db');
const consign = require('consign');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

consign()
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app);

app.db = db;

app.listen(3000, () => {
  console.log('Backend executando...');
});

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
