const express = require('express');
const router = express.Router();
var Parse = require('parse/node');

Parse.initialize(process.env.APP_ID, process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;

Parse.User.enableUnsafeCurrentUser();

router.post('/login', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return await res.json({success: false, message: "Password or Username is missing"});
        }
        const user = await Parse.User.logIn(req.body.username, req.body.password);

        if (user) {
          return res.status(200).json({data: user, success: true});
        }
    } catch (err) {
        res.json({success: false, message: err});
    }
});

router.post('/logout', async (req, res) => {
    try {
      const sessionToken  = req.body.token;
      const session = await new Parse.Query("_Session")
        .equalTo("sessionToken", sessionToken)
        .first({useMasterKey: true});

      await session.destroy()

    } catch (err) {
      return res.status(500).json({success: false, message: err.message });
    }
});


router.post('/isLoggedIn', async (req, res) => {
    try {

      const sessionToken  = req.body.token;
      const session = await new Parse.Query("_Session")
        .equalTo("sessionToken", sessionToken)
        .first({useMasterKey: true});

      res.json(session);

    } catch (err) {
        res.json({success: false, message: err});
    }
});


module.exports = router;
