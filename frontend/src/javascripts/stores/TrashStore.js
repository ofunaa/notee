import React from 'react';
import assign from 'object-assign';
import request from 'superagent';
var EventEmitter = require('events').EventEmitter;

// notee
import NoteeDispatcher from '../dispatcher/NoteeDispatcher';
import Constants from '../constants/NoteeConstants';

// utils
import EventUtil from '../utils/EventUtil';

var TrashStore = assign({}, EventEmitter.prototype, {

    loadTrashes: function(model_name, callback) {
        request.get('/notee/api/trashes?model=' + model_name, (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            callback(res.body.trashes);
        });
    }

});

function trash_update(id, model_name) {
    request
        .put("/notee/api/trashes/" + id)
        .send({model: model_name})
        .end(function(err, res){
            if(err || !res.body){
                EventUtil.emitChange(Constants.TRASH_UPDATE_FAILED);
                return false;
            }
            EventUtil.emitChange(Constants.TRASH_UPDATE);
        })
}

NoteeDispatcher.register(function(action) {
    switch(action.type) {
        case Constants.TRASH_UPDATE:
            trash_update(action.content_id, action.model_name);
            break;
    }
});

module.exports = TrashStore;
