var { transduceAsyncIterator, transduceAsyncHasNextIterator, transduceArray } = require("./src/transducer.js")

var { compose } = require("./src/functionalprogramming.js")

var { mapping, filtering, take } = require("./src/transformer.js")


module.exports = {
    transduceAsyncIterator,
    transduceAsyncHasNextIterator,
    transduceArray,

    compose,

    mapping,
    filtering,
    take
}