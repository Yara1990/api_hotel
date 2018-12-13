const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const path = require('path');
var underscore = require("underscore");
var mongoose = require('mongoose');
var request = require("request");

  Guest = mongoose.model('Guest');

var token_Key="token-key";  

exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                role: req.body.role
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  };
  



exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            //token creation time-limit=1hour
            const token = jwt.sign(
              {
                email: user[0].email
              },
              token_Key,
              {
                expiresIn: "1h"
              }
            );
            //ask from (others what to do when role of user is found-out.....
            if(user[0].role == "Check-in manager"){
              console.log("Check-In Manager is logged in....");
            } else if(user[0].role == "General manager"){
              console.log("General manager is logged in....");
            } else if(user[0].role == "Hotel owner"){
              console.log("Hotel owner is logged in....");
            } else if(user[0].role == "State police"){
              console.log("State police is logged in....");
            } else if(user[0].role == "Zonal police"){
              console.log("Zonal police is logged in....");
            } else if(user[0].role == "National police"){
              console.log("National police is logged in....");
            } else{
              console.log("City police is logged in....");
            };
            return res.status(200).json({
              message: "Auth successful",
              TOKEN: token,
              role: user[0].role
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

exports.list_all_guest_single_filter = function(req, res) {

    var opt = req.params.opt;
    console.log(opt);
  Guest.find({}, function(err, guest) {

    if (err)
      res.send(err);
    
    console.log(opt);
    var filtered1 = underscore.where(guest, {City: opt});
    var filtered2 = underscore.where(guest, {Zone: opt});
    var filtered3 = underscore.where(guest, {HotelName: opt});
    console.log("1" + underscore.size(filtered1) + "2" + underscore.size(filtered2) +  "3" +filtered3);
    if (underscore.size(filtered1) != 0)
      res.json(filtered1);
    else if (underscore.size(filtered2) != 0)
      res.json(filtered2);
    else if (underscore.size(filtered3) != 0)
      res.json(filtered3);
    else
      res.json([]);



  });
};

exports.list_all_guest_double_filter = function(req, res) {
console.log(req.params.opt1 + req.params.opt2);
  Guest.find({}, function(err, guest) {

    if (err)
      res.send(err);
    var filtered1 = underscore.where(guest, {City: req.params.opt1});
    var filtered2 = underscore.where(filtered1, {HotelName: req.params.opt2});
    var filtered3 = underscore.where(filtered1, {Zone: req.params.opt2});
    if (underscore.size(filtered2) != 0)
      res.json(filtered2);
    else if (underscore.size(filtered3) != 0)
      res.json(filtered3);
    else
      res.json([]);
   
  });
};

exports.list_all_guest = function(req, res) {
  Guest.find({}, function(err, guest) {

    if (err)
      res.send(err);
    res.json(guest);
  });
};


exports.create_a_guest = function(req, res) {
  var xy = req.body;
  xy['file']=req.file.path;
  //console.log(xy);
  var new_guest = new Guest(xy);
  new_guest.save(function(err, guest) {
    if (err)
      res.send(err);
    res.json(guest);
    //console.log(xy);

  });
  var myJSON = JSON.stringify(xy);
  create_guest_composer (myJSON);
};


function create_guest_composer(xy){

var obj = JSON.parse(xy);
var options = { method: 'POST',
  url: 'http://35.247.129.253:3000/api/hotel.cto.Guest',
  body: obj,
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

}


exports.read_a_guest = function(req, res) {
  Guest.findById(req.params.guestId, function(err, guest) {
    if (err)
      res.send(err);
    res.json(guest);
    console.log(guest);
  });
};


exports.update_a_guest = function(req, res) {
  console.log("in update");
  Guest.findOneAndUpdate({_id: req.params.guestId}, req.body, {new: true}, function(err, guest) {
    
    if (err)
      res.send(err);
    res.json(guest);
  });
  var obj = req.body.VerificationStatus;
  var bar = req.body.BlackListStatus;
  var GuestId = req.body.GuestId;

  var body = req.body;

if (req.body.VerificationStatus == "Suspect") {
  suspect_tx(req.body.GuestId);
}

else if (req.body.VerificationStatus == "Verified"){
  Verified_tx(req.body.GuestId);
}

else if (req.body.BlackListStatus == "Requested"){
  Requested_tx(req.body.GuestId);
}

else if (req.body.BlackListStatus == "Approved"){
  Approved_tx(req.body.GuestId);

}

};


function suspect_tx(GuestId){

request.post({
   "headers": { "content-type": "application/json" },
   "url": "http://35.247.129.253:3000/api/hotel.cto.GuestSuspect",
   "body": JSON.stringify({
       "Guest" : 'hotel.cto.Guest#' + GuestId
   })
}, (error, response, body) => {
   if(error) {
       return console.dir(error);
   }
   console.dir(JSON.parse(body));
});

}

function Verified_tx(GuestId){
  
request.post({
   "headers": { "content-type": "application/json" },
   "url": "http://35.247.129.253:3000/api/hotel.cto.GuestVerified",
   "body": JSON.stringify({
       "Guest" : 'hotel.cto.Guest#' + GuestId
   })
}, (error, response, body) => {
   if(error) {
       return console.dir(error);
   }
   console.dir(JSON.parse(body));
});

}

function Requested_tx(GuestId){
  
  request.post({
   "headers": { "content-type": "application/json" },
   "url": "http://35.247.129.253:3000/api/hotel.cto.RequestBlacklist",
   "body": JSON.stringify({
       "Guest" : 'hotel.cto.Guest#' + GuestId
   })
}, (error, response, body) => {
   if(error) {
       return console.dir(error);
   }
   console.dir(JSON.parse(body));
});

}

function Approved_tx(GuestId){
  
request.post({
   "headers": { "content-type": "application/json" },
   "url": "http://35.247.129.253:3000/api/hotel.cto.ApproveBlacklist",
   "body": JSON.stringify({
       "Guest" : 'hotel.cto.Guest#' + GuestId
   })
}, (error, response, body) => {
   if(error) {
       return console.dir(error);
   }
   console.dir(JSON.parse(body));
});

}


























exports.delete_a_guest = function(req, res) {


  Guest.remove({
    _id: req.params.guestId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Guest successfully deleted' });
  });
};
