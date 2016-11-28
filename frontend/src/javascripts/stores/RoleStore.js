import React from 'react';
import assign from 'object-assign';
import request from 'superagent';

var EventEmitter = require('events').EventEmitter;


var RoleStore = assign({}, EventEmitter.prototype, {

    loadRole: function(callback) {
        var url = "/notee/api/roles/1";
        request.get(url, (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            callback(res.body.role);
        })
    },

    loadRoles: function(callback) {
        var url = "/notee/api/roles";
        request.get(url, (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            callback(res.body.roles);
        })
    },

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

module.exports = RoleStore;
