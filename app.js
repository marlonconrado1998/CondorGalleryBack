const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Configs  
require('./configs/config');
app.set('PORT', 3000);

// Middlewares 
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(require('./routes/routes'));

// Conect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.log('Conected to database.');
}).catch(()=>{
  console.error('Error.');
})

// Listen on port 8100
app.listen(app.get('PORT'), () => {
  console.log(`Listening on port ${app.get('PORT')}`);
});