import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import CommentConstants from '../constants/CommentConstants'

var CommentActions = {

    update: function(is_hidden){
        NoteeDispatcher.dispatch({
            type: CommentConstants.COMMENT_UPDATE,
            is_hidden: is_hidden
        });
    },

    delete: function(comment_id){
        NoteeDispatcher.dispatch({
            type: CommentConstants.COMMENT_DELETE,
            comment_id: comment_id
        });
    },

}

module.exports = CommentActions;
