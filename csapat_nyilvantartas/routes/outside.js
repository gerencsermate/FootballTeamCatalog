var renderMW = require('../middleware/render/renderMW');

var getCsapatokMW = require('../middleware/csapat/getCsapatokMW')

module.exports = function (app){
  var objectRepository;

    /**
     * Főoldal betöltése
     */
  app.get('/',
      renderMW(objectRepository, 'index')
  );

  /**
   * Tovább a csapatok listájára
   */
  /**app.get('/csapatok',
      getCsapatokMW(objectRepository),
      renderMW(objectRepository, 'csapatok')
  )*/
};