var { transduceIterator, transduceArray } = require("./src/transducer.js")

var { compose } = require("./src/functionalprogramming.js")

var { mapping, filtering } = require("./src/transformer.js")


module.exports = {
    transduceIterator,
    transduceArray,

    compose,

    mapping,
    filtering
}