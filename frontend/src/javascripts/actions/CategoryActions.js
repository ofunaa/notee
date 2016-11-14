import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import CategoryConstants from '../constants/CategoryConstants'

var CategoryActions = {

    create: function(content) {
        NoteeDispatcher.dispatch({
            type: CategoryConstants.CATEGORY_CREATE,
            content: content
        });
    },

    update: function(content){
        NoteeDispatcher.dispatch({
            type: CategoryConstants.CATEGORY_UPDATE,
            content: content
        });
    },

    delete: function(category_id){
        NoteeDispatcher.dispatch({
            type: CategoryConstants.CATEGORY_DELETE,
            category_id: category_id
        });
    },
    
}

module.exports = CategoryActions;
