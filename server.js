const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const researcherRoutes = require('./server/routes/researcherRoutes');
const studyRoutes = require("./server/routes/studyRoutes");
const trialRoutes = require("./server/routes/trialRoutes");
const {
  MONGO_DB_CONNECTION_STRING
} = require("./server/env.js");


mongoose.connect(MONGO_DB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch(e => {
    console.error("There was an error connecting to MongoDB:");
    console.error(e);
  });


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  next();
});


app.use("/researcher", researcherRoutes);
app.use("/study", studyRoutes);
app.use("/trial", trialRoutes);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server live on ${PORT}`)
});
