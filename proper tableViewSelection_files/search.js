/* Copyright (c) 2006 by Apple Computer, Inc.  All Rights Reserved. */

var searchurl = '/is/search.html'

// Load localization
document.write('<script src="http://www.mac.com/1/up/comments/scripts/loc.js" type="text/javascript" charset="utf-8"></script>');

// Load utility objects
document.write('<script src="http://www.mac.com/1/up/comments/scripts/utility.js" type="text/javascript" charset="utf-8"></script>');

/** 
  * initialize search control if present
  */
function initSearch() 
{

	setLocale();
	browser.detect();	

	if (!document.getElementById) { return; }
	var search = document.getElementById('search');
	if (search === null) {return;}
	
	// set method and action for search
	search.method = 'get';
	search.action = searchurl; 
	
	// append query string
	var query = document.createElement('input');
	// set to type search if available
	try {
		query.setAttribute('type','search');
	} 
	catch(e) {
		query.setAttribute('type','input');
	}
	query.name = 'q';
	query.value = '';
	query.setAttribute('title',localeStringForKey('search'));
	query.className = 'searchtext';
	search.appendChild(query);
	
	//locale
	var lang = document.createElement('input');
	lang.type = 'hidden';
	lang.name = 'lang';
	lang.value = locale;
	search.appendChild(lang);
	
	// GUID
	var blogid = document.createElement('input');
	blogid.type = 'hidden';
	blogid.name = 'GUID';
	blogid.value = GUID;
	search.appendChild(blogid);
	
	// Path
	var path = document.createElement('input');
	path.type = 'hidden';
	path.name = 'path';
	path.value = location.pathname;
	search.appendChild(path);

	// Serve static search page for custom domain name 
	var domain = document.createElement('input');
	domain.type = 'hidden';
	domain.name = 'static';
	domain.value = (document.domain != 'web.mac.com');
	search.appendChild(domain);
	
	// First look at the parent div to get placement
	var position = 'right';
	var classString = search.parentNode.className;
	if (classString.lastIndexOf('left') > -1) { position = 'left'; }
	else if (classString.lastIndexOf('right') > -1) { position = 'right'; }
	
	// Override height of parent
	search.parentNode.height = 'auto';
	
	// Now create and insert the Search Glyph as a input type="image"
	var glyph = document.createElement('input');
	glyph.setAttribute('type','image');
	glyph.src = 'http://www.mac.com/1/up/comments/images/search.png';
	glyph.alt = localeStringForKey('search');
	glyph.style.background = 'transparent';
	glyph.style.border = '0';
	glyph.align = 'top';
	glyph.id = 'searchGlyph';
	switch(position) {
		case 'left':
			search.insertBefore(glyph,query);
			break;
		case 'right':
			search.insertBefore(glyph,blogid);
			break;
	}

	fixQueryBoxWidth(position);
		
	pngs.add('searchGlyph');
	pngs.fix();
}

function fixQueryBoxWidth(position)
{
	var margin = 5;
	var search = document.getElementById('search');
	if (search === null) { return; }
	
	var widthOfContainer = parseInt(getCSSProp(search.parentNode,'width'),10);
	var widthOfButton;
	var target;
	
	for (var i = 0; i < search.childNodes.length; i++) {
		switch (search.childNodes[i].type) {
			case 'image':
				var button = search.childNodes[i];
				// get width of button
				widthOfButton = parseInt(getCSSProp(button,'width'),10);
				if (widthOfButton === 0) {
					widthOfButton = 18;
				}
				// fix padding of button
				if (position == 'left') {
					button.style.marginRight = margin + 'px';
				} 
				else {
					button.style.marginLeft =  margin + 'px';
				}				
				break;
			case 'text':
			case 'search':
				target = i;
		}
	}
	
	var queryBox = search.childNodes[target];
	queryBox.style.width = ((widthOfContainer - widthOfButton) - margin).toString() + 'px';
		
	// tweak parent container for Gekko and IE7
	if (browser.gekko || (browser.windowsInternetExplorer && browser.version >= 7)) {
		search.parentNode.style.width = widthOfContainer + 10 + 'px';
	}
	
}

// Name: Get CSS Property
// Language: JavaScript
// Author: Travis Beckham | squidfingers.com
// Description: Retrieve a CSS property from inline and external sources
// Compatibility: IE4+, NS6+, Safari 1.3+
// --------------------------------------------------

function getCSSProp(element, prop) 
{
  if (element.style[prop]) {
    // inline style property
    return element.style[prop];
  } else if (element.currentStyle) {
    // external stylesheet for Explorer
    return element.currentStyle[prop];
  } else if (document.defaultView && document.defaultView.getComputedStyle) {
    // external stylesheet for Mozilla and Safari 1.3+
    prop = prop.replace(/([A-Z])/g,"-$1");
    prop = prop.toLowerCase();
    return document.defaultView.getComputedStyle(element,"").getPropertyValue(prop);
  } else {
    // Safari 1.2
    return null;
  }
}
