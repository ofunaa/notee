import React from 'react';
import assign from 'object-assign';
import request from 'superagent';

var EventEmitter = require('events').EventEmitter;

// notee
import NoteeDispatcher from '../dispatcher/NoteeDispatcher';
import UserConstants from '../constants/UserConstants';

function user_create(content) {
    request
        .post("/notee/api/users")
        .field('user[name]', content.name)
        .field('user[email]', content.email)
        .field('user[password]', content.password)
        .field('user[password_confirm]', content.password_confirm)
        .field('user[profile]', content.profile)
        .field('user[role]', content.role)
        .attach("user[profile_img]", content.profile_img)
        .end(function(err, res){
            if (err || !res.body) {
                UserStore.emitChange(UserConstants.USER_CREATE_FAILED);
                return false;
            }
            UserStore.emitChange(UserConstants.USER_CREATE);
        })
}

function user_update(content) {
    request
        .put("/notee/api/users/" + content.params_id)
        .field('user[name]', content.user.name)
        .field('user[email]', content.user.email)
        .field('user[password]', content.user.password)
        .field('user[password_confirm]', content.user.password_confirm)
        .field('user[profile]', content.user.profile)
        .field('user[role]', content.user.role)
        .attach("user[profile_img]", content.user.profile_img)
        .end(function(err, res){
            if(err || !res.body){
                UserStore.emitChange(UserConstants.USER_UPDATE_FAILED);
                return false;
            }
            UserStore.emitChange(UserConstants.USER_UPDATE);
        })
}

function user_delete(notee_src){
    request
        .del("/notee/api/users/" + notee_src)
        .end(function(err, res){
            if(err || !res.body){
                UserStore.emitChange(UserConstants.USER_DELETE_FAILED);
                return false;
            }
            UserStore.emitChange(UserConstants.USER_DELETE);
        })
}

var UserStore = assign({}, EventEmitter.prototype, {

    loadUser: function(user_id, callback) {
        var url = "/notee/api/users/" + user_id;
        request.get(url, (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            callback(res.body.user);
        })
    },

    loadAllUsers: function(callback) {
        request.get('/notee/api/users', (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            callback(res.body.users);
        });
    },

    loadRoles: function(callback) {
        var url = "/notee/api/roles";
        request.get(url, (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            callback(res.body.roles);
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
        // user
        case UserConstants.USER_CREATE:
            user_create(action.content);
            break;
        case UserConstants.USER_UPDATE:
            user_update(action.content);
            break;
        case UserConstants.USER_DELETE:
            user_delete(action.user_id);
            break;
    }
});

module.exports = UserStore;
