var keyMirror = require('keymirror');

module.exports = keyMirror({

    // notee
    POST_CREATE: null,
    POST_CREATE_FAILED: null,
    POST_UPDATE: null,
    POST_UPDATE_FAILED: null,
    POST_DELETE: null,
    POST_DELETE_FAILED: null,

    // category
    CATEGORY_CREATE: null,
    CATEGORY_CREATE_FAILED: null,
    CATEGORY_UPDATE: null,
    CATEGORY_UPDATE_FAILED: null,
    CATEGORY_DELETE: null,
    CATEGORY_DELETE_FAILED: null,

    // user
    USER_CREATE: null,
    USER_CREATE_FAILED: null,
    USER_UPDATE: null,
    USER_UPDATE_FAILED: null,
    USER_DELETE: null,
    USER_DELETE_FAILED: null,
    USER_PASSWORD_UPDATE: null,
    USER_PASSWORD_UPDATE_FAILED: null,

    // image
    IMAGE_CREATE: null,
    IMAGE_CREATE_FAILED: null,
    IMAGE_DELETE: null,
    IMAGE_DELETE_FAILED: null,

    // comment
    COMMENT_UPDATE: null,
    COMMENT_UPDATE_FAILED: null,
    COMMENT_DELETE: null,
    COMMENT_DELETE_FAILED: null,

    // trash
    TRASH_UPDATE: null,
    TRASH_UPDATE_FAILED: null,

    // token
    TOKEN_DELETE: null,
    TOKEN_DELETE_FAILED: null

});
