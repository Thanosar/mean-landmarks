const express = require('express');
const router = express.Router();
var Parse = require('parse/node');

Parse.initialize(process.env.APP_ID, process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;

Parse.User.enableUnsafeCurrentUser();

const authMiddleware = async (req, res, next) => {
    try {

        const sessionToken = req.header("token");

        const session = await new Parse.Query("_Session")
            .equalTo("sessionToken", sessionToken)
            .first({useMasterKey: true});

        if (!session) {
            res.sendStatus(401);
        } else {
            next();
        }
    } catch (e) {
        res.json({success: false, message: e});
    }

};

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

router.get('/logout', async (req, res) => {
    try {

        await Parse.User.logOut();
        var currentUser = Parse.User.current();
        res.json(currentUser)


    } catch (err) {
        res.send('Error ' + err)
    }
});


router.post('/isLoggedIn', authMiddleware, async (req, res) => {
    try {

        const token = req.body || null;


        if (token) {
            await Parse.User.become(token);

        }

        var currentUser = await Parse.User.current();  // this will now be null

        res.json(currentUser);

    } catch (err) {
        res.json({success: false, message: err});
    }
});

router.get('/test', async (req, res) => {
    try {



        var currentUser = await Parse.User.current();  // this will now be null

        res.json(currentUser);

    } catch (err) {
        res.send('Error ' + err)
    }
});


module.exports = router;
