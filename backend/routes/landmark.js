const express = require('express');
const router = express.Router();
var Parse = require('parse/node');

Parse.initialize(process.env.APP_ID, process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;


router.get('/', async(req,res) => {
  try{

    const Landmarks = Parse.Object.extend("Landmarks");
    const query = new Parse.Query(Landmarks);
    query.ascending("order");
    const results = await query.find();

     if (results.length) {
        res.json({data: results, success: true});
     } else {
       res.json({data: [], success: false});
     }
  }catch(err){
    res.send('Error ' + err)
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
          res.json({data: landmark, success: true});
        } else {
          res.json({data: [], success: false});
        }
      }, (error) => {
        res.send('Error ' + error);
      });
  }catch(err){
    res.send('Error ' + err)
  }
});

module.exports = router;
