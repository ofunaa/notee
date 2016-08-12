import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import ImageConstants from '../constants/ImageConstants'

var ImageActions = {

    image_create: function(content) {
        NoteeDispatcher.dispatch({
            type: ImageConstants.IMAGE_CREATE,
            content: content
        });
    },

    image_delete: function(image_src){
        NoteeDispatcher.dispatch({
            type: ImageConstants.IMAGE_DELETE,
            image_src: image_src
        });
    },
    
}

module.exports = ImageActions;
