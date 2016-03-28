'use strict';

const assert = require('assert');
const bodyMixin = require('../../../lib/mixins/body.js').body;

describe('body mixin', function () {
  it('should do nothing if the body is equal', function () {
    return Promise.all(['', 'example', 'foo\nbar'].map(function (body) {
      return bodyMixin
        .apply(Promise.resolve({ body }), [body])
        .then(res => assert(res && res.body === body));
    }));
  });

  it('should accept a RegExp', function () {
    return Promise.all(['abc', 'abc example', 'abc\nfoobar'].map(function (body) {
      return bodyMixin
        .apply(Promise.resolve({ body }), [/^abc/])
        .then(res => assert(res && res.body === body));
    }));
  });

  it('should accept a function', function () {
    return Promise.all(['foobar', 'example foobar', 'abc\nfoobar'].map(function (body) {
      return bodyMixin
        .apply(Promise.resolve({ body }), [body => body.endsWith('foobar')])
        .then(res => assert(res && res.body === body));
    }));
  });

  it('should throw an error if the body is not equal', function () {
    return Promise.all(['', 'foobar', 'example'].map(function (body) {
      return bodyMixin
        .apply(Promise.resolve({ body: body + '\n' }), [body])
        .catch(err => err)
        .then(err => assert(err instanceof Error));
    }));
  });
});
