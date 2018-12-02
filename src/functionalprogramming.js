
function apply(x, f) {
    return f(x);
}

function compose(...funcs) {
    return x => funcs.reduceRight(apply, x);
}
  
module.exports = {
    compose
}
  