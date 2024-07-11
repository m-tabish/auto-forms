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

// Function to create and append field elements to the DOM
function createFieldElement(fieldName, fieldValue) {
  const outerdiv = document.createElement("div");
  const field_span = document.createElement("span");
  const value_span = document.createElement("span");
  const delete_btn = document.createElement("button");
  const holder = document.createElement("span");

  outerdiv.classList.add("outerdiv");
  field_span.classList.add("field_span");
  value_span.classList.add("value_span");
  holder.classList.add("holder");

  delete_btn.innerText = "❌";
  delete_btn.classList.add("delete_btn");
  delete_btn.addEventListener("click", function () {
    delete fields_dict[fieldName];
    localStorage.setItem("fields_dict", JSON.stringify(fields_dict));
    outerdiv.remove();
  });

  value_span.innerText = fieldValue;
  outerdiv.appendChild(field_span);
  holder.appendChild(value_span);
  holder.appendChild(delete_btn);
  outerdiv.appendChild(holder);

  field_span.innerText = fieldName.length > 20 ? fieldName.substring(0, 20) + " : " : fieldName + " : ";

  fields.appendChild(outerdiv);
}

// Display existing fields
for (const key in fields_dict) {
  createFieldElement(key, fields_dict[key]);
}

// console.log(fields_dict);

// Function to add a new field
function addField() {
  if (!newField.value.trim()) {
    alert("Enter name of new field");
    return;  
  }

  const fieldName = newField.value.trim();
  const fieldValue = newValue.value.trim();
  fields_dict[fieldName] = fieldValue;

  // console.log(JSON.stringify(fields_dict) + " fd");

  localStorage.setItem("fields_dict", JSON.stringify(fields_dict));

  // Update the UI instantly
  createFieldElement(fieldName, fieldValue);

  // Clear the input fields for the next entry
  newField.value = "";
  newValue.value = "";
}

add_btn.addEventListener("click", addField);

// Sending message
document.getElementById("fill").addEventListener("click", () => {
  const message = fields_dict;
  console.log("Clicked");
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
