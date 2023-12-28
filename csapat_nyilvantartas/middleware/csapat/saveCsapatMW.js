/**
 *Felvesz egy új csapatot az adatbázisba, ha sikeres a felvétel visszatér a /csapatok oldalra, egyébként a /csapatok/new oldalra vezet
 */
const requireOption = require('../requireOption');
//const {locals} = require("express/lib/application");

module.exports = function (objectrepository){
    const CsapatModel = requireOption(objectrepository, 'CsapatModel');

    return function(req, res, next){
        if((typeof req.body.nev === 'undefined') || (typeof req.body.alapitasEve === 'undefined')) {
            return next();
        }
        if(typeof res.locals.csapat === 'undefined'){
            res.locals.csapat = new CsapatModel();
            res.locals.csapat.nev = req.body.nev;
            res.locals.csapat.alapitasEve = req.body.alapitasEve;
            res.locals.csapat.save()
                .then(() => {
                    return res.redirect(`/${res.locals.csapat._id}/jatekosok`);
                })
                .catch((err) => {return next(err)});
        }


    }
}