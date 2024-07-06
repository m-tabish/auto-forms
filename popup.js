const fields = document.querySelector(".fields")
const add_btn = document.getElementById("add_field")
let newName = document.getElementById("newName")
let output = document.getElementById('output')
let delete_btn = document.createElement("button")
delete_btn.innerText = "❌"
delete_btn.addClassList = "newName"
function addField() {
    output.value = newName.value
    if (!newName.value.trim()) {
        alert("Enter name of new field")
    }
    else {
        const newField = document.createElement("div");
        const newInput = document.createElement("input")
        newField.innerText = newName.value
        fields.appendChild(newField);
        fields.appendChild(newInput);
        fields.appendChild(delete_btn);
        delete_btn.classList.add(newName)
        console.log("clicked")
    }
}
function deleteClicked() {
    delete_btn.classList.contains()
}
add_field.addEventListener("click", addField)