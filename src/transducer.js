
async function transduceAsyncIterator (transform, reducerfunction, init, asynciterator) {
    var reducer = transform(reducerfunction)
    var n = null
    do {
        n = await asynciterator.next()
        if (!n.done) {
        var v = n.value
        init = reducer(init, v)
        }
    } while (!n.done)
    return init
}

async function transduceAsyncHasNextIterator (transform, reducerfunction, init, asynchasnextiterator) {
    var reducer = transform(reducerfunction)
    var n = null
    var r = null
    do {
        n = await asynchasnextiterator.hasNext()
        if (n) {
            var v = await asynchasnextiterator.next()
            r = reducer(init, v)
            if (r) {
                init = r
            }
        }
    } while (r && n)
    return init
}

function transduceArray (xf, rf, init, xs) {
    // call reduce on the data structure internally (abstract it away)
    // pass the rf to the composed transformation
    // pass in the initial value
    return xs.reduce(xf(rf), init)
}

module.exports = {
    transduceAsyncIterator,
    transduceAsyncHasNextIterator,
    transduceArray
}
