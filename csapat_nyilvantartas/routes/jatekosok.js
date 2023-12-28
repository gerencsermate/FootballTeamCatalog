const renderMW = require('../middleware/render/renderMW');

const getJatekosokMW = require('../middleware/jatekos/getJatekosokMW');
const saveJatekosMW = require('../middleware/jatekos/saveJatekosMW');
const getJatekosMW = require('../middleware/jatekos/getJatekosMW');
const deleteJatekosMW = require('../middleware/jatekos/deleteJatekosMW');
const updateJatekosMW = require('../middleware/jatekos/updateJatekosMW');

const getCsapatMW = require('../middleware/csapat/getCsapatMW');

const CsapatModel = require('../models/csapat');
const JatekosModel = require('../models/jatekos');

module.exports = function (app){
  const objectrepository={
    CsapatModel : CsapatModel,
    JatekosModel : JatekosModel
  };

    /**
     * Egy csapat jatekosainak kilistázása
     */
    app.get('/:csapatid/jatekosok',
        getCsapatMW(objectrepository),
        getJatekosokMW(objectrepository),
        renderMW(objectrepository, 'jatekosok')
    )

    /**
     * Új játékos hozzáadása
     */
    app.use('/:csapatid/jatekosok/new',
        getCsapatMW(objectrepository),
        saveJatekosMW(objectrepository),
        renderMW(objectrepository, 'jatekos_szerkeszto')
    )

    /**
     * Játékos törlése
     */
    app.get('/:csapatid/jatekosok/:jatekosid/del',
        getCsapatMW(objectrepository),
        getJatekosMW(objectrepository),
        deleteJatekosMW(objectrepository),
        renderMW(objectrepository, 'jatekosok')
    )

    /**
     * Játékos adatinak szerkesztése
     */
    app.use('/:csapatid/jatekosok/:jatekosid/szerkesztes',
        getCsapatMW(objectrepository),
        getJatekosMW(objectrepository),
        updateJatekosMW(objectrepository),
        renderMW(objectrepository, 'jatekos_szerkeszto')
    )
};