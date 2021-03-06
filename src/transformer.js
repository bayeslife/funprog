
/**
 * Passes all events
 */
function passthrough () {
  return function (rf) {
    // this takes 2 things and makes them 1
    return async (acc, val) => {
      return rf(acc, val)
    }
  }
}

/**
 * Performs a mapping operation on each record in the stream
 * @param {*} f
 */function mapping (f) {
    return function (rf) {
      // this takes 2 things and makes them 1
      return async (acc, val) => {
        var m = await f(val)
        var r = await rf(acc, m) // <-- rf replaces 'concat'
        if (r.hasOwnProperty('reduced')) {
          if (r.reduced) {
            return r
          } else {
            return acc
          }
        } else {
          return r
        }
      }
    }
  }

/**
 * Performs an Object.assign operation on each record in the stream
 * @param {*} f
 */function assign (f) {
  return function (rf) {
    return async (acc, val) => {
      var ac = await acc
      var m = await f(val)
      var m2 = Object.assign({}, val)
      var assigned = Object.assign(m2, m)
      var r = await rf(ac, assigned)
      if (r.hasOwnProperty('reduced')) {
        if (r.reduced) {
          return r
        } else {
          return ac
        }
      } else {
        return r
      }
    }
  }
}

  /**
   * Removes records from the stream if the dont match the predicate
   * @param {*} p
   */
  function filtering (p) {
    return function (rf) {
      // this takes 2 things and makes them 1
      return async (acc, val) => {
        var pred = (await p(val))
        return pred ? rf(acc, val) : { reduced: null } // <-- rf replaces 'concat'
      }
    }
  }

  /**
   * Takes toTake records from the stream
   * @param {*} toTake
   */
function take (toTake) {
  // assert(toTake && cnt > 0)
  var count = toTake
  return function (rf) {
    // this takes 2 things and makes them 1
    return async (acc, val) => {
      if ((--count) < 0) {
        return {
          reduced: null
        }
      } else {
        return rf(acc, val)
      }
    }
  }
}

/**
 * Skips forward in a stream by the toSkip records
 * @param {*} toSkip
 */
function skip (toSkip) {
  // assertMod(toSkip && toSkip >= 0)
  var count = 0
  return function (rf) {
    // this takes 2 things and makes them 1
    return async (acc, val) => {
      if (count++ < toSkip) {
        return { reduced: null }
      } else {
        return rf(acc, val)
      }
    }
  }
}

/**
 * Samples from a stream at a particular frequency.
 * sample(1000) will sample a value once every second
 * @param {*} period
 */
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
        return { reduced: null }
      } else {
        last = nw
        // console.log('Accept' + val)
        return rf(acc, val)
      }
    }
  }
}

/**
 * Transforms a series of measurements into events.  The predicate determines when the measurements continue the event or non-event
 * @param {*} predicate
 */
function eventing (predicate) {
  var latest = null
  var sequence = -1
  return function (rf) {
    return async (acc, val) => {
      sequence++
      var pred = (await predicate(val))
      if (pred && !latest) {
        latest = {
          start: val.time ? val.time : sequence,
          end: val.time ? val.time : sequence
        }
        return { reduced: null }
      } else if (pred && latest) {
        latest.end = val.time ? val.time : sequence
        return { reduced: null }
      } else if (!pred && latest) {
        var next = latest
        latest = null
        return rf(acc, next)
      } else {
        return { reduced: null }
      }
    }
  }
}

/**
 *  Split one event into multiple
 *  splitter is a function which maps a value to an array
 */
function split (splitter) {
  return function (rf) {
    // this takes 2 things and makes them 1
    return async (acc, val) => {
      var rs = await splitter(val)
      var reduction = { reduced: [] }
      try {
        var acc2 = acc
        for (var i = 0; i < rs.length; i++) {
          var r = rs[i]
          acc2 = await rf(acc2, r)
          if (acc2.hasOwnProperty('reduced')) {
            if (acc2.reduced) {
              reduction.reduced.push(acc2.reduced)
            }
          } else {
            reduction.reduced.push(acc2)
          }
        }
        return reduction
      } catch (ex) {
        console.log(ex)
      }
    }
  }
}

/**
 * Randomly samples from a stream with a target frequency.
 * randomFilter(100) will target to sample one value in every 100
 * @param {*} countFrequency - a number
 */
function randomFilter (countFrequency) {
  // assertMod(cnt && cnt >= 0
  return function (rf) {
    return async (acc, val) => {
      var rand = Math.floor((Math.random() * countFrequency))
      if (rand === 0) {
        return rf(acc, val)
      } else {
        return { reduced: null }
      }
    }
  }
}

 /**
   * Make n neighbors available as each stream record is processed.
   * @param {*} numberOfNeighbors
   */
  function neighbors (numNeighbors = 10) {
    var neighbors = []

    return function (rf) {
      return async (acc, val) => {
        neighbors.push(val)
        if ((neighbors.length) < numNeighbors) {
          return {
            reduced: null
          }
        } else {
          let first = neighbors[0]
          let enriched = Object.assign({}, first)
          enriched.neighbors = neighbors
          enriched.data = first
          let res = await rf(acc, enriched)
          neighbors.shift()
          return res
        }
      }
    }
  }

export {
  passthrough,
  mapping,
  assign,
  filtering,
  take,
  skip,
  eventing,
  sampling,
  split,
  randomFilter,
  neighbors
}
