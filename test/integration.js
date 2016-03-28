'use strict';

const assert = require('assert');
const http = require('http');
const acceptRequest = require('..');

const exampleServer = new http.Server(function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  if (req.method.toLowerCase() === 'post') {
    req.pipe(res);
  } else {
    res.end('Hello world!');
  }
});
const request = acceptRequest(exampleServer);

describe('general integration', function () {
  this.slow(150);

  it('should not throw an error if the response is matched', function () {
    return request('/')
      .okay()
      .type('text/plain')
      .header('X-Example', null)
      .body(/hello/i);
  });

  it('should have methods for HTTP methods', function () {
    return request.post('/', { body: 'foobar' })
      .okay()
      .type('text/plain')
      .body('foobar');
  });

  it('should throw an error if the response is mismatched', function () {
    return request('/')
      .okay()
      .type('text/plain')
      .header('X-Example')
      .body(/hello/i)
      .then(err => assert(err instanceof Error))
      .catch(err => err);
  });

  after((done) => exampleServer.close(done));
});
