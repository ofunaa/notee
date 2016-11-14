import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import Constants from '../constants/NoteeConstants'

var CategoryActions = {

    create: function(content) {
        NoteeDispatcher.dispatch({
            type: Constants.CATEGORY_CREATE,
            content: content
        });
    },

    update: function(content){
        NoteeDispatcher.dispatch({
            type: Constants.CATEGORY_UPDATE,
            content: content
        });
    },

    delete: function(category_id){
        NoteeDispatcher.dispatch({
            type: Constants.CATEGORY_DELETE,
            category_id: category_id
        });
    },
    
}

module.exports = CategoryActions;
