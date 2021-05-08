var url;

// console.log("bg")
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.from == "content") {
    console.log(msg.url);
    // chrome.tabs.create({
    //   url: "snapshot.html",

    // });

    url = msg.url;
    msg(url)
    function msg(url) {
      console.log(url);
      chrome.runtime.sendMessage({
        from: "background",
        result: url,
      });
    }
  }
  if (msg.from == "urlSender") {

    // console.log("receive url");

    // console.log(url);
    url = msg.url
    myTab(msg.url);



  }

});
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  if (msg.from == "urlRequest") {
    console.log("receive urlRequest");
    // console.log(url);
    chrome.runtime.sendMessage({
      from: "background",
      result: url,
    });
  }

});

async function myTab(url) {

  // console.log(url)
  chrome.tabs.create({
    url: "snapshot.html",

  });
}