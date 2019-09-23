const knex= require('knex');
const config = require('../knexfile');
const md5 = require('md5');
var path = require('path');
const dbClient=knex(config);

var jwt = require('jsonwebtoken');
const tokenconfig = require('../config');





function registerHandler(req,res){
  let username = req.body.username;
  let password = req.body.password;
  let userFname = req.body.userFname;
  let userLname = req.body.userLname;
  let pwd=md5(password);
  
  dbClient('users').where({ username: username})
  .select('username')
  .then(function(result) {
    // checking if users is registered or not
    // if user is not registered then only allow to register
    if (!result || !result[0])  {
      
      dbClient
      .table('users')
      .insert({
        //this must be same for database's column
        username: username,
        password: pwd,
        userFname: userFname,
        userLname: userLname
      })
      .then(data => {
        res.json({
          success: 'true',
          status: 'success',
          data: {
            username: username,
          }
        })
      })
      .catch(error => {
        console.log(error);
        res.json({
          success: 'fail',
          status: 'fail',
        })
      })
    }
    else{
      return res.status(400).json({
        message: 'Username already exists'
      })
    }
  })
  .catch(function(error) {
    console.log(error);
  });
}

function loginHandler(req,res){
  let username = req.body.username;
  let password = req.body.password;
  let pwd=md5(password);
  console.log(username);
  console.log(password);

  dbClient('users').where({ username: username})
.select('password','userId')
.then(function(result) {
  if (!result || !result[0])  {
      return res.status(400).json({
          message: 'Invalid Username'
        });
  }
  var pass = result[0].password;
  if (pwd === pass) {
      let token = jwt.sign({username: username},
          tokenconfig.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        return res.json({
          status: 'success',
          success: 'true',
          userId: result[0].userId,
          token: token
        });
  } else {
      return res.status(400).json({
          message: 'Incorrect username or password'
        });    }
})
.catch(function(error) {
  console.log(error);
});   
}




module.exports = {
    'register':registerHandler,
    'login' : loginHandler,
 }