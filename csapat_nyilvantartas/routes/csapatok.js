const renderMw = require('../middleware/render/renderMW');

const getCsapatokMW = require('../middleware/csapat/getCsapatokMW');
const saveCsapatMW = require('../middleware/csapat/saveCsapatMW');
const getCsapatMW = require('../middleware/csapat/getCsapatMW');
const deleteCsapatMW = require('../middleware/csapat/deleteCsapatMW');
const updateCsapatMW = require('../middleware/csapat/updateCsapatMW');

const CsapatModel = require('../models/csapat');
const JatekosModel = require('../models/jatekos');

module.exports = function (app){
    const objectrepository={
        CsapatModel : CsapatModel,
        JatekosModel: JatekosModel
    };

    /**
     * Csapatok kilistázása
     */
    app.get('/csapatok',
        getCsapatokMW(objectrepository),
        renderMw(objectrepository, 'csapatok')
    );

    /**
     * Új csapat hozzáadása
     */
    app.use('/csapatok/new',
        saveCsapatMW(objectrepository),
        renderMw(objectrepository, 'csapat_szerkeszto')
    );

    /**
     * Csapat törlése
     */
    app.get('/csapatok/:csapatid/del',
        getCsapatMW(objectrepository),
        deleteCsapatMW(objectrepository),
        renderMw(objectrepository, 'csapatok')
    );

    /**
     * Csapat szerkesztése
     */
    app.use('/csapatok/:csapatid/szerkesztes',
        getCsapatMW(objectrepository),
        updateCsapatMW(objectrepository),
        renderMw(objectrepository, 'csapat_szerkeszto')
    );
};