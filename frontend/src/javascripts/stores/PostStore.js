import React from 'react';
import assign from 'object-assign';
import request from 'superagent';
var EventEmitter = require('events').EventEmitter;

// notee
import NoteeDispatcher from '../dispatcher/NoteeDispatcher';
import Constants from '../constants/NoteeConstants';


function post_create(content) {
    request
        .post("/notee/api/posts")
        .send(content)
        .end(function(err, res){
            if(err || !res.body){
                PostStore.emitChange(Constants.POST_CREATE_FAILED);
                return false;
            }
            PostStore.emitChange(Constants.POST_CREATE);
        })
}

function post_update(content) {
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

function post_delete(notee_src){
    request
        .del("/notee/api/posts/" + notee_src)
        .end(function(err, res){
            if(err || !res.body){
                PostStore.emitChange(Constants.POST_DELETE_FAILED);
                return false;
            }
            PostStore.emitChange(Constants.POST_DELETE);
        })
}



var PostStore = assign({}, EventEmitter.prototype, {

    loadPost: function(notee_id, callback) {
        var url = "/notee/api/posts/" + notee_id;
        request.get(url, (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            callback(res.body.post);
        })
    },

    loadPosts: function(callback) {
        request.get('/notee/api/posts', (err, res) => {
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
        case Constants.POST_CREATE:
            post_create(action.content);
            break;
        case Constants.POST_UPDATE:
            post_update(action.content);
            break;
        case Constants.POST_DELETE:
            post_delete(action.post_id);
            break;

    }
});

module.exports = PostStore;
