/**
 *Megjelenít egy html oldalt
 */

const moment = require('moment');

module.exports = function (objectrepository, viewName){
    return function(req, res){
        res.render(viewName, {moment: moment});
    }
}