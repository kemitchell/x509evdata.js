```javascript
var x509evdata = require('x509evdata')
var assert = require('assert')

x509evdata('github.com', function(error, data) {
  console.log(data)
  assert(false) })
```
