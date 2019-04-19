
async function transduceAsyncIterator (transform, reducerfunction, init, asynciterator) {
    var reducer = transform(reducerfunction)
    var n = null
    do {
        n = await asynciterator.next()
        if (!n.done) {
        var v = n.value
        init = await reducer(init, v)
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
            r = await reducer(init, v)
            if (r.hasOwnProperty('reduced')) {
                if (r.reduced) {
                    init = r.reduced
                }
            } else if (r) {
                init = r
            }
        }
    } while (r && n)
    return init
}

async function transduceArray (xf, rf, init, xs) {
    // call reduce on the data structure internally (abstract it away)
    // pass the rf to the composed transformation
    // pass in the initial value
    var xrf = await xf(rf)
    let r = await xs.reduce(xrf, init)
    if (r.hasOwnProperty('reduced')) {
        return r.reduced
    } else {
        return r
    }
}

async function transduceArray2 (xf, rf, init, xs) {
    // call reduce on the data structure internally (abstract it away)
    // pass the rf to the composed transformation
    // pass in the initial value
    var reducer = await xf(rf)
    let accumulated = init
    for (var j = 0; j < xs.length; j++) {
        let value = xs[j]
        accumulated = await reducer(accumulated, value)
    }
    return accumulated
}

async function * transduceGenerator (transform, reducerfunction, init, streamgenerator) {
    var reducer = transform(reducerfunction)
    for await (const value of streamgenerator) {
        var newinit = await reducer(init, value)
        // Here we checked if there is new a 'reduced' value and only generate a new value when this is the case
        if (!newinit) {
        } else if (newinit === init) {
        } else {
            if (newinit.hasOwnProperty('reduced')) {
                if (Array.isArray(newinit.reduced)) {
                    for (var i = 0; i < newinit.reduced.length; i++) {
                        init = newinit.reduced[i]
                        yield newinit.reduced[i]
                    }
                }
            } else {
                init = newinit
                yield newinit
            }
        }
    }
}

export {
    transduceAsyncIterator,
    transduceAsyncHasNextIterator,
    transduceArray,
    transduceArray2,
    transduceGenerator
}
