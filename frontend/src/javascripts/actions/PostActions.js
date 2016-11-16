import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import NoteeConstants from '../constants/NoteeConstants'

var PostActions = {

    create: function(content) {

        // set default_value
        if(!content.category_id){content.category_id = 1;};
        if(!content.thumbnail_id){content.thumbnail_id = 1;};

        NoteeDispatcher.dispatch({
            type: NoteeConstants.POST_CREATE,
            content: content
        });
    },

    update: function(content){

        // set default_value
        if(!content.category_id){content.category_id = 1;};
        if(!content.thumbnail_id){content.thumbnail_id = 1;};

        NoteeDispatcher.dispatch({
            type: NoteeConstants.POST_UPDATE,
            content: content
        });
    },
    
    delete: function(id){
        NoteeDispatcher.dispatch({
            type: NoteeConstants.POST_DELETE,
            post_id: id
        });
    }
    
}

module.exports = PostActions;
