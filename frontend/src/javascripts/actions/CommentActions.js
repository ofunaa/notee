import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import Constants from '../constants/NoteeConstants'

var CommentActions = {

    update: function(is_hidden){
        NoteeDispatcher.dispatch({
            type: Constants.COMMENT_UPDATE,
            is_hidden: is_hidden
        });
    },

    delete: function(comment_id){
        NoteeDispatcher.dispatch({
            type: Constants.COMMENT_DELETE,
            comment_id: comment_id
        });
    },

}

module.exports = CommentActions;
