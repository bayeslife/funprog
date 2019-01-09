
function passthrough () {
  return function (rf) {
    // this takes 2 things and makes them 1
    return async (acc, val) => {
      return rf(acc, val) // <-- rf replaces 'concat'
    }
  }
}

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
  // assert(cnt && cnt > 0)
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
  // assertMod(cnt && cnt >= 0)
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

function sampling (period) {
  // assertMod(cnt && cnt >= 0)
  var last = 0
  return function (rf) {
    return async (acc, val) => {
      var nw = Date.now()
      var diff = nw - last
      // console.log(diff)
      if (diff < period) {
        // console.log('Skip' + val)
        return acc
      } else {
        last = nw
        // console.log('Accept' + val)
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

/*
 *  Split one event into multiple
 *  f is a function which maps a value to an array
 */
function split (f) {
  return function (rf) {
    // this takes 2 things and makes them 1
    return async (acc, val) => {
      var rs = await f(val)
      var reduced = []
      try {
        for (var i = 0; i < rs.length; i++) {
          var r = rs[i]
          reduced.push(r)
        }
      } catch (ex) {
        console.log(ex)
      }
      return reduced
    }
  }
}

export {
  passthrough,
  mapping,
  filtering,
  take,
  skip,
  eventing,
  sampling,
  split
}
