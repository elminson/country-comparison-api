'use strict';

const controller = require('./population.controller');

function routes(app, rootUrl) {
  // api version number is include in rootUrl from config file default.yaml

  /**
    * @apiVersion 1.0.0
    * @api {get} /population
    * @apiGroup Countries Population
    * @apiName Get list of population by country
    * @apiDescription Returns an array of country names and the population
    *
    * @apiSampleRequest /api/v1/population
    *
    * @apiSuccess {json} Array of all country names with population
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *   {
          "countries": [
          {
            "key": "Cuba",
            "value": 11391788
          },
          {
            "key": "Uganda",
            "value": 39643502
          },
          {
            "key": "Mexico",
            "value": 127795440
          }
        ],
          "countriesFails": {
          "France1": "Country Not Found"
        }
        }
    *
    * @apiError (Error 500) InternalServerError Returned if there was a server error
    */
  app.get({ url: rootUrl + 'population' },
    controller.getPopulation);
}

module.exports = {
  routes: routes
};
