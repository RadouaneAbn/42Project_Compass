chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes("projects.intra.42.fr")) {
        console.log("Injecting content script into:", tab.url);
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['scripts/content.js']
        });
    }
});