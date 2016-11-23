import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import Constants from '../constants/NoteeConstants'

var UserActions = {

    create: function(user) {
        NoteeDispatcher.dispatch({
            type: Constants.USER_CREATE,
            content: user
        });
    },

    update: function(user){
        NoteeDispatcher.dispatch({
            type: Constants.USER_UPDATE,
            content: user
        });
    },

    update_password: function(user){
        NoteeDispatcher.dispatch({
            type: Constants.USER_PASSWORD_UPDATE,
            content: user
        });
    },
    
    delete: function(user_id){
        NoteeDispatcher.dispatch({
            type: Constants.USER_DELETE,
            user_id: user_id
        });
    },


}

module.exports = UserActions;
