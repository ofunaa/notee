import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import NoteeConstants from '../constants/NoteeConstants'

var NoteeActions = {

    notee_create: function(content) {
        NoteeDispatcher.dispatch({
            type: NoteeConstants.NOTEE_CREATE,
            content: content
        });
    },

    notee_update: function(content){
        NoteeDispatcher.dispatch({
            type: NoteeConstants.NOTEE_UPDATE,
            content: content
        });
    },
    
    notee_delete: function(notee_id){
        NoteeDispatcher.dispatch({
            type: NoteeConstants.NOTEE_DELETE,
            notee_id: notee_id
        });
    },

    image_create: function(content) {
        NoteeDispatcher.dispatch({
            type: NoteeConstants.IMAGE_CREATE,
            content: content
        });
    },

    image_delete: function(image_src){
        NoteeDispatcher.dispatch({
            type: NoteeConstants.IMAGE_DELETE,
            image_src: image_src
        });
    },

    category_create: function(content) {
        NoteeDispatcher.dispatch({
            type: NoteeConstants.CATEGORY_CREATE,
            content: content
        });
    },

    category_update: function(content){
        NoteeDispatcher.dispatch({
            type: NoteeConstants.CATEGORY_UPDATE,
            content: content
        });
    },

    category_delete: function(category_id){
        NoteeDispatcher.dispatch({
            type: NoteeConstants.CATEGORY_DELETE,
            category_id: category_id
        });
    },
    
}

module.exports = NoteeActions;
