import React from 'react';
import assign from 'object-assign';
import request from 'superagent';
var EventEmitter = require('events').EventEmitter;

// notee
import NoteeDispatcher from '../dispatcher/NoteeDispatcher';
import Constants from '../constants/NoteeConstants';

// utils
import EventUtil from '../utils/EventUtil';

var TokenStore = assign({}, EventEmitter.prototype, {});

function token_delete(){
    request
        .del("/notee/tokens/1")
        .end(function(err, res){
            if(err || !res.body){
                EventUtil.emitChange(Constants.TOKEN_DELETE_FAILED);
                return false;
            }
            EventUtil.emitChange(Constants.TOKEN_DELETE);
            location.reload();
        })
}

NoteeDispatcher.register(function(action) {
    switch(action.type) {
        case Constants.TOKEN_DELETE:
            token_delete();
            break;
    }
});

module.exports = TokenStore;
