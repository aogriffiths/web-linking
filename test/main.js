var linking = require('../lib/main.js');
var httpheaderlinking = linking.httpheader;
var atomlinking = linking.atom;
var rsslinking = linking.rss;
var assert = require('assert');

//return httpLink.parse(req.get('Link'));



var link1a   = '<test>; rel="self"; type="thing"';
var parsed1a = httpheaderlinking.parse(link1a);
var link1b   = httpheaderlinking.stringify(parsed1a);
var parsed1b = httpheaderlinking.parse(link1b);

//link1a and link1b may have parameters in the different order
console.log(link1a);
console.log(link1b);

//but parsed1a and parsed1b should be deep equal.
console.log(parsed1a);
console.log(parsed1b);

assert.deepEqual(parsed1a, parsed1b);


function fakeReq(linkstring){
	this.headers = {};
	this.headers.link = linkstring;
	this.get = function(name){
		if(name == 'Link'){
			return this.headers.link 
		}else{
			return null;
		}
	}; 
	return this;
}

function fakeRes(){
	this.headers = {};
	this.set = function(name, val){
		this.headers[name] = val;
	};
	return this;
}

var link2a   = '<test>; rel="self"; type="thing"';
var parsed2a = httpheaderlinking.parseRequest(new fakeReq(link1a));
var link2b   = httpheaderlinking.stringify(parsed1a);
var parsed2b = httpheaderlinking.parseRequest(new fakeReq(link1b));

assert.deepEqual(parsed2a, parsed2b);

var res = new fakeRes();
var parsed2b = httpheaderlinking.setToResponse(res, parsed2a);

assert.equal(res.headers.Link, link2b);
