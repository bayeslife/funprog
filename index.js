var { transduceAsyncIterator, transduceAsyncHasNextIterator, transduceArray } = require("./src/transducer.js")

var { compose, concat } = require("./src/functionalprogramming.js")

var { mapping, filtering, take } = require("./src/transformer.js")


var {   makeArrayIterator,
    makeAsyncRangeIterator,
    makeAsyncHasNextRangeIterator } = require("./src/iterator.js")

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

    concat
}