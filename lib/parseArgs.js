'use strict';

module.exports = function (uriPrefix, args) {
  let uri = args[0];
  let options = args[1];
  if (!options && uri instanceof Object) {
    return uri;
  }
  options = options || {};
  if (!options.uri && uri) {
    if (!uri.startsWith('/') && uriPrefix) {
      uri = '/' + uri;
    }
    options.uri = uriPrefix + uri;
  }
  return options;
}
