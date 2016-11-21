import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import Constants from '../constants/NoteeConstants'

var TokenActions = {

    delete: function(){
        NoteeDispatcher.dispatch({
            type: Constants.TOKEN_DELETE
        });
    }

}

module.exports = TokenActions;
