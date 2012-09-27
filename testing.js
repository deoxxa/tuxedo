var dotty = require('dotty'), stream = require('stream'), util = require('util'), tux_testing = module.exports = function tux_testing() {
    };
util.inherits(tux_testing, stream);
tux_testing.prototype.render = function (data) {
    stream.call(this);
    if (dotty.get(data, [
            dotty.get(data, 'a'),
            1,
            2,
            'c',
            'd',
            dotty.get(data, 'e')
        ]) == dotty.get(data, [
            dotty.get(data, 'b'),
            dotty.get(data, 'c'),
            dotty.get(data, 'l'),
            5,
            'a',
            's',
            'd',
            'f'
        ])) {
        this.emit('data', '\n');
        this.emit('data', dotty.get(data, 'herp'));
        this.emit('data', '\n');
        this.emit('data', dotty.get(data, 'derp'));
        this.emit('data', '\n');
    }
    this.emit('data', '\n');
};
