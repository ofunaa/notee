import React from 'react';
import assign from 'object-assign';
var EventEmitter = require('events').EventEmitter;

var EventUtil = assign({}, EventEmitter.prototype, {

    emitChange: function(change_event) {
        this.emit(change_event);
    },

    addChangeListener: function(change_event, callback) {
        this.on(change_event, callback);
    },

    removeChangeListener: function(change_event, callback) {
        this.removeListener(change_event, callback);
    }

});

module.exports = EventUtil;
