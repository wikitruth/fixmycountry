'use strict';


module.exports = {
    about: '/about',
    contact: '/contact',
    signup: '/signup',
    login: '/login',
    logout: '/logout',
    admin: '/admin',
    details: '/details',
    account: {
        index: '/account',
        settings: '/account/settings'
    },
    pages: {
        index: '/pages',
        page: '/pages/page',
        create: '/pages/create'
    },
    people: {
        index: '/people',
        create: '/people/create',
        entry: '/people/entry',
        arguments: {
            index: '/people/arguments',
            entry: '/people/arguments/entry',
            create: '/people/arguments/create'
        }
    },
    incidents: {
        index: '/incidents',
        create: '/incidents/create',
        entry: '/incidents/entry',
        arguments: {
            index: '/incidents/arguments',
            entry: '/incidents/arguments/entry',
            create: '/incidents/arguments/create'
        }
    },
    projects: {
        index: '/projects',
        create: '/projects/create',
        entry: '/projects/entry',
        arguments: {
            index: '/projects/arguments',
            entry: '/projects/arguments/entry',
            create: '/projects/arguments/create'
        }
    },
    organizations: {
        index: '/organizations',
        create: '/organizations/create',
        entry: '/organizations/entry',
        branch: {
            index: '/organizations/branch',
            create: '/organizations/branch/create',
            entry: '/organizations/branch/entry',
            arguments: {
                index: '/organizations/branch/arguments',
                entry: '/organizations/branch/arguments/entry',
                create: '/organizations/branch/arguments/create'
            }
        },
        arguments: {
            index: '/organizations/arguments',
            entry: '/organizations/arguments/entry',
            create: '/organizations/arguments/create'
        }
    }
};
