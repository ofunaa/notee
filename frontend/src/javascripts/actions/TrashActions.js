import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import Constants from '../constants/NoteeConstants'

var TrashActions = {

    update: function(){
        NoteeDispatcher.dispatch({
            type: Constants.TRASH_UPDATE
        });
    }

}

module.exports = TrashActions;
