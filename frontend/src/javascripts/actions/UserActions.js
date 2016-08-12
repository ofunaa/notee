import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import UserConstants from '../constants/UserConstants'

var UserActions = {

    create: function(content) {

        // set default_value
        if(!content.category_id){content.category_id = 1;};
        if(!content.thumbnail_id){content.thumbnail_id = 1;};

        NoteeDispatcher.dispatch({
            type: UserConstants.USER_CREATE,
            content: content
        });
    },

    update: function(content){

        // set default_value
        if(!content.category_id){content.category_id = 1;};
        if(!content.thumbnail_id){content.thumbnail_id = 1;};

        NoteeDispatcher.dispatch({
            type: UserConstants.USER_UPDATE,
            content: content
        });
    },
    
    delete: function(notee_id){
        NoteeDispatcher.dispatch({
            type: UserConstants.USER_DELETE,
            notee_id: notee_id
        });
    },

    
}

module.exports = UserActions;
