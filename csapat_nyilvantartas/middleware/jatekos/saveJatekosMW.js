/**
 *Felvesz egy új csapatot az adatbázisba, ha sikeres a felvétel visszatér a /:csapatid/jatekosok oldalra, egyébként a /:csapatid/jatekosok/new oldalra vezet
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository){
    return function(req, res, next){
        const JatekosModel = requireOption(objectrepository, 'JatekosModel');
        if((typeof req.body.nev === 'undefined') || (typeof req.body.szulDatum === 'undefined') || (typeof req.body.mezszam ==='undefined')){
            return next();
        }

        if(typeof res.locals.jatekos === 'undefined'){
            res.locals.jatekos = new JatekosModel();
            res.locals.jatekos.nev = req.body.nev;
            res.locals.jatekos.szulDatum = req.body.szulDatum;
            res.locals.jatekos.mezszam = req.body.mezszam;
            res.locals.jatekos._csapata = res.locals.csapat._id;
            res.locals.jatekos.save()
                .then(() => {
                    return res.redirect(`/${res.locals.csapat._id}/jatekosok`);})
                .catch((err) => {return next(err);});
        }
    }
}