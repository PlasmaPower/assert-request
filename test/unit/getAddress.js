'use strict';

const assert = require('assert');
const http = require('http');
const https = require('https');
const getAddress = require('../../lib/getAddress.js');

const exampleHttpServer = new http.Server(() => {});
const exampleHttpsServer = new https.Server(() => {});

describe('getAddress', function () {
  it('should accept a normal host', function () {
    assert.equal(getAddress('example.com'), 'example.com');
  });

  it('should get a IPv4 address from a server', function () {
    assert.equal(getAddress({
      address: () => ({ family: 'IPv4', address: '127.0.0.1', port: '1234' })
    }), 'http://localhost:1234');
  });

  it('should get a IPv6 address from a server', function () {
    assert.equal(getAddress({
      address: () => ({ family: 'IPv6', address: '::', port: '1234' })
    }), 'http://localhost:1234');
  });

  it('should accept a HTTP server', function () {
    assert(/^http:\/\/localhost:\d+$/.test(getAddress(exampleHttpServer)));
  });

  it('should accept a HTTPS server', function () {
    assert(/^https:\/\/localhost:\d+$/.test(getAddress(exampleHttpsServer)));
  });

  it('should accept an already started HTTP server', function () {
    assert(/^http:\/\/localhost:\d+$/.test(getAddress(exampleHttpServer.listen())));
  });

  after(function (done) {
    exampleHttpServer.close(done);
  });

  after(function (done) {
    exampleHttpsServer.close(done);
  });
});
