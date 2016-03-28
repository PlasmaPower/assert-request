'use strict';

const getChecker = require('../utils/getChecker');

module.exports = {
  status: function (status) {
    let matches = getChecker(status);
    return this.then(function (res) {
      if (!matches(res.statusCode)) {
        throw new Error('Got status code ' + res.statusCode + ' (expected ' + status + ')');
      }
      return res;
    });
  },
  okay: function () {
    return this.status(200);
  }
};
