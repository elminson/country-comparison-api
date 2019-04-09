'use strict';

const co = require('co');
const errors = require('restify-errors');
const helper = require('../../lib/helper');
const config = require('../../config');
var async = require('async');
const endpoint = 'countries';
const serviceUrl = config.routes.serviceUrl + endpoint;
var urls = [serviceUrl];

exports.getCountries = co.wrap(function* getCountries(req, res, next) {
  try {
    async.map(urls, function (url, callback) {
      // iterator function
      helper.requestData(url, callback);
    }, function (err, results) {
      if (err) {
        res.json(new errors.InternalServerError(err, 'Server error retrieving countries.'));
      }
      res.json(results);
    });
    return next();
  } catch (err) {
    return next(new errors.InternalServerError(err, 'Server error retrieving countries.'));
  }
});
