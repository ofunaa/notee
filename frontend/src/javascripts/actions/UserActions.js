import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import UserConstants from '../constants/UserConstants'

var UserActions = {

    create: function(user) {
        NoteeDispatcher.dispatch({
            type: UserConstants.USER_CREATE,
            content: user
        });
    },

    update: function(user){
        NoteeDispatcher.dispatch({
            type: UserConstants.USER_UPDATE,
            content: user
        });
    },
    
    delete: function(user_id){
        NoteeDispatcher.dispatch({
            type: UserConstants.USER_DELETE,
            user_id: user_id
        });
    },


}

module.exports = UserActions;
