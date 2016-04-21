'use strict';


module.exports = {
    people: {
        index: 'dust/people/index',
        create: 'dust/people/create',
        entry: 'dust/people/entry',
        indexHeader: 'dust/people/index-header',
        arguments: {
            index: 'dust/people/arguments/index',
            create: 'dust/people/arguments/create',
            entry: 'dust/people/arguments/entry'
        }
    },
    incidents: {
        index: 'dust/incidents/index',
        create: 'dust/incidents/create',
        entry: 'dust/incidents/entry',
        indexHeader: 'dust/incidents/index-header',
        arguments: {
            index: 'dust/incidents/arguments/index',
            create: 'dust/incidents/arguments/create',
            entry: 'dust/incidents/arguments/entry'
        }
    },
    projects: {
        index: 'dust/projects/index',
        create: 'dust/projects/create',
        entry: 'dust/projects/entry',
        indexHeader: 'dust/projects/index-header',
        arguments: {
            index: 'dust/projects/arguments/index',
            create: 'dust/projects/arguments/create',
            entry: 'dust/projects/arguments/entry'
        }
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
            entry: 'dust/organizations/branch/entry',
            arguments: {
                index: 'dust/organizations/branch/arguments/index',
                create: 'dust/organizations/branch/arguments/create',
                entry: 'dust/organizations/branch/arguments/entry'
            }
        },
        arguments: {
            index: 'dust/organizations/arguments/index',
            create: 'dust/organizations/arguments/create',
            entry: 'dust/organizations/arguments/entry'
        }
    }
};
