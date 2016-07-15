var keyMirror = require('keymirror');

module.exports = keyMirror({
    NOTEE_CREATE: null,
    NOTEE_UPDATE: null,
    NOTEE_DELETE: null,

    IMAGE_CREATE: null,
    IMAGE_DELETE: null,

    CATEGORY_CREATE: null,
    CATEGORY_UPDATE: null,
    CATEGORY_DELETE: null,

    // for EventEmit
    NOTEE: null,
    NOTEE_FAILED: null,
    IMAGE: null,
    IMAGE_FAILED: null,
    CATEGORY: null,
    CATEGORY_FAILED: null

});
