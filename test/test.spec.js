const { identity, isEven, isGreaterThan, modulus, digitize, not, compose,
    transduceArray, transduceAsyncIterator, transduceAsyncHasNextIterator, transduceGenerator,
    take, skip, mapping, filtering, eventing, sampling, passthrough, split, latest,
    makeAsyncRangeIterator, makeAsyncHasNextRangeIterator } = require('../dist/funprog.umd')
const { nums, add1, sub1, concat, useNew, delay } = require('./utility.js')

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

describe('Given the transform functions', function () {
    it('Then mapping identity is a no-op', async function () {
        var f = mapping(identity)
        var rf = await f(concat)
        var val = await rf([1], [])
        assert.equal(1, val[0])
    })
    it('Then passthrough is a no-op', async function () {
        var f = passthrough()
        var rf = await f(concat)
        var val = await rf([1], [])
        assert.equal(1, val[0])
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
    it('Then able build a transformed generator', async function () {
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
    it('Then able sample from generator', async function () {
        const deltaxform = sampling(300) // emit a value every 300 milliseconds if available
        const generator = makeAsyncRangeIterator(1, 10, 1, 100) // generator 1 through 10 by ones every 100 milliseconds
        var newgenerator = await transduceGenerator(deltaxform, useNew, null, generator)
        var cnt = 0
        var last = null
        // the values here will be 1,4,7
        for await (const value of newgenerator) {
            cnt++
            if (cnt >= 3) {
                last = value
                break
            }
        }
        assert.equal(last, 7)
    })
    it.only('Then able to split from generator', async function () {
        var duplicate = x => [x, x] // a function which maps a value to an array.
        const deltaxform = compose(
            split(duplicate), // replicate each value
            take(5)
        )
        const generator = makeAsyncRangeIterator(1, 10) // generator 1 through 10 by ones every 100 milliseconds
        var newgenerator = await transduceGenerator(deltaxform, useNew, null, generator)
        var cnt = 0
        var stream = []
        for await (const value of newgenerator) {
            stream.push(value)
            cnt++
            if (cnt >= 5) {
                newgenerator.return()
            }
        }
        // stream should be [ 1, 1, 2, 2, 3 ]
        assert.equal(stream[0], 1)
        assert.equal(stream[1], 1)
        assert.equal(stream[2], 2)
        assert.equal(stream[4], 3)
    })
})
