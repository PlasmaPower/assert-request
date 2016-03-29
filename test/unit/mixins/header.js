'use strict';

const assert = require('assert');
const headerMixin = require('../../../lib/mixins/header.js').header;

describe('header mixin', function () {
  it('should do nothing if the header is equal', function () {
    return Promise.all(['', 'example', 'foobar'].map(function (header) {
      return headerMixin
        .apply(Promise.resolve({ headers: { 'x-example': header } }), ['X-Example', header])
        .then(res => assert(res && res.headers));
    }));
  });

  it('should accept a RegExp', function () {
    return Promise.all(['abc', 'abc example', 'abc foobar'].map(function (header) {
      return headerMixin
        .apply(Promise.resolve({ headers: { 'x-foobar': header } }), ['X-Foobar', /^abc/])
        .then(res => assert(res && res.headers));
    }));
  });

  it('should accept a function', function () {
    return Promise.all(['abc', 'example abc', 'foobar abc'].map(function (header) {
      return headerMixin
        .apply(Promise.resolve({ headers: { 'x-foobar': header } }), ['X-Foobar', header => header.endsWith('abc')])
        .then(res => assert(res && res.headers));
    }));
  });

  it('should throw an error if the header is not equal', function () {
    return Promise.all(['', 'foobar', 'example'].map(function (header) {
      return headerMixin
        .apply(Promise.resolve({ headers: { 'x-foobar': header + ' foobar' } }), ['X-Foobar', header])
        .catch(err => err)
        .then(err => assert(err instanceof Error));
    }));
  });

  it('should no nothing if passed no value and the header exists', function () {
    return Promise.all(['', 'X-Foobar', 'Content-Type'].map(function (header) {
      let headerObj = {};
      headerObj[header.toLowerCase()] = 'foobar';
      return headerMixin
        .apply(Promise.resolve({ headers: headerObj }), [header])
        .then(res => assert(res && res.headers));
    }));
  });

  it('should throw an error if the header does not exist', function () {
    return Promise.all([undefined, null].map(function (value) {
      return headerMixin
        .apply(Promise.resolve({ headers: { 'content-length': value } }), ['Content-Length'])
        .catch(err => err)
        .then(err => assert(err instanceof Error));
    }));
  });

  it('should do nothing if passed null for a value and the header does not exist', function () {
    return headerMixin
      .apply(Promise.resolve({ headers: {} }), ['Content-Length', null])
      .then(res => assert(res && res.headers));
  });

  it('should throw an error if passed null for a value and the header exists', function () {
    return headerMixin
      .apply(Promise.resolve({ headers: { 'content-length': 'foobar' } }), ['Content-Length', null])
      .catch(err => err)
      .then(err => assert(err instanceof Error));
  });

  it('should do nothing if every header matches', function () {
    return headerMixin
      .apply(Promise.resolve({ headers: { 'set-cookie': ['abc', 'abc example'] } }), ['Set-Cookie', /^abc/])
      .then(res => assert(res && res.headers));
  });

  it('should throw an error if a header does not match', function () {
    return headerMixin
      .apply(Promise.resolve({ headers: { 'set-cookie': ['abc', 'example'] } }), ['Set-Cookie', /^abc/])
      .catch(err => err)
      .then(err => assert(err instanceof Error));
  });

  it('should do nothing if some headers do not match but sosmeHeaders is true', function () {
    return headerMixin
      .apply(Promise.resolve({ headers: { 'set-cookie': ['abc', 'example', 'foobar']} }), ['Set-Cookie', 'example', true])
      .then(res => assert(res && res.headers));
  });
});
