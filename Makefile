update:
	npm install
	curl -o vendor/jasmine-jquery.js https://raw.github.com/velesin/jasmine-jquery/master/lib/jasmine-jquery.js
	curl -o vendor/jquery.min.js http://code.jquery.com/jquery.min.js
	curl -o vendor/underscore.min.js http://documentcloud.github.com/underscore/underscore-min.js
	curl -o vendor/backbone.min.js http://backbonejs.org/backbone-min.js
	curl -o vendor/backbone-validations.js https://raw.github.com/n-time/backbone.validations/master/backbone.validations.js
	curl -o vendor/backbone_rails_sync.js https://raw.github.com/codebrew/backbone-rails/master/vendor/assets/javascripts/backbone_rails_sync.js
watch:
	node node_modules/livereload/bin/livereload.js build/
server:
	python -m SimpleHTTPServer
test:
	phantomjs vendor/jasmine_runner.coffee HeadlessRunner.html
