const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Configs  
require('./configs/config');

// Middlewares 
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
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
app.listen(8100, () => {
  console.log('¡Listening on port 8100!');
});