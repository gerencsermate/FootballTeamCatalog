/*const csapatModel = require('./models/csapat');

let egyCsapat = new csapatModel();

egyCsapat.nev = 'Csapat2';
egyCsapat.alapitasEve = 2000;

egyCsapat.save().then(() =>{
   const jatekosModel = require('./models/jatekos');

   let egyJatekos = new jatekosModel();

   egyJatekos.nev = 'Pelda Joska';
   egyJatekos.szulDatum = new Date("2002-11-04");
   egyJatekos.mezszam = 5;
   egyJatekos._csapata = egyCsapat;

   egyJatekos.save();
});*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {urlencoded} = require("express");



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

require('./routes/outside')(app);
require('./routes/csapatok')(app);
require('./routes/jatekosok')(app);

//app.use(express.static('static'));

app.use((err, req, res, next) =>{
   res.end('Problem!');
   console.log(err);
});

var  server = app.listen(3000, function (){console.log("On: 3000")});