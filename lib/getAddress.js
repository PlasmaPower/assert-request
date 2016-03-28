'use strict';

const https = require('https');

module.exports = function (host) {
  let protocol = 'http';
  if (host && host.listen) {
    // Probably an HTTP server
    if (host instanceof https.Server) {
      protocol = 'https';
    }
    host = host.listen();
  }
  if (host && host.address) {
    // Probably a TCP server from a HTTP server
    const address = host.address();
    if (address.family === 'IPv6') {
      return protocol + '://[' + address.address + ']:' + address.port;
    } else {
      return protocol + '://' + address.address + ':' + address.port;
    }
  } else {
    return host;
  }
};
