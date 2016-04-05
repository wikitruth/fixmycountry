'use strict';


module.exports = {
    people: {
        index: '/people',
        create: '/people/create',
        entry: '/people/entry'
    },
    incidents: {
        index: '/incidents',
        create: '/incidents/create',
        entry: '/incidents/entry'
    },
    projects: {
        index: '/projects',
        create: '/projects/create',
        entry: '/projects/entry'
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
