// Check on every focus change.
// Resize every window only once by keeping track of already resized windowIds
// windowIds are unique per browser session

// This looks ugly but everything else (that seemed to work in other browsers) crashed on vivaldi
chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId > 0) {
        const key = 'w' + windowId;
        chrome.storage.local.get(key, wasMaxed => {
            if (!wasMaxed || !wasMaxed[key]) {
                chrome.windows.get(windowId, window => {
                    if (window.type === 'normal') {
                        chrome.windows.update(windowId, { state: 'maximized' }, () => {
                            chrome.storage.local.set({ [key]: true }, () => {
                                /* Empty callback function, because wtf */
                            });
                        });
                    }
                });
            }
        });
    }
});

chrome.windows.onRemoved.addListener(windowId => {
    chrome.storage.local.remove('w' + windowId, () => {
        /* Empty callback function, because wtf */
    });
});
