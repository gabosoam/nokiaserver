/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

var bcrypt = require('bcrypt-nodejs');

var generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  'POST /login': function (req, res) {
    var body = req.body;
    User.findOne({ username: body.username }).exec(function (err, usuario) {
      if (err) {
        return res.serverError(err);
      }
      if (!usuario) {
        return res.notFound('No existe el usuario');
      }

      if(!bcrypt.compareSync(body.password, usuario.password)){
        return res.notFound('Contraseña incorrecta');
      }
      req.session.me = usuario.id;
      return res.ok(usuario);
    });
  },

  '/actasing': function (req, res) {
    var body = req.body;

    User.query('SELECT * FROM v_infobill WHERE type=1 ORDER BY id DESC' , function(err, data) {
  
      return res.ok(data);
    })

  
  },

  '/actasent': function (req, res) {
    var body = req.body;

    User.query('SELECT * FROM v_infobill WHERE type=2 ORDER BY id DESC', function(err, data) {
   
      return res.ok(data);
    })

  
  },

  'POST /actualizaracta': function (req, res) {
    var data = req.body;

    User.query("UPDATE `bill` SET `state`=? WHERE (`id`=?) LIMIT 1",[data.valor, data.acta], function(err, data2) {
   
      User.query('SELECT * FROM v_infobill WHERE id=? ORDER BY id DESC',[data.acta], function(err, datos) {
   
        return res.ok(datos);
      })
     
    })

  
  },

  'POST /obtenerunaacta': function (req, res) {
    var data = req.body;
      User.query('SELECT * FROM v_infobill WHERE id=? ORDER BY id DESC',[data.acta], function(err, datos) {
        return res.ok(datos);
      })
  },

  'POST /obtenerseries': function (req, res) {
    var data = req.body;
      User.query("SELECT * FROM v_existencias WHERE barcode LIKE '%"+data.valor+"%' OR code LIKE '%"+data.valor+"%' OR description LIKE '%"+data.valor+"%'", function(err, datos) {
        return res.ok(datos);
      })
  },

  'POST /obtenerdetalle': function (req, res) {
    var data = req.body;

    User.query("SELECT * FROM v_billdetail WHERE bill=?",[data.acta], function(err, data) {
   
      return res.ok(data);
    })

  
  },

  'POST /obtenerdetallehistorial': function (req, res) {
    var data = req.body;

    User.query("SELECT * FROM v_historico WHERE product=?",[data.producto], function(err, data) {
   
      return res.ok(data);
    })

  
  },


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
