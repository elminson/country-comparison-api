'use strict';

const controller = require('./countries.controller');

function routes(app, rootUrl) {
  // api version number is include in rootUrl from config file default.yaml

  /**
    * @apiVersion 1.0.0
    * @api {get} /countries
    * @apiGroup Countries
    * @apiName Get list of all countries
    * @apiDescription Returns an array of country names
    *
    * @apiSampleRequest /api/v1/countries
    *
    * @apiSuccess {json} Array of all country names
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *   [
    *     "Afghanistan",
    *     "AFRICA",
    *     "Albania",
    *     ...
    *   ]
    *
    * @apiError (Error 500) InternalServerError Returned if there was a server error
    */
  app.get({ url: rootUrl + 'countries' },
    controller.getCountries);
}

module.exports = {
  routes: routes
};
