module.exports = function (matcher) {
  if (matcher === undefined) {
    return val => val !== undefined && val !== null;
  } else if (matcher instanceof Function) {
   return matcher;
  } else if (matcher instanceof RegExp) {
    return str => matcher.test(str);
  } else {
    return str => matcher == str;
  }
}
