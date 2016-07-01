import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
var NoteeConstants = require('../constants/NoteeConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var blog_items = []

function create(item) {
    console.log(item);
    blog_items.push(item);
}

var BlogStore = assign({}, EventEmitter.prototype, {

    getPreview: function() {
        return blog_items;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});

NoteeDispatcher.register(function(action) {

    switch(action.type) {
        case NoteeConstants.BLOG_CHANGE_SUBMIT:
            create(action.item);
            BlogStore.emitChange();
            break;

        default:
            console.log("default");
        // no op
    }
});

module.exports = BlogStore;
