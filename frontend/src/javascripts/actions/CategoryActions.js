import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import CategoryConstants from '../constants/CategoryConstants'

var CategoryActions = {

    category_create: function(content) {
        NoteeDispatcher.dispatch({
            type: CategoryConstants.CATEGORY_CREATE,
            content: content
        });
    },

    category_update: function(content){
        NoteeDispatcher.dispatch({
            type: CategoryConstants.CATEGORY_UPDATE,
            content: content
        });
    },

    category_delete: function(category_id){
        NoteeDispatcher.dispatch({
            type: CategoryConstants.CATEGORY_DELETE,
            category_id: category_id
        });
    },
    
}

module.exports = CategoryActions;
