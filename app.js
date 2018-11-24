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
app.use(require('./routes/routes'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', "true");
  next();
});

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