const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// transformations
const add1 = x => x + 1
const doubleIt = x => x * 2
const add = (x, y) => x + y
const identity = x => x

// predicates
const isEven = x => x % 2 === 0
const isOdd = x => !isEven(x)
const isGreaterThan = x => y => y > x ? y : 0

function concat (xs, val) {
    return xs.concat(val)
}

module.exports = {
  nums,
  add1,
  doubleIt,
  add,
  isEven,
  isGreaterThan,
  concat,
  identity
}
