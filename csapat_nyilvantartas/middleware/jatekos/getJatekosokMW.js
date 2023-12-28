/**
 * Kilistázza az adatbázisből a megadott csapat játékosait
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository){
    return function(req, res, next){
        const JatekosModel = requireOption(objectrepository, 'JatekosModel');

        JatekosModel.find({_csapata: res.locals.csapat.id})
            .then((jatekosok) => {
                res.locals.jatekosok = jatekosok;
                return next();
            })
            .catch((err) => {return next(err);});
    }
}