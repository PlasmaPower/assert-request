'use strict';

const assert = require('assert');
const runMixin = require('../../../lib/mixins/run.js').run;

describe('run mixin', function () {
  it('should ignore the return value', function () {
    return runMixin
      .apply(Promise.resolve({ example: true }), [res => assert(res && res.example)])
      .then(res => assert(res && res.example));
  });

  it('should throw errors up the chain', function () {
    return runMixin
      .apply(Promise.resolve({ example: false }), [res => assert(res && res.example)])
      .catch(err => err)
      .then(err => assert(err instanceof Error));
  });
});
