'use strict';

const config = require('../config');
var request = require('request');
const errors = require('restify-errors');

// This function check if the response is a valid json
// and prevent a error at the moment to parse
function isValidJson(data) {
  try {
    var json = JSON.parse(data);
    return true;
  } catch (exception) {
    return false;
  }
}

function requestData2(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(JSON.parse(body));
      }
    });
  });
}

const requestData = (url) => {
  return new Promise((resolve, reject) => {
    const http = require('http'),
      https = require('https');

    let client = http;

    if (url.toString()
      .indexOf('https') === 0) {
      client = https;
    }

    client.get(url, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        return resolve(data);
      });

    })
      .on('error', (err) => {
        return reject(err);
      });
  });
};


function requestData4(url) {
  // Setting URL and headers for request
  var options = {
    url: url,
    uri: url,
    headers: {
      'User-Agent': 'request'
    }
  };

  // Return new promise
  return new Promise(function (resolve, reject) {
    // Do async job
    request.get(options, function (err, resp, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}


function requestData_(url, method = 'get') {
  // Setting URL and headers for request
  var options = {
    url: url,
    headers: {
      'User-Agent': 'request'
    }
  };
  // Return new promise
  return new Promise(function (resolve, reject) {
    // Do async job
    if (method === 'get') {
      request.get(options, function (err, resp, body) {
        if (err) {
          reject(err);
        } else if (resp.statusCode === 200 && isValidJson(body)) {
          resolve(JSON.parse(body));
        } else {
          resolve(new errors.BadRequestError(err, 'The response is not valid. Status code:' + resp.statusCode));
        }
      });
    }
  }).catch((err) => {
    // Handle any error that occurred in any of the previous
    // promises in the chain.
    return err;
  });
}

module.exports = requestData;
