import React from 'react';
import assign from 'object-assign';
import request from 'superagent';
var EventEmitter = require('events').EventEmitter;

// notee
import NoteeDispatcher from '../dispatcher/NoteeDispatcher';
import Constants from '../constants/NoteeConstants';


function category_create(content) {
    request
        .post("/notee/api/categories")
        .send(content)
        .end(function(err, res){
            if(err || !res.body){
                CategoryStore.emitChange(Constants.CREATE_FAILED);
                return false;
            }
            CategoryStore.emitChange(Constants.CREATE);
        })
}

function category_update(content) {
    request
        .put("/notee/api/categories/" + content.params_id)
        .send(content.category)
        .end(function(err, res){
            if(err || !res.body){
                CategoryStore.emitChange(Constants.UPDATE_FAILED);
                return false;
            }

            CategoryStore.emitChange(Constants.UPDATE);
        })
}

function category_delete(category_id){
    request
        .del("/notee/api/categories/" + category_id)
        .end(function(err, res){
            if(err || !res.body){
                CategoryStore.emitChange(Constants.DELETE_FAILED);
                return false;
            }
            CategoryStore.emitChange(Constants.DELETE);
        })
}


var CategoryStore = assign({}, EventEmitter.prototype, {


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
        case Constants.CATEGORY_CREATE:
            category_create(action.content);
            break;
        case Constants.CATEGORY_UPDATE:
            category_update(action.content);
            break;
        case Constants.CATEGORY_DELETE:
            category_delete(action.category_id);
            break;

        default:
            console.log("default");
        // no op
    }
});

module.exports = CategoryStore;
