import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import Constants from '../constants/NoteeConstants'

var ImageActions = {

    create: function(content) {
        NoteeDispatcher.dispatch({
            type: Constants.IMAGE_CREATE,
            content: content
        });
    },

    delete: function(image_src){
        NoteeDispatcher.dispatch({
            type: Constants.IMAGE_DELETE,
            image_src: image_src
        });
    },
    
}

module.exports = ImageActions;
