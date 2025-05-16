# Nock + delayBody bug reproduction

This project uses `Wreck.request()`  + `Wreck.read()` to read a response
which should timeout because nock's `delayBody` is shorter than the given read timeout `Wreck.read(req, { timeout })`.

## Behavior on Nock v14

This repository is setup with nock v14, which is failing the test below:

```bash
$ node index.js

node:internal/process/promises:288
            triggerUncaughtException(err, true /* fromPromise */);
            ^

AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
+ actual - expected

+ undefined
- 'Request Time-out'
    at main (/Users/jsamines/dev/personal/nock-14-delaybody-regression/index.js:23:10)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  generatedMessage: true,
  code: 'ERR_ASSERTION',
  actual: undefined,
  expected: 'Request Time-out',
  operator: 'strictEqual'
}

Node.js v18.20.5
```

The test fail because it is setup to expect a timeout error, but that is no longer happening.

## Behavior on Nock v13

If you install latest nock v13, you'll see the test actually passes, because the timeout is happening:

```bash
npm install nock@13
```

Run the test:

```bash
node index.js
# ok
```