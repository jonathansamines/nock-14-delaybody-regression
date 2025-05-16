'use strict';

const nock = require('nock');
const assert = require('node:assert');
const Wreck = require('@hapi/wreck');

async function main() {
  const scope = nock('http://example.com')
    .get('/foo')
    .delayBody(200)
    .reply(200, 'Hello World!');

  const request = await Wreck.request('GET', 'http://example.com/foo');

  let error;
  try {
    await Wreck.read(request, { timeout: 100 });
  } catch (err) {
    error = err;
  }

  scope.done();
  assert.strictEqual(error?.message, 'Request Time-out');
  assert.strictEqual(error?.output?.statusCode, 408);
}

main();