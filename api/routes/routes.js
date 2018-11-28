'use strict';
const express = require("express")
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');//for importing check-auth middleware

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req,file,cb){
    cb(null,file.originalname)
  }
});
const upload = multer({storage: storage});


const UserController = require('../controllers/controller');

router.post("/signup", UserController.user_signup);
router.post("/login", UserController.user_login);


//guest routes
router.get('/guest/filters/:opt1/:opt2', checkAuth,  UserController.list_all_guest_double_filter);
router.get('/guest/filters/:opt', checkAuth, UserController.list_all_guest_single_filter);

router.get('/guest', checkAuth, UserController.list_all_guest);
router.post("/guest", checkAuth, upload.single('file'), UserController.create_a_guest);

router.get('/guest/:guestId', checkAuth, UserController.read_a_guest);
router.put('/guest/:guestId', checkAuth, UserController.update_a_guest);
router.delete('/guest/:guestId', checkAuth, UserController.delete_a_guest);


module.exports = router;

/*
module.exports = function(app) {
  var guestList = require('../controllers/controller');

  // guestList Routes
  app.route('/guest')
    .get(guestList.list_all_guest)
    .post(guestList.create_a_guest);


  app.route('/guest/:guestId')
    .get(guestList.read_a_guest)
    .put(guestList.update_a_guest)
    .delete(guestList.delete_a_guest);
  
};
*/