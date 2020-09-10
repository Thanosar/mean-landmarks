const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
var Parse = require('parse/node');

Parse.initialize(process.env.APP_ID, process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;


router.get('/', async (req, res) => {
    try {
        const Landmarks = Parse.Object.extend("Landmarks");
        const query = new Parse.Query(Landmarks);
        query.ascending("order");
        const results = await query.find();

        if (results.length) {
            return res.status(200).json({data: results, success: true});
        }
    } catch (err) {
        return res.status(500).json({success: false, message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.send("Id not found");
            return;

        }
        const LandMarks = Parse.Object.extend("Landmarks");
        const query = new Parse.Query(LandMarks);
        query.get(id)
            .then((landmark) => {
                if (landmark) {
                    return res.status(200).json({data: landmark, success: true});
                }
            }, (error) => {
                res.send('Error ' + error);
            });
    } catch (err) {
        return res.status(500).json({success: false, message: error.message});
    }
});


router.put('/update/:id', authMiddleware, isAdminMiddleware, async (req, res) => {
    try {
        const id = req.params.id;

        const Landmark = Parse.Object.extend("Landmarks");
        const query = new Parse.Query(Landmark);
        const landmark = await query.get(id);

        if (!landmark) {
            return res.status(200).json({success: false, message: `Landmark with id ${id}, not found`});
        }

        const allowKeys = ["title", "short_info", "description", "location"];

        Object.keys(req.body || {}).forEach(key => {
            if (!allowKeys.includes(key)) {
                return;
            }

            if (key === "location") {
                const point = new Parse.GeoPoint({
                    latitude: req.body.location.latitude,
                    longitude: req.body.location.longitude
                });
                landmark.set("location", point)
            } else {
                landmark.set(key, req.body[key]);
            }
        });

        await landmark.save();

        return res.status(200).json({success: true, message: `Updated successfully`});

    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
});


router.put('/upload/image/:id', authMiddleware, isAdminMiddleware, async (req, res) => {
    try {
        const id = req.params.id;

        const Landmark = Parse.Object.extend("Landmarks");
        const query = new Parse.Query(Landmark);
        const landmark = await query.get(id);

        if (!landmark) {
            return res.status(200).json({success: false, message: `Landmark with id ${id}, not found`});
        }



        // const allowKeys = ["title", "short_info", "description", "location"];
        //
        // Object.keys(req.body || {}).forEach(key => {
        //     if (!allowKeys.includes(key)) {
        //         return;
        //     }
        //
        //     if (key === "location") {
        //         const point = new Parse.GeoPoint({
        //             latitude: req.body.location.latitude,
        //             longitude: req.body.location.longitude
        //         });
        //         landmark.set("location", point)
        //     } else {
        //         landmark.set(key, req.body[key]);
        //     }
        // });
        //
        // await landmark.save();

        return res.status(200).json({success: true, message: `Updated successfully`});

    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
});


module.exports = router;
