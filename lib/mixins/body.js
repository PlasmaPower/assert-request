'use strict';

const getChecker = require('../utils/getChecker');

module.exports = {
  body: function (expected) {
    let matches = getChecker(expected);
    return this.then(function (res) {
      if (!matches(res.body)) {
        throw new Error('Got body:\n' + res.body + '\n\nExpected body:\n' + expected);
      }
      return res;
    });
  }
};
