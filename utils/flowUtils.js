'use strict';

module.exports = {
    appendOwnerFlag: function (req, item, model) {
        if(item && req.user && item.createUserId && req.user.id && item.createUserId.equals(req.user.id)) {
            model.isItemOwner = true;
        }
    }
};