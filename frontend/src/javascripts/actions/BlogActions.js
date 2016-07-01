var NoteeDispatcher = require('../dispatcher/NoteeDispatcher');
var NoteeConstants = require('../constants/NoteeConstants');

var BlogActions = {

    submit: function(blog_item) {

        NoteeDispatcher.dispatch({
            type: NoteeConstants.BLOG_CHANGE_SUBMIT,
            item: blog_item
        });
    }
    
}

module.exports = BlogActions;
