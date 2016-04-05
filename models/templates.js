'use strict';


module.exports = {
    people: {
        index: 'dust/people/index',
        create: 'dust/people/create',
        entry: 'dust/people/entry',
        indexHeader: 'dust/people/index-header'
    },
    incidents: {
        index: 'dust/incidents/index',
        create: 'dust/incidents/create',
        entry: 'dust/incidents/entry',
        indexHeader: 'dust/incidents/index-header'
    },
    projects: {
        index: 'dust/projects/index',
        create: 'dust/projects/create',
        entry: 'dust/projects/entry',
        indexHeader: 'dust/projects/index-header'
    },
    organizations: {
        index: 'dust/organizations/index',
        create: 'dust/organizations/create',
        entry: 'dust/organizations/entry',
        indexHeader: 'dust/organizations/index-header',
        entryHeader: 'dust/organizations/entry-header',
        branch: {
            index: 'dust/organizations/branch/index',
            create: 'dust/organizations/branch/create',
            entry: 'dust/organizations/branch/entry'
        }
    }
};
