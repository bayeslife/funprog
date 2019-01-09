
function concat (accumlator, val) {
    return accumlator.concat(val)
}

function latest (accumlator, val) {
    return val
}

export {
    concat,
    latest
}
