
// chrome.browserAction.onClicked.addListener(buttonclick)

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['sketch.js',"p5.min.js"]
  });
});

// function buttonclick(tab){
//     console.log(tab)
//     let msg={
//         txt: "hello"
//     }
//     chrome.tabs.sendMessage(tab.id,msg)
// }


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.from == 'content_script') {
      chrome.tabs.captureVisibleTab(null, {}, function (image) {
        sendResponse({screenshot: image});
      });
    }
    return true;
  });