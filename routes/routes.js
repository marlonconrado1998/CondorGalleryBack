const express = require('express');
const app = express();

app.use(require('./album'));
app.use(require('./image'));

module.exports = app;