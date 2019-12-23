var express = require('express');
var router = express.Router();
let User = require('../models/user');

// authentication check function 

  function isLogged(req,res,next){
      if(!req.user){
        res.redirect('/login');
      }
      next();
  } 
// read 
router.get('/todos', isLogged,(req, res) => {
    let tasks = req.user.tasks;
    console.log(tasks);
    res.render('todos',{tasks})

})

//create 
router.post('/todos', isLogged,(req, res) => {
  let desc = req.body.task.desc;
  if (desc == null || desc == undefined || desc.length <= 1) {
    res.redirect('/user/todos');
  } else {
    let _id = req.user._id ;
    User.findOne({_id},(err,user)=>{
      user.tasks.push({desc});
      user.save((err,user)=>{
        if(err){
          console.log(err);
        }
        // console.log(user);
        res.redirect('/user/todos');
      })
    })
  }
})

// update 
router.put('/todos/:id', (req, res) => {
  let task = req.body.task ;
  let _id = req.params.id ;
  if(task.desc){
  User.updateOne({'tasks._id':_id},{
    "$set":{
      'tasks.$.desc':task.desc
    }
  },(err, r)=>{
    if(err){
      console.log(err);
    }
    console.log(r);
  })
}
if(task.status){
  User.updateOne({'tasks._id':_id},{
    "$set":{
      'tasks.$.status':task.status
    }
  },(err, r)=>{
    if(err){
      console.log(err);
    }
    console.log(r);
  })
}


  // res.send('update');
  res.redirect('/user/todos')

})


// delete 
router.delete('/todos/:id', (req, res) => {
  let _id = req.params.id;
  User.findOne({_id:req.user._id},(err, user)=>{
    user.tasks.pull(_id);
    user.save((err,r)=>{
      if(err){
        console.log(err);
      }
      console.log(r);
    })
  })
  // res.send('delete');
res.redirect('/user/todos')
})

module.exports = router;
