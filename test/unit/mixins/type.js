'use strict';

const assert = require('assert');
const typeMixin = require('../../../lib/mixins/type.js').type;

describe('type mixin', function () {
  it('should do nothing if the type is equal', function () {
    return Promise.all(['text/html', 'application/json', 'text/html; charset=utf-8'].map(function (type) {
      return typeMixin
        .apply(Promise.resolve({ headers: { 'content-type': type } }), [type])
        .then(res => assert(res && res.headers));
    }));
  });

  it('should do nothing if the type is part of the whole', function () {
    return Promise.all(['text/html', 'charset=utf-8', 'text/html; charset=utf-8'].map(function (type) {
      return typeMixin
        .apply(Promise.resolve({ headers: { 'content-type': 'text/html; charset=utf-8' } }), [type])
        .then(res => assert(res && res.headers));
    }));
  });

  it('should do nothing if the type matches a regex', function () {
    return Promise.all([/html/, /text\/html/, /^text\/html/].map(function (type) {
      return typeMixin
        .apply(Promise.resolve({ headers: { 'content-type': 'text/html; charset=utf-8' } }), [type])
        .then(res => assert(res && res.headers));
    }));
  });

  it('should throw an error if the regex only matches part of the type', function () {
    return Promise.all([/^text\/html$/, /html$/].map(function (type) {
      return typeMixin
        .apply(Promise.resolve({ headers: { 'content-type': 'text/html; charset=utf-8' } }), [type])
        .catch(err => err)
        .then(err => assert(err instanceof Error));
    }));
  });

  it('should throw an error if the type does not match ', function () {
    return Promise.all(['application/json', 'application/json; charset=utf-8'].map(function (type) {
      return typeMixin
        .apply(Promise.resolve({ headers: { 'content-type': type } }), ['text/html'])
        .catch(err => err)
        .then(err => assert(err instanceof Error));
    }));
  });

  it('should do nothing if no type is specified and Content-Type is present', function () {
    return typeMixin
      .apply(Promise.resolve({ headers: { 'content-type': 'text/html' } }), [])
      .then(res => assert(res && res.headers));
  });

  it('should throw an error if no type is specified and Content-Type is not present', function () {
    return typeMixin
      .apply(Promise.resolve({ headers: {} }), [])
      .catch(err => err)
      .then(err => assert(err instanceof Error));
  });
});
