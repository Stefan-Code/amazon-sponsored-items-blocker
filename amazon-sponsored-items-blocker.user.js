// ==UserScript==
// @name         Amazon sponsored items blocker
// @namespace    https://github.com/Stefan-Code/amazon-sponsored-items-blocker
// @version      0.2.0
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
  // guard
  if (!pageContentChanged) {
    return;
  }
  const ads = $(".celwidget").has(".s-sponsored-label-info-icon");
  ads.each(function (_i, elem) {
    // console.log("Object " + i + " contains an ad");
    // $(this).css('background-color', 'red');
    elem.remove();
  });
  console.log(
    "amazon-sponsored-items-blocker: " + ads.length + " ads removed!"
  );
  pageContentChanged = false;
}
