update:
	npm install
	curl -o vendor/jasmine-jquery.js https://raw.github.com/velesin/jasmine-jquery/master/lib/jasmine-jquery.js
	curl -o vendor/jquery.min.js http://code.jquery.com/jquery.min.js
watch:
	node node_modules/livereload/bin/livereload.js build/
server:
	python -m SimpleHTTPServer
