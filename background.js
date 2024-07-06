console.log("background");
chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
  if (response.task === "autofill") {
    console.log("message received");
    // Process the autofill task here (e.g., access data, interact with webpage)

    // Send response after processing (optional)
    sendResponse({ status: "success" }); // Replace with appropriate response data

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { response: response.task });
        console.log("sent");
      }
    });
  }
});
