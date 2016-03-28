'use strict';

const assert = require('assert');
const okayMixin = require('../../../lib/mixins/status.js').okay;
const statusMixin = require('../../../lib/mixins/status.js').status;

describe('status mixin', function () {
  it('should do nothing if the status is equal', function () {
    return Promise.all([200, 401, 404].map(function (status) {
      return statusMixin
        .apply(Promise.resolve({ statusCode: status }), [status])
        .then(res => assert(res && res.statusCode === status));
    }));
  });

  it('should accept a RegExp', function () {
    return Promise.all([401, 403, 404].map(function (status) {
      return statusMixin
        .apply(Promise.resolve({ statusCode: status }), [/^4..$/])
        .then(res => assert(res && res.statusCode === status));
    }));
  });

  it('should accept a function', function () {
    return Promise.all([401, 403, 404].map(function (status) {
      return statusMixin
        .apply(Promise.resolve({ statusCode: status }), [status => Math.floor(status / 10) === 40])
        .then(res => assert(res && res.statusCode === status));
    }));
  });

  it('should throw an error if the status is not equal', function () {
    return Promise.all([200, 401, 404].map(function (status) {
      return statusMixin
        .apply(Promise.resolve({ statusCode: status + 100 }), [status])
        .catch(err => err)
        .then(err => assert(err instanceof Error));
    }));
  });
});

describe('okay mixin', function () {
  it('should do nothing if the status is 200', function () {
    const self = Promise.resolve({ statusCode: 200 });
    self.status = statusMixin;
    return okayMixin
      .apply(self, [])
      .then(res => assert(res && res.statusCode === 200));
  });

  it('should throw an error if the status is not 200', function () {
    const self = Promise.resolve({ statusCode: 500 });
    self.status = statusMixin;
    return okayMixin
      .apply(self, [])
      .catch(err => err)
      .then(err => assert(err instanceof Error));
  });
});
