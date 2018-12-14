
function apply (x, f) {
    return f(x)
}

function compose (...funcs) {
    return x => funcs.reduceRight(apply, x)
}

function concat (xs, val) {
    return xs.concat(val)
}

module.exports = {
    compose,
    concat
}
