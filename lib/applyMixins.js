const mixins = require('./mixins');

module.exports = function (obj) {
  Object.assign.apply(Object, [obj].concat(mixins));
  const oldThen = obj.then;
  ['then', 'catch'].forEach(function (name) {
    const oldFn = obj[name];
    obj[name] = function () {
      return module.exports(oldFn.apply(this, arguments));
    };
  });
  return obj;
}
