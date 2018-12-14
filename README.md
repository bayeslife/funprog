# Functional Programming Library    

## Why this library

I was specifically wanting to try using transducers to modify a stream of data generated from an asynchronous iterator.

I found a number of functional programming libraries (tranducer.js, ramda) but found they didnt support asynchronous iterators.  They appear to only support synchronous functionality.

## How to use

```
npm install funprog
```

Then use the functionality that you require (which is visible in index.js)
```
const { compose, transduceArray, transduceIterator,mapping, filtering } = require('funprog')
````

## Tests

Use `npm start` to run the unit tests