/**
 *Kilistázza az adatbázisban szereplő csapatokat
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository){
    const CsapatModel = requireOption(objectrepository, 'CsapatModel');

    return function(req, res, next) {
        CsapatModel.find({})
            .then(csapatok => {
                res.locals.csapatok = csapatok;
                return next();
            })
            .catch(err => {return next(err)});
    }
}