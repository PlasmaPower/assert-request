'use strict';

const assert = require('assert');
const assertMixin = require('../../../lib/mixins/assert.js').assert;

describe('assert mixin', function () {
  it('should do nothing if the assertion is true', function () {
    return assertMixin
      .apply(Promise.resolve({ example: true }), [res => res && res.example])
      .then(res => assert(res && res.example));
  });

  it('should throw an error if the assertion is false', function () {
    return assertMixin
      .apply(Promise.resolve({ example: false }), [res => res && res.example])
      .catch(err => err)
      .then(err => assert(err instanceof Error));
  });
});
