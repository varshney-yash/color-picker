chrome.runtime.oninstalled.addListener(()=>{
    chrome.storage.sync.set({color});
})