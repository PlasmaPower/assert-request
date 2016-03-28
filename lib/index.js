'use strict';

const request = require('request-promise');
const methods = require('methods');
const parseArgs = require('./parseArgs');
const getAddress = require('./getAddress');
const applyMixins = require('./applyMixins');

module.exports = function (host) {
  let urlPrefix = getAddress(host);

  const fn = function () {
    const options = parseArgs(urlPrefix, arguments);
    Object.assign(options, {
      simple: false,
      resolveWithFullResponse: true
    });
    const promise = request(options).then(res => res);
    applyMixins(promise);
    return promise;
  };

  methods.forEach(method => fn[method] = function () {
    const options = parseArgs(urlPrefix, arguments);
    options.method = options.method || method;
    return fn(options);
  });

  return fn;
};
