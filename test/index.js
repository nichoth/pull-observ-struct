var S = require('pull-stream')
var test = require('tape')
var State = require('../')

test('pull struct', function (t) {
    t.plan(4)
    var state = State({})

    var expected = [{ test: 'a' }, { test: 'b' }, { test: 'c' }]
    var count = 0
    state(function onChange (data) {
        t.deepEqual(data, expected[count], 'should set state from stream')
        count++
    })

    S(S.values([{ test: 'a' }, { test: 'b' }, { test: 'c' }]),
    state.sink)

    t.deepEqual(state(), expected[2], 'can get state')
})

test('remove listeners', function (t) {
    t.plan(1)
    var state = State()
    var stopListening = state(function onChange (data) {
        t.deepEqual(data, { test: 'test' }, 'should change once')
        stopListening()
    }, function onEnd (err) {
        t.fail('should remove listener before end')
    })

    S(S.values([{ test: 'test' }, { test: 'test2' }]),
    state.sink)
})
