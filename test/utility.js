const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// transformations
const add1 = x => x + 1
const sub1 = x => x - 1
const doubleIt = x => x * 2
const add = (x, y) => x + y

async function concat (xs, val) {
    var x = await xs
    return x.concat(val)
}

async function push (xs, val) {
  var x = await xs
  x.push(val)
  return x
}

async function useNew (accumulator, newValue) {
  return newValue
}

async function delay (accumulator, newValue) {
  await new Promise((resolve) => {
    setTimeout(() => resolve(), 1000)
  })
  return newValue
}

module.exports = {
  nums,
  add1,
  sub1,
  doubleIt,
  add,
  concat,
  push,
  useNew,
  delay
}
