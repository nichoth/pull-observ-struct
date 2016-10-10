var drain = require('pull-stream/sinks/drain')
var struct = require('observ-struct')

function State (init) {
    var state = struct(init || {})
    var onEnds = []
    function _state (onChange, onEnd) {
        var i = onEnds.length
        if (onEnd) {
            onEnds.push(onEnd)
        }
        var stopListening = state(onChange)
        return onChange ?
            function _stopListening () {
                stopListening()
                if (onEnd) delete onEnds[i]
            } :
            state()
    }
    _state.sink = drain(function onData (ev) {
        state.set(ev)
    }, function _onEnd (err) {
        onEnds.forEach(function (fn) {
            fn(err)
        })
    })

    return _state
}

module.exports = State
