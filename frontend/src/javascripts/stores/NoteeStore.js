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
            if(err || !res.body){
                NoteeStore.emitChange(NoteeConstants.NOTEE_FAILED);
                return false;
            }
            NoteeStore.emitChange(NoteeConstants.NOTEE);
        })
}

function notee_update(content) {
    request
        .put("/notee/api/posts/" + content.params_id)
        .send(content.content)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(NoteeConstants.NOTEE_FAILED);
                return false;
            }
            NoteeStore.emitChange(NoteeConstants.NOTEE);
        })
}

function notee_delete(notee_src){
    request
        .del("/notee/api/posts/" + notee_src)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(NoteeConstants.NOTEE_FAILED);
                return false;
            }
            NoteeStore.emitChange(NoteeConstants.NOTEE);
        })
}

function image_create(content){
    request
        .post("/notee/api/images")
        .attach("image", content)
        .end(function(err, res){
            if(err){return false;}
            if(!res.body){return false;}

            NoteeStore.emitChange(NoteeConstants.IMAGE);
        })
}

function image_delete(image_src){

    var a = image_src.split("/notee/");
    console.log(a);

    request
        .del("/notee/api/images/0?name=" + a[1])
        .end(function(err, res){
            if(err){return false;}
            if(!res.body){return false;}

            NoteeStore.emitChange(NoteeConstants.IMAGE);
        })
}

function category_create(content) {
    request
        .post("/notee/api/categories")
        .send(content)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(NoteeConstants.CATEGORY_FAILED);
                return false;
            }
            NoteeStore.emitChange(NoteeConstants.CATEGORY);
        })
}

function category_update(content) {
    request
        .put("/notee/api/categories/" + content.id)
        .send(content.content)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(NoteeConstants.CATEGORY_FAILED);
                return false;
            }

            NoteeStore.emitChange(NoteeConstants.CATEGORY);
        })
}

function category_delete(category_id){
    request
        .del("/notee/api/categories/" + category_id)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(NoteeConstants.CATEGORY_FAILED);
                return false;
            }
            NoteeStore.emitChange(NoteeConstants.CATEGORY);
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

    loadAllImages: function(callback) {
        request.get('/notee/api/images', (err, res) => {
            callback(res.body.images);
        });
    },

    loadAllCategories: function(callback) {
        var url = "/notee/api/categories";
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
        // notee
        case NoteeConstants.NOTEE_CREATE:
            notee_create(action.content);
            break;
        case NoteeConstants.NOTEE_UPDATE:
            notee_update(action.content);
            break;
        case NoteeConstants.NOTEE_DELETE:
            notee_delete(action.notee_id);
            break;

        // image
        case NoteeConstants.IMAGE_CREATE:
            image_create(action.content);
            break;
        case NoteeConstants.IMAGE_DELETE:
            image_delete(action.image_src);
            break;

        // category
        case NoteeConstants.CATEGORY_CREATE:
            category_create(action.content);
            break;
        case NoteeConstants.CATEGORY_UPDATE:
            category_update(action.content);
            break;
        case NoteeConstants.CATEGORY_DELETE:
            category_delete(action.category_id);
            break;

        default:
            console.log("default");
        // no op
    }
});

module.exports = NoteeStore;
