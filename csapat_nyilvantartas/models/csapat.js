const Schema = require('mongoose').Schema;
const db = require('../config/db');


const Csapat = db.model('Csapat', {
    nev: String,
    alapitasEve: Number
});

module.exports = Csapat;

