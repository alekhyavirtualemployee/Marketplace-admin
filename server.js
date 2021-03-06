const express = require('express');
const app = express();
const path = require('path');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const admins = require('./routes/api/admins');
const cors=require("cors");
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
// mongoose connection
const mongoose = require('mongoose');
mongoose.connect(keys.mongodb_URI, {useNewUrlParser: true});
// test mongoose connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected')
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors(corsOptions)) // Use this after the variable declaration
const passport = require('passport');
// passport middleware
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

// routes
app.use('/api/admins', admins);

// used in production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('front-end/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'));
  });
}

// opening port
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });