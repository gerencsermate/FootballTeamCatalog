const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Jatekos = db.model('Jatekos', {
    nev: String,
    szulDatum: Date,
    mezszam: Number,
    _csapata: {
        type: Schema.Types.ObjectId,
        ref: 'Csapat'
    }
});

module.exports = Jatekos;