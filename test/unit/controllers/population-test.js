const app = require('../../../src/server.js');
const config = require('../../../src/config');
const request = require('supertest');
const sinon = require('sinon');
require('chai')
  .should();

const populationHelper = require('../../../src/lib/population-helper');
const mockPopulation = require('../../fixtures/data/mock-population.json');
const mockPopulationAsc = require('../../fixtures/data/mock-population-asc.json');
const mockPopulationDesc = require('../../fixtures/data/mock-population-desc.json');
const mockPopulationNotExitAsc = require('../../fixtures/data/mock-population-notexist-asc.json');
const mockPopulatioWithoutNotExitAsc = require('../../fixtures/data/mock-population-without-notexist-asc.json');
const mockPopulationNotExitDesc = require('../../fixtures/data/mock-population-notexist-desc.json');
const mockPopulationWithoutNotExitDesc = require('../../fixtures/data/mock-population-without-notexist-desc.json');

describe('population endpoint tests', () => {
  let sandbox;
  beforeEach(function beforeEach() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function afterEach() {
    sandbox.restore();
  });

  describe('get countries populations ', function getPopulation() {

    it('should return a list of countries population order by populations ASC with countriesFails', function handleGettingCountryPopulation(done) {
      sandbox.stub(populationHelper, 'getPopulation')
        .returns(mockPopulationNotExitAsc);
      const endpointUrl = config.routes.controllerRootUrl + config.routes.apiVersion + 'population?countries[]=Imaginary country&countries[]=Mexico&countries[]=France&countries[]=Uganda&date=2015-12-24&sort=asc';

      request(app)
        .get(`${endpointUrl}`)
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.should.eql(mockPopulationNotExitAsc);
          return done();
        });
    });

    it('should return a list of countries population order by populations ASC without countriesFails', function handleGettingCountryPopulation(done) {
      sandbox.stub(populationHelper, 'getPopulation')
        .returns(mockPopulatioWithoutNotExitAsc);
      const endpointUrl = config.routes.controllerRootUrl + config.routes.apiVersion + 'population?countries[]=Mexico&countries[]=France&countries[]=Uganda&date=2015-12-24&sort=asc';

      request(app)
        .get(`${endpointUrl}`)
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.should.eql(mockPopulatioWithoutNotExitAsc);
          return done();
        });
    });

    it('should return a list of countries population order by populations DESC without countriesFails', function handleGettingCountryPopulation(done) {
      sandbox.stub(populationHelper, 'getPopulation')
        .returns(mockPopulationWithoutNotExitDesc);
      const endpointUrl = config.routes.controllerRootUrl + config.routes.apiVersion + 'population?countries[]=Mexico&countries[]=France&countries[]=Uganda&date=2015-12-24&sort=desc';

      request(app)
        .get(`${endpointUrl}`)
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.should.eql(mockPopulationWithoutNotExitDesc);
          return done();
        });
    });

    it('should return a list of countries population with out order by populations without countriesFails', function handleGettingCountryPopulation(done) {
      sandbox.stub(populationHelper, 'getPopulation')
        .returns(mockPopulation);
      const endpointUrl = config.routes.controllerRootUrl + config.routes.apiVersion + 'population?countries[]=Uganda&countries[]=France&countries[]=Mexico&date=2015-12-24';

      request(app)
        .get(`${endpointUrl}`)
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.should.eql(mockPopulation);
          return done();
        });
    });


    it('should return a list of countries population order by populations DESC with countriesFails', function handleGettingCountryPopulation(done) {
      sandbox.stub(populationHelper, 'getPopulation')
        .returns(mockPopulationNotExitDesc);
      const endpointUrl = config.routes.controllerRootUrl + config.routes.apiVersion + 'population?countries[]=Imaginary%20country&countries[]=Mexico&countries[]=France&countries[]=Uganda&date=2015-12-24&sort=desc';

      request(app)
        .get(`${endpointUrl}`)
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.should.eql(mockPopulationNotExitDesc);
          return done();
        });
    });

    it('should return a list of countries population order by populations ASC without countriesFails', function handleGettingCountryPopulation(done) {
      sandbox.stub(populationHelper, 'getPopulation')
        .returns(mockPopulationAsc);
      const endpointUrl = config.routes.controllerRootUrl + config.routes.apiVersion + 'population?countries[]=Cuba&countries[]=Mexico&countries[]=France&countries[]=Uganda&date=2015-12-24&order=asc';

      request(app)
        .get(`${endpointUrl}`)
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.should.eql(mockPopulationAsc);
          return done();
        });
    });

    it('should return a list of countries population order by populations DESC', function handleGettingCountryPopulation(done) {
      sandbox.stub(populationHelper, 'getPopulation')
        .returns(mockPopulationDesc);
      const endpointUrl = config.routes.controllerRootUrl + config.routes.apiVersion + 'population?countries[]=Cuba&countries[]=Mexico&countries[]=France&countries[]=Uganda&date=2015-12-24&sort=desc';
      request(app)
        .get(`${endpointUrl}`)
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.should.eql(mockPopulationDesc);
          return done();
        });
    });

    it('should return 500 Missing parameters countries/date. for countries with population', function handleErrorGettingCountriesPopulation(done) {
      const error = new Error('fake error');
      sandbox.stub(populationHelper, 'getPopulation')
        .throws(error);
      const endpointUrl500 = config.routes.controllerRootUrl + config.routes.apiVersion + 'population';
      var returnData = {
        code: 'InternalServer',
        message: 'Missing parameters countries/date.'
      };
      request(app)
        .get(`${endpointUrl500}`)
        .set('accept', 'application/json')
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.eql(returnData);
          return done();
        });
    });

    it('should return 404 if error getting countries with population', function handleErrorGettingCountriesPopulation(done) {
      const error = new Error('fake error');
      sandbox.stub(populationHelper, 'getPopulation')
        .throws(error);
      const endpointUrl400 = config.routes.controllerRootUrl + config.routes.apiVersion + 'PATHNOTFOUND';
      const returnData = {
          code: 'ResourceNotFound',
          message: '/api/v1/PATHNOTFOUND does not exist'
        }
      ;
      request(app)
        .get(`${endpointUrl400}`)
        .set('accept', 'application/json')
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.eql(returnData);
          return done();
        });
    });
  });
});
