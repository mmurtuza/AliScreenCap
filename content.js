console.log("content")
var url;
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {

    if (request.message === "start") {

      chrome.runtime.sendMessage({
        from: "sendUrl"
      });

    }

  });


