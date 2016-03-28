'use strict';

const assert = require('assert');

module.exports = {
  assert: function (fn) {
    return this.then(function (res) {
      assert(fn(res));
      return res;
    });
  }
};
