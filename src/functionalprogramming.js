
function apply (x, f) {
    return f(x)
}

function compose (...funcs) {
    return x => funcs.reduceRight(apply, x)
}

const asyncCompose = (...fns) => x => (
    fns.reduce(async (y, f) => f(await y), x)
)

export {
    apply,
    compose,
    asyncCompose
}
