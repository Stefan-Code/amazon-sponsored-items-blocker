// ==UserScript==
// @name         Amazon sponsored items blocker
// @namespace    https://github.com/Stefan-Code/amazon-sponsored-items-blocker
// @version      0.1
// @description  Blocks sponsored search results on amazon.com, amazon.co.uk and amazon.de
// @author       Stefan-Code
// @include      *://www.amazon.de/*
// @include      *://www.amazon.com/*
// @include      *://www.amazon.co.uk/*
// @include      *://www.amazon.co.jp/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// @run-at document-end
// ==/UserScript==
$ = jQuery.noConflict(true);
let pageContentChanged = false;
const observer = new MutationObserver(() => {
  pageContentChanged = true;
});
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
setInterval(removeSponsoredAds, 200);
console.log("amazon-sponsored-items-blocker loaded");

function removeSponsoredAds() {
  if (pageContentChanged) {
    let count = 0;
    $(".celwidget").each(function (_i) {
      if ($(this).find(".s-sponsored-label-info-icon").length > 0) {
        //console.log("Object " + i + " contains an ad");
        //$(this).css('background-color', 'red');
        this.remove();
        count++;
      }
    });
    console.log("amazon-sponsored-items-blocker: " + count + " ads removed!");
    pageContentChanged = false;
  }
}
