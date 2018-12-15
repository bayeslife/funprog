var { transduceAsyncIterator, transduceAsyncHasNextIterator, transduceArray } = require('./src/transducer.js')

var { compose, concat } = require('./src/functionalprogramming.js')

var { mapping, filtering, take } = require('./src/transformer.js')

var { not, identity, isEven, isGreaterThan } = require('./src/operators.js')

var {   makeArrayIterator, makeAsyncRangeIterator, makeAsyncHasNextRangeIterator } = require('./src/iterator.js')

module.exports = {
    transduceAsyncIterator,
    transduceAsyncHasNextIterator,
    transduceArray,

    makeArrayIterator,
    makeAsyncRangeIterator,
    makeAsyncHasNextRangeIterator,

    compose,

    mapping,
    filtering,
    take,

    concat,

    not, 
    identity, 
    isEven, 
    isGreaterThan
}