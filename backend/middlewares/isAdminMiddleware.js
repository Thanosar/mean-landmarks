const isAdminMiddleware = async (req, res, next) => {
    try {

        const admin = await new Parse.Query(Parse.Object.extend("_Role"))
            .equalTo("name", "admin")
            .first({useMasterKey: true});

        if (!admin) {
            res.sendStatus(401);
            return;
        }

        const user = await new Parse.Relation(admin, "users")
            .query()
            .equalTo("objectId", req.user)
            .first({useMasterKey: true});


        if (!user) {
            res.sendStatus(401);
            return;
        }
        next();
    } catch (e) {
        res.json({success: false, message: e});
    }

};



module.exports = isAdminMiddleware;
