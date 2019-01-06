# Functional Programming Library    

## Why this library

I was specifically wanting to try using [transducers](https://medium.com/javascript-scene/transducers-efficient-data-processing-pipelines-in-javascript-7985330fe73d) to modify a stream of data generated from an asynchronous iterator.

I found a number of functional programming libraries (tranducer.js, ramda) but found they didnt support asynchronous iterators.  They appear to only support synchronous functionality.

## How to use

```
npm install funprog
```

Then use the functionality that you require (which is visible in index.js)
```
const { compose, transduceArray, transduceIterator,mapping, filtering } = require('funprog')
````

## Functions
### Operators

There are a number of operators which generally take a value and return another value

 - not,
 - identity,
 - isEven,
 - isGreaterThan,
 - digitize,
 - modulus

### Stream Transforms

The transforms operate the stream of values
- mapping - produce a transformed value for each value in the stream
- filtering - remove some items from a stream based on a predicate
- take - stop generator when a limit is reached
- skip - skip values until a threshold is acheived
- eventing - combines a set of measurements (single point in time) into events (which have a start/end/duration)
- sampling - Sample at a lower frequence than the values are being produced
- passthrough - map each event to itself

### Generators

There are a number of functions to produce generators

- makeArrayIterator,
- makeAsyncRangeIterator,
- makeAsyncHasNextRangeIterator

### Transducers

There are a set of transducer functions.
A transducer is a function taking 4 parameters
  - a transform,
  - a reducer,
  - an initial response ,
  - a generator
  
The transducer reads from the generator transforms the value and reduces using the reduce function and initial accumulation

 - transduceAsyncIterator,
 - transduceAsyncHasNextIterator,
 - transduceArray


## Tests

Use `npm start` to run the unit tests
