const { identity, isEven, isGreaterThan, not, compose, transduceArray, transduceAsyncIterator, transduceAsyncHasNextIterator, take, mapping, filtering, makeAsyncRangeIterator, makeAsyncHasNextRangeIterator } = require('../index.js')
const { nums, add1, concat } = require('./utility.js')

var assert = require('assert')

const xform = compose(
  mapping(isGreaterThan(6)),
  mapping(add1),
  filtering(isEven)
  // mapping(doubleIt),
  // mapping(add1),
)

describe('Given the functional programming library', function () {
    it('Then able to synchronously transduce from an array', async function () {
        const tform = compose(
            mapping(not),
            take(1))
        const result = await transduceArray(tform, concat, [], nums)
        assert.equal(result.toString(), [false].toString())
    })

    it('Then able to synchronously transduce from an array', async function () {
        const result = await transduceArray(xform, concat, [], nums)
        assert.equal(result.toString(), [8, 10].toString())
    })
    it('Then able to asynchronously transduce from an interator', async function () {
        const deltaxform = compose(
            mapping(identity)
          )
        const numsIt = makeAsyncRangeIterator(1, 10)
        var result = await transduceAsyncIterator(deltaxform, concat, [], numsIt)
        assert.equal(result.toString(), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].toString())
    })
    it('Then able to asynchronously transduce from an hasNext interator', async function () {
        const deltaxform = compose(
            mapping(identity)
          )
        const numsIt = makeAsyncHasNextRangeIterator(1, 10)
        var result = await transduceAsyncHasNextIterator(deltaxform, concat, [], numsIt)
        assert.equal(result.toString(), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].toString())
    })
    it('Then able to asynchronously take from hasNext interator', async function () {
        const deltaxform = compose(
            take(3),
            mapping(identity)
          )
        const numsIt = makeAsyncHasNextRangeIterator(1, 10)
        var result = await transduceAsyncHasNextIterator(deltaxform, concat, [], numsIt)
        assert.equal(result.toString(), [1, 2, 3].toString())
    })
})
