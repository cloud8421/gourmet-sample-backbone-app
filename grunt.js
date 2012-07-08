module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-coffee');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    coffee: {
      app: {
        src: ['src/app/**/*.coffee'],
        dest: 'compiled/app'
      },
      spec: {
        src: 'src/spec/**/*.coffee',
        dest: 'compiled/spec'
      }
    },
    watch: {
      files: 'src/**/*.coffee',
      tasks: 'coffee concat min'
    },
    concat: {
      app: {
        src: ['<banner:meta.banner>', 'compiled/app/**/*.js'],
        dest: 'build/<%= pkg.name %>.js'
      },
      spec: {
        src: 'compiled/spec/**/*.js',
        dest: 'build/<%= pkg.name %>_spec.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.app.dest>'],
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'coffee concat min');

};
