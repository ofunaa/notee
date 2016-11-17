import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import Constants from '../constants/NoteeConstants'

var TrashActions = {

    update: function(id, model_name){
        NoteeDispatcher.dispatch({
            type: Constants.TRASH_UPDATE,
            content_id: id,
            model_name: model_name
        });
    }

}

module.exports = TrashActions;
