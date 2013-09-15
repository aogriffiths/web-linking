var httpLink = require('http-link');

var parse = module.exports.parse = function(str){
	return httpLink.parse(str);
}

var stringify = module.exports.stringify = function(json){
	var str = '';
	for (var i = 0; i < json.length; i++) {
		if (str != '') str += ', ';
		str += '<' + json[i].href +'>'
		for (var key in json[i]) {
			if(key!=='href'){
				str += '; ' + key + '="' + json[i][key] + '"';
			}
		}
	}
	return str;
}

var parseRequest = module.exports.parseRequest = function(req){
	var str = req.get('Link');
	return parse(str);
}


var setToResponse = module.exports.setToResponse = function(res, json){
	 var str = stringify(json)
	 res.set('Link', str);
}

