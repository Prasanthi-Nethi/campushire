var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/aditya');
var collection = db.get('users');
var signup = db.get('signup');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/admin', function(req, res) {
  res.render('admin')
});
router.get('/com_login', function(req, res) {
  res.render('com_login')
});
router.get('/com_up', function(req, res) {
  res.render('com_up')
});
router.get('/stu_in', function(req, res) {
  res.render('stu_in')
});
router.get('/stu_up', function(req, res) {
  res.render('stu_up')
});
router.get('/forgot', function(req, res) {
  res.render('forget')
});
router.post('/post signup', function(req,res){
  signup.insert(req.body, function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      res.send(docs);
    }
  });
});

router.post('/post login', function(req,res){
  var email1 = req.body.email;
  var password1 = req.body.password;
  signup.findOne({"email":email1,"password":password1}, function(err,docs){
    if(docs){
      res.send(docs);
    }
    else{
      res.sendStatus(500);
    }
  });
});

module.exports = router;


