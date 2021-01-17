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

const label = 'amazon-sponsored-items-blocker';
const mainId = 'search';
const listClass = 's-main-slot';
const adClass = 'AdHolder';

const isAd = node =>
    node instanceof HTMLElement &&
    node.classList.contains(adClass);

/**
 * @param {MutationRecord[]} mutations
 */
const removeSponsoredAds = mutations => {
    /**
     * @type {HTMLElement[]}
     */
    const ads = mutations.flatMap(({target: {childNodes}}) => Array.from(childNodes)).filter(isAd);
    console.debug(`${label}: ads:`, ads);

    for (const ad of ads) {
        ad.remove();
    }
    console.log(`${label}: ${ads.length} ads removed!`);
};
const observer = new MutationObserver(removeSponsoredAds);

/**
 * @type {Element | null}
 */
const main = document.getElementById(mainId).getElementsByClassName(listClass).item(0);
if (main) {
    observer.observe(main, {
        childList: true,
        subtree: true,
    });
} else {
    console.error(`${label}: no target`);
}

console.log(`${label}: loaded`);
