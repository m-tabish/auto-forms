chrome.runtime.sendMessage({ task: "autofill" }, function (response) {
    console.log("heloo")
    autofill()
})





function autofill() {

    //removing all the placeholders
    let placeholder = [...document.querySelectorAll(".ndJi5d.snByac")]
    placeholder.map(item => item.innerText = "")

    //selecting all the div containing the form field and inputs 
    let outerdiv = [...document.querySelectorAll(".geS5n")]

    //selecting all the div containing the form field
    let field = [...document.querySelectorAll(".M7eMe")]

    //regex for checking if the form field asks to input phone number
    const phone_regex = /(?:number|phone|contact|whatsapp)/i;
    const course_regex = /(?:course|degree|branch|pursuing)/i;
    const roll_regex = /(?:roll|roll no.|Roll)/i;
    const college_regex = /(?:College|Institution|University)/i;

    for (i = 0; i < field.length; i++) {
        try {
            if (field[i].innerText == "Name") {
                outerdiv[i].querySelector(".whsOnd.zHQkBf").value = "Mohd Tabish Khan"
                console.log("1a")
            }
            else if (phone_regex.test(field[i].innerText)) {
                outerdiv[i].querySelector(".whsOnd.zHQkBf").value = "9451152776"
                console.log("3")
            } else if (course_regex.test(field[i].innerText)) {
                outerdiv[i].querySelector(".whsOnd.zHQkBf").value = "B.TECH CS(DS+AI)"
                console.log("4")
            }
            else if (roll_regex.test(field[i].innerText)) {
                outerdiv[i].querySelector(".whsOnd.zHQkBf").value = "202310101150006"
                console.log("4")
            } else if (college_regex.test(field[i].innerText)) {
                outerdiv[i].querySelector(".whsOnd.zHQkBf").value = "Shri Ramswaroop Memorial University"
                console.log("4")
            }
            console.log("done")
        } catch (e) {
            console.error(e)
        }
    }
}
