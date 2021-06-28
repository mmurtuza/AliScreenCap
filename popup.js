// var url;
let screenShot = new Promise(function (myResolve, myReject) {
  chrome.tabs.captureVisibleTab(null, null, (imageUri) => {
    // console.log('hi');
    console.log(imageUri);

    myResolve(imageUri);
  });
});


screenShot.then(
  (url) => {
    // console.log(url);
    //Start massaging
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { "message": "start" });
      // console.log(activeTab.id);
    });

    //Send URL to background script
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
      if (msg.from == "sendUrl") {
        // console.log("receive send url");
        // console.log(url)
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
  }
);
