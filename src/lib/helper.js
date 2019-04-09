if (typeof helper == 'undefined') {
  var helper = {};
}
/*
* Helper with this functions
* isJson | sortObject | requestData
 */


var request = require('request');

helper = {};
/**
 * @apiVersion 1.0.0
 * return bool(true|false) if the str is a valid Json
 */
var isJson = function (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * @apiVersion 1.0.0
 * return sorted array by sort parameter
 */
var sortObject = function (obj, sort = '') {
  var arr = [];
  var prop;
  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      arr.push({
        key: prop,
        value: obj[prop]
      });
    }
  }
  // Just sort if the client pass sort as parameter
  if (sort !== '') {
    arr.sort(function (a, b) {
      if (sort === 'desc') {
        return b.value - a.value;
      }
      return a.value - b.value;
    });
  }

  return arr; // returns array
};

/**
 * @apiVersion 1.0.0
 * return the data from the url
 */
var requestData = function (url, callback) {
  // resilient if the 3rd party provider is not available return why is failing
  return request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // transform data here or pass it on
      var bodyResult;
      if (self.isJson(body)) {
        bodyResult = JSON.parse(body);
      }
      callback(null, bodyResult);
    } else {
      callback(null, { fail: error });
    }
  });
};

var self = module.exports =  { isJson, requestData, sortObject }

