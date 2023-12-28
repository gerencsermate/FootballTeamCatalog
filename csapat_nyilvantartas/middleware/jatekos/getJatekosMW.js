/**
 * Visszaadja a megadott azonosítójú játékos adatait
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository){
    return function(req, res, next){
        const JatekosModel = requireOption(objectrepository, 'JatekosModel');

        JatekosModel.findOne({_id: req.params.jatekosid})
            .then((jatekos) =>{
                if(!jatekos){
                    throw ('Nincs ilyen jatekos!');
                }
                res.locals.jatekos = jatekos;
                return next();
            })
            .catch((err) => {return next(err);});
    }
}