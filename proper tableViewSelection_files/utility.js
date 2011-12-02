/* Copyright (c) 2006 by Apple Computer, Inc.  All Rights Reserved. */

var transparentGIF = 'http://www.mac.com/1/up/comments/images/transparent.gif';

// Manages PNGs inserted
var pngs = {
	list: [],
	add: function(id) 
	{
		if (browser.windowsInternetExplorer && browser.version < 7) {
			pngs.list.push(id);
		}
	},
	fix: function()
	{
		var img, src;
		for (var i = 0; i < pngs.list.length; i++) {
			img = document.getElementById(pngs.list[i]);
			// if what you found was a node that is a PNG image
			if (img && img.nodeType == 1 && (img.nodeName.toLowerCase() == 'img' || img.nodeName.toLowerCase() == 'input') && img.src.search(/\.png$/) > 0) {
				src = img.src;
				img.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + src + '\', sizingMethod=\'scale\')';
				img.src = transparentGIF;
			}			
		}
	}
}

var browser = {
	windowsInternetExplorer: false,
	macInternetExplorer: false,
	safari: false,
	gekko: false,
	version: 0.0,
	detect: function()
	{
		var temp;
		if ((navigator.appVersion.indexOf("MSIE") != -1) &&
			(navigator.appVersion.indexOf("Macintosh") == -1)) {
			temp = navigator.appVersion.split("MSIE");
			browser.version = parseFloat(temp[1]);
			browser.windowsInternetExplorer = true;
		}
		else if ((navigator.appVersion.indexOf("MSIE") != -1) &&
			(navigator.appVersion.indexOf("Macintosh") != -1)) {
			temp = navigator.appVersion.split("MSIE");
			browser.version = parseFloat(temp[1]);
			browser.macInternetExplorer = true;
		}		
		else if (navigator.appVersion.indexOf('Safari') != -1) {
			temp = navigator.appVersion.split("Safari/");
			browser.version = parseFloat(temp[1]);
			browser.safari = true;
		}
		else if (navigator.appName === 'Netscape') {
			browser.gekko = true;
			browser.version = parseFloat(navigator.appVersion);
		}
	}
}
