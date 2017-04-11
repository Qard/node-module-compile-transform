var tap = require('tap')
var patch = require('./')

patch(/foo\.js$/, function(content) {
  return content.replace(/foo/, 'bar')
})

tap.equal(require('./foo'), 'bar')
