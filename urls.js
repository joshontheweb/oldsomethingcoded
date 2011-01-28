var handlers = require('./handlers');

exports.mappings = [
	['^$', handlers.home],
	['^about/?$', handlers.about],
	['^contact/?$', handlers.contact],
	['^portfolio/?$', handlers.portfolio],
	['^blog/?$', handlers.blog],
	['^delayed/?$', handlers.delayed],
]
