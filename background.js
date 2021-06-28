var url;

// console.log("bg")
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  //on URL as msg creat a window for screenshot
  if (msg.from == "urlSender") {

    console.log("receive url");

    url = msg.url
    // console.log(url);
    myTab();

  }

});

//Waits for msg from created tab to start then sends the img URL
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  if (msg.from == "urlRequest") {
    // console.log("receive urlRequest");
    // console.log(url);
    chrome.runtime.sendMessage({
      from: "background",
      result: url,
    });
  }

});

async function myTab() {

  // console.log(url)
  chrome.tabs.create({
    url: "snapshot.html",

  });
}