'use strict';

const co = require('co');
const helper = require('../../lib/helper');
const errors = require('restify-errors');
const config = require('../../config');
var async = require('async');
var sort;

const endpoint = 'population';
const serviceUrl = config.routes.serviceUrl + endpoint;

// We can store this result in Redis
// check if country exist in Redis if not then request the population from endpoint
exports.getPopulation = co.wrap(function* getPopulation(req, res, next) {
  try {
    var countries = req.query.countries;
    var currentDate = new Date();
    var currentDateFormat = currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDay();
    var date = req.query.date ? req.query.date : currentDateFormat;
    sort = req.query.sort ? req.query.sort : '';
    var urls = [];

    if (typeof(countries) === 'undefined') {
      res.json(new errors.InternalServerError('Missing parameters countries/date.'));
    }
    countries.forEach(function (country) {
      var url = serviceUrl + '/' + country + '/' + date;
      urls.push(url);
    });

    // Async call all the urls
    async.map(urls, function (url, callback) {
      // iterator function
      helper.requestData(url, callback);
    }, function (err, results) {
      // Return Error if found
      if (err) {
        res.json(new errors.InternalServerError(err, 'Server error retrieving Population.'));
      }
      var resultsData = { countries: {}, countriesFails: {} };
      for (var index = 0; index < results.length; index++) {
        var country = countries[index];
        // This code catch country not found
        if (typeof results[index].total_population === 'object' && results[index].total_population.population) {
          resultsData.countries[country] = results[index].total_population.population;
        } else {
          resultsData.countriesFails[country] = 'Data for country: ' + country + ', for this date: ' + date + ' not found!';
        }
      }
      // Sort countries
      resultsData.countries = helper.sortObject(resultsData.countries, sort);
      res.json(resultsData);
    });

    return next();
  } catch (err) {
    return next(new errors.InternalServerError(err, 'Server error retrieving Population.'));
  }
});

