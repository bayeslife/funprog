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
      debug(`Check continuation ${pred}`)
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
        debug(`reduce with ${next.start}-${next.end}`)
        return rf(acc, next)
      } else {
        return acc
      }
    }
  }
}

module.exports = {
  mapping,
  filtering,
  take,
  skip,
  eventing
}
