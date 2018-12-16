var debug = require('debug')('funprog')

 const not = async (x) => {
     var operand = await x
    debug(`Not: ${operand}`)
    return !operand
 }

const identity = x => x

// predicates
const isEven = x => x % 2 === 0
const isOdd = x => !isEven(x)
const isGreaterThan = x => y => y > x ? y : 0

module.exports = {
    isEven,
    isOdd,
    isGreaterThan,
    identity,
    not
}
