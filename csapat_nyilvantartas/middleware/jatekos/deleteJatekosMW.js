/**
 *Törli a megadott játékost és visszatér a /:csapatid/jatekosok oldalra
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository){
    return function(req, res, next){
        const JatekosModel = requireOption(objectrepository, 'JatekosModel');
        if(typeof res.locals.jatekos === 'undefined'){
            console.log('HMMM');
            return next();
        }

        JatekosModel.deleteOne({_id: req.params.jatekosid})
            .then(() => {return res.redirect(`/${res.locals.csapat._id}/jatekosok`);})
            .catch((err) => {return next();});
    }
}