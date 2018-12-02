const { compose, transduceArray, transduceIterator, mapping, filtering } = require('../index.js')
const { nums, add1, identity, isEven, isGreaterThan, concat, makeAsyncRangeIterator } = require('./utility.js')

var assert = require('assert')

const xform = compose(
  mapping(isGreaterThan(6)),
  mapping(add1),
  filtering(isEven)
  // mapping(doubleIt),
  // mapping(add1),
)

describe('Given the functional programming library', function () {
    it('Then able to synchronously transduce from an array', function () {
        const result = transduceArray(xform, concat, [], nums)
        assert.equal(result.toString(), [8, 10].toString())
    })
    it('Then able to asynchronously transduce from an interator', async function () {
        const deltaxform = compose(
            mapping(identity)
          )
        const numsIt = makeAsyncRangeIterator(1, 10)
        var result = await transduceIterator(deltaxform, concat, [], numsIt)
        assert.equal(result.toString(), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].toString())
    })
})
