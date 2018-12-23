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
const digitize = x => x ? 1 : 0

const modulus = val => x => x % val

const select = property => x => x[property]

module.exports = {
    isEven,
    modulus,
    isOdd,
    isGreaterThan,
    identity,
    not,
    digitize,
    select
}
