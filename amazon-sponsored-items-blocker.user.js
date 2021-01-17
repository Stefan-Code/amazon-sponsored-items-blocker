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

const isAd = node =>
    node instanceof HTMLElement &&
    node.classList.contains('AdHolder');

/**
 * @param {MutationRecord[]} mutations
 */
const removeSponsoredAds = mutations => {
    /**
     * @type {HTMLElement[]}
     */
    const ads = mutations.flatMap(({target: {childNodes}}) => Array.from(childNodes)).filter(isAd);
    for (const ad of ads) {
        // console.log(`Object #${ad} contains an ad`);
        ad.remove();
    }
    console.log(`amazon-sponsored-items-blocker: ${ads.length} ads removed!`);
};
const observer = new MutationObserver(removeSponsoredAds);

/**
 * @type {Element | null}
 */
const main = document.getElementById('search').getElementsByClassName('s-main-slot').item(0);
if (main) {
    observer.observe(main, {
        childList: true,
        subtree: true,
    });
} else {
    console.error('amazon-sponsored-items-blocker: No Target');
}

console.log("amazon-sponsored-items-blocker: loaded");
