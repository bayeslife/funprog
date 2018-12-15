const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// transformations
const add1 = x => x + 1
const doubleIt = x => x * 2
const add = (x, y) => x + y

function concat (xs, val) {
    return xs.concat(val)
}

module.exports = {
  nums,
  add1,
  doubleIt,
  add,
  concat
}
