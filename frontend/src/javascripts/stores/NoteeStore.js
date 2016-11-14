import React from 'react';
import assign from 'object-assign';
import request from 'superagent';
var EventEmitter = require('events').EventEmitter;

// notee
import NoteeDispatcher from '../dispatcher/NoteeDispatcher';
import Constants from '../constants/NoteeConstants';


function notee_create(content) {
    request
        .post("/notee/api/posts")
        .send(content)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(Constants.NOTEE_CREATE_FAILED);
                return false;
            }
            NoteeStore.emitChange(Constants.NOTEE_CREATE);
        })
}

function notee_update(content) {
    request
        .put("/notee/api/posts/" + content.params_id)
        .send(content.content)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(Constants.NOTEE_UPDATE_FAILED);
                return false;
            }
            NoteeStore.emitChange(Constants.NOTEE_UPDATE);
        })
}

function notee_delete(notee_src){
    request
        .del("/notee/api/posts/" + notee_src)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(Constants.NOTEE_DELETE_FAILED);
                return false;
            }
            NoteeStore.emitChange(Constants.NOTEE_DELETE);
        })
}



var NoteeStore = assign({}, EventEmitter.prototype, {

    loadNotee: function(notee_id, callback) {
        var url = "/notee/api/posts/" + notee_id;
        request.get(url, (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            callback(res.body.post);
        })
    },

    loadAllNotees: function(callback) {
        request.get('/notee/api/posts', (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            callback(res.body.posts);
        });
    },

    loadAllComments: function(callback) {
        request.get('/notee/api/comments', (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            callback(res.body.posts);
        });
    },

    loadStatuses: function(callback) {
        var url = "/notee/api/statuses";
        request.get(url, (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            console.log(res.body);
            callback(res.body.statuses);
        })
    },

    loadStatus: function(status_value, callback) {
        var url = "/notee/api/statuses/0";
        request
            .get(url)
            .query({status: status_value})
            .end(function(err, res){
                if(err){return;}
                if(!res.body){return;}
                callback(res.body.name);
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
        // notee
        case Constants.NOTEE_CREATE:
            notee_create(action.content);
            break;
        case Constants.NOTEE_UPDATE:
            notee_update(action.content);
            break;
        case Constants.NOTEE_DELETE:
            notee_delete(action.notee_id);
            break;

        default:
            console.log("default");
        // no op
    }
});

module.exports = NoteeStore;
