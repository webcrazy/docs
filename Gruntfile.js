module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    'gh-pages': {
      options: {
        base: '_book',
        message: 'Update gitbook'
      },
      src: ['**']
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', 'build book', ['build']);
  grunt.registerTask('build', 'build book', [
    'gh-pages'
  ]);
};
