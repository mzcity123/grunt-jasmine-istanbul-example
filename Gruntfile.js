module.exports = function(grunt) {
	grunt.initConfig({
		meta: {
			package: grunt.file.readJSON('package.json'),
			src: {
				main: 'src/main',
				test: 'src/test',
			},
			lib: {
				main: 'lib/main',
				test: 'lib/test',
			},
			bin: {
				coverage: 'bin/coverage'
			}
		},
		jasmine: {
			src: '<%= meta.src.main %>/js/*.js',
			options: {
				template: '<%= meta.src.test %>/html/Coverage.tmpl',
				specs: '<%= meta.src.test %>/js/*.js'
			}
		},
		instrument : {
			files : '<%= meta.src.main %>/js/*.js',
			options : {
				basePath : '<%= meta.bin.coverage %>'
			}
		},
		storeCoverage : {
			options : {
				dir : '<%= meta.bin.coverage %>'
			}
		},
		makeReport : {
			src : '<%= meta.bin.coverage %>/*.json',
			options : {
				type : 'lcov',
				dir : '<%= meta.bin.coverage %>'
			}
		},
	});
	
	grunt.loadNpmTasks('grunt-istanbul');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	
	grunt.registerTask('test', 'jasmine:src');
	grunt.registerTask('coverage', ['jasmine:src',
			'storeCoverage', 'makeReport']);
};