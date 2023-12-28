/**
 *Egy már létező csapat adatait szerkeszti az adatbázisban, ha helyesek az új adatok a /csapatok oldalra vezet, egyébként a /csapatok/:csapatid/szerkesztes oldalra vezet
 */
module.exports = function (objectrepository){
    return function(req, res, next){
        if((typeof req.body.nev === 'undefined') || (typeof req.body.alapitasEve === 'undefined')){
            return next();
        }
        res.locals.csapat.nev = req.body.nev;
        res.locals.csapat.alapitasEve = req.body.alapitasEve;
        res.locals.csapat.save()
            .then(() => {
                return res.redirect('/csapatok');
            })
            .catch((err) => {return next(err)});
    }
}