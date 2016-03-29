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
    return protocol + '://localhost:' + address.port;
  } else {
    return host;
  }
};
