var fs = require('fs'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter,
    bemWalk = require('bem-walk'),
    naming = require('bem-naming');

util.inherits(Valkyrie, EventEmitter);

function Valkyrie(levels, opts) {
    if (!(this instanceof Valkyrie)) {
        return new Valkyrie(levels, opts);
    }

    var _this = this,
        walker = this.walker = bemWalk(levels, opts);

    walker
        .on('data', function(item) {
            var type = naming.typeOf(item.entity),
                techKey = { tech: item.tech },
                entityKey = {};

            entityKey[type] = item.entity[type];

            fs.lstatSync(item.path).isDirectory() && (item.isDir = true);

            _this.emit('*', item);
            _this.emit(type, item);
            _this.emit(JSON.stringify(entityKey), item);
            _this.emit(JSON.stringify(techKey), item);
        })
        .on('end' ,function() {
            _this.emit('end');
        })
        .on('error', function(err) {
            _this.emit('error', err);
        });

    this.on = function(e, cb) {
        if (typeof e === 'object') e = JSON.stringify(e);
        this.constructor.prototype.on.call(this, e, cb);
        return this;
    }

    this.get = function(e, field, cb) {
        if (arguments.length < 3) {
            cb = field;
            field = null;
        }

        var res = [];

        return this
            .on(e, function(files) {
                res.push(field ? files[field] : files);
            })
            .on('end', function() {
                cb(res);
            });
    }
}

module.exports = Valkyrie;
