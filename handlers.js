var jimi = require('jimi');

exports.home = function(req, res){
	jimi.respond_using_template(res, 'home.html', {'greeting': 'Welcome Home'});
}

exports.about = function(req, res){
	jimi.respond_using_template(res, 'about.html', {'greeting': 'Welcome to about.html'});
}

exports.delayed = function(req, res, how_long){
	setTimeout(function(){
		jimi.respond(res, 'I was delayed by '+ how_long +' milliseconds.');
	}, parseInt(how_long, 10));
}
