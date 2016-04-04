'use strict';


module.exports = {
    people: {
        index: '/people'
    },
    events: {
        index: '/events'
    },
    projects: {
        index: '/projects'
    },
    organizations: {
        index: '/organizations',
        create: '/organizations/create',
        entry: '/organizations/entry',
        branch: {
            index: '/organizations/branch',
            create: '/organizations/branch/create',
            entry: '/organizations/branch/entry'
        }
    }
};
