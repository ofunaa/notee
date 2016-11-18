import React from 'react';
import assign from 'object-assign';
import request from 'superagent';
var EventEmitter = require('events').EventEmitter;

// notee
import NoteeDispatcher from '../dispatcher/NoteeDispatcher';
import Constants from '../constants/NoteeConstants';

function trash_update(id, model_name) {
    request
        .put("/notee/api/trashes/" + id)
        .send({model: model_name})
        .end(function(err, res){
            if(err || !res.body){
                TrashStore.emitChange(Constants.TRASH_UPDATE_FAILED);
                return false;
            }
            TrashStore.emitChange(Constants.TRASH_UPDATE);
        })
}


var TrashStore = assign({}, EventEmitter.prototype, {

    loadTrashes: function(model_name, callback) {
        request.get('/notee/api/trashes?model=' + model_name, (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            callback(res.body.trashes);
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
        case Constants.TRASH_UPDATE:
            trash_update(action.content_id, action.model_name);
            break;
    }
});

module.exports = TrashStore;
