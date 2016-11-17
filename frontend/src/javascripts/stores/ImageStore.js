import React from 'react';
import assign from 'object-assign';
import request from 'superagent';
var EventEmitter = require('events').EventEmitter;

// notee
import NoteeDispatcher from '../dispatcher/NoteeDispatcher';
import Constants from '../constants/NoteeConstants';

function image_create(content){
    request
        .post("/notee/api/images")
        .attach("image", content)
        .end(function(err, res){
            if(err || !res.body){
                ImageStore.emitChange(Constants.IMAGE_CREATE_FAILED);
                return false;
            }
            ImageStore.emitChange(Constants.IMAGE_CREATE);
        })
}

function image_delete(image_src){
    var delete_file = image_src.split("/notee/");
    request
        .del("/notee/api/images/0?name=" + delete_file[1])
        .end(function(err, res){
            if(err || !res.body){
                ImageStore.emitChange(Constants.IMAGE_DELETE_FAILED);
                return false;
            }
            ImageStore.emitChange(Constants.IMAGE_DELETE);
        })
}



var ImageStore = assign({}, EventEmitter.prototype, {

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

    loadImages: function(callback) {
        request.get('/notee/api/images', (err, res) => {
            callback(res.body.images);
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
        // image
        case Constants.IMAGE_CREATE:
            image_create(action.content);
            break;
        case Constants.IMAGE_DELETE:
            image_delete(action.image_src);
            break;
    }
});

module.exports = ImageStore;
