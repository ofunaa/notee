import React from 'react';
import assign from 'object-assign';
import request from 'superagent';
var EventEmitter = require('events').EventEmitter;

// notee
import NoteeDispatcher from '../dispatcher/NoteeDispatcher';
import CommentConstants from '../constants/CommentConstants';


function comment_update(content) {
    request
        .put("/notee/api/comments/" + content.id)
        .send(content.content)
        .end(function(err, res){
            if(err || !res.body){
                CommentStore.emitChange(CommentConstants.COMMENT_UPDATE_FAILED);
                return false;
            }
            CommentStore.emitChange(CommentConstants.COMMENT_UPDATE);
        })
}

function comment_delete(comment_id){
    request
        .del("/notee/api/comments/" + comment_id)
        .end(function(err, res){
            if(err || !res.body){
                CommentStore.emitChange(CommentConstants.COMMENT_DELETE_FAILED);
                return false;
            }
            CommentStore.emitChange(CommentConstants.COMMENT_DELETE);
        })
}


var CommentStore = assign({}, EventEmitter.prototype, {


    loadAllComments: function(callback) {
        var url = "/notee/api/comments";
        request.get(url, (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            callback(res.body.categories);
        })
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
        // category
        case CommentConstants.COMMENT_UPDATE:
            comment_update(action.content);
            break;
        case CommentConstants.COMMENT_DELETE:
            comment_delete(action.category_id);
            break;

        default:
            console.log("default");
        // no op
    }
});

module.exports = CommentStore;
