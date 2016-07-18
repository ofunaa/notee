var keyMirror = require('keymirror');

module.exports = keyMirror({
    NOTEE_CREATE: null,
    NOTEE_CREATE_FAILED: null,
    NOTEE_UPDATE: null,
    NOTEE_UPDATE_FAILED: null,
    NOTEE_DELETE: null,
    NOTEE_DELETE_FAILED: null,

    IMAGE_CREATE: null,
    IMAGE_CREATE_FAILED: null,
    IMAGE_DELETE: null,
    IMAGE_DELETE_FAILED: null,

    CATEGORY_CREATE: null,
    CATEGORY_CREATE_FAILED: null,
    CATEGORY_UPDATE: null,
    CATEGORY_UPDATE_FAILED: null,
    CATEGORY_DELETE: null,
    CATEGORY_DELETE_FAILED: null,

    // for EventEmit
    NOTEE: null,
    NOTEE_FAILED: null,
    IMAGE: null,
    IMAGE_FAILED: null,
    CATEGORY: null,
    CATEGORY_FAILED: null

});
