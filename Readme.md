# Assert Request

This is a tool to assert properties of responses to requests, such as the body, headers, and status code.
This returns a promise with additional assertion methods builtin to it.
It requires node 4 or higher to run (that's by design, and will not be changed even if you have a PR).

## Example

This example uses [Mocha](https://mochajs.org/) tests, which natively support promises.
However, `assert-request` is not limited to Mocha.

```js
let AssertRequest = require('assert-request');
let request = AssertRequest(app.listen()); // You can use a server or protocol and host

describe('/example', function () {
  it('should return HTML', function () {
    return request('/example')
      .type('text/html')
      .okay();
  });
});

describe('/api', function () {
  it('should return the correct JSON', function () {
    return request.post('/api')
      .type('application/json')
      .status(200)
      .json(json => json.foo && json.bar);
  });
});
```

## Return Type

The returned value is a Promise.
Because of that, you can use `.then` and `.catch`.
`.then` will be passed the response object.
Many Node.JS utilities such as Mocha will support promises.

## Mixin Documentation

Note: most mixins simply return `this.then(res => assert(...))`.
This means that assertions are guaranteed to run in order.
While technically `Promise.all` should be used here, this makes for a much simpler code base.
In addition, this should be the faster way as no mixins created so far return a Promise (i.e. do an asynchronous operation).

### .assert(function)

Calls the function with the response object, and asserts that the return value is truthy.

### .status(expected)

Asserts that the response status is equal to the one specified.
Expected can be a String, Number, Function, or RegExp.
Strings and Numbers will be checked without strict matching (`==` not `===`) so the status will be cast to a String.

### .okay()

Asserts that the response status is 200. Equivalent to `.status(200)`

### .header(header, value, someHeaders)

Asserts that the header is present, and if value is specified, asserts that it is equal to the value.
In some edge cases like `Set-Cookie`, the header value is an array.
In this case, by default all headers must match the value.
However, if someHeaders is true, then only one must match the value.
Value can be a String, Function, or RegExp.

### .body(expected)

Asserts that the body is equal to the one specified.
Expected can be a String, Function, or RegExp.

### .json(expected)

Asserts that the body is JSON and is equal to the JSON specified.
If expected is a function, then it is passed the parsed JSON.
Expected can be a String, Function, or RegExp.


### .type(expected)

This is a general mixin to check `Content-Type`.
If the expected type is a string, it checkes if any part of the Content-Type is equal.
All of the following will match `text/html; charset=utf-8`

- 'text/html; charset=utf-8'
- 'text/html'
- 'charset=utf-8'
- /html/
- /^text\/html; charset=utf-8$/
- type => type.includes('html')

The following will NOT match that type:

- /^text\/html$/
- type => type === 'text/html'

Expected can be a String, Function, or RegExp.
However, partial matching is only applied to strings as specified above.

## Inspiration

This was made as a replacement for [supertest](https://github.com/visionmedia/supertest).
Inspiration was taken from that API.
However, using it also showed how it could be improved, and pitfalls to avoid.
