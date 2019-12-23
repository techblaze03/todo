var express = require('express');
var router = express.Router();
const User  = require('../models/user') ;
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
      {
        usernameField:'user[name]',
        passwordField:'user[password]'
      },
      (username,password,done)=>{
      //console.log('passport login');
      User.findOne({name:username},(err, doc)=>{
        if(err){
          return done(err);
        }
        if(!doc){
          return done(null, false);
        } 
        if(doc.password != password){
          return done(null,false);
        }
        return done(null,doc);
      })    
  }
));

passport.serializeUser((user,done)=>{
  done(null,user._id);
})

passport.deserializeUser((_id , done)=>{
  User.findOne({_id:_id},(err,user)=>{
    if(err){
      return err;
    }
    done(null , user) ;
  })
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',(req,res)=>{
  res.render('login');
})

router.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),(req,res)=>{
  res.redirect('/user/todos/');
})

router.get('/logout' ,(req,res)=>{
  req.logOut();
  res.redirect('/login');
})
router.get('/register',(req,res)=>{
  res.render('form');
})

router.post('/register',(req,res,next)=>{
  let user = req.body.user;
  User.findOne({name:user.name},(err,t)=>{
    if(err){
      console.log(err);
    }
    if(t){
      res.redirect('/login');
    }
    next();
  })

},(req,res)=>{
  // console.log(req.body);
  User.create(req.body.user,(err,doc)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(doc) ;
      console.log('created') ;
    }
    res.redirect('/login')
  })
})

module.exports = router;
