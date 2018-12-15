
 const not = x => !x

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
