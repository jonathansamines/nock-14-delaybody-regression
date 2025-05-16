'use strict';

const nock = require('nock');
const http = require('node:http');

async function main() {
  nock('http://example.com')
    .get('/foo')
    .delayBody(200)
    .reply(200, 'Hello World!');

  const request = http.request('http://example.com/foo');

  request.on('response', (response) => {
    let timeout = setTimeout(() => {
      throw new Error('Response timeout');
    }, 100);

    response.on('data', () => null);
    response.on('end', () => clearTimeout(timeout));
  });

  request.end();
}

main()