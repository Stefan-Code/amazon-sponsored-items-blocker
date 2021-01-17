// ==UserScript==
// @name         Amazon sponsored items blocker
// @namespace    https://github.com/Wintus/amazon-sponsored-items-blocker
// @version      0.2
// @description  Blocks sponsored search results on Amazon
// @include      *://www.amazon.*/*
// @include      *://www.amazon.co.*/*
// @grant        none
// @run-at document-end
// ==/UserScript==

// using: ES2015

// FIXME: @see https://developer.mozilla.org/en-US/docs/Archive/Events/DOMSubtreeModified
let pageContentChanged = false;
document.body.addEventListener("DOMSubtreeModified", () => {
    pageContentChanged = true;
});
setInterval(removeSponsoredAds, 200);
console.log("amazon-sponsored-items-blocker loaded");

function removeSponsoredAds() {
    // guard
    if (!pageContentChanged) {
        return;
    }

    let count = 0;
    const elements = document.getElementsByClassName('celwidget');
    Array.from(elements).forEach(function (elem, i) {
        if (elem.getElementsByClassName("s-sponsored-label-info-icon").length > 0) {
            // console.log(`Object #${i} contains an ad`);
            // elem.setAttribute('style','background-color: red;');
            elem.remove();
            count++;
        }
    });
    console.log(`amazon-sponsored-items-blocker: ${count} ads removed!`);
    pageContentChanged = false;
}
