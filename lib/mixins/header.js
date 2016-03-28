'use strict';

const getChecker = require('../utils/getChecker');

module.exports = {
  header: function (header, matcher) {
    let matches = getChecker(matcher);
    return this.then(function (res) {
      let val = res.headers[header.toLowerCase()];
      if (!matches(val)) {
        throw new Error('The header "' + header + '" has the value "' + val + '" (expected "' + matcher + '")');
      }
      return res;
    });
  }
};
