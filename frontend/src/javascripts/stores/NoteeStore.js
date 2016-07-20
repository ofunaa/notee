import React from 'react';
import assign from 'object-assign';
import request from 'superagent';
var EventEmitter = require('events').EventEmitter;

// notee
import NoteeDispatcher from '../dispatcher/NoteeDispatcher';
import NoteeConstants from '../constants/NoteeConstants';


function notee_create(content) {
    request
        .post("/notee/api/posts")
        .send(content)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(NoteeConstants.NOTEE_CREATE_FAILED);
                return false;
            }
            NoteeStore.emitChange(NoteeConstants.NOTEE_CREATE);
        })
}

function notee_update(content) {
    request
        .put("/notee/api/posts/" + content.params_id)
        .send(content.content)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(NoteeConstants.NOTEE_UPDATE_FAILED);
                return false;
            }
            NoteeStore.emitChange(NoteeConstants.NOTEE_UPDATE);
        })
}

function notee_delete(notee_src){
    request
        .del("/notee/api/posts/" + notee_src)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(NoteeConstants.NOTEE_DELETE_FAILED);
                return false;
            }
            NoteeStore.emitChange(NoteeConstants.NOTEE_DELETE);
        })
}

function image_create(content){
    request
        .post("/notee/api/images")
        .attach("image", content)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(NoteeConstants.IMAGE_CREATE_FAILED);
                return false;
            }
            NoteeStore.emitChange(NoteeConstants.IMAGE_CREATE);
        })
}

function image_delete(image_src){
    var delete_file = image_src.split("/notee/");
    request
        .del("/notee/api/images/0?name=" + delete_file[1])
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(NoteeConstants.IMAGE_DELETE_FAILED);
                return false;
            }
            NoteeStore.emitChange(NoteeConstants.IMAGE_DELETE);
        })
}

function category_create(content) {
    request
        .post("/notee/api/categories")
        .send(content)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(NoteeConstants.CATEGORY_CREATE_FAILED);
                return false;
            }
            NoteeStore.emitChange(NoteeConstants.CATEGORY_CREATE);
        })
}

function category_update(content) {
    request
        .put("/notee/api/categories/" + content.id)
        .send(content.content)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(NoteeConstants.CATEGORY_UPDATE_FAILED);
                return false;
            }

            NoteeStore.emitChange(NoteeConstants.CATEGORY_UPDATE);
        })
}

function category_delete(category_id){
    request
        .del("/notee/api/categories/" + category_id)
        .end(function(err, res){
            if(err || !res.body){
                NoteeStore.emitChange(NoteeConstants.CATEGORY_DELETE_FAILED);
                return false;
            }
            NoteeStore.emitChange(NoteeConstants.CATEGORY_DELETE);
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

    loadImage: function(image, callback) {

        var search_txt = image;
        var url = "/notee/api/images/00";

        if(typeof(image) == "string"){
            var image_file = image.split("/notee/");
            search_txt = image_file[1];
        }

        request
            .get(url)
            .query({search_txt: search_txt})
            .end(function(err, res){
                if(err){return;}
                if(!res.body){return;}
                callback(res.body.image);
        });
    },

    loadAllImages: function(callback) {
        request.get('/notee/api/images', (err, res) => {
            callback(res.body.images);
        });
    },

    loadCategory: function(id, callback) {
        var url = "/notee/api/categories/" + id;
        request
            .get(url)
            .end(function(err, res){
                if(err){return;}
                if(!res.body){return;}
                callback(res.body.category);
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
