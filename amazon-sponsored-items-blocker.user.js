// ==UserScript==
// @name         Amazon sponsored items blocker
// @namespace    https://github.com/Stefan-Code/amazon-sponsored-items-blocker
// @version      0.1
// @description  Blocks sponsored search results on amazon.com, amazon.co.uk and amazon.de
// @author       Stefan-Code
// @include      *://www.amazon.de/*
// @include      *://www.amazon.com/*
// @include      *://www.amazon.co.uk/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// @run-at document-end
// ==/UserScript==
$ = jQuery.noConflict(true);
$(document).ready(function() {
    console.log("amazon-sponsored-items-blocker loaded");
    var count = 0;
$('.celwidget').each(function(i, obj) {
    if ($(this).find(".s-sponsored-info-icon").length > 0){
        //console.log("Object " + i + " contains an ad");
        $(this).css('display', 'none');
        count++;
}
});
    console.log("amazon-sponsored-items-blocker: " + count + " ads removed!");
});
