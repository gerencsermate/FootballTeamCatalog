/**
 *Törli a megadott csapatot és visszatér a /csapatok oldalra
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository){
    const csapatModel = requireOption(objectrepository, 'CsapatModel');
    const  jatekosModel = requireOption(objectrepository, 'JatekosModel');

    return function(req, res, next){
        if(typeof res.locals.csapat === 'undefined'){
            return next();
        }
        csapatModel.deleteOne({_id: res.locals.csapat._id})
            .then(()=>{
                jatekosModel.deleteMany({_csapata: res.locals.csapat._id})
                    .then(() => {return res.redirect('/csapatok');})
                    .catch((err) => {return next(err);});
            })
            .catch((err) => {return next(err);});
    }
}