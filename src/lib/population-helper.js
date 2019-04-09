'use strict';

const populationObj = {
  countries: [
    {
      key: 'Cuba',
      value: 11391788
    },
    {
      key: 'Uganda',
      value: 39643502
    },
    {
      key: 'Mexico',
      value: 127795440
    }
  ],
  countriesFails: {
    France1: 'Country Not Found'
  }
};


exports.getPopulation = function getPopulation() {
  // using mock data for now
  return populationObj;
};
