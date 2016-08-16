import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import CommentConstants from '../constants/CommentConstants'

var CommentActions = {

    comment_update: function(content){
        NoteeDispatcher.dispatch({
            type: CommentConstants.COMMENT_UPDATE,
            content: content
        });
    },

    comment_delete: function(comment_id){
        NoteeDispatcher.dispatch({
            type: CommentConstants.COMMENT_DELETE,
            comment_id: comment_id
        });
    },

}

module.exports = CommentActions;
