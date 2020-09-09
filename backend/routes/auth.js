const express = require('express');
const router = express.Router();
var Parse = require('parse/node');

Parse.initialize(process.env.APP_ID, process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;


router.post('/login', async (req, res) => {
    try {

        if (!req.body.username || !req.body.password) {
            return res.json({success: false, message: "Password or Username is missing"});
        }

        const user = await Parse.User.logIn(req.body.username, req.body.password);

        if (user) {
            res.json({data: user, success: true});
        }

    } catch (err) {
        res.json({success: false, message: err});
    }
});

router.post('/logout', async (req, res) => {
    try {

        var currentUser = Parse.User.current();  // this will now be null
        console.log(currentUser);
        // Parse.User.logOut().then(() => {
        //   var currentUser = Parse.User.current();  // this will now be null
        //   console.log(currentUser);
        // });

    } catch (err) {
        res.send('Error ' + err)
    }
});


router.post('/isLoggedIn', async (req, res) => {
    try {

        const token = req.body.token || null;
        if (token) {
            await Parse.User.become(token);
        }

        var currentUser = await Parse.User.current();  // this will now be null

        res.json(currentUser);

    } catch (err) {
        res.send('Error ' + err)
    }
});


module.exports = router;
