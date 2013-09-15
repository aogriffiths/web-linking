web-linking
===========

Module for working with web links as described in rfc2616


    var linking = require('../lib/main.js');
    var httpheaderlinking = linking.httpheader;

    var str = '<http://example.com/TheBook/chapter2>; rel="previous"; title="previous chapter"'

    //Parse from string into json
    var parsed = httpheaderlinking.parse(str);    	

    //Stringify from json into string
    var str2   = httpheaderlinking.stringify(parsed);   

    //Now str = str2

    //Parse from a http request header into json
    function(req,res){
    	var parsed = httpheaderlinking.parseRequest(req);    	
    }

    //Set from json into a http request header
    function(req,res){
    	 var link = [
             {
                href: 'http://example.com/TheBook/chapter2',
                rel: 'previous',
                title: 'previous chapter'
             }
         ];
         httpheaderlinking.setToResponse(res, link);    	
    }