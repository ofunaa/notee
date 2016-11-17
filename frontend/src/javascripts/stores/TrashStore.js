import React from 'react';
import assign from 'object-assign';
import request from 'superagent';
var EventEmitter = require('events').EventEmitter;

// notee
import NoteeDispatcher from '../dispatcher/NoteeDispatcher';
import Constants from '../constants/NoteeConstants';

function trash_update(content) {
    request
        .put("/notee/api/posts/" + content.params_id)
        .send(content.content)
        .end(function(err, res){
            if(err || !res.body){
                PostStore.emitChange(Constants.POST_UPDATE_FAILED);
                return false;
            }
            PostStore.emitChange(Constants.POST_UPDATE);
        })
}


var TrashStore = assign({}, EventEmitter.prototype, {

    loadTrashes: function(callback) {
        request.get('/notee/api/trashes', (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            callback(res.body.posts);
        });
    },

    emitChange: function(change_event) {
        this.emit(change_event);
    },

    addChangeListener: function(change_event, callback) {
        this.on(change_event, callback);
    }

});

NoteeDispatcher.register(function(action) {

    switch(action.type) {
        case Constants.POST_UPDATE:
            trash_update(action.content);
            break;
    }
});

module.exports = PostStore;
