/**
 *Visszaadja a megadott azonosítójú csapat adatait
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository){
    const CsapatModel = requireOption(objectrepository, 'CsapatModel');

    return function(req, res, next){
        CsapatModel.findOne({_id:req.params.csapatid})
            .then(csapat => {
                if(!csapat){
                    return next('Nincs ilyen csapat!');
                }
                res.locals.csapat = csapat;
                return next();
            })
            .catch(err => {return next(err);});
    }
}