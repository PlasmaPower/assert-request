'use strict';

const util = require('util');
const getChecker = require('../utils/getChecker');

module.exports = {
  json: function (expected) {
    let matches = getChecker(expected);
    return this.then(function (res) {
      let json;
      if (typeof res.body === 'object') {
        json = res.body;
      } else {
        try {
          json = JSON.parse(res.body);
        } catch (err) {
          throw new Error('Did not receive valid JSON');
        }
      }
      if (expected instanceof Function && expected(json)) {
        return res;
      } else if (matches(res.body)) {
        return res;
      }
      try {
        if (JSON.stringify(expected) === JSON.stringify(json)) return res;
      } catch (err) {} // Just a JSON stringify error
      throw new Error('Got JSON:\n' + util.inspect(json) + '\n\nExpected:\n' + expected);
    });
  }
};
