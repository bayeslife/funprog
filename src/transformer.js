
// generalize the 'mapping' concept, without the concat...
function mapping (f) {
    return function (rf) {
      // this takes 2 things and makes them 1
      return (acc, val) => {
        return rf(acc, f(val)) // <-- rf replaces 'concat'
      }
    }
  }

  // generalize the 'filtering' concept, without the concat...
  function filtering (p) {
    return function (rf) {
      // this takes 2 things and makes them 1
      return (acc, val) => {
        return p(val) ? rf(acc, val) : acc // <-- rf replaces 'concat'
      }
    }
  }

module.exports = {
    mapping,
    filtering
}
