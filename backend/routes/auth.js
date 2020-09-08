const express = require('express');
const router = express.Router();
var Parse = require('parse/node');

Parse.initialize(process.env.APP_ID, process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;


router.post('/login', async(req,res) => {
  try{
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');


    // const user = await Parse.User.logIn("admin", "admin").then((res) => {
    //   console.log(res);
    // });


    var currentUser = Parse.User.current();


    console.log(currentUser);

  }catch(err){
    res.send('Error ' + err)
  }
});

router.post('/logout', async(req,res) => {
  try{
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    var currentUser = Parse.User.current();  // this will now be null
    console.log(currentUser);
    // Parse.User.logOut().then(() => {
    //   var currentUser = Parse.User.current();  // this will now be null
    //   console.log(currentUser);
    // });

  }catch(err){
    res.send('Error ' + err)
  }
});

router.post('/signOut', async(req,res) => {
  try{
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    var user = new Parse.User();
    user.set("username", "testUser");
    user.set("password", "testUser");
    user.set("email", "email@example.com");

    user.set("phone", "415-392-0202");
    const createdUser = await user.signUp();

   console.log(createdUser);

  }catch(err){
    res.send('Error ' + err)
  }
});


module.exports = router;
