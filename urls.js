var handlers = require('./handlers');

exports.mappings = [
	['^$', handlers.home],
	['^about/?$', handlers.about],
	['^delayed/?$', handlers.delayed],
]
