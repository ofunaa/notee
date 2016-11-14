import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import ImageConstants from '../constants/ImageConstants'

var ImageActions = {

    create: function(content) {
        NoteeDispatcher.dispatch({
            type: ImageConstants.IMAGE_CREATE,
            content: content
        });
    },

    delete: function(image_src){
        NoteeDispatcher.dispatch({
            type: ImageConstants.IMAGE_DELETE,
            image_src: image_src
        });
    },
    
}

module.exports = ImageActions;
