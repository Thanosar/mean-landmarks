require('dotenv').config();
var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var ParseDashboard = require('parse-dashboard');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var port = process.env.SERVER_PORT || 5000;
var httpServer = require('http').createServer(app);
var landmarkRoutes = require('./routes/landmark');
var authRoutes = require('./routes/auth');
var options = {allowInsecureHTTP: false};


app.use(cors());
app.use(bodyParser());

var api = new ParseServer({
  databaseURI: process.env.DB_URI,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  fileKey: process.env.FILE_KEY,
  serverURL: process.env.SERVER_URL,
  liveQuery: {
    classNames: ["Landmarks"]
  }
});
var dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: process.env.SERVER_URL,
      appId: process.env.APP_ID,
      masterKey: process.env.MASTER_KEY,
      appName: process.env.APP_NAME,
      primaryBackgroundColor: "rgb(255, 0, 0)",
      secondaryBackgroundColor: "rgb(204, 0, 0)"
    }
  ]

}, options);

app.use('/dashboard', dashboard);
app.use('/parse', api);
app.use('/landmark', landmarkRoutes);
app.use('/auth', authRoutes);

httpServer.listen(port, function() {
  console.log('parse-server-example running on port ' + port + '.');
});
ParseServer.createLiveQueryServer(httpServer);
