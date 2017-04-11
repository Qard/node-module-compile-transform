var patches = []
var filename = null
function patchReducer(content, record) {
  return record.matcher.test(filename)
    ? record.patcher(content)
    : content
}

function shim(obj, meth, build) {
  obj[meth] = build(obj[meth])
}

shim(module.constructor.prototype, '_compile', function wrapCompile(compile) {
  return function wrappedCompile(content, _filename) {
    filename = _filename
    return compile.call(
      this,
      patches.reduce(patchReducer, content),
      _filename
    )
  }
})

module.exports = function registerPatch(matcher, patcher) {
  patches.push({ matcher, patcher })
}
