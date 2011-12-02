/* Copyright (c) 2006 by Apple Computer, Inc.  All Rights Reserved. */

// publisher selected locale
var locale = 'en';

// localized strings
var strings = 
{'en': {
	'nocomments': 'No Comments',
	'onecomment': '1 Comment',
	'manycomments': '%@ Comments',
	'addcomment': 'Add a Comment',
	'addcommentcaption': 'Opens new window to add a comment',
	'managecomments': 'Manage Comments for this Entry',
	'bytes': '%@ Bytes',
	'KB': '%@KB',
	'MB': '%@MB',
	'GB': '%@GB',
	'search': 'Type text you want to find in this blog or podcast'
	},
 'fr': {
	'nocomments': '0 commentaire',
	'onecomment': '1 commentaire',
	'manycomments':'%@ commentaires',
	'addcomment': 'Ajouter un commentaire',
	'addcommentcaption': 'Ouvre une nouvelle fenêtre pour le commentaire',
	'managecomments': 'Gérer les commentaires sur cette entrée',
	'bytes': '%@ octets',
	'KB': '%@Ko',
	'MB': '%@Mo',
	'GB': '%@Go',
	'search': 'Saisissez le texte que vous souhaitez trouver dans ce blog ou podcast.'
 },
 'de': {
	'nocomments': '0 Kommentare',
	'onecomment': '1 Kommentar',
	'manycomments': '%@ Kommentare',
	'addcomment': 'Kommentar hinzufügen',
	'addcommentcaption': 'Öffnet ein neues Fenster für den Kommentar', 
	'managecomments': 'Kommentare zu diesem Eintrag verwalten',
	'bytes': '%@ Bytes',
	'KB': '%@KB',
	'MB': '%@MB',
	'GB': '%@GB',
	'search': 'Geben Sie den Text, den Sie in diesem Blog oder Podcast finden möchten, hier ein.'
 },
 'ja': {
	'nocomments': '0件のコメント',
	'onecomment': '1件のコメント',
	'manycomments': '%@件のコメント',
	'addcomment': 'コメントを追加する', 
	'addcommentcaption': 'コメントを追加するための新規ウィンドウを開く',	 
	'managecomments': 'このエントリーのコメントを管理する',
	'bytes': '%@ Bytes',
	'KB': '%@KB',
	'MB': '%@MB',
	'GB': '%@GB',
	'search': 'このブログまたはpodcastでお探しのテキストを入力してください'
 }};
 
function localeStringForKey() 
{	
	var key = arguments[0];
	var lang = strings[locale];
	if (lang[key] !== null) {
		return stringReplace(lang[key],arguments);
	}
}

function stringReplace(string, values) 
{
	var newString = string;
	for(var i = 1; i < values.length; i++) {
		newString = string.replace('%@',values[i]);
		string = newString;
	} 
	return string;
}

function commentCountString(count) 
{
	switch(count) {
		case 0:
			return localeStringForKey('nocomments');
		case 1:
			return localeStringForKey('onecomment');
		default:
			return localeStringForKey('manycomments',count);
	}
}

// Set Locale by looking at xml:lang attribute of document. Default is 'en'.
function setLocale ()
{
	var docroot = document.getElementsByTagName('html')[0];
	switch(docroot.getAttribute('xml:lang')) {
		case 'fr':
			locale = 'fr';
			break;
		case 'de':
			locale = 'de';
			break;
		case 'ja':
			locale = 'ja';
			break;
		case 'en':
			locale = 'en';
			break;
		default:
			locale = 'en';
	}
}