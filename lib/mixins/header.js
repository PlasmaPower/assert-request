'use strict';

const getChecker = require('../utils/getChecker');

module.exports = {
  header: function (header, matcher, someHeaders) {
    let matches = getChecker(matcher);
    return this.then(function (res) {
      let val = res.headers[header.toLowerCase()];
      if (val instanceof Array) {
        if (someHeaders) {
          if (val.some(matches)) return res;
        } else {
          if (val.every(matches)) return res;
        }
      } else {
        if (matches(val)) return res;
      }
      throw new Error('The header "' + header + '" has the value "' + val + '" (expected "' + matcher + '")');
    });
  }
};
