const express = require('express');
const router = express.Router();
var Parse = require('parse/node');

Parse.initialize(process.env.APP_ID, process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;


const authMiddleware = async (req, res, next) => {
  try {
    const sessionToken = req.header("token");

    console.log(sessionToken);
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

router.get('/', async(req,res) => {
  try{

    const Landmarks = Parse.Object.extend("Landmarks");
    const query = new Parse.Query(Landmarks);
    query.ascending("order");
    const results = await query.find();

     if (results.length) {
       return res.status(200).json({data: results, success: true});
     }
  } catch(err) {
    return res.status(500).json({success: false, message: error.message });
  }
});

router.get('/:id', async(req,res) => {
  try{
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
  } catch (err){
    return res.status(500).json({success: false, message: error.message });
  }
});



router.put('/update/:id', authMiddleware, async (req,res) => {
  try{
    const id = req.params.id;

    const Landmark = Parse.Object.extend("Landmarks");
    const query = new Parse.Query(Landmark);
    const landmark = await query.get(id);

    if (!landmark) {
      return res.status(200).json({ success: false, message: `Landmark with id ${id}, not fount` });
    }

    if(req.body.title) landmark.set("title", req.body.title);
    if(req.body.short_info) landmark.set("short_info", req.body.short_info);
    if(req.body.description) landmark.set("description", req.body.description);
    if(req.body.url) landmark.set("order", req.body.order);
    if(req.body.location) {
      const point = new Parse.GeoPoint({latitude: req.body.location.latitude, longitude: req.body.location.longitude});
      landmark.set("location", point)
    }
    await landmark.save();

    return res.status(200).json({ success: true, message: `Updated successfully`});

  }catch(err){
    return res.status(500).json({ success: false, message: err.message });
  }
});



module.exports = router;
