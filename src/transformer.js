var assertMod = require('assert')

// generalize the 'mapping' concept, without the concat...
function mapping (f) {
    return function (rf) {
      // this takes 2 things and makes them 1
      return async (acc, val) => {
        var m = await f(val)
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
        return pred ? rf(acc, val) : acc // <-- rf replaces 'concat'
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

function eventing (p) {
  var latest = null
  var sequence = -1
  return function (rf) {
    return async (acc, val) => {
      sequence++
      var pred = (await p(val))
      if (pred && !latest) {
        latest = {
          start: val.time ? val.time : sequence,
          end: val.time ? val.time : sequence
        }
        return acc
      } else if (pred && latest) {
        latest.end = val.time ? val.time : sequence
        return acc
      } else if (!pred && latest) {
        var next = latest
        latest = null
        return rf(acc, next)
      } else {
        return acc
      }
    }
  }
}

export {
  mapping,
  filtering,
  take,
  skip,
  eventing
}
