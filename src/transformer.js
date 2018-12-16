var assertMod = require('assert')
var debug = require('debug')('funprog')

// generalize the 'mapping' concept, without the concat...
function mapping (f) {
    return function (rf) {
      // this takes 2 things and makes them 1
      return async (acc, val) => {
        var m = await f(val)
        debug(`Map`)
        return rf(acc, m) // <-- rf replaces 'concat'
      }
    }
  }

  // generalize the 'filtering' concept, without the concat...
  function filtering (p) {
    return function (rf) {
      // this takes 2 things and makes them 1
      return async (acc, val) => {
        var pred = (await p(val))
        debug(`Filter ${pred}`)
        return pred ? rf(acc, val)
          : acc // <-- rf replaces 'concat'
      }
    }
  }

function take (cnt) {
  assertMod(cnt && cnt > 0)
  var count = cnt
  return function (rf) {
    // this takes 2 things and makes them 1
    return async (acc, val) => {
      if ((--count) < 0) {
        return acc
      } else {
        return rf(acc, val)
      }
    }
  }
}

function skip (cnt) {
  assertMod(cnt && cnt >= 0)
  var count = 0
  return function (rf) {
    // this takes 2 things and makes them 1
    return async (acc, val) => {
      if (count++ < cnt) {
        return acc
      } else {
        return rf(acc, val)
      }
    }
  }
}

module.exports = {
  mapping,
  filtering,
  take,
  skip
}
