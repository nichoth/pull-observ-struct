# pull observ struct

An isntance of `observ-struct` that listens to a pull stream. Instead of calling `.set` on an observable, connect it to a source stream.


## install

    $ npm install pull-observ-struct


## example

```js
var State = require('pull-observ-struct')
var S = require('pull-stream')

// normal observ interface
var state = State({})

// subscribe to changes
// but with an `end` listener too
var stopListening = state(function onChange (data) {
    console.log('change', data)
}, function onEnd (err) {
    console.log('end')
})

// there is no `.set` method
// all changes must come from the stream
S(
    S.values([{ test: 'test' }]),
    state.sink
)

// get state
var s = state()

// remove change and end listeners
stopListening()
```
