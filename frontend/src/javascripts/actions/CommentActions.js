import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import Constants from '../constants/NoteeConstants'

var CommentActions = {

    update: function(id){
        NoteeDispatcher.dispatch({
            type: Constants.COMMENT_UPDATE,
            comment_id: id
        });
    },

    delete: function(id){
        NoteeDispatcher.dispatch({
            type: Constants.COMMENT_DELETE,
            comment_id: id
        });
    },

}

module.exports = CommentActions;
