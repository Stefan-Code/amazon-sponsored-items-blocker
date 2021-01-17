// ==UserScript==
// @name         Amazon sponsored items blocker
// @namespace    https://github.com/Wintus/amazon-sponsored-items-blocker
// @version      0.2
// @description  Blocks sponsored search results on Amazon
// @include      *://www.amazon.*/*
// @include      *://www.amazon.co.*/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// @run-at document-end
// ==/UserScript==
$ = jQuery.noConflict(true);
var pageContentchanged = false;
$('body').bind("DOMSubtreeModified", function() {
    pageContentchanged = true;
});
setInterval(removeSponsoredAds, 200);
console.log("amazon-sponsored-items-blocker loaded");

function removeSponsoredAds() {
    if (pageContentchanged) {
        var count = 0;
        $('.celwidget').each(function(i, obj) {
            if ($(this).find(".s-sponsored-label-info-icon").length > 0) {
                //console.log("Object " + i + " contains an ad");
                //$(this).css('background-color', 'red');
                (this).remove();
                count++;
            }
        });
        console.log("amazon-sponsored-items-blocker: " + count + " ads removed!");
        pageContentchanged = false;
    }
}
