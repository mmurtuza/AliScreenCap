var url;
chrome.tabs.captureVisibleTab(null, null, (imageUri) => {
  console.log('hi');
  // console.log(imageUri);
  url = imageUri;
});
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, { "message": "start" });
  // console.log(activeTab.id);
});
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.from == "sendUrl") {
    console.log("receive send url");
    chrome.runtime.sendMessage({
      from: "urlSender",
      url: url,
    });
    // const makeItGreen = 'document.getElementsByTagName(\'img\').src = ' + url + '';

    // chrome.tabs.create({
    //   url: "snapshot.html",
    // });

  }
  // if (msg.from == "background") {
  //   console.log(msg.result);

  //   // chrome.tabs.create({
  //   //   url: "snapshot.html",

  //   // });

  // }
});
