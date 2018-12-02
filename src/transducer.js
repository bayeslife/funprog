
async function transduceIterator(xf, rf, init, xs) {
    var reducer = xf(rf)
    var n = null
    do {
        n = await xs.next()
        if(!n.done){
        var v = n.value
        init = reducer(init,v)
        }
    }while(!n.done)
    return init
}

function transduceArray(xf, rf, init, xs) {
    // call reduce on the data structure internally (abstract it away)
    // pass the rf to the composed transformation
    // pass in the initial value
    return xs.reduce(xf(rf), init);
}
  
module.exports = {
    transduceIterator,
    transduceArray
}