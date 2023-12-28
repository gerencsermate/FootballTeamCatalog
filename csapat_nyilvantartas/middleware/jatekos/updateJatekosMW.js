/**
 *Egy már létező csapat adatait szerkeszti az adatbázisban, ha helyesek az új adatok a /:csapatid/jatekosok oldalra vezet, egyébként a /:csapatid/jatekosok/:jatekosid/szerkesztes oldalra vezet
 */
module.exports = function (objectrepository){
    return function(req, res, next){
        if(typeof req.body.nev === 'undefined' || typeof req.body.szulDatum === 'undefined' || typeof req.body.mezszam ==='undefined'){
            return next();
        }
        res.locals.jatekos.nev = req.body.nev;
        res.locals.jatekos.szulDatum = req.body.szulDatum;
        res.locals.jatekos.mezszam = req.body.mezszam;
        res.locals.jatekos.save()
            .then(() => {return res.redirect(`/${res.locals.csapat._id}/jatekosok`);})
            .catch((err) => {return next(err);});
    }
}