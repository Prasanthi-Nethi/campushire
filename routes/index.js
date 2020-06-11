var express = require('express');
var router = express.Router();
var monk = require('monk');
var moment  = require('moment');
var db = monk('localhost:27017/campushire');
var admin = db.get('admin');
var students = db.get('students');
var education = db.get('education');
var company = db.get('company');
var vacancy = db.get('vacancy');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/admin', function(req, res) {
  res.render('admin')
});
router.get('/about', function(req, res) {
  res.render('about')
});
router.get('/logout',function(req,res){
  req.session.reset()
  res.redirect('/')
})
router.get('/admindashboard', function(req, res) {
  if(req.session && req.session.user){
    console.log(req.session.user)
    res.locals.user = req.session.user
    res.render('admindashboard')
  }
  else{
    req.session.reset()
    res.redirect('/admin')
  }
});
router.get('/view_com', function(req, res) {
  res.render('view_com')
});
router.get('/view_stu', function(req, res) {
  res.render('view_stu')
});
router.get('/contact', function(req, res) {
  res.render('contact')
});
router.get('/com_login', function(req, res) {
  res.render('com_login')
});
router.get('/com_up', function(req, res) {
  res.render('com_up')
});
router.get('/company_dashboard', function(req,res){
  if(req.session && req.session.user){
    console.log(req.session.user)
    res.locals.user = req.session.user
    res.render('company_dashboard');
  }
  else{
    req.session.reset()
    res.redirect('/com_login')
  }
});
router.get('/stu_in', function(req, res) {
  res.render('stu_in')
});
router.get('/stu_up', function(req, res) {
  res.render('stu_up')
});
router.get('/stu_home', function(req, res) {
  res.render('stu_home')
});
router.get('/stu_dash', function(req, res) {
  if(req.session && req.session.user){
    console.log(req.session.user)
    res.locals.user = req.session.user
    res.render('stu_dash')
  }
  else{
    req.session.reset()
    res.redirect('/stu_in')
  }
});
router.get('/Applyjob', function(req, res) {
  res.render('Applyjob')
});
router.get('/forgot', function(req, res) {
  res.render('forgot')
});
// admin login
router.post('/adminlogin', function(req, res) {
  var email =  req.body.email;
  var password = req.body.password;
  admin.findOne({"email":email,"password":password}, function(err,docs){
    console.log(docs);
    if(!docs){
      res.sendStatus(500);
    }
    else{
      delete docs.password
      req.session.user = docs
      res.sendStatus(200);
    }
  });
});
// student Signup
router.post('/postsignupdata', function(req, res) {
  students.findOne({"email":req.body.email,"fname":req.body.fname},function(err,docs){
    if(err || docs==null){
      students.insert(req.body, function(err,docs){
        if(err){
          res.sendStatus(500);
        }
        else{
          res.sendStatus(200);
        }
      })
    }
    else{
      res.sendStatus(500)
    }
  })
  
});
// student Login
router.post('/studentindata', function(req, res) {
  var email =  req.body.Email;
  var password = req.body.Password;
  students.findOne({"email":email,"password":password}, function(err,docs){
    console.log(docs);
    if(!docs){
      res.sendStatus(500);
    }
    else{
      delete docs.password
      req.session.user = docs
      res.sendStatus(200);
    }
  });
});
// Education Data
router.post('/educationData', function(req, res) {
  if(req.session && req.session.user){
    var data = {
      email: req.session.user.email,
      secondary: req.body.secondary,
      secondaryyear: req.body.secondaryyear,
      secondarypercentage : req.body.secondarypercentage,
      secondarycgpa:req.body.secondarycgpa,
      seniorsecondary:req.body.seniorsecondary,
      senioryear:req.body.senioryear,
      seniorpercentage: req.body.seniorpercentage,
      seniorcgpa:req.body.seniorcgpa,
      graduation:req.body.graduation,
      graduationyear:req.body.graduationyear,
      graduationpercentage:req.body.graduationpercentage,
      graduationcgpa:req.body.graduationcgpa,
      others:req.body.others
    }
    education.insert(data, function(err,docs){
      if(err){
        res.sendStatus(500);
      }
      else{
        res.sendStatus(200);
      }
    })
  }
});
//find education
router.get('/geteducationData', function(req, res) {
  if(req.session && req.session.user){
    education.find({"email":req.session.user.email},function(err,docs){
      if(err){
        res.sendStatus(500);
      }
      else{
        console.log(docs);
        res.send(docs);
      }
    })
  }
});
//Update Education Data
router.put('/updateeducationData/:id', function(req, res) {
  education.update({"_id":req.params.id},{$set:req.body} ,function(err,docs){
    if(err){
      res.sendStatus(500);
    }
    else{
      res.sendStatus(200);
    }
  })
});
//Remove Education Data
router.delete('/removeeducationData/:id', function(req, res) {
  education.remove({"_id":req.params.id}, function(err,docs){
    if(err){
      res.sendStatus(500);
    }
    else{
      res.sendStatus(200);
    }
  })
});
// company Signup
router.post('/postcompanydata', function(req, res) {
  company.findOne({"Email":req.body.Email,"name":req.body.name},function(err,docs){
    if(err || docs==null){
      company.insert(req.body, function(err,docs1){
        if(err){
          res.sendStatus(500);
        }
        else{
          res.sendStatus(200);
        }
      })
    }
    else{
      res.sendStatus(500)
    }
  })
  
});
// company Login
router.post('/companyindata', function(req, res) {
  var email =  req.body.Email;
  console.log(email);
  var password = req.body.password;
  console.log(password);
  company.findOne({"Email":email,"password":password}, function(err,docs){
    console.log(docs);
    if(!docs){
      res.sendStatus(500);
    }
    else{
      delete docs.password
      req.session.user = docs
      res.sendStatus(200);
    }
  });
});
// Vacancy Data
router.post('/postVacancyData', function(req, res) {
  var data = {
    companyname: req.body.companyname,
    title : req.body.title,
    salary : req.body.salary,
    description : req.body.description,
    location : req.body.location,
    openings : req.body.openings,
    date : moment(req.body.date).format('DD-MM-YYYY'),
    lastdate : moment(req.body.lastdate).format('DD-MM-YYYY')
  }
  vacancy.insert(data, function(err,docs){
    if(err){
      res.sendStatus(500);
    }
    else{
      res.sendStatus(200);
    }
  })
});
router.get('/getVacancyData',function(req,res){
  vacancy.find({},function(err,docs){
    if(err){
      res.sendStatus(500);
    }
    else{
      res.send(docs);
    }
  })
})



//admin student
router.get('/getstudentdata', function(req, res) {
  
  students.find({}, function(err,docs){
    if(err){
      res.sendStatus(500);
    }
    else{
      console.log(docs)
      // res.sendStatus(200);
      res.send(docs)
    }
  })
});

router.post('/removestudentdata', function(req, res) {
  
  students.remove({"_id":req.body._id}, function(err,docs){
    if(err){
      res.sendStatus(500);
    }
    else{
      // console.log(docs)
      // res.sendStatus(200);
      res.send(docs)
    }
  })
});

router.post('/updatestudentdata', function(req, res) {
  
  students.update({"_id":req.body._id},{$set:{'fname':req.body.fname,'email':req.body.email,'phoneno':req.body.phoneno}}, function(err,docs){
    if(err){
      res.sendStatus(500);
    }
    else{
      // console.log(docs)
      // res.sendStatus(200);
      res.send(docs)
    }
  })
});

module.exports = router;
