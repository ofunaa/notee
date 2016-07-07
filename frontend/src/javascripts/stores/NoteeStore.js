import React from 'react';
import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import NoteeConstants from '../constants/NoteeConstants'
import assign from 'object-assign'
import request from 'superagent'

var EventEmitter = require('events').EventEmitter;

function notee_create(content) {
    request
        .post("/notee/api/posts")
        .send(content)
        .end(function(err, res){
            console.log(res.body);
        })
}

function notee_update(content) {
    request
        .put("/notee/api/posts/" + content.params_id)
        .send(content.content)
        .end(function(err, res){
            console.log(res.body);
        })
}

function notee_delete(notee_id){
    request
        .delete("/notee/api/posts/" + notee_id)
        .end(function(err, res){
            console.log(res.body);
        })
}


var NoteeStore = assign({}, EventEmitter.prototype, {

    loadNotee: function(notee_id, callback) {
        var url = "/notee/api/posts/" + notee_id;
        request.get(url, (err, res) => {
            callback(res.body.post);
        })
    },

    loadAllNotees: function(callback) {
        request.get('/notee/api/posts', (err, res) => {
            callback(res.body.posts);
        });
    }

});

NoteeDispatcher.register(function(action) {

    switch(action.type) {
        case NoteeConstants.NOTEE_CREATE:
            notee_create(action.content);
            break;
        case NoteeConstants.NOTEE_UPDATE:
            notee_update(action.content);
            break;
        case NoteeConstants.NOTEE_DELETE:
            notee_delete(action.notee_id);
            break;

        default:
            console.log("default");
        // no op
    }
});

module.exports = NoteeStore;
