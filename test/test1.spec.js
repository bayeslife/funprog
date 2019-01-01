const { identity, isEven, isGreaterThan, modulus, digitize, not, compose,
    transduceArray, transduceAsyncIterator, transduceAsyncHasNextIterator, transduceGenerator,
    take, skip, mapping, filtering, eventing,
    makeAsyncRangeIterator, makeAsyncHasNextRangeIterator } = require('..')
const { nums, add1, sub1, concat, useNew } = require('./utility.js')

var assert = require('assert')

const xform = compose(
mapping(isGreaterThan(6)),
mapping(add1),
filtering(isEven)
// mapping(doubleIt),
// mapping(add1),
)
describe('Given the functional programming library', function () {
it('Then compose not and operation', async function () {
    var f = compose(not, sub1)
    assert.equal(true, await f(1))
    assert.equal(false, await f(0))
})
})

describe('Given the functional programming library', function () {
    it('Then able to synchronously transduce from an array', async function () {
        const tform = compose(
            mapping(compose(not, sub1)),
            take(1))
        const result = await transduceArray(tform, concat, [], nums)
        assert.equal(result.toString(), [true].toString())
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
    it('Then able to asynchronously skip from hasNext interator', async function () {
        const deltaxform = compose(
            skip(6),
            mapping(identity)
        )
        const numsIt = makeAsyncHasNextRangeIterator(1, 10)
        var result = await transduceAsyncHasNextIterator(deltaxform, concat, [], numsIt)
        assert.equal(result.toString(), [7, 8, 9].toString())
    })
    it('Then able to asynchronously detect events from a stream', async function () {
        const deltaxform = compose(
            mapping(modulus(3)),
            eventing(digitize) // 3 events [1-2,4-5,7-8]
        )
        const numsIt = makeAsyncHasNextRangeIterator(1, 10)
        var result = await transduceAsyncHasNextIterator(deltaxform, concat, [], numsIt)
        assert.equal(result[1].start, 3)
        assert.equal(result[1].end, 4)
    })
    it.only('Then able build a transformed generator', async function () {
        const deltaxform = compose(
            skip(3),
            mapping(modulus(3))
        )
        const generator = makeAsyncRangeIterator(1, 10)
        var newgenerator = await transduceGenerator(deltaxform, useNew, null, generator)
        for await (const value of newgenerator) {
            assert.equal(value, 1)
            break
        }
    })
})
