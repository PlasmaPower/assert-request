'use strict';

const assert = require('assert');
const parseArgs = require('../../lib/parseArgs.js');

describe('parseArgs', function () {
  it('should take the options if an only parameter', function () {
    let opts = {};
    assert.equal(parseArgs('', [opts]), opts);
  });
  
  it('should not touch options.uri', function () {
    let opts = { uri: 'example' };
    assert.equal(parseArgs('prefix', ['otherUri', opts]).uri, opts.uri);
  });

  it('should prefix the URI', function () {
    assert.equal(parseArgs('[prefix]', ['/example', {}]).uri, '[prefix]/example');
  });

  it('should add a slash if needed', function () {
    assert.equal(parseArgs('[prefix]', ['example', {}]).uri, '[prefix]/example');
  });

  it('should default to empty options', function () {
    assert.equal(parseArgs('', ['/example']).uri, '/example');
  });
});
