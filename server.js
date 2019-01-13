var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Guest = require('./api/models/model'), //created model loading here
  bodyParser = require('body-parser');
  var fileUpload = require('express-fileupload');
  
const userRoutes = require('./api/routes/routes'); 
const path = require('path');

  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/Tododb',{ useNewUrlParser: true }); 
mongoose.connect('mongodb://localhost/guestdb',{ useNewUrlParser: true }).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/user", userRoutes);
app.use('/uploads',express.static('uploads'));
//app.use(express.static(__dirname));

var routes = require('./api/routes/routes'); //importing route
//routes(app); //register the route


app.listen(port);


console.log('Guest list RESTful API server started on: ' + port);
