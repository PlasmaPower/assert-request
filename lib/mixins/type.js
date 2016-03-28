'use strict';

const getChecker = require('../utils/getChecker');

module.exports = {
  type: function (expected) {
    let matches = getChecker(expected);
    return this.then(function (res) {
      let fullType = res.headers['content-type'];
      if (!fullType) throw new Error('Expected a Content-Type header');
      if (matches(fullType)) return res;
      if (typeof expected === 'string' || expected instanceof String) {
        let types = fullType.split(';').map(str => str.trim());
        if (types.some(type => matches(type))) return res;
      }
      throw new Error('Got type ' + fullType + ' (expected ' + expected + ')');
    });
  }
};
