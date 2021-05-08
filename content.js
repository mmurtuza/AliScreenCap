console.log("content")
var url;
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {

    if (request.message === "start") {
      // console.log(request)
      // chrome.tabs.captureVisibleTab(null, null, (imageUri) => {
      //   console.log('hi');
      //   console.log(imageUri);
      //   url = imageUri;
      // });
      chrome.runtime.sendMessage({
        from: "sendUrl"
      });
      // url = request.url;
      // chrome.runtime.sendMessage({
      //   from: "content",
      //   url: url,
      // });
    }
    // if (request.message == "urlSender") {

    //   console.log("receive url");
    //   console.log(request.url);
    //   chrome.runtime.sendMessage({
    //     from: "content",
    //     url: url
    //   });
    // }
  });


