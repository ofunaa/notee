import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import Constants from '../constants/NoteeConstants'

var TokenActions = {

    update: function(id, model_name){
        NoteeDispatcher.dispatch({
            type: Constants.TOKEN_DELETE,
            content_id: id,
            model_name: model_name
        });
    }

}

module.exports = TokenActions;
