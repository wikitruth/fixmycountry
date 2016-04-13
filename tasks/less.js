'use strict';


module.exports = function less(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-less');

    // Options
    return {
        build: {
            options: {
                cleancss: false,
                compress: true
            },
            files: [
                {
                    expand: true,
                    cwd: 'public/css',
                    src: ['**/*.less'],
                    dest: '.build/css/',
                    ext: '.css'
                },
                {
                    'public/layouts/core.min.css': [
                        'public/less/bootstrap-build.less',
                        'public/less/font-awesome-build.less',
                        'public/layouts/core.less'
                    ],
                    'public/layouts/admin.min.css': ['public/layouts/admin.less']
                },
                {
                    expand: true,
                    cwd: 'public/views/',
                    src: ['**/*.less'],
                    dest: 'public/views/',
                    ext: '.min.css'
                }
            ]
        }
    };
};
