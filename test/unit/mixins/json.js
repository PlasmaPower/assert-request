'use strict';

const assert = require('assert');
const jsonMixin = require('../../../lib/mixins/json.js').json;

describe('json mixin', function () {
  it('should do nothing if the json is equal', function () {
    return Promise.all(['{ "key": "value" }', '{"key":"value"}', '{"key":"value"}\n'].map(function (body) {
      return jsonMixin
        .apply(Promise.resolve({ body }), [{ key: 'value' }])
        .then(res => assert(res && res.body === body));
    }));
  });

  it('should accept a RegExp', function () {
    return Promise.all(['{ "key": "value" }'].map(function (body) {
      return jsonMixin
        .apply(Promise.resolve({ body }), [/^{/])
        .then(res => assert(res && res.body === body));
    }));
  });

  it('should accept a function handling the JSON itself', function () {
    return Promise.all(['{ "foo": [ "bar" ] }', '{"foo":["bar"]}'].map(function (body) {
      return jsonMixin
        .apply(Promise.resolve({ body }), [json => json.foo.length === 1])
        .then(res => assert(res && res.body === body));
    }));
  });

  it('should throw an error if the function returns false', function () {
    return Promise.all(['{ "foo": [ "bar" ] }', '{"foo":["bar"]}'].map(function (body) {
      return jsonMixin
        .apply(Promise.resolve({ body }), [json => json.foo.length === 2])
        .catch(err => err)
        .then(err => assert(err instanceof Error));
    }));
  });

  it('should throw an error if the body matches the string but is not valid JSON', function () {
    return Promise.all(['{foo: \'bar\'}', '{'].map(function (body) {
      return jsonMixin
        .apply(Promise.resolve({ body }), [body])
        .catch(err => err)
        .then(err => assert(err instanceof Error));
    }));
  });

  it('should throw an error if the JSON is not equal', function () {
    return Promise.all(['{ "key": ["value"] }', '{ "otherKey": "otherValue" }'].map(function (body) {
      return jsonMixin
        .apply(Promise.resolve({ body: '{"key":["otherValue", "value"]}' }), [body])
        .catch(err => err)
        .then(err => assert(err instanceof Error));
    }));
  });
});
