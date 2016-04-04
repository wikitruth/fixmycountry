'use strict';

module.exports = {
    isOwner: function (req, item, model) {
        if(item && req.user && item.createUserId && req.user.id && item.createUserId.equals(req.user.id)) {
            return true;
        }
        return false;
    },
    appendOwnerFlag: function (req, item, model) {
        if(this.isOwner(req, item, model)) {
            model.isItemOwner = true;
        }
    },
    appendOrganizationOwnerFlag: function (req, organization, model) {
        if(this.isOwner(req, organization, model)) {
            model.isOrganizationOwner = true;
        }
    },
    appendBranchOwnerFlag: function (req, branch, model) {
        if(this.isOwner(req, branch, model)) {
            model.isBranchOwner = true;
        }
    }
};