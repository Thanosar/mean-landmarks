const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
var Parse = require('parse/node');

const multer = require('multer');
const sharp = require('sharp');

Parse.initialize(process.env.APP_ID, process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;


const storage = multer.memoryStorage();


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000
    },
    fileFilter: fileFilter
});


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


router.put('/upload/image/:id', authMiddleware, isAdminMiddleware, upload.single("image"), async (req, res) => {
    try {
        const id = req.params.id;

        const Landmark = Parse.Object.extend("Landmarks");
        const query = new Parse.Query(Landmark);
        const landmark = await query.get(id);

        if (!landmark) {
            return res.status(200).json({success: false, message: `Landmark with id ${id}, not found`});
        }

        const encodedFull = req.file.buffer.toString('base64');
        const parseImageFull = new Parse.File(req.file.originalname, {base64: encodedFull});
        await parseImageFull.save();

        const resized = await sharp(req.file.buffer).rotate().resize(250, 250).toBuffer();
        const encodedThumb = resized.toString('base64');

        const parseImageThumb = new Parse.File('thumbnail_'+req.file.originalname, {base64: encodedThumb});
        await parseImageThumb.save();


        landmark.set('photo', parseImageFull);
        landmark.set('photo_thumb', parseImageThumb);
        await landmark.save();
        return res.status(200).json({success: true, message: `Updated successfully`});

    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
});

router.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(200).send({ success: false, message: 'The system should not allow photos larger than 5MB to be uploaded'});
    }
});

module.exports = router;
