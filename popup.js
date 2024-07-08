const fields = document.querySelector(".fields");
const add_btn = document.getElementById("add_field");
let newField = document.getElementById("newField");
const newValue = document.getElementById("newValue");
let fields_dict;
try {
    fields_dict = localStorage.getItem("fields_dict") ? JSON.parse(localStorage.getItem("fields_dict")) : {};
} catch (e) {
    console.log(e);
    fields_dict = {};
}
//sending message 
document.getElementById("submit").addEventListener("click", () => {
  const message = fields_dict;
console.log("Clicked")
  // Query the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Send a message to the content script in the active tab
    chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
      if (response) {
        console.log("Response from content script:", response.reply);
      } else {
        console.log("No response from content script");
      }
    });
  });
});

 

for (const key in fields_dict) {
    const outerdiv = document.createElement("div");
    const delete_btn = document.createElement("button");
    delete_btn.innerText = "❌";
    delete_btn.classList.add("delete_btn");
    delete_btn.addEventListener("click", function () {
        delete fields_dict[key];
        localStorage.setItem("fields_dict", JSON.stringify(fields_dict));
        this.parentElement.remove();
    });

    outerdiv.appendChild(document.createElement("div"));
    outerdiv.appendChild(delete_btn);

    outerdiv.firstElementChild.innerText = key + ": " + fields_dict[key];

    fields.appendChild(outerdiv);
}

console.log(fields_dict);

function addField() {
    if (!newField.value.trim()) {
        alert("Enter name of new field");
        return; // Exit function early if no name is entered
    }

    const fieldName = newField.value.trim();
    const fieldValue = newValue.value.trim();
    fields_dict[fieldName] = fieldValue;

    console.log(JSON.stringify(fields_dict) + " fd");

    localStorage.setItem("fields_dict", JSON.stringify(fields_dict));

    // Update the UI instantly
    const outerdiv = document.createElement("div");
    const delete_btn = document.createElement("button");
    delete_btn.innerText = "❌";
    delete_btn.classList.add("delete_btn");
    delete_btn.addEventListener("click", function () {
        delete fields_dict[fieldName];
        localStorage.setItem("fields_dict", JSON.stringify(fields_dict));
        this.parentElement.remove();
    });

    outerdiv.appendChild(document.createElement("div"));
    outerdiv.appendChild(delete_btn);

    outerdiv.firstElementChild.innerText = fieldName + ": " + fieldValue;

    fields.appendChild(outerdiv);

    // Clear the input fields for the next entry
    newField.value = "";
    newValue.value = "";
}

add_btn.addEventListener("click", addField);


