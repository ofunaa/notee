import React from 'react';
import assign from 'object-assign';
import request from 'superagent';
var EventEmitter = require('events').EventEmitter;

// notee
import NoteeDispatcher from '../dispatcher/NoteeDispatcher';
import Constants from '../constants/NoteeConstants';

function token_delete(){
    request
        .del("/notee/tokens/1")
        .end(function(err, res){
            if(err || !res.body){
                TokenStore.emitChange(Constants.TOKEN_DELETE_FAILED);
                return false;
            }
            TokenStore.emitChange(Constants.TOKEN_DELETE);
            location.reload();
        })
}


var TokenStore = assign({}, EventEmitter.prototype, {

    emitChange: function(change_event) {
        this.emit(change_event);
    },

    addChangeListener: function(change_event, callback) {
        this.on(change_event, callback);
    }

});

NoteeDispatcher.register(function(action) {

    switch(action.type) {
        case Constants.TOKEN_DELETE:
            token_delete();
            break;
    }
});

module.exports = TokenStore;
