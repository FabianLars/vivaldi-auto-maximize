// Version 1 (add FocusListener on onCreated and remove it directly after resizing once)
// DOESN'T WORK AFTER SERVICE WORKER GOES INACTIVE
/* function focusListener(windowId) {
    if (windowId > 0) {
        chrome.windows.get(windowId).then(window => {
            if (window.type === 'normal') {
                chrome.windows.update(windowId, { state: 'maximized' });
                chrome.windows.onFocusChanged.removeListener(focusListener);
            }
        });
    }
}

chrome.windows.onCreated.addListener(() => {
    chrome.windows.onFocusChanged.addListener(focusListener);
}); */

// Version 2 //
// Check on every focus change.
// Resize every window only once by keeping track of already resized windowIds
// windowIds are unique per browser session
let didMax = [];

chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId > 0 && !didMax[windowId]) {
        chrome.windows.get(windowId).then(window => {
            if (window.type === 'normal') {
                chrome.windows.update(windowId, { state: 'maximized' });
                didMax[windowId] = true;
            }
        });
    }
});
