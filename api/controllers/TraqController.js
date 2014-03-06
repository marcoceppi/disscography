/**
 * TraqController
 *
 * @module      :: Controller
 * @description  :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var util = require('util');

module.exports = {
  new: function(req, res) {
    Album.find(function(err, albums) {
      if(err) return next(err);
      res.view({
        albums: albums
      });
    });
  },

  create: function(req, res, next) {
    Traq.create(req.body, function(err, record) {
      if(err) return next(util.inspect(err, {depth: null}));
      res.redirect('/traq/show/' + record['id']);
    });
  },

  index: function(req, res, next) {
    Traq.find(function(err, trax) {
      if(err) return next(util.inspect(err, {depth: null}));
      res.view({
        trax: trax
      });
    });
  },

  show: function(req, res, next) {
    Traq.findOne(req.param('id'), function(err, record) {
      if(err) return next(util.inspect(err, {depth: null}));
      res.view({
        traq: record
      });
    });
  },

  edit: function(req, res, next) {
    Traq.findOne(req.param('id'), function(err, record) {
      if(err) return next(util.inspect(err, {depth: null}));
      res.view({
        traq: record
      });
    });
  },

  delete: function(req, res, next) {
    Traq.destroy(req.param('id'), function(err) {
      if(err) return next(util.inspect(err, {depth: null}));
      res.redirect('/traq');
    });
  },

  update: function(req, res, next) {
    Traq.update(req.param('id'), req.body, function(err) {
      if(err) return next(util.inspect(err, {depth: null}));
      res.redirect('/traq/show/' + req.param('id'));
    });
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AlbumController)
   */
  _config: {}
};
