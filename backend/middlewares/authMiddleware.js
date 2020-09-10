const authMiddleware = async (req, res, next) => {
    try {
        const sessionToken = req.header("token");

        const session = await new Parse.Query("_Session")
            .equalTo("sessionToken", sessionToken)
            .first({useMasterKey: true});

        if (!session) {
            res.sendStatus(401);
        } else {
            req.user = session.get("user").id;
            next();
        }
    } catch (e) {
        res.json({success: false, message: e});
    }

};



module.exports = authMiddleware;
