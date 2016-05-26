'use strict';

const assert = require('assert');

module.exports = {
  run: function (fn) {
    let savedRes;
    return this.then(function (res) {
      savedRes = res;
      return fn(res);
    }).then(() => savedRes);
  }
};
